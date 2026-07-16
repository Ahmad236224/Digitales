import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigSource, firebaseProjectId } from "@/lib/firebase";
import NewsletterSignupEmail from "@/emails/NewsletterSignupEmail";
import { emailLogoBase64, emailLogoCid } from "@/emails/emailBrand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NewsletterPayload = {
  email?: unknown;
  sourceDomain?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateNewsletterPayload(body: NewsletterPayload) {
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const sourceDomain = typeof body.sourceDomain === "string" ? body.sourceDomain.trim().toLowerCase() : "";

  if (!email) {
    return { error: "Email is required" };
  }

  if (!emailPattern.test(email)) {
    return { error: "Enter a valid email address" };
  }

  return {
    data: {
      email,
      sourceDomain: sourceDomain || "unknown",
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const validated = validateNewsletterPayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 }
      );
    }

    let newsletterSubscriberId = "";

    try {
      const createdSubscriber = await addDoc(collection(db, "newsletter_subscribers"), {
        type: "newsletter",
        email: validated.data.email,
        sourceDomain: validated.data.sourceDomain,
        createdAt: serverTimestamp(),
      });

      newsletterSubscriberId = createdSubscriber.id;
      console.log("NEWSLETTER_FIRESTORE_SAVED:", {
        id: newsletterSubscriberId,
        firebaseConfigSource,
        firebaseProjectId,
      });
    } catch (error) {
      console.error("NEWSLETTER_FIRESTORE_SAVE_ERROR:", {
        firebaseConfigSource,
        firebaseProjectId,
        error,
      });

      return NextResponse.json(
        { ok: false, error: "Newsletter signup could not be saved" },
        { status: 500 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("NEWSLETTER_EMAIL_ERROR:", "RESEND_API_KEY is not configured");
      return NextResponse.json(
        { ok: false, error: "Newsletter confirmation email is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    try {
      const confirmationEmailResult = await resend.emails.send({
        from: "info@digitales.pk",
        to: validated.data.email,
        subject: "You are subscribed to Digitales insights",
        react: NewsletterSignupEmail({ email: validated.data.email }),
        attachments: [
          {
            filename: "digitales-logo.png",
            content: emailLogoBase64,
            contentType: "image/png",
            contentId: emailLogoCid,
          },
        ],
      });

      if (confirmationEmailResult.error) {
        throw confirmationEmailResult.error;
      }

      console.log("NEWSLETTER_CONFIRMATION_EMAIL_SENT:", confirmationEmailResult.data?.id);

      return NextResponse.json(
        { ok: true, id: newsletterSubscriberId },
        { status: 201 }
      );
    } catch (error) {
      console.error("NEWSLETTER_CONFIRMATION_EMAIL_ERROR:", error);
      return NextResponse.json(
        { ok: false, error: "Newsletter confirmation email could not be sent" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("NEWSLETTER_PIPELINE_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected newsletter signup error" },
      { status: 500 }
    );
  }
}
