import {
  Link,
  Section,
  Text,
} from "@react-email/components";
import ClientEmailShell, { clientStyles } from "@/emails/ClientEmailShell";

type AuditDimension = {
  label: string;
  score: number;
};

type AuditVital = {
  label: string;
  value: string;
};

export type AuditResultsEmailProps = {
  name: string;
  company?: string | null;
  url: string;
  score: number;
  strategy?: "mobile" | "desktop";
  dimensions?: AuditDimension[];
  vitals?: AuditVital[];
  consultationUrl?: string;
};

const siteUrl = "https://digitales.pk";

export default function AuditResultsEmail({
  name = "there",
  company = "your website",
  url = siteUrl,
  score = 82,
  strategy = "mobile",
  dimensions = [
    { label: "Performance", score: 82 },
    { label: "Accessibility", score: 96 },
    { label: "Best Practices", score: 91 },
    { label: "SEO", score: 88 },
  ],
  vitals = [
    { label: "First Contentful Paint", value: "1.4s" },
    { label: "Largest Contentful Paint", value: "2.2s" },
    { label: "Cumulative Layout Shift", value: "0.02" },
  ],
  consultationUrl = `${siteUrl}/contact`,
}: AuditResultsEmailProps) {
  const previewText = `Your Digitales PageSpeed score is ${score}`;

  return (
    <ClientEmailShell
      preview={previewText}
      eyebrow="Digital health score"
      title="Your audit results are ready"
      cta={{ label: "Book a Consultation", href: consultationUrl }}
    >
      <Text style={clientStyles.bodyText}>
        Hi {name}, thank you for running a Digitales audit for{" "}
        <Link href={url} style={clientStyles.linkValue}>
          {company || url}
        </Link>
        . Here is the initial PageSpeed snapshot for the {strategy} experience.
      </Text>

      <Section
        style={{
          ...clientStyles.block,
          marginTop: "24px",
          backgroundColor: clientStyles.colors.night,
          textAlign: "center",
        }}
      >
        <Text style={clientStyles.label}>PageSpeed Score</Text>
        <Text
          style={{
            margin: "12px 0 0",
            color: "#FFFFFF",
            fontSize: "64px",
            fontWeight: "900",
            lineHeight: "1",
          }}
        >
          {score}
        </Text>
        <Text style={{ ...clientStyles.mutedText, marginTop: "12px" }}>
          Scored out of 100 based on Google PageSpeed Insights.
        </Text>
      </Section>

      <Section style={{ ...clientStyles.block, marginTop: "18px" }}>
        {dimensions.map((dimension, index) => (
          <Section
            key={dimension.label}
            style={index === dimensions.length - 1 ? clientStyles.rowLast : clientStyles.row}
          >
            <Text
              style={{
                margin: "0",
                display: "inline-block",
                width: "72%",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "1.65",
              }}
            >
              {dimension.label}
            </Text>
            <Text
              style={{
                margin: "0",
                display: "inline-block",
                width: "28%",
                textAlign: "right",
                color: scoreTone(dimension.score),
                fontSize: "14px",
                fontWeight: "800",
                lineHeight: "1.65",
              }}
            >
              {dimension.score}
            </Text>
          </Section>
        ))}
      </Section>

      <Section style={clientStyles.note}>
        <Text style={{ ...clientStyles.label, marginBottom: "12px" }}>Core Web Vitals</Text>
        {vitals.map((vital, index) => (
          <Text
            key={vital.label}
            style={{
              margin: index === 0 ? "0" : "10px 0 0",
              color: clientStyles.colors.text,
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            <strong>{vital.label}:</strong> {vital.value}
          </Text>
        ))}
      </Section>

      <Text style={clientStyles.mutedText}>
        This report is a starting point. Our team can help you prioritize the improvements that will have the clearest impact on speed, SEO, and conversion.
      </Text>
    </ClientEmailShell>
  );
}

function scoreTone(score: number) {
  if (score >= 80) {
    return "#F0B428";
  }

  if (score >= 60) {
    return "#C9A8E8";
  }

  return "#A89FB5";
}
