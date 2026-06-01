"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          backgroundColor: scrolled
            ? "rgba(10, 10, 11, 0.85)"
            : "transparent",
          borderBottom: scrolled
            ? "0.5px solid rgba(255,255,255,0.08)"
            : "none",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-[30px] font-semibold text-text-primary tracking-tight hover:opacity-70 transition-opacity duration-150"
          >
            Kadimi Sri Sai Tej
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-normal text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-pill btn-pill-primary text-[13px] py-2 px-5">
              Contact <span className="btn-arrow">→</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-text-primary origin-center"
              animate={
                mobileOpen
                  ? { rotate: 45, y: 6.5 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-text-primary"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-text-primary origin-center"
              animate={
                mobileOpen
                  ? { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl font-normal text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-pill btn-pill-primary mt-4"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.24, duration: 0.4 }}
            >
              Contact <span className="btn-arrow">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
