"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BookingStatus = "待确认" | "已确认" | "已完成";

type Booking = {
  id: string;
  booking_date: string;
  time_slot: string;
  name: string;
  wechat: string;
  email: string;
  notes: string | null;
  status: BookingStatus;
};

const STATUS_OPTIONS: BookingStatus[] = ["待确认", "已确认", "已完成"];

const STATUS_STYLES: Record<BookingStatus, string> = {
  待确认: "bg-amber-50 text-amber-600 border-amber-200",
  已确认: "bg-[#A3B18A]/10 text-[#5a7a4a] border-[#A3B18A]/30",
  已完成: "bg-[#2D2D2D]/5 text-[#2D2D2D]/50 border-[#2D2D2D]/10",
};

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("获取预约数据失败");
      const { data } = await res.json();
      setBookings(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("状态更新失败");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "状态更新失败，请重试");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => ({
      ...acc,
      [s]: bookings.filter((b) => b.status === s).length,
    }),
    {} as Record<BookingStatus, number>
  );

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <header className="border-b border-[#2D2D2D]/5 bg-white px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif text-[#2D2D2D] tracking-wide">
            预约管理
          </h1>
          <p className="text-xs text-[#2D2D2D]/40 mt-0.5">
            共 {bookings.length} 条预约
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-[#2D2D2D]/40 hover:text-[#2D2D2D]/70 transition-colors cursor-pointer"
        >
          退出登录
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              className="bg-white rounded-2xl border border-[#2D2D2D]/5 px-5 py-4"
            >
              <p className="text-xs text-[#2D2D2D]/40 mb-1">{status}</p>
              <p className="text-2xl font-serif text-[#2D2D2D]">
                {counts[status] ?? 0}
              </p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20 text-[#2D2D2D]/40 text-sm">
            加载中...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400 text-sm">{error}</div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-20 text-[#2D2D2D]/40 text-sm">
            暂无预约记录
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#2D2D2D]/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2D2D2D]/5">
                    {[
                      "日期",
                      "时间段",
                      "姓名",
                      "微信号",
                      "邮箱",
                      "备注",
                      "状态",
                    ].map((header) => (
                      <th
                        key={header}
                        className="text-left text-xs font-medium text-[#2D2D2D]/40 uppercase tracking-widest px-5 py-4"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2D2D]/5">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-[#F9F8F6] transition-colors"
                    >
                      <td className="px-5 py-4 text-[#2D2D2D] whitespace-nowrap">
                        {booking.booking_date}
                      </td>
                      <td className="px-5 py-4 text-[#2D2D2D] whitespace-nowrap">
                        {booking.time_slot}
                      </td>
                      <td className="px-5 py-4 text-[#2D2D2D] font-medium">
                        {booking.name}
                      </td>
                      <td className="px-5 py-4 text-[#2D2D2D]/70">
                        {booking.wechat}
                      </td>
                      <td className="px-5 py-4 text-[#2D2D2D]/70">
                        {booking.email}
                      </td>
                      <td className="px-5 py-4 text-[#2D2D2D]/50 max-w-[180px] truncate">
                        {booking.notes ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="relative">
                          <select
                            value={booking.status}
                            disabled={updatingId === booking.id}
                            onChange={(e) =>
                              handleStatusChange(
                                booking.id,
                                e.target.value as BookingStatus
                              )
                            }
                            className={`appearance-none rounded-full border px-3 py-1 text-xs font-medium pr-7 cursor-pointer transition-opacity disabled:opacity-50 outline-none ${STATUS_STYLES[booking.status]}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-50">
                            ▾
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
