import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import ContactFormEmail from "@/emails/ContactFormEmail";
import InternalContactLeadEmail from "@/emails/InternalContactLeadEmail";
import { emailLogoBase64, emailLogoCid } from "@/emails/emailBrand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
};

type ContactData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(body: ContactPayload) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return { error: "Name is required" };
  }

  if (!email) {
    return { error: "Email is required" };
  }

  if (!emailPattern.test(email)) {
    return { error: "Enter a valid email address" };
  }

  if (!message) {
    return { error: "Message is required" };
  }

  return {
    data: {
      name,
      email,
      service: service || "Not specified",
      message,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const validated = validateContactPayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 }
      );
    }

    try {
      await getAdminDb().collection("contacts").add({
        name: validated.data.name,
        email: validated.data.email,
        service: validated.data.service,
        message: validated.data.message,
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error("CONTACT_FIRESTORE_SAVE_ERROR:", error);
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    try {
      const internalEmailResult = await resend.emails.send({
        from: "info@digitales.pk",
        to: "shaheerulazeem@gmail.com",
        subject: "New Business Lead: Contact Form Submission",
        react: InternalContactLeadEmail(validated.data),
        attachments: [
          {
            filename: "digitales-logo.png",
            content: emailLogoBase64,
            contentType: "image/png",
            contentId: emailLogoCid,
          },
        ],
      });

      if (internalEmailResult.error) {
        throw internalEmailResult.error;
      }

      console.log("CONTACT_INTERNAL_EMAIL_SENT:", internalEmailResult.data?.id);

      try {
        const autoResponderResult = await resend.emails.send({
          from: "info@digitales.pk",
          to: validated.data.email,
          subject: "We've received your request - Digitales",
          react: ContactFormEmail(validated.data),
          attachments: [
            {
              filename: "digitales-logo.png",
              content: emailLogoBase64,
              contentType: "image/png",
              contentId: emailLogoCid,
            },
          ],
        });

        if (autoResponderResult.error) {
          console.error("CONTACT_AUTORESPONDER_ERROR:", autoResponderResult.error);
        } else {
          console.log("CONTACT_AUTORESPONDER_SENT:", autoResponderResult.data?.id);
        }
      } catch (error) {
        console.error("CONTACT_AUTORESPONDER_ERROR:", error);
      }

      return NextResponse.json({ ok: true }, { status: 201 });
    } catch (error) {
      console.error("CONTACT_INTERNAL_EMAIL_ERROR:", error);
      return NextResponse.json(
        { ok: false, error: "Contact message could not be processed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("CONTACT_PIPELINE_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected contact form error" },
      { status: 500 }
    );
  }
}
