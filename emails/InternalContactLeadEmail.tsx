import { Link, Section, Text } from "@react-email/components";
import InternalEmailShell, { shellStyles } from "@/emails/InternalEmailShell";

export type InternalContactLeadEmailProps = {
  name: string;
  email: string;
  service: string;
  message: string;
  sourceDomain?: string;
};

export default function InternalContactLeadEmail({
  name,
  email,
  service,
  message,
  sourceDomain = "unknown",
}: InternalContactLeadEmailProps) {
  return (
    <InternalEmailShell
      preview={`New contact request from ${name}`}
      eyebrow="Digitales Lead Alert"
      title="New Contact Form Submission"
      intro="A new website inquiry has been submitted and is ready for follow-up."
    >
      <Section style={shellStyles.block}>
        <Detail label="Name" value={name} />
        <Detail label="Email" value={email} href={`mailto:${email}`} />
        <Detail label="Source Domain" value={sourceDomain} />
        <Detail label="Selected Service" value={service} last />
      </Section>

      <Section style={{ ...shellStyles.block, marginTop: "18px" }}>
        <Text style={shellStyles.label}>Message</Text>
        <Text
          style={{
            ...shellStyles.value,
            fontWeight: "400",
            color: shellStyles.colors.text,
            WebkitTextFillColor: shellStyles.colors.text,
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </Text>
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
