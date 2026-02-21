"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    era: "ERA 1 (Pre-2019)",
    title: "Finance Professional",
    description: "Focused on rationality and logic. Finding balance in the complex world of numbers, sharpening analytical thinking and disciplined decision-making.",
    focus: "Rationality & Logic",
  },
  {
    era: "ERA 2 (2019-2021)",
    title: "Yoga Instructor",
    description: "Focused on awareness and inner growth. Shifting from external chaos to the breath within, experiencing life's flow and tension on the mat.",
    focus: "Awareness & Inner Growth",
  },
  {
    era: "ERA 3 (2021-Present)",
    title: "Fruit Retail & Supply Chain Founder",
    description: "Focused on building from 0 to 1 with resilience. Rooted in real-world business, navigating supply chain complexity with a minimalist mindset.",
    focus: "Building from 0 to 1 with Resilience",
  },
];

export const Timeline = () => {
  return (
    <section id="timeline" className="py-16 px-6 max-w-screen-xl mx-auto border-t-4 border-newsprint-ink">
      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Fluid Journey</p>
        <h2 className="text-4xl lg:text-5xl font-serif font-black text-newsprint-ink mb-4">
          Cross-Domain Exploration
        </h2>
        <p className="font-body text-newsprint-ink/80 max-w-lg text-justify">
          From 0 to 1, each phase brings me closer to alignment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 border border-newsprint-ink">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-6 lg:p-8 border-b border-newsprint-ink lg:border-b-0 ${
              index < timelineData.length - 1 ? "lg:border-r border-newsprint-ink" : ""
            } hover:bg-newsprint-muted/50 transition-colors duration-200`}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">
              {item.era}
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4 text-newsprint-ink">
              {item.title}
            </h3>
            <p className="font-body text-newsprint-ink/90 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="text-sm font-mono italic text-newsprint-accent">{item.focus}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
