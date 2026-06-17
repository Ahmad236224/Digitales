import { NextRequest, NextResponse } from "next/server";
import { normalizeUrl, buildPsiUrl, parsePsi } from "@/lib/pagespeed";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url, strategy = "mobile" } = body;

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

    const apiKey = process.env.PAGESPEED_API_KEY;
    const psiUrl = buildPsiUrl(normalized, strategy, apiKey);

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
