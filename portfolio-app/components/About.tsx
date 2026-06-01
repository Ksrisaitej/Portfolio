"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { AccentHeading, Accent } from "./AccentHeading";
import Image from "next/image";

const chips = [
  { value: "15+", label: "Projects" },
  { value: "7+", label: "Repositories" },
  { value: "2nd yr", label: "IIT KGP" },
];

export function About() {
  return (
    <section id="about" className="relative">
      <div className="section">
        <SectionLabel number="04">Profile</SectionLabel>
        <AccentHeading>
          About <Accent>me</Accent>
        </AccentHeading>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Bio — Left (3 cols) */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base text-text-secondary leading-relaxed max-w-[640px]">
              I am a Physics undergraduate at{" "}
              <span className="text-text-primary font-medium">
                Indian Institute of Technology Kharagpur
              </span>{" "}
              with a strong interest in Artificial Intelligence, Machine
              Learning, and Robotics. My journey into AI began with
              self-learning Python and has grown into a passion for building
              intelligent systems, implementing research papers from scratch,
              and exploring the intersection of machine learning, simulation,
              and real-world applications.
            </p>
            <p className="text-base text-text-secondary leading-relaxed max-w-[640px]">
              I have completed industry-recognized specializations in{" "}
              <span className="text-text-primary font-medium">
                Machine Learning
              </span>{" "}
              and{" "}
              <span className="text-text-primary font-medium">PyTorch</span>{" "}
              and continuously work on projects that strengthen my understanding
              of{" "}
              <span className="accent-italic" style={{ fontStyle: "normal" }}>
                deep learning
              </span>
              ,{" "}
              <span className="accent-italic" style={{ fontStyle: "normal" }}>
                reinforcement learning
              </span>
              ,{" "}
              <span className="accent-italic" style={{ fontStyle: "normal" }}>
                computer vision
              </span>
              , and{" "}
              <span className="accent-italic" style={{ fontStyle: "normal" }}>
                generative AI
              </span>
              . I enjoy translating theoretical concepts into practical
              solutions and am particularly interested in frontier AI research
              and autonomous systems.
            </p>
            <p className="text-base text-text-secondary leading-relaxed max-w-[640px]">
              My long-term goal is to become a{" "}
              <span className="text-text-primary font-medium">
                Machine Learning Engineer
              </span>{" "}
              working on cutting-edge AI technologies and contribute to
              impactful products and research at a global scale. Currently, I am
              focused on advancing my skills in deep learning, reinforcement
              learning, robotics, and large-scale AI systems while actively
              participating in open-source and research-oriented projects.
            </p>
          </motion.div>

          {/* Right Column — Avatar + Stat Chips (2 cols) */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Abstract Avatar */}
            <motion.div
              className="about-avatar mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src="/avatar.png"
                alt="Abstract geometric avatar"
                width={280}
                height={280}
                quality={90}
                priority={false}
              />
            </motion.div>

            {/* Stat Chips */}
            {chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                className="rounded-xl p-5 border flex items-center gap-5"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{
                  borderColor: "rgba(200, 245, 66, 0.15)",
                  transition: { duration: 0.2 },
                }}
              >
                <span className="text-3xl font-light text-accent font-mono">
                  {chip.value}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-text-tertiary">
                  {chip.label}
                </span>
              </motion.div>
            ))}

            {/* Quick links */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://github.com/Ksrisaitej"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-ghost text-[12px] py-2 px-4"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sri-sai-tej-434813370/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-ghost text-[12px] py-2 px-4"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
