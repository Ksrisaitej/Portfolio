"use client";

import { motion } from "framer-motion";
import { SplineScene } from "./SplineScene";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stats = [
  { value: "Age 13", label: "Coding since" },
  { value: "2nd yr", label: "IIT KGP Physics" },
  { value: "RTX 4050", label: "Local LLM stack" },
];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen">
      <SplineScene
        sceneUrl="https://prod.spline.design/k2iV3JQWJzFuEeW7/scene.splinecode"
        className="absolute inset-0 z-0"
        mobileBreakpoint={0}
      >
        <div className="relative z-10 min-h-screen flex flex-col justify-center noise-overlay">
          {/* Main Content Overlay */}
          <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col items-center text-center lg:items-start lg:text-left pt-24 lg:pt-0">
            <motion.div
              className="flex flex-col items-center lg:items-start max-w-[720px]"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {/* Tag line */}
              <motion.p className="section-label mb-6" variants={fadeUp}>
                [01] · Physics · AI/ML · IIT KGP
              </motion.p>

              {/* Headline */}
              <motion.h1 className="mb-6 drop-shadow-2xl" variants={fadeUp}>
                Building <em className="accent-italic">intelligent</em> systems
                from <em className="accent-italic">scratch.</em>
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                className="text-sm lg:text-base text-text-secondary max-w-[540px] mb-10 leading-relaxed drop-shadow-md"
                variants={fadeUp}
              >
                Physics undergraduate passionate about building intelligent systems through machine learning, deep learning, and AI research.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 pointer-events-auto" variants={fadeUp}>
                <a href="#projects" className="btn-pill btn-pill-primary">
                  View Projects <span className="btn-arrow">→</span>
                </a>
                <a
                  href="https://drive.google.com/file/d/1DJX1O1jxw2aslxUfhbpqcUD3K_4fxV3R/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-ghost bg-background/50 backdrop-blur-sm"
                >
                  Download Resume
                </a>
              </motion.div>

              {/* Scroll hint */}
              <motion.a
                href="#projects"
                className="text-[13px] text-text-tertiary no-underline mt-4 scroll-hint pointer-events-auto"
                variants={fadeUp}
              >
                <span className="scroll-hint-arrow">↓</span> Scroll
              </motion.a>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 border-t bg-background/30 backdrop-blur-md pointer-events-auto"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap justify-center lg:justify-start gap-y-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex-1 min-w-[140px] flex items-baseline justify-center lg:justify-start gap-3"
                  style={{
                    borderLeft:
                      i > 0 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
                    paddingLeft: i > 0 ? "24px" : "0",
                  }}
                >
                  <span className="text-base font-medium text-text-primary font-mono drop-shadow-md">
                    {stat.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-text-tertiary drop-shadow-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SplineScene>
    </section>
  );
}
