"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { AccentHeading, Accent } from "./AccentHeading";
import Image from "next/image";

interface Project {
  num: string;
  name: string;
  tags: string[];
  year: string;
  github?: string;
  demo?: string;
  color: string;
  image: string;
}

const projects: Project[] = [
  {
    num: "01",
    name: "Oxford 102 Flower Classification",
    tags: ["CNN", "Transfer Learning", "PyTorch", "ResNet"],
    year: "2025",
    color: "#C8F542",
    image: "/Portfolio/projects/flower-classification.png",
  },
  {
    num: "02",
    name: "Siamese Network Signature Approval",
    tags: ["Siamese Network", "Contrastive Loss", "One-Shot Learning"],
    year: "2025",
    color: "#38bdf8",
    image: "/Portfolio/projects/signature-approval.png",
  },
  {
    num: "03",
    name: "Leviathan Time Series Classification",
    tags: ["CNN", "LSTM", "Time Series", "Deep Learning"],
    year: "2025",
    color: "#a78bfa",
    image: "/Portfolio/projects/leviathan-timeseries.png",
  },
  {
    num: "04",
    name: "Smart Helmet Accident Detection",
    tags: ["MPU6050", "GPS", "GSM", "IIT KGP"],
    year: "2025",
    color: "#14b8a6",
    image: "/Portfolio/projects/smart-helmet.png",
  },
  {
    num: "05",
    name: "Handwritten Digit Recognition",
    tags: ["MNIST", "CNN", "PyTorch", "Deep Learning"],
    year: "2025",
    color: "#f59e0b",
    image: "/Portfolio/projects/digit-recognition.png",
  },
  {
    num: "06",
    name: "Transient Detection Using SVM",
    tags: ["SVM", "Scikit-Learn", "Machine Learning", "Signal Processing"],
    year: "2025",
    color: "#10b981",
    image: "/Portfolio/projects/transient-detection.png",
  },
];

export function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="relative dot-grid-bg">
      <div className="section">
        <SectionLabel number="02">Selected Work</SectionLabel>
        <AccentHeading>
          Projects I&apos;ve <Accent>built</Accent>
        </AccentHeading>

        <div className="mt-16 relative">
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              className="project-row group relative border-t py-6 flex items-center justify-between cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Left side: number + name + tags */}
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <span className="text-[11px] font-mono text-text-tertiary min-w-[28px] shrink-0">
                  {project.num}
                </span>
                <span className="text-base font-medium text-text-primary truncate group-hover:text-accent transition-colors duration-200">
                  {project.name}
                </span>
                <div className="hidden sm:flex items-center gap-2 ml-4 shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right side: year + links */}
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-[11px] text-text-tertiary">
                  {project.year}
                </span>
                {/* GitHub icon */}
                <a
                  href={project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-accent transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.name} GitHub`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                {/* External link icon */}
                <a
                  href={project.demo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-accent transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.name} Demo`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              {/* Hover image preview */}
              <div className="project-hover-image">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={280}
                  height={180}
                  quality={85}
                />
              </div>

              {/* Hover color accent bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  background: project.color,
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIdx === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}

          {/* Last border */}
          <div
            className="border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>
    </section>
  );
}
