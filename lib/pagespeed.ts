export interface AuditDimension {
  key: string;
  label: string;
  score: number; // 0 - 100
}

export interface CoreWebVital {
  label: string;
  value: string;
}

export interface AuditResult {
  ok: true;
  url: string;
  strategy: "mobile" | "desktop";
  overall: number; // average of scores
  dimensions: AuditDimension[];
  vitals: CoreWebVital[];
}

export interface AuditError {
  ok: false;
  error: string;
}

export function normalizeUrl(input: string): string {
  let cleaned = input.trim();
  if (!cleaned) {
    throw new Error("URL is empty");
  }

  // Prepend scheme if missing
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = "https://" + cleaned;
  }

  try {
    const parsed = new URL(cleaned);
    // Basic verification: hostname should contain a dot (unless it's localhost) and not be empty
    if (!parsed.hostname || (!parsed.hostname.includes(".") && parsed.hostname !== "localhost")) {
      throw new Error("Invalid host name");
    }
    return parsed.href;
  } catch (err) {
    throw new Error(`Invalid URL: ${input}`);
  }
}

export function buildPsiUrl(url: string, strategy: "mobile" | "desktop", apiKey?: string): string {
  const base = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const params = new URLSearchParams();
  
  params.append("url", url);
  params.append("strategy", strategy);
  
  // Request all four categories: performance, seo, accessibility, best-practices
  params.append("category", "performance");
  params.append("category", "seo");
  params.append("category", "accessibility");
  params.append("category", "best-practices");

  if (apiKey) {
    params.append("key", apiKey);
  }

  return `${base}?${params.toString()}`;
}

export function parsePsi(rawPsiJson: any, strategy: "mobile" | "desktop"): AuditResult | AuditError {
  if (!rawPsiJson) {
    return { ok: false, error: "No response received from PageSpeed API" };
  }

  // Handle standard API errors from Google PageSpeed Insights
  if (rawPsiJson.error) {
    return {
      ok: false,
      error: rawPsiJson.error.message || `API Error: ${rawPsiJson.error.code || "unknown"}`
    };
  }

  const result = rawPsiJson.lighthouseResult;
  if (!result || !result.categories) {
    return { ok: false, error: "PageSpeed Insights did not return Lighthouse audit categories." };
  }

  try {
    const categories = result.categories;
    const dimensionsList = [
      { key: "performance", label: "Performance" },
      { key: "seo", label: "SEO" },
      { key: "accessibility", label: "Accessibility" },
      { key: "best-practices", label: "Best Practices" }
    ];

    const dimensions: AuditDimension[] = [];
    let sum = 0;
    let count = 0;

    for (const d of dimensionsList) {
      const cat = categories[d.key];
      if (cat && typeof cat.score === "number") {
        const score = Math.round(cat.score * 100);
        dimensions.push({ key: d.key, label: d.label, score });
        sum += score;
        count++;
      } else {
        dimensions.push({ key: d.key, label: d.label, score: 0 });
      }
    }

    const overall = count > 0 ? Math.round(sum / count) : 0;

    // Extract core web vitals and other relevant timing audits
    const audits = result.audits || {};
    
    // Core Web Vitals labels mapping
    const vitalsKeys = [
      { key: "first-contentful-paint", label: "First Contentful Paint (FCP)" },
      { key: "largest-contentful-paint", label: "Largest Contentful Paint (LCP)" },
      { key: "total-blocking-time", label: "Total Blocking Time (TBT)" },
      { key: "cumulative-layout-shift", label: "Cumulative Layout Shift (CLS)" },
      { key: "speed-index", label: "Speed Index" }
    ];

    const vitals: CoreWebVital[] = vitalsKeys.map((vk) => {
      const audit = audits[vk.key];
      return {
        label: vk.label,
        value: audit?.displayValue || "N/A"
      };
    });

    return {
      ok: true,
      url: result.requestedUrl || result.finalUrl || "",
      strategy,
      overall,
      dimensions,
      vitals
    };
  } catch (err: any) {
    return {
      ok: false,
      error: `Failed to parse audit payload: ${err.message || err}`
    };
  }
}
