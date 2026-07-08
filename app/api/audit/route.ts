import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { normalizeUrl, buildPsiUrl, parsePsi, verifyUrlReachable } from "@/lib/pagespeed";
import { getAdminDb } from "@/lib/firebaseAdmin";
import AuditResultsEmail from "@/emails/AuditResultsEmail";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderScoreBadge(score: number) {
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#f0b428" : "#ef4444";

  return `
    <span style="display:inline-block;min-width:48px;text-align:center;padding:6px 10px;border-radius:999px;background:${color};color:#ffffff;font-size:13px;font-weight:800;">
      ${score}
    </span>
  `;
}

function renderEmailShell({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#0b101b;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
      <div style="padding:32px 16px;background:#0b101b;">
        <div style="max-width:680px;margin:0 auto;background:#111827;border:1px solid #243044;border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.28);">
          <div style="padding:30px 32px;background:#111827;border-bottom:1px solid #253149;">
            <p style="margin:0 0 10px;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:#f0b428;font-weight:700;">${eyebrow}</p>
            <h1 style="margin:0;color:#ffffff;font-size:25px;line-height:1.28;font-weight:800;">${title}</h1>
          </div>
          <div style="padding:30px 32px;background:#f8fafc;color:#111827;">
            ${body}
          </div>
          <div style="padding:22px 32px;background:#111827;border-top:1px solid #253149;">
            <p style="margin:0;color:#cbd5e1;font-size:13px;line-height:1.7;">Digitales</p>
            <p style="margin:4px 0 0;color:#7f8da3;font-size:12px;line-height:1.6;">Smart Technology. High-Impact Marketing. Built to Perform.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAuditScoreRows(auditResult: AuditSuccessResult) {
  return auditResult.dimensions
    .map((dimension) => {
      const label = escapeHtml(dimension.label);

      return `
        <tr>
          <td style="padding:14px 18px;color:#334155;font-size:14px;font-weight:700;border-bottom:1px solid #eef2f7;">${label}</td>
          <td style="padding:14px 18px;text-align:right;border-bottom:1px solid #eef2f7;">${renderScoreBadge(dimension.score)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderVitalRows(auditResult: AuditSuccessResult) {
  return auditResult.vitals
    .map((vital) => {
      const label = escapeHtml(vital.label);
      const value = escapeHtml(vital.value);

      return `
        <tr>
          <td style="padding:12px 18px;color:#64748b;font-size:13px;border-bottom:1px solid #eef2f7;">${label}</td>
          <td style="padding:12px 18px;color:#111827;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #eef2f7;">${value}</td>
        </tr>
      `;
    })
    .join("");
}

function renderInternalAuditEmail(leadData: AuditLeadData, auditResult: AuditSuccessResult) {
  const name = escapeHtml(leadData.name);
  const email = escapeHtml(leadData.email);
  const company = escapeHtml(leadData.company || "Not specified");
  const url = escapeHtml(leadData.url);
  const strategy = escapeHtml(leadData.strategy);

  return renderEmailShell({
    eyebrow: "Digitales Audit Lead",
    title: "New Digital Health Score Submission",
    body: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:14px 18px;width:150px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Name</td>
          <td style="padding:14px 18px;color:#111827;font-size:15px;font-weight:700;border-bottom:1px solid #eef2f7;">${name}</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Company</td>
          <td style="padding:14px 18px;color:#111827;font-size:15px;font-weight:700;border-bottom:1px solid #eef2f7;">${company}</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Email</td>
          <td style="padding:14px 18px;font-size:15px;border-bottom:1px solid #eef2f7;"><a href="mailto:${email}" style="color:#b98500;text-decoration:none;font-weight:700;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:14px 18px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">URL</td>
          <td style="padding:14px 18px;font-size:15px;border-bottom:1px solid #eef2f7;"><a href="${url}" style="color:#b98500;text-decoration:none;font-weight:700;">${url}</a></td>
        </tr>
        <tr>
          <td style="padding:14px 18px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Strategy</td>
          <td style="padding:14px 18px;color:#111827;font-size:15px;font-weight:700;text-transform:capitalize;border-bottom:1px solid #eef2f7;">${strategy}</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;color:#64748b;font-size:14px;">Score</td>
          <td style="padding:14px 18px;text-align:right;">${renderScoreBadge(auditResult.overall)}</td>
        </tr>
      </table>
      <div style="margin-top:22px;padding:22px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
        <p style="margin:0 0 12px;color:#64748b;font-size:13px;line-height:1.6;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Audit Breakdown</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          ${renderAuditScoreRows(auditResult)}
        </table>
      </div>
    `,
  });
}

function renderClientAuditEmail(leadData: AuditLeadData, auditResult: AuditSuccessResult) {
  const name = escapeHtml(leadData.name);
  const company = escapeHtml(leadData.company || "your website");
  const url = escapeHtml(leadData.url);

  return renderEmailShell({
    eyebrow: "Your Digital Health Score",
    title: `Your audit results for ${company}`,
    body: `
      <p style="margin:0 0 18px;color:#111827;font-size:16px;line-height:1.75;">Hi ${name},</p>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.8;">Thank you for running a Digital Health Score with Digitales. We have reviewed the initial signals for <a href="${url}" style="color:#b98500;text-decoration:none;font-weight:700;">${url}</a> and your overall score is shown below.</p>
      <div style="margin:24px 0;padding:24px;background:#111827;border-radius:14px;text-align:center;">
        <p style="margin:0 0 8px;color:#f0b428;font-size:12px;line-height:1.5;text-transform:uppercase;letter-spacing:0.12em;font-weight:800;">Overall Score</p>
        <p style="margin:0;color:#ffffff;font-size:48px;line-height:1;font-weight:900;">${auditResult.overall}</p>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        ${renderAuditScoreRows(auditResult)}
      </table>
      <div style="margin-top:22px;padding:20px;background:#ffffff;border:1px solid #e5e7eb;border-left:4px solid #f0b428;border-radius:12px;">
        <p style="margin:0 0 10px;color:#64748b;font-size:13px;line-height:1.6;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Core Web Vitals</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          ${renderVitalRows(auditResult)}
        </table>
      </div>
      <p style="margin:22px 0 0;color:#334155;font-size:15px;line-height:1.8;">These results are a starting point. A deeper review can reveal where technical SEO, page speed, content, and conversion improvements can create measurable growth.</p>
      <div style="margin-top:24px;text-align:center;">
        <a href="https://digitales.pk/contact" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#f0b428;color:#111827;font-size:14px;font-weight:800;text-decoration:none;">Book a 30-Min Strategy Call</a>
      </div>
    `,
  });
}

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
      html: renderInternalAuditEmail(leadData, auditResult),
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

      const createdLead = await getAdminDb().collection("audit_leads").add({
        ...leadData,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      leadId = createdLead.id;
      console.log("DEBUG: Reached step 4 - right after Firestore lead create completed");
      console.log("DEBUG CREATED_LEAD_ID:", createdLead.id);
    } catch (error) {
      console.error("FIRESTORE_LEAD_CREATE_ERROR:", error);
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
          await getAdminDb().collection("audit_leads").doc(leadId).update({
            score,
            updatedAt: FieldValue.serverTimestamp(),
          });
          console.log("DEBUG: Reached step 7 - right after Firestore lead score update completed");
        } catch (error) {
          console.error("FIRESTORE_SCORE_UPDATE_ERROR:", error);
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
