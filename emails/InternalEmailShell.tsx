import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { emailLogoCid } from "@/emails/emailBrand";

type InternalEmailShellProps = {
  preview: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

const siteUrl = "https://digitales.pk";

const colors = {
  gold: "#F0B428",
  night: "#0A0610",
  surface: "#15101E",
  raised: "#1E1629",
  border: "#322342",
  text: "#EDE7F4",
  muted: "#A89FB5",
  purple: "#6B2D8B",
  link: "#C9A8E8",
};

export const shellStyles = {
  colors,
  block: {
    backgroundColor: colors.raised,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    padding: "22px 20px",
  },
  row: {
    borderBottom: `1px solid ${colors.border}`,
    padding: "14px 0",
  },
  rowLast: {
    paddingTop: "14px",
  },
  label: {
    margin: "0 0 6px",
    color: colors.gold,
    WebkitTextFillColor: colors.gold,
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
  value: {
    margin: "0",
    color: "#FFFFFF",
    WebkitTextFillColor: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "1.65",
  },
  linkValue: {
    color: colors.link,
    WebkitTextFillColor: colors.link,
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "1.65",
    textDecoration: "none",
  },
  note: {
    marginTop: "18px",
    backgroundColor: "#21142D",
    backgroundImage: "linear-gradient(180deg, #21142D 0%, #21142D 100%)",
    border: `1px solid ${colors.purple}`,
    borderRadius: "14px",
    padding: "18px 20px",
  },
} as const;

export default function InternalEmailShell({
  preview,
  eyebrow,
  title,
  intro,
  children,
}: InternalEmailShellProps) {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>{`
          :root {
            color-scheme: light;
            supported-color-schemes: light;
          }

          u + .body .gmail-screen {
            background: #000000;
            mix-blend-mode: screen;
          }

          u + .body .gmail-difference {
            background: #000000;
            mix-blend-mode: difference;
          }

          [data-ogsc] .gmail-screen {
            background: #000000 !important;
          }

          [data-ogsc] .gmail-difference {
            background: #000000 !important;
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        className="body"
        style={{
          margin: 0,
          padding: "0",
          backgroundColor: colors.night,
          backgroundImage: `linear-gradient(180deg, ${colors.night} 0%, ${colors.night} 100%)`,
          fontFamily: "Arial, Helvetica, sans-serif",
          color: colors.text,
          WebkitTextFillColor: colors.text,
        }}
      >
        <div className="gmail-screen">
          <div className="gmail-difference">
            <Section
              style={{
                backgroundColor: colors.night,
                backgroundImage: `linear-gradient(180deg, ${colors.night} 0%, ${colors.night} 100%)`,
                padding: "28px 12px",
              }}
            >
              <Container
                style={{
                  width: "100%",
                  maxWidth: "640px",
                  margin: "0 auto",
                  backgroundColor: colors.surface,
                  backgroundImage: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.surface} 100%)`,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <Section
                  style={{
                    padding: "28px 24px",
                    background:
                      "linear-gradient(180deg, #0A0610 0%, #15101E 100%)",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <Img
                    src={`cid:${emailLogoCid}`}
                    width="170"
                    alt="Digitales"
                    style={{ display: "block", marginBottom: "22px", height: "auto" }}
                  />
                  <Text
                    style={{
                      margin: "0 0 10px",
                      color: colors.gold,
                      WebkitTextFillColor: colors.gold,
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {eyebrow}
                  </Text>
                  <Text
                    style={{
                      margin: "0",
                      color: "#FFFFFF",
                      WebkitTextFillColor: "#FFFFFF",
                      fontSize: "28px",
                      lineHeight: "1.25",
                      fontWeight: "800",
                    }}
                  >
                    {title}
                  </Text>
                  {intro ? (
                    <Text
                      style={{
                        margin: "16px 0 0",
                        color: colors.muted,
                        WebkitTextFillColor: colors.muted,
                        fontSize: "15px",
                        lineHeight: "1.75",
                      }}
                    >
                      {intro}
                    </Text>
                  ) : null}
                </Section>

                <Section style={{ padding: "24px" }}>{children}</Section>

                <Section
                  style={{
                    padding: "22px 24px",
                    backgroundColor: colors.night,
                    backgroundImage: `linear-gradient(180deg, ${colors.night} 0%, ${colors.night} 100%)`,
                    borderTop: `1px solid ${colors.border}`,
                  }}
                >
                  <Text
                    style={{
                      margin: "0",
                      color: colors.text,
                      WebkitTextFillColor: colors.text,
                      fontSize: "13px",
                      lineHeight: "1.7",
                    }}
                  >
                    Smart Technology. High-Impact Marketing. Built to Perform.
                  </Text>
                  <Text style={{ margin: "12px 0 0", fontSize: "13px", lineHeight: "1.7" }}>
                    <Link
                      href={siteUrl}
                      style={{
                        color: colors.gold,
                        WebkitTextFillColor: colors.gold,
                        textDecoration: "none",
                      }}
                    >
                      Website
                    </Link>
                  </Text>
                  <Text
                    style={{
                      margin: "12px 0 0",
                      color: "#7E738D",
                      WebkitTextFillColor: "#7E738D",
                      fontSize: "12px",
                      lineHeight: "1.6",
                    }}
                  >
                    Digitales, Lahore, Pakistan
                  </Text>
                </Section>
              </Container>
            </Section>
          </div>
        </div>
      </Body>
    </Html>
  );
}
