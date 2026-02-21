import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = process.env.CONTACT_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!email || typeof email !== "string" || !email.trim()) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return Response.json({ error: "Email service not configured" }, { status: 500 });
    }

    const ownerEmail = OWNER_EMAIL;
    if (!ownerEmail) {
      console.error("CONTACT_EMAIL is not configured");
      return Response.json({ error: "Recipient email not configured" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "ZHOU WEI Website <onboarding@resend.dev>",
      to: [ownerEmail],
      replyTo: [email.trim()],
      subject: `[Website Message] ${name ? `From ${name} - ` : ""}${email}`,
      text: `${name ? `Name: ${name}\n` : ""}Email: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Send email error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to send" },
      { status: 500 }
    );
  }
}
