import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

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

const primaryColor = "#6B2D8B";
const secondaryColor = "#F0B428";
const nightColor = "#0A0610";
const surfaceColor = "#15101E";
const raisedColor = "#1E1629";
const mutedColor = "#A89FB5";
const siteUrl = "https://digitales-theta.vercel.app";
const linkedinUrl = "https://www.linkedin.com/company/digitalespk/";
const instagramUrl = "https://www.instagram.com/digitalespk?igsh=bWt5MXhjMnpqZWx2";
const logoUrl = `${siteUrl}/Digitales%20logo.png`;
const companyAddress = "Digitales, Lahore, Pakistan";

function getScoreTone(score: number) {
  if (score >= 80) {
    return "bg-[#dcfce7] text-[#166534]";
  }

  if (score >= 60) {
    return "bg-[#fef3c7] text-[#92400e]";
  }

  return "bg-[#fee2e2] text-[#991b1b]";
}

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
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                digitalesPrimary: primaryColor,
                digitalesSecondary: secondaryColor,
                digitalesNight: nightColor,
                digitalesSurface: surfaceColor,
                digitalesRaised: raisedColor,
                digitalesMuted: mutedColor,
              },
            },
          },
        }}
      >
        <Body className="m-0 bg-digitalesNight px-3 py-8 font-sans text-white">
          <Container className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[16px] border border-solid border-[#2b1c38] bg-digitalesSurface">
            <Section className="bg-digitalesNight px-6 py-6">
              <Img
                src={logoUrl}
                width="170"
                height="50"
                alt="Digitales"
                className="mb-8 block"
              />
              <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.18em] text-digitalesSecondary">
                Digital health score
              </Text>
              <Heading className="mb-0 mt-3 text-[28px] font-bold leading-[1.25] text-white">
                Your audit results are ready
              </Heading>
            </Section>

            <Section className="px-6 py-7">
              <Text className="m-0 text-[16px] leading-[1.7] text-[#EDE7F4]">
                Hi {name}, thank you for running a Digitales audit for{" "}
                <Link href={url} className="font-semibold text-[#C9A8E8] no-underline">
                  {company || url}
                </Link>
                . Here is the initial PageSpeed snapshot for the {strategy} experience.
              </Text>

              <Section className="my-7 rounded-[16px] border border-solid border-[#6B2D8B] bg-digitalesNight px-6 py-7 text-center">
                <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.16em] text-digitalesSecondary">
                  PageSpeed Score
                </Text>
                <Text className="m-0 mt-3 text-[64px] font-black leading-none text-white">
                  {score}
                </Text>
                <Text className="m-0 mt-3 text-[14px] leading-[1.6] text-digitalesMuted">
                  Scored out of 100 based on Google PageSpeed Insights.
                </Text>
              </Section>

              <Section className="rounded-[14px] border border-solid border-[#322342] bg-digitalesRaised">
                {dimensions.map((dimension) => (
                  <Section
                    key={dimension.label}
                    className="border-0 border-b border-solid border-[#322342] px-5 py-4"
                  >
                    <Text className="m-0 inline-block w-[68%] align-middle text-[14px] font-bold text-white">
                      {dimension.label}
                    </Text>
                    <Text
                      className={`m-0 inline-block rounded-full px-3 py-1 text-center text-[13px] font-extrabold ${getScoreTone(
                        dimension.score
                      )}`}
                    >
                      {dimension.score}
                    </Text>
                  </Section>
                ))}
              </Section>

              <Section className="mt-6 rounded-[14px] border border-solid border-[#322342] bg-digitalesRaised px-5 py-5">
                <Text className="m-0 mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
                  Core Web Vitals
                </Text>
                {vitals.map((vital) => (
                  <Text key={vital.label} className="m-0 border-0 border-t border-solid border-[#322342] py-3 text-[14px] leading-[1.5] text-digitalesMuted">
                    <span className="font-semibold">{vital.label}:</span> {vital.value}
                  </Text>
                ))}
              </Section>

              <Text className="mb-6 mt-6 text-[15px] leading-[1.8] text-digitalesMuted">
                This report is a starting point. Our team can help you prioritize the improvements that will have the clearest impact on speed, SEO, and conversion.
              </Text>

              <Button
                href={consultationUrl}
                className="rounded-full bg-digitalesSecondary px-6 py-3 text-center text-[14px] font-extrabold text-[#3D1450] no-underline"
              >
                Book a Consultation
              </Button>
            </Section>

            <Hr className="m-0 border-[#322342]" />

            <Section className="bg-digitalesNight px-6 py-6">
              <Text className="m-0 text-[13px] leading-[1.7] text-digitalesMuted">
                Digitales builds smart technology, high-impact marketing, and performance systems.
              </Text>
              <Text className="m-0 mt-4 text-[13px] text-digitalesMuted">
                <Link href={siteUrl} className="text-digitalesSecondary no-underline">
                  Website
                </Link>
                {"  |  "}
                <Link href={linkedinUrl} className="text-digitalesSecondary no-underline">
                  LinkedIn
                </Link>
                {"  |  "}
                <Link href={instagramUrl} className="text-digitalesSecondary no-underline">
                  Instagram
                </Link>
              </Text>
              <Text className="m-0 mt-4 text-[12px] leading-[1.6] text-[#7e738d]">
                {companyAddress}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
