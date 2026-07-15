import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { normalizeUrl, buildPsiUrl, parsePsi, verifyUrlReachable } from "@/lib/pagespeed";
import { db, firebaseConfigSource, firebaseProjectId } from "@/lib/firebase";
import AuditResultsEmail from "@/emails/AuditResultsEmail";
import InternalAuditLeadEmail from "@/emails/InternalAuditLeadEmail";
import { emailLogoBase64, emailLogoCid } from "@/emails/emailBrand";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

type AuditLeadData = {
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  industry: string | null;
  budget: string | null;
  url: string;
  strategy: "mobile" | "desktop";
  score: null;
};

type AuditSuccessResult = {
  ok: true;
  url: string;
  strategy: "mobile" | "desktop";
  overall: number;
  dimensions: Array<{
    key: string;
    label: string;
    score: number;
  }>;
  vitals: Array<{
    label: string;
    value: string;
  }>;
};

async function sendAuditEmails(leadData: AuditLeadData, auditResult: AuditSuccessResult) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("AUDIT_EMAIL_ERROR:", "RESEND_API_KEY is not configured");
      return;
    }

    const resend = new Resend(resendApiKey);
    const companyName = leadData.company || leadData.name || "your website";

    const internalEmailResult = await resend.emails.send({
      from: "info@digitales.pk",
      to: "shaheerulazeem@gmail.com",
      subject: "New Digital Health Score Lead",
      react: InternalAuditLeadEmail({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        url: leadData.url,
        strategy: leadData.strategy,
        overall: auditResult.overall,
        dimensions: auditResult.dimensions,
        vitals: auditResult.vitals,
      }),
      attachments: [
        {
          filename: "digitales-logo.png",
          content: emailLogoBase64,
          contentType: "image/png",
          contentId: emailLogoCid,
        },
      ],
    });

    if (internalEmailResult.error) {
      console.error("AUDIT_INTERNAL_EMAIL_ERROR:", internalEmailResult.error);
    } else {
      console.log("AUDIT_INTERNAL_EMAIL_SENT:", internalEmailResult.data?.id);
    }

    const clientEmailResult = await resend.emails.send({
      from: "info@digitales.pk",
      to: leadData.email,
      subject: `Your Digital Health Score for ${companyName}`,
      react: AuditResultsEmail({
        name: leadData.name,
        company: leadData.company,
        url: leadData.url,
        score: auditResult.overall,
        strategy: auditResult.strategy,
        dimensions: auditResult.dimensions,
        vitals: auditResult.vitals,
      }),
      attachments: [
        {
          filename: "digitales-logo.png",
          content: emailLogoBase64,
          contentType: "image/png",
          contentId: emailLogoCid,
        },
      ],
    });

    if (clientEmailResult.error) {
      console.error("AUDIT_CLIENT_EMAIL_ERROR:", clientEmailResult.error);
    } else {
      console.log("AUDIT_CLIENT_EMAIL_SENT:", clientEmailResult.data?.id);
    }
  } catch (error) {
    console.error("AUDIT_EMAIL_ERROR:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("DEBUG: Reached step 1 - before parsing JSON");
    const body = await req.json().catch(() => ({}));
    console.log("DEBUG: Reached step 2 - after parsing JSON");
    const {
      url,
      strategy = "mobile",
      name,
      email,
      company,
      phone,
      industry,
      budget,
    } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing required name or email" },
        { status: 400 }
      );
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid URL parameter" },
        { status: 400 }
      );
    }

    if (strategy !== "mobile" && strategy !== "desktop") {
      return NextResponse.json(
        { ok: false, error: "Strategy must be 'mobile' or 'desktop'" },
        { status: 400 }
      );
    }

    let normalized: string;
    try {
      normalized = normalizeUrl(url);
      normalized = await verifyUrlReachable(normalized);
    } catch (err: any) {
      return NextResponse.json(
        { ok: false, error: err.message || "We couldn't reach this website. Please check the URL and try again." },
        { status: 400 }
      );
    }

    const leadData: AuditLeadData = {
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" && company.trim().length > 0 ? company.trim() : null,
      phone: typeof phone === "string" && phone.trim().length > 0 ? phone.trim() : null,
      industry: typeof industry === "string" && industry.trim().length > 0 ? industry.trim() : null,
      budget: typeof budget === "string" && budget.trim().length > 0 ? budget.trim() : null,
      url: normalized,
      strategy,
      score: null,
    };

    let leadId: string | null = null;

    try {
      console.log("DEBUG: Reached step 3 - right before Firestore lead create");
      console.log("DEBUG LEAD_CREATE_DATA:", leadData);

      const createdLead = await addDoc(collection(db, "audit_leads"), {
        ...leadData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      leadId = createdLead.id;
      console.log("DEBUG: Reached step 4 - right after Firestore lead create completed");
      console.log("DEBUG CREATED_LEAD_ID:", createdLead.id);
    } catch (error) {
      console.error("FIRESTORE_LEAD_CREATE_ERROR:", {
        firebaseConfigSource,
        firebaseProjectId,
        error,
      });
    }

    const apiKey = process.env.PAGESPEED_API_KEY;
    const psiUrl = buildPsiUrl(normalized, strategy, apiKey);
    console.log("DEBUG: Reached step 5 - before triggering Google PageSpeed");

    // Call PSI API with a 55-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    try {
      const response = await fetch(psiUrl, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Try parsing error message from response
        const errorJson = await response.json().catch(() => null);
        const errorMessage = errorJson?.error?.message || `Google API responded with status ${response.status}`;
        return NextResponse.json(
          { ok: false, error: errorMessage },
          { status: response.status >= 400 && response.status < 600 ? response.status : 500 }
        );
      }

      const json = await response.json();
      const auditResult = parsePsi(json, strategy);

      if (!auditResult.ok) {
        return NextResponse.json(
          { ok: false, error: auditResult.error },
          { status: 520 } // Web server returned an unknown / parsing error
        );
      }

      if (leadId) {
        const score = Number.isInteger(auditResult.overall)
          ? auditResult.overall
          : Math.round(Number(auditResult.overall));

        try {
          console.log("DEBUG: Reached step 6 - right before Firestore lead score update");
          await updateDoc(doc(db, "audit_leads", leadId), {
            score,
            updatedAt: serverTimestamp(),
          });
          console.log("DEBUG: Reached step 7 - right after Firestore lead score update completed");
        } catch (error) {
          console.error("FIRESTORE_SCORE_UPDATE_ERROR:", {
            firebaseConfigSource,
            firebaseProjectId,
            error,
          });
        }
      }

      await sendAuditEmails(leadData, auditResult);

      return NextResponse.json(auditResult);
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === "AbortError") {
        return NextResponse.json(
          { ok: false, error: "The PageSpeed audit timed out (limit: 55 seconds). Please try again later." },
          { status: 504 } // Gateway Timeout
        );
      }
      return NextResponse.json(
        { ok: false, error: fetchErr.message || "Failed to contact Google PageSpeed Insights" },
        { status: 502 } // Bad Gateway
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
