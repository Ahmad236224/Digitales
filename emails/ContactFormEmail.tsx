import {
  Link,
  Section,
  Text,
} from "@react-email/components";
import ClientEmailShell, { clientStyles } from "@/emails/ClientEmailShell";

export type ContactFormEmailProps = {
  name: string;
  email: string;
  service?: string;
  message: string;
};

export default function ContactFormEmail({
  name = "Digitales visitor",
  email = "hello@example.com",
  service = "Not specified",
  message = "I would like to learn more about Digitales services.",
}: ContactFormEmailProps) {
  return (
    <ClientEmailShell
      preview="Thank you for reaching out to Digitales"
      eyebrow="Contact request received"
      title="Thank you for reaching out"
    >
      <Text style={clientStyles.bodyText}>
        Hi {name}, thanks for contacting Digitales. We have received your message and our team will review it carefully.
      </Text>
      <Text style={clientStyles.mutedText}>
        You can expect a response within 24-48 hours. If your request is urgent, reply directly to this email and we will do our best to prioritize it.
      </Text>

      <Section style={{ ...clientStyles.block, marginTop: "24px" }}>
        <Detail label="Name" value={name} />
        <Detail label="Email" value={email} href={`mailto:${email}`} />
        <Detail label="Selected Service" value={service} />
        <Section style={clientStyles.rowLast}>
          <Text style={clientStyles.label}>Message</Text>
          <Text
            style={{
              ...clientStyles.bodyText,
              margin: 0,
              color: clientStyles.colors.muted,
              WebkitTextFillColor: clientStyles.colors.muted,
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </Section>
      </Section>

      <Section style={clientStyles.note}>
        <Text style={{ ...clientStyles.bodyText, margin: 0 }}>
          Friendly note: this confirmation means your request was successfully submitted to Digitales.
        </Text>
      </Section>
    </ClientEmailShell>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <Section style={clientStyles.row}>
      <Text style={clientStyles.label}>{label}</Text>
      {href ? (
        <Link href={href} style={clientStyles.linkValue}>
          {value}
        </Link>
      ) : (
        <Text style={clientStyles.value}>{value}</Text>
      )}
    </Section>
  );
}
