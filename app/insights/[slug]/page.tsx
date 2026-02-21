"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getInsightBySlug, insights } from "@/lib/insights-data";

export default function InsightPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const insight = slug ? getInsightBySlug(slug) : undefined;

  if (!insight) {
    notFound();
  }

  const formattedDate = new Date(insight.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-newsprint-bg">
      <div className="max-w-screen-md mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/#insights"
            className="inline-flex items-center gap-2 text-newsprint-ink/60 hover:text-newsprint-ink text-xs font-mono uppercase tracking-widest transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              {formattedDate}
            </span>
            <span className="px-2 py-1 bg-newsprint-ink text-newsprint-bg text-[10px] font-mono font-bold uppercase tracking-widest">
              {insight.category}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif font-black text-newsprint-ink leading-tight mb-6">
            {insight.title}
          </h1>

          <p className="font-body text-newsprint-ink/60 text-base italic leading-relaxed mb-12 border-l-2 border-newsprint-accent pl-4">
            {insight.excerpt}
          </p>

          <div className="border-t border-newsprint-ink/20 pt-12 space-y-6">
            {insight.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="font-body text-newsprint-ink/80 text-base leading-relaxed text-justify"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="border-t border-newsprint-ink/20 mt-16 pt-10">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
              More Insights
            </p>
            <div className="flex flex-col gap-4">
              {insights
                .filter((item) => item.slug !== insight.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/insights/${item.slug}`}
                    className="group flex items-start justify-between gap-4 p-4 border border-newsprint-ink/20 hover:border-newsprint-ink bg-newsprint-bg hover:bg-newsprint-muted/30 transition-all duration-200"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                        {item.category}
                      </span>
                      <span className="font-serif font-bold text-newsprint-ink group-hover:text-newsprint-accent transition-colors duration-200 text-sm">
                        {item.title}
                      </span>
                    </div>
                    <ArrowLeft
                      size={14}
                      strokeWidth={1.5}
                      className="rotate-180 shrink-0 mt-1 text-newsprint-ink/40 group-hover:text-newsprint-accent transition-colors duration-200"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
