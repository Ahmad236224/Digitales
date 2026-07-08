import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import DartxApplicationEmail from "@/emails/DartxApplicationEmail";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInternalDartxEmail(data: DartxApplicationData) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const role = escapeHtml(data.role);
  const services = escapeHtml(data.services);
  const budget = escapeHtml(data.budget);

  return `
    <div style="margin:0;padding:0;background:#0a0610;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
      <div style="padding:32px 16px;background:#0a0610;">
        <div style="max-width:640px;margin:0 auto;background:#15101e;border:1px solid #322342;border-radius:16px;overflow:hidden;">
          <div style="padding:30px 32px;background:#0a0610;border-bottom:1px solid #322342;">
            <p style="margin:0 0 10px;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:#f0b428;font-weight:700;">DartX Partner Lead</p>
            <h1 style="margin:0;color:#ffffff;font-size:25px;line-height:1.28;font-weight:800;">New DartX Application</h1>
          </div>
          <div style="padding:30px 32px;background:#15101e;color:#ffffff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#1e1629;border:1px solid #322342;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:14px 18px;width:170px;color:#f0b428;font-size:13px;border-bottom:1px solid #322342;">Name</td>
                <td style="padding:14px 18px;color:#ffffff;font-size:15px;font-weight:700;border-bottom:1px solid #322342;">${name}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;color:#f0b428;font-size:13px;border-bottom:1px solid #322342;">Email</td>
                <td style="padding:14px 18px;font-size:15px;border-bottom:1px solid #322342;"><a href="mailto:${email}" style="color:#c9a8e8;text-decoration:none;font-weight:700;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:14px 18px;color:#f0b428;font-size:13px;border-bottom:1px solid #322342;">Role / Business</td>
                <td style="padding:14px 18px;color:#ffffff;font-size:15px;font-weight:700;border-bottom:1px solid #322342;">${role}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;color:#f0b428;font-size:13px;border-bottom:1px solid #322342;">Services</td>
                <td style="padding:14px 18px;color:#ffffff;font-size:15px;font-weight:700;border-bottom:1px solid #322342;">${services}</td>
              </tr>
              <tr>
                <td style="padding:14px 18px;color:#f0b428;font-size:13px;">Budget</td>
                <td style="padding:14px 18px;color:#ffffff;font-size:15px;font-weight:700;">${budget}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
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
      html: renderInternalDartxEmail(data),
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

    const createdApplication = await getAdminDb().collection("dartx_applications").add({
      ...validated.data,
      createdAt: FieldValue.serverTimestamp(),
    });

    await sendDartxEmails(validated.data);

    return NextResponse.json(
      { ok: true, id: createdApplication.id },
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
