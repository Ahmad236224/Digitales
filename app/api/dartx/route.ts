import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigSource, firebaseProjectId } from "@/lib/firebase";
import DartxApplicationEmail from "@/emails/DartxApplicationEmail";
import InternalDartxLeadEmail from "@/emails/InternalDartxLeadEmail";
import { emailLogoBase64, emailLogoCid } from "@/emails/emailBrand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DartxPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  services?: unknown;
  budget?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DartxApplicationData = {
  name: string;
  email: string;
  role: string;
  services: string;
  budget: string;
};

function validatePayload(body: DartxPayload) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const services = typeof body.services === "string" ? body.services.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";

  if (!name) {
    return { error: "Name is required" };
  }

  if (!email || !emailPattern.test(email)) {
    return { error: "Enter a valid email address" };
  }

  return {
    data: {
      name,
      email,
      role: role || "Not specified",
      services: services || "Not specified",
      budget: budget || "Not specified",
    },
  };
}

async function sendDartxEmails(data: DartxApplicationData) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("DARTX_EMAIL_ERROR:", "RESEND_API_KEY is not configured");
      return;
    }

    const resend = new Resend(resendApiKey);

    const internalEmailResult = await resend.emails.send({
      from: "info@digitales.pk",
      to: "shaheerulazeem@gmail.com",
      subject: "New DartX Partner Application",
      react: InternalDartxLeadEmail(data),
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
      console.error("DARTX_INTERNAL_EMAIL_ERROR:", internalEmailResult.error);
    } else {
      console.log("DARTX_INTERNAL_EMAIL_SENT:", internalEmailResult.data?.id);
    }

    const clientEmailResult = await resend.emails.send({
      from: "info@digitales.pk",
      to: data.email,
      subject: "Your DartX partner application was received",
      react: DartxApplicationEmail(data),
      attachments: [
        {
          filename: "digitales-logo.png",
          content: emailLogoBase64,
          contentType: "image/png",
          contentId: emailLogoCid,
        },
      ],
    });

    if (clientEmailResult.error) {
      console.error("DARTX_CLIENT_EMAIL_ERROR:", clientEmailResult.error);
    } else {
      console.log("DARTX_CLIENT_EMAIL_SENT:", clientEmailResult.data?.id);
    }
  } catch (error) {
    console.error("DARTX_EMAIL_ERROR:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const validated = validatePayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 }
      );
    }

    let createdApplicationId: string | null = null;

    try {
      const createdApplication = await addDoc(collection(db, "dartx_applications"), {
        ...validated.data,
        createdAt: serverTimestamp(),
      });

      createdApplicationId = createdApplication.id;
    } catch (error) {
      console.error("DARTX_FIRESTORE_SAVE_ERROR:", {
        firebaseConfigSource,
        firebaseProjectId,
        error,
      });
    }

    await sendDartxEmails(validated.data);

    return NextResponse.json(
      { ok: true, id: createdApplicationId },
      { status: 201 }
    );
  } catch (error) {
    console.error("DARTX_APPLICATION_SAVE_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Application could not be submitted. Please try again." },
      { status: 500 }
    );
  }
}
