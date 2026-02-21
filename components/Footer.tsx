"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Mail, Instagram, X } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send");
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setStatus("idle");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer
      id="footer"
      className="py-16 px-6 border-t-4 border-newsprint-ink bg-newsprint-ink text-newsprint-bg"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-black text-newsprint-bg mb-4">
            Why I do what I do.
          </h2>
          <p className="text-newsprint-bg/80 mb-12 font-body text-lg">
            From the precision of accounting to the flow of yoga, and now the grit of the fresh produce industry—my journey is driven by a single force: Curiosity.
            <br /><br />
            I don&apos;t just run a business; I practice life through it. Managing 42 stores and a full supply chain is my way of testing how simplicity can thrive in a complex world. I believe in business with warmth, operations with logic, and a life lived with open eyes.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
            <a
              href="#"
              className="border border-newsprint-bg h-12 w-12 flex items-center justify-center hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="border border-newsprint-bg h-12 w-12 flex items-center justify-center hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter size={20} strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="border border-newsprint-bg h-12 w-12 flex items-center justify-center hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={20} strokeWidth={1.5} />
            </button>
            <a
              href="#"
              className="border border-newsprint-bg h-12 w-12 flex items-center justify-center hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              ZHOU WEI © {currentYear}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              EDITION VOL 1.0 | PRINTED IN NYC
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-newsprint-ink/60"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-newsprint-bg text-newsprint-ink border-2 border-newsprint-ink p-6 shadow-[6px_6px_0_0_#0D0D0D]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 hover:bg-newsprint-muted transition-colors"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
              <h3 className="text-xl font-serif font-bold mb-4">Contact Me</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
                    Name (optional)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-newsprint-ink bg-transparent focus:outline-none focus:ring-2 focus:ring-newsprint-ink"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                    Email <span className="text-newsprint-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-newsprint-ink bg-transparent focus:outline-none focus:ring-2 focus:ring-newsprint-ink"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                    Message <span className="text-newsprint-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-newsprint-ink bg-transparent focus:outline-none focus:ring-2 focus:ring-newsprint-ink resize-none"
                  />
                </div>
                {status === "success" && (
                  <p className="text-sm text-green-600">Sent. I&apos;ll reply soon.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-newsprint-accent">Failed to send. Please try again later.</p>
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border border-newsprint-ink hover:bg-newsprint-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex-1 px-4 py-2 bg-newsprint-ink text-newsprint-bg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
