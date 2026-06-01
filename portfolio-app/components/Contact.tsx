"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { AccentHeading, Accent } from "./AccentHeading";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ksrisaitej",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sri-sai-tej-434813370/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "srisaitej999@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative">
      <div className="section">
        <SectionLabel number="06">Get in Touch</SectionLabel>
        <AccentHeading>
          Let&apos;s <Accent>connect</Accent>
        </AccentHeading>

        <motion.div
          className="mt-16 max-w-[640px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Open to internships and research roles in ML/AI. If you&apos;re
            building something interesting or hiring — I&apos;d love to
            hear from you.
          </p>

          {/* Email */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              id="copy-email-btn"
              onClick={handleCopy}
              className="btn-pill btn-pill-primary"
            >
              {copied ? (
                "Copied!"
              ) : (
                <>
                  {email} <span className="btn-arrow">⎘</span>
                </>
              )}
            </button>
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary border rounded-full px-3 py-1"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              Reply within 24h
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {s.icon}
                <span className="text-[13px]">{s.label}</span>
              </a>
            ))}
          </div>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-ghost"
          >
            Download Resume <span className="btn-arrow">↓</span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-[12px] text-text-tertiary">
            © 2026 Kadimi Sri Sai Tej. Built with Next.js & Vercel.
          </span>
          <span className="text-[12px] text-text-tertiary font-mono">
            IIT Kharagpur · India
          </span>
        </motion.div>
      </div>
    </section>
  );
}
