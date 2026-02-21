"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Journey", href: "/#timeline" },
    { name: "Insights", href: "/#insights" },
    { name: "Contact", href: "/#footer" },
    { name: "Book", href: "/booking" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b border-newsprint-ink ${
        isScrolled ? "bg-newsprint-bg" : "bg-newsprint-bg/95"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between min-h-[60px]">
        <a
          href="#hero"
          className="font-serif text-lg font-bold tracking-tight text-newsprint-ink uppercase"
        >
          ZHOU WEI
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-sans font-medium uppercase tracking-widest text-newsprint-ink hover:text-newsprint-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden border border-newsprint-ink h-11 w-11 flex items-center justify-center hover:bg-newsprint-ink hover:text-newsprint-bg transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 border-b border-newsprint-ink bg-newsprint-bg md:hidden"
          >
            <div className="flex flex-col border-t border-newsprint-muted">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-4 text-sm font-sans font-medium uppercase tracking-widest text-newsprint-ink border-b border-newsprint-muted hover:bg-newsprint-muted/50 transition-colors duration-200 min-h-[44px] flex items-center"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
