import {
  Link,
  Section,
  Text,
} from "@react-email/components";
import ClientEmailShell, { clientStyles } from "@/emails/ClientEmailShell";

export type DartxApplicationEmailProps = {
  name: string;
  email: string;
  role?: string;
  services?: string;
  budget?: string;
};

export default function DartxApplicationEmail({
  name = "there",
  email = "hello@example.com",
  role = "Not specified",
  services = "Not specified",
  budget = "Not specified",
}: DartxApplicationEmailProps) {
  return (
    <ClientEmailShell
      preview="Your DartX partner application has been received"
      eyebrow="DartX partner application"
      title="Your application has been received"
    >
      <Text style={clientStyles.bodyText}>
        Hi {name}, thanks for applying to partner with DartX. We review every application personally and will be in touch shortly.
      </Text>
      <Text style={clientStyles.mutedText}>
        Here is a copy of what you submitted. If anything needs updating, you can reply directly to this email.
      </Text>

      <Section style={{ ...clientStyles.block, marginTop: "24px" }}>
        <Detail label="Name" value={name} />
        <Detail label="Email" value={email} href={`mailto:${email}`} />
        <Detail label="Current role or business" value={role} />
        <Detail label="Services of interest" value={services} />
        <Section style={clientStyles.rowLast}>
          <Text style={clientStyles.label}>Monthly client budget</Text>
          <Text style={clientStyles.value}>{budget}</Text>
        </Section>
      </Section>

      <Section style={clientStyles.note}>
        <Text style={{ ...clientStyles.bodyText, margin: 0 }}>
          DartX is built for partners who want to sell under their own brand while Digitales handles delivery behind the scenes.
        </Text>
      </Section>
    </ClientEmailShell>
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
    <Section style={last ? clientStyles.rowLast : clientStyles.row}>
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
