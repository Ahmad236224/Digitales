import { Link, Section, Text } from "@react-email/components";
import InternalEmailShell, { shellStyles } from "@/emails/InternalEmailShell";

export type InternalDartxLeadEmailProps = {
  name: string;
  email: string;
  role: string;
  services: string;
  budget: string;
};

export default function InternalDartxLeadEmail({
  name,
  email,
  role,
  services,
  budget,
}: InternalDartxLeadEmailProps) {
  return (
    <InternalEmailShell
      preview={`New DartX application from ${name}`}
      eyebrow="DartX Partner Lead"
      title="New DartX Application"
      intro="A new partner application has arrived through the DartX form."
    >
      <Section style={shellStyles.block}>
        <Detail label="Name" value={name} />
        <Detail label="Email" value={email} href={`mailto:${email}`} />
        <Detail label="Role / Business" value={role} />
        <Detail label="Services" value={services} />
        <Detail label="Budget" value={budget} last />
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
