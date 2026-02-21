"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ChevronLeft } from "lucide-react";

type FormData = {
  date: string;
  timeSlot: string;
  name: string;
  wechat: string;
  email: string;
  notes: string;
};

type Step = "form" | "confirm";

const TIME_SLOTS = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];

const INITIAL_FORM: FormData = {
  date: "",
  timeSlot: "",
  name: "",
  wechat: "",
  email: "",
  notes: "",
};

const FIELD_LABELS: Record<keyof FormData, string> = {
  date: "预约日期",
  timeSlot: "时间段",
  name: "姓名",
  wechat: "微信号",
  email: "邮箱",
  notes: "备注",
};

export default function BookingPage() {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [slotError, setSlotError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.date) newErrors.date = "请选择预约日期";
    if (!formData.timeSlot) newErrors.timeSlot = "请选择时间段";
    if (!formData.name.trim()) newErrors.name = "请输入姓名";
    if (!formData.wechat.trim()) newErrors.wechat = "请输入微信号";
    if (!formData.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep("confirm");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSlotError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          timeSlot: formData.timeSlot,
          name: formData.name,
          wechat: formData.wechat,
          email: formData.email,
          notes: formData.notes,
        }),
      });

      if (res.status === 409) {
        setSlotError("该时间段已被预约，请返回修改选择其他时间段");
        return;
      }

      if (!res.ok) {
        setSlotError("提交失败，请稍后再试");
        return;
      }

      setShowSuccess(true);
    } catch {
      setSlotError("网络错误，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData(INITIAL_FORM);
    setStep("form");
  };

  const baseInputClass =
    "w-full px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-newsprint-ink font-serif text-newsprint-ink";

  const inputClass = (fieldKey: keyof FormData) =>
    `${baseInputClass} border ${errors[fieldKey] ? "border-newsprint-accent" : "border-newsprint-ink"}`;

  const confirmRows: { label: string; value: string }[] = [
    { label: FIELD_LABELS.date, value: formData.date },
    { label: FIELD_LABELS.timeSlot, value: formData.timeSlot },
    { label: FIELD_LABELS.name, value: formData.name },
    { label: FIELD_LABELS.wechat, value: formData.wechat },
    { label: FIELD_LABELS.email, value: formData.email },
    { label: FIELD_LABELS.notes, value: formData.notes || "—" },
  ];

  return (
    <main className="min-h-screen bg-newsprint-bg">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10 border-b-4 border-newsprint-ink pb-6"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              预约服务
            </p>
            <h1 className="text-4xl font-serif font-black text-newsprint-ink">
              {step === "form" ? "填写预约信息" : "确认预约信息"}
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* 预约日期 */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    预约日期 <span className="text-newsprint-accent">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className={inputClass("date")}
                  />
                  {errors.date && (
                    <p className="text-xs text-newsprint-accent mt-1">{errors.date}</p>
                  )}
                </div>

                {/* 时间段 */}
                <div>
                  <label
                    htmlFor="booking-timeslot"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    时间段 <span className="text-newsprint-accent">*</span>
                  </label>
                  <select
                    id="booking-timeslot"
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, timeSlot: e.target.value }))
                    }
                    className={inputClass("timeSlot")}
                  >
                    <option value="">请选择时间段</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="text-xs text-newsprint-accent mt-1">{errors.timeSlot}</p>
                  )}
                </div>

                {/* 姓名 */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    姓名 <span className="text-newsprint-accent">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="请输入您的姓名"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-newsprint-accent mt-1">{errors.name}</p>
                  )}
                </div>

                {/* 微信号 */}
                <div>
                  <label
                    htmlFor="booking-wechat"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    微信号 <span className="text-newsprint-accent">*</span>
                  </label>
                  <input
                    id="booking-wechat"
                    type="text"
                    placeholder="请输入您的微信号"
                    value={formData.wechat}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, wechat: e.target.value }))
                    }
                    className={inputClass("wechat")}
                  />
                  {errors.wechat && (
                    <p className="text-xs text-newsprint-accent mt-1">{errors.wechat}</p>
                  )}
                </div>

                {/* 邮箱 */}
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    邮箱 <span className="text-newsprint-accent">*</span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-newsprint-accent mt-1">{errors.email}</p>
                  )}
                </div>

                {/* 备注 */}
                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-mono uppercase tracking-widest text-newsprint-ink/70 mb-1.5"
                  >
                    备注
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    placeholder="如有其他说明，请填写于此（选填）"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className={`${baseInputClass} border border-newsprint-ink resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-newsprint-ink text-newsprint-bg font-mono text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  提交预约
                </button>
              </motion.form>
            )}

            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  请核对以下信息，确认无误后点击「确认预约」
                </p>

                <div className="border-2 border-newsprint-ink divide-y divide-newsprint-muted">
                  {confirmRows.map(({ label, value }) => (
                    <div key={label} className="flex px-4 py-3.5 gap-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 w-16 shrink-0 pt-0.5">
                        {label}
                      </span>
                      <span className="font-serif text-newsprint-ink break-all">{value}</span>
                    </div>
                  ))}
                </div>

                {slotError && (
                  <p className="text-sm text-newsprint-accent border border-newsprint-accent px-4 py-3">
                    {slotError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setStep("form"); setSlotError(null); }}
                    className="flex-1 min-h-[48px] border border-newsprint-ink font-mono text-sm uppercase tracking-widest hover:bg-newsprint-muted transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                    返回修改
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleConfirm}
                    className="flex-1 min-h-[48px] bg-newsprint-ink text-newsprint-bg font-mono text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {isSubmitting ? "提交中..." : "确认预约"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 成功弹窗 */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-newsprint-ink/60"
            onClick={handleCloseSuccess}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm bg-newsprint-bg border-2 border-newsprint-ink p-8 shadow-[6px_6px_0_0_#0D0D0D] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="absolute top-4 right-4 p-1 hover:bg-newsprint-muted transition-colors"
                aria-label="关闭"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <CheckCircle
                size={44}
                strokeWidth={1.5}
                className="mx-auto mb-4 text-newsprint-ink"
              />
              <h3 className="text-2xl font-serif font-bold text-newsprint-ink mb-3">
                预约成功
              </h3>
              <p className="text-newsprint-ink/70 font-body text-sm mb-6 leading-relaxed">
                您的预约请求已收到，我会尽快通过您留下的联系方式与您取得联系。
              </p>
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="w-full min-h-[44px] bg-newsprint-ink text-newsprint-bg font-mono text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
