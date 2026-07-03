import { NextRequest, NextResponse } from "next/server";
import { normalizeUrl, buildPsiUrl, parsePsi } from "@/lib/pagespeed";
import { prisma, validateDatabaseUrl } from "@/lib/prisma";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    validateDatabaseUrl();

    console.log("DEBUG: Reached step 1 - before parsing JSON");
    const body = await req.json().catch(() => ({}));
    console.log("DEBUG: Reached step 2 - after parsing JSON");
    console.log("DEBUG DATABASE_URL EXISTS:", !!process.env.DATABASE_URL);
    if (process.env.DATABASE_URL) {
      try {
        const parsedUrl = new URL(process.env.DATABASE_URL);
        console.log("DEBUG DATABASE_URL HOST:", parsedUrl.host);
        console.log("DEBUG DATABASE_URL USERNAME:", parsedUrl.username);
      } catch (urlErr) {
        console.error("DEBUG DATABASE_URL PARSE ERROR:", urlErr);
      }
    }
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
    } catch (err: any) {
      return NextResponse.json(
        { ok: false, error: err.message || "Invalid URL format" },
        { status: 400 }
      );
    }

    const leadData = {
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
      console.log("DEBUG: Reached step 3 - right before prisma.lead.create");
      console.log("DEBUG LEAD_CREATE_DATA:", leadData);

      const createdLead = await prisma.lead.create({
        data: leadData,
      });

      leadId = createdLead.id;
      console.log("DEBUG: Reached step 4 - right after prisma.lead.create completed");
      console.log("DEBUG CREATED_LEAD_ID:", createdLead.id);
    } catch (error) {
      console.error("FULL_PRISMA_ERROR:", JSON.stringify(error, null, 2));
      console.error("DATABASE_SAVE_ERROR:", error);

      return NextResponse.json(
        { ok: false, error: "Lead could not be saved. Check FULL_PRISMA_ERROR in the server console." },
        { status: 500 }
      );
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
          console.log("DEBUG: Reached step 6 - right before prisma.lead.update score");
          await prisma.lead.update({
            where: { id: leadId },
            data: { score },
          });
          console.log("DEBUG: Reached step 7 - right after prisma.lead.update score completed");
        } catch (error) {
          console.error("FULL_PRISMA_SCORE_UPDATE_ERROR:", JSON.stringify(error, null, 2));
          console.error("DATABASE_SCORE_UPDATE_ERROR:", error);
        }
      }

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
