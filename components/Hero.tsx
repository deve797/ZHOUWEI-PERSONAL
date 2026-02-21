"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center newsprint-texture pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
          VOL. 1 | {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-black text-newsprint-ink mb-8 leading-[0.9] tracking-tighter">
          ZHOU WEI
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-newsprint-ink mb-8">
          Driven by Curiosity, Practicing Life.
        </h2>
        <p className="text-base sm:text-lg font-body text-newsprint-ink leading-relaxed max-w-2xl mx-auto mb-12 text-justify">
          Simplifying complex business through a minimalist lens.
          <br />
          A journey from professional logic to mindful living.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#timeline"
            className="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-newsprint-ink text-newsprint-bg border border-newsprint-ink font-sans font-medium uppercase tracking-widest hover:bg-newsprint-bg hover:text-newsprint-ink transition-all duration-200 flex items-center justify-center"
          >
            Explore Journey
          </a>
          <a
            href="#insights"
            className="w-full sm:w-auto min-h-[44px] px-8 py-3 border border-newsprint-ink bg-transparent font-sans font-medium uppercase tracking-widest hover:bg-newsprint-ink hover:text-newsprint-bg transition-all duration-200 flex items-center justify-center"
          >
            Recent Insights
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
