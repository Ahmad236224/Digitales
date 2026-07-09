import { Link, Section, Text } from "@react-email/components";
import InternalEmailShell, { shellStyles } from "@/emails/InternalEmailShell";

type AuditDimension = {
  label: string;
  score: number;
};

type AuditVital = {
  label: string;
  value: string;
};

export type InternalAuditLeadEmailProps = {
  name: string;
  email: string;
  company: string | null;
  url: string;
  strategy: "mobile" | "desktop";
  overall: number;
  dimensions: AuditDimension[];
  vitals: AuditVital[];
};

export default function InternalAuditLeadEmail({
  name,
  email,
  company,
  url,
  strategy,
  overall,
  dimensions,
  vitals,
}: InternalAuditLeadEmailProps) {
  return (
    <InternalEmailShell
      preview={`New audit lead from ${name}`}
      eyebrow="Digitales Audit Lead"
      title="New Digital Health Score Submission"
      intro="A new audit lead was captured and the initial performance scan completed successfully."
    >
      <Section style={shellStyles.block}>
        <Detail label="Name" value={name} />
        <Detail label="Company" value={company || "Not specified"} />
        <Detail label="Email" value={email} href={`mailto:${email}`} />
        <Detail label="Website" value={url} href={url} />
        <Detail label="Strategy" value={capitalize(strategy)} />
        <Section style={shellStyles.rowLast}>
          <Text style={shellStyles.label}>Overall Score</Text>
          <Text style={{ ...shellStyles.value, color: scoreColor(overall) }}>{overall} / 100</Text>
        </Section>
      </Section>

      <Section style={{ ...shellStyles.block, marginTop: "18px" }}>
        <Text style={{ ...shellStyles.label, marginBottom: "12px" }}>Audit Breakdown</Text>
        {dimensions.map((dimension, index) => (
          <Section
            key={dimension.label}
            style={index === dimensions.length - 1 ? shellStyles.rowLast : shellStyles.row}
          >
            <Text style={{ ...shellStyles.value, display: "inline-block", width: "72%", fontWeight: "600" }}>
              {dimension.label}
            </Text>
            <Text
              style={{
                margin: 0,
                display: "inline-block",
                width: "28%",
                textAlign: "right",
                color: scoreColor(dimension.score),
                fontSize: "15px",
                fontWeight: "800",
                lineHeight: "1.65",
              }}
            >
              {dimension.score}
            </Text>
          </Section>
        ))}
      </Section>

      <Section style={shellStyles.note}>
        <Text style={{ ...shellStyles.label, marginBottom: "12px" }}>Core Web Vitals</Text>
        {vitals.map((vital, index) => (
          <Text
            key={vital.label}
            style={{
              margin: index === 0 ? "0" : "10px 0 0",
              color: shellStyles.colors.text,
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            <strong>{vital.label}:</strong> {vital.value}
          </Text>
        ))}
      </Section>
    </InternalEmailShell>
  );
}

function Detail({
  label,
  value,
  href,
  last = false,
}: {
  label: string;
  value: string;
  href?: string;
  last?: boolean;
}) {
  return (
    <Section style={last ? shellStyles.rowLast : shellStyles.row}>
      <Text style={shellStyles.label}>{label}</Text>
      {href ? (
        <Link href={href} style={shellStyles.linkValue}>
          {value}
        </Link>
      ) : (
        <Text style={shellStyles.value}>{value}</Text>
      )}
    </Section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function scoreColor(score: number) {
  if (score >= 80) {
    return "#8BE28B";
  }

  if (score >= 60) {
    return "#F0B428";
  }

  return "#FF8A8A";
}
