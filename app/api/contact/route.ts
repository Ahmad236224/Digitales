import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma, validateDatabaseUrl } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
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

function renderContactEmail(data: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const service = escapeHtml(data.service);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  return `
    <div style="margin:0;padding:32px;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#18202f;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e8ef;border-radius:12px;overflow:hidden;">
        <div style="padding:28px 32px;background:#111827;color:#ffffff;">
          <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#f0b428;">Digitales Lead Alert</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;">New Contact Form Submission</h1>
        </div>
        <div style="padding:28px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;width:150px;color:#667085;font-size:14px;">Name</td>
              <td style="padding:12px 0;font-size:15px;font-weight:700;color:#101828;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#667085;font-size:14px;">Email</td>
              <td style="padding:12px 0;font-size:15px;"><a href="mailto:${email}" style="color:#b98500;text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#667085;font-size:14px;">Selected Service</td>
              <td style="padding:12px 0;font-size:15px;color:#101828;">${service}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #eaecf0;">
            <p style="margin:0 0 10px;color:#667085;font-size:14px;">Message</p>
            <div style="font-size:15px;line-height:1.7;color:#101828;">${message}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    validateDatabaseUrl();

    const body = await req.json().catch(() => ({}));
    const validated = validateContactPayload(body);

    if ("error" in validated) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 }
      );
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
      const contact = await prisma.contact.create({
        data: validated.data,
      });

      const emailResult = await resend.emails.send({
        from: "Digitales Alerts <info@digitales.pk>",
        to: "ahmad@digitales.pk",
        subject: "🚨 New Business Lead: Contact Form Submission!",
        html: renderContactEmail(validated.data),
      });

      if (emailResult.error) {
        throw emailResult.error;
      }

      return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
    } catch (error) {
      console.error("CONTACT_PIPELINE_ERROR:", error);
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
