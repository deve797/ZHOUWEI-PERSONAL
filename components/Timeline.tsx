"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    era: "ERA 1 (Pre-2019)",
    title: "Foundation | The Logic of Numbers",
    description: "Starting as a dedicated accountant, I built my foundation in rigorous logic and cost efficiency. This period shaped my ability to see the underlying data behind every complex phenomenon.",
    focus: "Logical Thinking & Cost Sensitivity",
  },
  {
    era: "ERA 2 (2019-2021)",
    title: "Transition | Inner Stability",
    description: "As a full-time yoga instructor, I explored the balance between breath and movement. This practice taught me how to remain calm and focused amidst chaos—a quality I now bring to every business decision.",
    focus: "Mindfulness & Emotional Anchoring",
  },
  {
    era: "ERA 3 (2021-Present)",
    title: "Present | Scaling Simplicity",
    description: "Currently leading a fruit retail network of 42 chain stores and an integrated supply chain system. Driven by curiosity, I strive to simplify the complexities of the fresh produce industry through streamlined operations and guidance.",
    focus: "Simplifying Complexity at Scale",
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
