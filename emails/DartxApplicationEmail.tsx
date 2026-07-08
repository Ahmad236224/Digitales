import {
  Body,
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

export type DartxApplicationEmailProps = {
  name: string;
  email: string;
  role?: string;
  services?: string;
  budget?: string;
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

export default function DartxApplicationEmail({
  name = "there",
  email = "hello@example.com",
  role = "Not specified",
  services = "Not specified",
  budget = "Not specified",
}: DartxApplicationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your DartX partner application has been received</Preview>
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
                DartX partner application
              </Text>
              <Heading className="mb-0 mt-3 text-[28px] font-bold leading-[1.25] text-white">
                Your application has been received
              </Heading>
            </Section>

            <Section className="px-6 py-7">
              <Text className="m-0 text-[16px] leading-[1.7] text-[#EDE7F4]">
                Hi {name}, thanks for applying to partner with DartX. We review every application personally and will be in touch shortly.
              </Text>
              <Text className="mb-6 mt-4 text-[15px] leading-[1.8] text-digitalesMuted">
                Here is a copy of what you submitted. If anything needs updating, you can reply directly to this email.
              </Text>

              <Section className="rounded-[14px] border border-solid border-[#322342] bg-digitalesRaised">
                <Detail label="Name" value={name} />
                <Detail label="Email" value={email} href={`mailto:${email}`} />
                <Detail label="Current role or business" value={role} />
                <Detail label="Services of interest" value={services} />
                <Detail label="Monthly client budget" value={budget} last />
              </Section>

              <Section className="mt-6 rounded-[14px] border border-solid border-[#6B2D8B] bg-[#21142d] px-5 py-5">
                <Text className="m-0 text-[15px] leading-[1.8] text-[#EDE7F4]">
                  DartX is built for partners who want to sell under their own brand while Digitales handles delivery behind the scenes.
                </Text>
              </Section>
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
    <Section className={`${last ? "" : "border-0 border-b border-solid border-[#322342]"} px-5 py-4`}>
      <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
        {label}
      </Text>
      {href ? (
        <Link href={href} className="mt-1 block text-[15px] font-bold text-[#C9A8E8] no-underline">
          {value}
        </Link>
      ) : (
        <Text className="m-0 mt-1 text-[15px] font-bold text-white">
          {value}
        </Text>
      )}
    </Section>
  );
}
