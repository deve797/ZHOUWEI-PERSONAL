"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const mockInsights = [
  {
    date: "2024-02-15",
    title: "From Yoga to Supply Chain: Finding Rhythm",
    category: "Business",
    excerpt: "The essence of supply chain is flow—and the wisdom of flow was learned in the breath. How do we find spaces to breathe among complex nodes?",
  },
  {
    date: "2024-01-20",
    title: "Minimalism & Real Business: The Art of Letting Go",
    category: "Growth",
    excerpt: "Unnecessary SKUs are like unnecessary emotions in life. Reduce the noise to reveal what truly matters.",
  },
  {
    date: "2023-12-05",
    title: "The 0 to 1 Challenge: Gentle Persistence",
    category: "Entrepreneurship",
    excerpt: "Resilience doesn't mean tension. In real retail, I've learned how to meet the toughest challenges with a gentle stance.",
  },
];

export const Insights = () => {
  return (
    <section id="insights" className="py-16 px-6 max-w-screen-xl mx-auto border-t-4 border-newsprint-ink">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Insights</p>
          <h2 className="text-4xl lg:text-5xl font-serif font-black text-newsprint-ink mb-2">
            Thoughts & Notes
          </h2>
          <p className="font-body text-newsprint-ink/80">
            On business, growth, and breath.
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 text-newsprint-ink underline-offset-4 decoration-2 decoration-newsprint-accent hover:underline font-sans text-sm font-medium min-h-[44px]"
        >
          View All <ArrowRight size={16} strokeWidth={1.5} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-newsprint-ink">
        {mockInsights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group p-6 border-r border-b border-newsprint-ink bg-newsprint-bg hover:bg-newsprint-muted/30 hard-shadow-hover transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                {item.date}
              </span>
              <span className="px-2 py-1 bg-newsprint-ink text-newsprint-bg text-[10px] font-mono font-bold uppercase tracking-widest">
                {item.category}
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-newsprint-ink mb-4 group-hover:text-newsprint-accent transition-colors duration-200">
              {item.title}
            </h3>
            <p className="font-body text-newsprint-ink/80 text-sm leading-relaxed mb-6 text-justify">
              {item.excerpt}
            </p>
            <button className="text-newsprint-ink text-xs font-mono font-bold uppercase tracking-widest border-b-2 border-newsprint-ink pb-1 w-fit hover:text-newsprint-accent hover:border-newsprint-accent transition-all duration-200">
              Read More
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
