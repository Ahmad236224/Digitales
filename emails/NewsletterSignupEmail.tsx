import { Section, Text } from "@react-email/components";
import ClientEmailShell, { clientStyles } from "@/emails/ClientEmailShell";

export type NewsletterSignupEmailProps = {
  email: string;
};

export default function NewsletterSignupEmail({
  email,
}: NewsletterSignupEmailProps) {
  return (
    <ClientEmailShell
      preview="You are subscribed to Digitales insights"
      eyebrow="Newsletter confirmed"
      title="You are on the list"
      intro="Thanks for subscribing to Digitales insights. We will send you useful updates on digital strategy, performance marketing, product thinking, and technology execution."
      cta={{
        label: "Visit Digitales",
        href: "https://digitales.pk",
      }}
    >
      <Section style={clientStyles.block}>
        <Text style={clientStyles.label}>Subscribed email</Text>
        <Text style={clientStyles.value}>{email}</Text>
      </Section>

      <Section style={clientStyles.note}>
        <Text style={{ ...clientStyles.bodyText, margin: 0 }}>
          You will receive occasional updates from the Digitales team. No noise, just high-signal digital insights.
        </Text>
      </Section>
    </ClientEmailShell>
  );
}
