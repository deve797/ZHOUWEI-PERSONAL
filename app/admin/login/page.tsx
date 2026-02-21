"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "登录失败，请重试");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6]">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-serif text-[#2D2D2D] tracking-wide">
            管理后台
          </h1>
          <p className="mt-2 text-sm text-[#2D2D2D]/50">请登录以继续</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm border border-[#2D2D2D]/5 p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-[#2D2D2D]/60 uppercase tracking-widest"
            >
              用户名
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-[#2D2D2D]/10 bg-[#F9F8F6] px-4 py-3 text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/30 outline-none focus:border-[#A3B18A] transition-colors"
              placeholder="请输入用户名"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#2D2D2D]/60 uppercase tracking-widest"
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#2D2D2D]/10 bg-[#F9F8F6] px-4 py-3 text-sm text-[#2D2D2D] placeholder-[#2D2D2D]/30 outline-none focus:border-[#A3B18A] transition-colors"
              placeholder="请输入密码"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#A3B18A] py-3 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
}
