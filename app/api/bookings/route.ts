import { NextRequest } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: false })
      .order("time_slot", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    console.error("Bookings GET error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 500 }
    );
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingBody = {
  date: string;
  timeSlot: string;
  name: string;
  wechat: string;
  email: string;
  notes?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingBody;
    const { date, timeSlot, name, wechat, email, notes } = body;

    if (!date || !timeSlot || !name || !wechat || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabase.from("bookings").insert({
      booking_date: date,
      time_slot: timeSlot,
      name,
      wechat,
      email,
      notes: notes || null,
    });

    if (error) {
      // Postgres unique violation: same booking_date + time_slot already exists
      if (error.code === "23505") {
        return Response.json({ error: "slot_taken" }, { status: 409 });
      }
      console.error("Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Send notification email to owner — failure does not block the success response
    const ownerEmail = process.env.CONTACT_EMAIL;
    if (ownerEmail && process.env.RESEND_API_KEY) {
      const emailText = [
        `您好，以下是一条新的预约请求：`,
        ``,
        `姓名：${name}`,
        `预约日期：${date}`,
        `时间段：${timeSlot}`,
        `微信号：${wechat}`,
        `邮箱：${email}`,
        `备注：${notes || "无"}`,
      ].join("\n");

      const { error: emailError } = await resend.emails.send({
        from: "ZHOU WEI Website <onboarding@resend.dev>",
        to: [ownerEmail],
        replyTo: [email],
        subject: `[新预约] ${name} — ${date} ${timeSlot}`,
        text: emailText,
      });

      if (emailError) {
        console.error("Resend notification error:", emailError);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Bookings API error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
