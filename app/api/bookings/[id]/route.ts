import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const VALID_STATUSES = ["待确认", "已确认", "已完成"] as const;
type BookingStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = (await request.json()) as { status: BookingStatus };

    if (!VALID_STATUSES.includes(status)) {
      return Response.json({ error: "Invalid status value" }, { status: 400 });
    }

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Bookings PATCH error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
