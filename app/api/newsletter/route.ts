import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigSource, firebaseProjectId } from "@/lib/firebase";

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

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: validated.data.email,
        sourceDomain: validated.data.sourceDomain,
        createdAt: serverTimestamp(),
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

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("NEWSLETTER_PIPELINE_ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected newsletter signup error" },
      { status: 500 }
    );
  }
}
