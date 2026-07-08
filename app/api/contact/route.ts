import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import ContactFormEmail from "@/emails/ContactFormEmail";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderEmailShell({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#0b101b;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
      <div style="padding:32px 16px;background:#0b101b;">
        <div style="max-width:640px;margin:0 auto;background:#111827;border:1px solid #243044;border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.28);">
          <div style="padding:30px 32px;background:#111827;border-bottom:1px solid #253149;">
            <p style="margin:0 0 10px;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:#f0b428;font-weight:700;">${eyebrow}</p>
            <h1 style="margin:0;color:#ffffff;font-size:25px;line-height:1.28;font-weight:800;">${title}</h1>
          </div>
          <div style="padding:30px 32px;background:#f8fafc;color:#111827;">
            ${body}
          </div>
          <div style="padding:22px 32px;background:#111827;border-top:1px solid #253149;">
            <p style="margin:0;color:#cbd5e1;font-size:13px;line-height:1.7;">Digitales</p>
            <p style="margin:4px 0 0;color:#7f8da3;font-size:12px;line-height:1.6;">Premium digital strategy, design, and growth systems.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderContactEmail(data: ContactData) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const service = escapeHtml(data.service);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  return renderEmailShell({
    eyebrow: "Digitales Lead Alert",
    title: "New Contact Form Submission",
    body: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:15px 18px;width:150px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Name</td>
          <td style="padding:15px 18px;font-size:15px;font-weight:700;color:#111827;border-bottom:1px solid #eef2f7;">${name}</td>
        </tr>
        <tr>
          <td style="padding:15px 18px;color:#64748b;font-size:14px;border-bottom:1px solid #eef2f7;">Email</td>
          <td style="padding:15px 18px;font-size:15px;border-bottom:1px solid #eef2f7;"><a href="mailto:${email}" style="color:#b98500;text-decoration:none;font-weight:700;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:15px 18px;color:#64748b;font-size:14px;">Selected Service</td>
          <td style="padding:15px 18px;font-size:15px;color:#111827;font-weight:700;">${service}</td>
        </tr>
      </table>
      <div style="margin-top:22px;padding:22px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
        <p style="margin:0 0 10px;color:#64748b;font-size:13px;line-height:1.6;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Message</p>
        <div style="font-size:15px;line-height:1.75;color:#111827;">${message}</div>
      </div>
    `,
  });
}

function renderAutoResponderEmail(data: ContactData) {
  const name = escapeHtml(data.name);
  const service = escapeHtml(data.service);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  return renderEmailShell({
    eyebrow: "Request Received",
    title: "Thank you for reaching out to Digitales",
    body: `
      <p style="margin:0 0 18px;color:#111827;font-size:16px;line-height:1.75;">Hi ${name},</p>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.8;">Thank you for contacting Digitales. We have received your request and our team will review your message carefully.</p>
      <p style="margin:0 0 22px;color:#334155;font-size:15px;line-height:1.8;">You can expect a response from us within <strong style="color:#111827;">24-48 hours</strong>. If your request is urgent, you can reply directly to this email and we will do our best to prioritize it.</p>
      <div style="padding:20px;background:#ffffff;border:1px solid #e5e7eb;border-left:4px solid #f0b428;border-radius:12px;">
        <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.6;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Your Request</p>
        <p style="margin:0 0 12px;color:#111827;font-size:15px;line-height:1.7;"><strong>Service:</strong> ${service}</p>
        <div style="margin:0;color:#334155;font-size:15px;line-height:1.75;">${message}</div>
      </div>
      <p style="margin:22px 0 0;color:#334155;font-size:15px;line-height:1.8;">Warm regards,<br /><strong style="color:#111827;">The Digitales Team</strong></p>
    `,
  });
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
      await adminDb.collection("contacts").add({
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
        html: renderContactEmail(validated.data),
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
