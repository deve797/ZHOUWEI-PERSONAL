"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const MAX_WISH_LENGTH = 200;

export const WishBlessing = () => {
  const [wish, setWish] = useState("");
  const [blessing, setBlessing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedWish = wish.trim();
    if (!trimmedWish || isLoading) return;

    setIsLoading(true);
    setBlessing(null);
    setError(null);

    try {
      const response = await fetch("/api/wish-blessing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish: trimmedWish }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unknown error");
      }

      setBlessing(data.blessing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate blessing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setWish("");
    setBlessing(null);
    setError(null);
    textareaRef.current?.focus();
  };

  return (
    <section
      id="wish"
      className="py-16 px-6 border-t-4 border-newsprint-ink bg-newsprint-bg"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Wish Dispatch
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif font-black text-newsprint-ink">
            Tell the Universe Your Dream
          </h2>
          <p className="font-body text-newsprint-ink/70 mt-2">
            写下你的心愿，宇宙会为你送上一份专属祝福。
          </p>
        </div>

        <div className="border-t border-newsprint-ink/20 pt-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={wish}
                onChange={(e) => setWish(e.target.value.slice(0, MAX_WISH_LENGTH))}
                placeholder="在这里写下你的心愿……"
                rows={3}
                disabled={isLoading}
                className="w-full border border-newsprint-ink bg-newsprint-bg text-newsprint-ink font-body text-base px-4 py-3 resize-none placeholder:text-newsprint-ink/30 focus:outline-none focus:ring-1 focus:ring-newsprint-ink disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <span className="absolute bottom-3 right-3 text-xs font-mono text-newsprint-ink/30 select-none">
                {wish.length}/{MAX_WISH_LENGTH}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!wish.trim() || isLoading}
                className="flex items-center gap-2 bg-newsprint-ink text-newsprint-bg font-mono text-sm uppercase tracking-widest px-6 py-3 border border-newsprint-ink hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border border-current border-t-transparent animate-spin" />
                    <span>Printing...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} strokeWidth={1.5} />
                    <span>Send Wish</span>
                  </>
                )}
              </button>

              {(blessing || error) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-mono text-xs uppercase tracking-widest text-newsprint-ink/50 hover:text-newsprint-ink underline underline-offset-4 transition-colors"
                >
                  New Wish
                </button>
              )}
            </div>
          </form>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-2xl border border-newsprint-ink/20 bg-newsprint-muted px-6 py-5"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-newsprint-ink/40 mb-3">
                  Press in progress...
                </p>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block w-1.5 h-1.5 bg-newsprint-ink/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {blessing && !isLoading && (
              <motion.div
                key="blessing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-8 max-w-2xl border border-newsprint-ink bg-newsprint-muted px-6 py-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} strokeWidth={1.5} className="text-newsprint-accent" />
                  <p className="text-xs font-mono uppercase tracking-widest text-newsprint-accent">
                    Your Blessing
                  </p>
                </div>
                <p className="font-serif text-lg leading-relaxed text-newsprint-ink">
                  {blessing}
                </p>
                <div className="mt-5 border-t border-newsprint-ink/15 pt-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-newsprint-ink/30">
                    Dispatched by the Universe — {new Date().toLocaleDateString("zh-CN")}
                  </p>
                </div>
              </motion.div>
            )}

            {error && !isLoading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-2xl border border-newsprint-accent/40 bg-newsprint-bg px-6 py-4"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-newsprint-accent mb-1">
                  Transmission Failed
                </p>
                <p className="font-body text-sm text-newsprint-ink/60">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
