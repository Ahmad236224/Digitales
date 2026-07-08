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

export type ContactFormEmailProps = {
  name: string;
  email: string;
  service?: string;
  message: string;
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

export default function ContactFormEmail({
  name = "Digitales visitor",
  email = "hello@example.com",
  service = "Not specified",
  message = "I would like to learn more about Digitales services.",
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for reaching out to Digitales</Preview>
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
                Contact request received
              </Text>
              <Heading className="mb-0 mt-3 text-[28px] font-bold leading-[1.25] text-white">
                Thank you for reaching out
              </Heading>
            </Section>

            <Section className="px-6 py-7">
              <Text className="m-0 text-[16px] leading-[1.7] text-[#EDE7F4]">
                Hi {name}, thanks for contacting Digitales. We have received your message and our team will review it carefully.
              </Text>
              <Text className="mb-6 mt-4 text-[15px] leading-[1.8] text-digitalesMuted">
                You can expect a response within 24-48 hours. If your request is urgent, reply directly to this email and we will do our best to prioritize it.
              </Text>

              <Section className="rounded-[14px] border border-solid border-[#322342] bg-digitalesRaised">
                <Section className="border-0 border-b border-solid border-[#322342] px-5 py-4">
                  <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
                    Name
                  </Text>
                  <Text className="m-0 mt-1 text-[15px] font-bold text-white">
                    {name}
                  </Text>
                </Section>

                <Section className="border-0 border-b border-solid border-[#322342] px-5 py-4">
                  <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
                    Email
                  </Text>
                  <Link href={`mailto:${email}`} className="mt-1 block text-[15px] font-bold text-[#C9A8E8] no-underline">
                    {email}
                  </Link>
                </Section>

                <Section className="border-0 border-b border-solid border-[#322342] px-5 py-4">
                  <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
                    Selected service
                  </Text>
                  <Text className="m-0 mt-1 text-[15px] font-bold text-white">
                    {service}
                  </Text>
                </Section>

                <Section className="px-5 py-4">
                  <Text className="m-0 text-[12px] font-bold uppercase tracking-[0.12em] text-digitalesSecondary">
                    Message
                  </Text>
                  <Text className="m-0 mt-2 whitespace-pre-wrap text-[15px] leading-[1.8] text-digitalesMuted">
                    {message}
                  </Text>
                </Section>
              </Section>

              <Section className="mt-6 rounded-[14px] border border-solid border-[#6B2D8B] bg-[#21142d] px-5 py-5">
                <Text className="m-0 text-[15px] leading-[1.8] text-[#EDE7F4]">
                  Friendly note: this confirmation means your request was successfully submitted to Digitales.
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
