import { normalizeUrl, buildPsiUrl, parsePsi } from "./pagespeed";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`Assertion failed: ${message}`);
    process.exit(1);
  }
}

// 1. Test normalizeUrl
console.log("Running normalizeUrl tests...");
assert(normalizeUrl("google.com") === "https://google.com/", "Should prepend https:// and append slash");
assert(normalizeUrl("http://example.com/test") === "http://example.com/test", "Should preserve http scheme");
assert(normalizeUrl("  https://my-site.pk/abc?q=123 ") === "https://my-site.pk/abc?q=123", "Should trim and parse URL");
try {
  normalizeUrl("not-a-valid-domain");
  assert(false, "Should have thrown for invalid domain");
} catch (err) {
  // Expected exception
}

// 2. Test buildPsiUrl
console.log("Running buildPsiUrl tests...");
const psiUrl1 = buildPsiUrl("https://google.com/", "mobile");
assert(psiUrl1.includes("url=https%3A%2F%2Fgoogle.com%2F"), "Should URL-encode URL parameter");
assert(psiUrl1.includes("strategy=mobile"), "Should include strategy=mobile");
assert(psiUrl1.includes("category=performance") && psiUrl1.includes("category=seo"), "Should request categories");
assert(!psiUrl1.includes("key="), "Should not include key parameter when key is absent");

const psiUrl2 = buildPsiUrl("https://google.com/", "desktop", "MY_SECRET_KEY");
assert(psiUrl2.includes("key=MY_SECRET_KEY"), "Should append key parameter when key is provided");

// 3. Test parsePsi Success
console.log("Running parsePsi success tests...");
const mockSuccessPayload = {
  lighthouseResult: {
    requestedUrl: "https://google.com/",
    categories: {
      performance: { score: 0.92 },
      seo: { score: 0.88 },
      accessibility: { score: 0.95 },
      "best-practices": { score: 1.0 }
    },
    audits: {
      "first-contentful-paint": { displayValue: "0.8 s" },
      "largest-contentful-paint": { displayValue: "1.5 s" },
      "total-blocking-time": { displayValue: "50 ms" },
      "cumulative-layout-shift": { displayValue: "0.02" },
      "speed-index": { displayValue: "1.1 s" }
    }
  }
};

const result = parsePsi(mockSuccessPayload, "mobile");
assert(result.ok === true, "Should parse successfully");
if (result.ok === true) {
  assert(result.overall === 94, `Overall score should be average of (92, 88, 95, 100) = 93.75 -> 94, got ${result.overall}`);
  assert(result.dimensions.find(d => d.key === "performance")?.score === 92, "Performance score should be 92");
  assert(result.dimensions.find(d => d.key === "best-practices")?.score === 100, "Best Practices score should be 100");
  assert(result.vitals.find(v => v.label.includes("LCP"))?.value === "1.5 s", "LCP should be 1.5 s");
  assert(result.vitals.find(v => v.label.includes("CLS"))?.value === "0.02", "CLS should be 0.02");
}

// 4. Test parsePsi Error
console.log("Running parsePsi error tests...");
const mockErrorPayload = {
  error: {
    code: 400,
    message: "The URL could not be resolved."
  }
};

const errResult = parsePsi(mockErrorPayload, "mobile");
assert(errResult.ok === false, "Should parse error payload as ok=false");
if (errResult.ok === false) {
  assert(errResult.error === "The URL could not be resolved.", `Error message should match, got ${errResult.error}`);
}

console.log("All tests passed successfully!");
process.exit(0);
