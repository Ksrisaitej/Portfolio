"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="spline-placeholder">
      <div className="spline-loading-pulse" />
    </div>
  ),
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const navItems = [
  { id: "perception", num: "01", label: "WORK" },
  { id: "learning", num: "02", label: "LEARNING" },
  { id: "action", num: "03", label: "ACTION" },
  { id: "research", num: "04", label: "RESEARCH" },
  { id: "experiments", num: "05", label: "EXPERIMENTS" },
  { id: "about", num: "06", label: "ABOUT" },
];

const learning = [
  ["A.01", "IMPLEMENTED", "VISION TRANSFORMER", "ViT-B/16", "PATCHES / EMBEDDINGS / ATTENTION"],
  ["A.02", "IMPLEMENTED", "TRANSFORMER FROM SCRATCH", "TOKENS / ATTENTION", "PYTORCH / ATTENTION HEADS"],
  ["A.03", "IMPLEMENTED", "MICROGRAD / AUTOGRAD ENGINE", "BACKPROP", "COMPUTATIONAL GRAPH / SCALAR"],
  ["A.04", "EXPERIMENT", "SIGNATURE VERIFICATION", "SIAMESE / EMBEDDING", "CONTRASTIVE LOSS / VISION"],
];

const research = [
  ["COMPUTER VISION", "Detection, segment representation, and hyperspectral scene decomposition"],
  ["OBJECT TRACKING", "Association across temporal frames with Kalman filter state estimation"],
  ["TRANSFORMERS + ViTs", "Multi-head spatial self-attention for sequence and visual token learning"],
  ["MULTIMODAL LEARNING", "Shared semantic representations bridging vision and latent embedding spaces"],
  ["GENERATIVE MODELING", "Learning structured latent visual distributions and synthesis priors"],
  ["ROBOTICS + NAVIGATION", "Perception-informed trajectory generation and local costmap evaluation"],
  ["VISION-LANGUAGE-ACTION", "Embodied robotic policies conditioned on visual inputs"],
  ["PATH PLANNING", "Global topological search and local collision avoidance from start to goal"],
];

const experiments = [
  ["DINO / SELF-SUPERVISED VISION", "READING"],
  ["VISION TRANSFORMERS (ViT)", "STUDYING"],
  ["GENERATIVE LATENT DIFFUSION", "EXPLORING"],
  ["MULTIMODAL EMBEDDINGS", "EXPLORING"],
  ["REAL-TIME OBJECT DETECTION", "BUILDING"],
  ["MULTI-TARGET OBJECT TRACKING", "BUILDING"],
  ["EMBODIED ROBOTICS CONTROL", "EXPLORING"],
  ["TOPOLOGICAL PATH PLANNING", "BUILDING"],
  ["VISION-LANGUAGE-ACTION (VLA)", "EXPLORING"],
];

interface ShowcaseProject {
  id: string;
  num: string;
  title: string;
  category: "CV" | "DEEP LEARNING" | "SIGNAL / IOT";
  year: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "flower-cls",
    num: "01",
    title: "Oxford 102 Flower Classification",
    category: "CV",
    year: "2025",
    description: "Fine-grained visual categorization across 102 flower species employing deep residual backbones (ResNet) with transfer learning and extensive augmentation.",
    tags: ["CNN", "Transfer Learning", "PyTorch", "ResNet"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
  {
    id: "signature-verify",
    num: "02",
    title: "Siamese Network Signature Approval",
    category: "DEEP LEARNING",
    year: "2025",
    description: "One-shot biometric verification framework utilizing twin convolutional neural networks with contrastive loss to authenticate handwritten signatures.",
    tags: ["Siamese Network", "Contrastive Loss", "One-Shot Learning"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
  {
    id: "leviathan-ts",
    num: "03",
    title: "Leviathan Time Series Classification",
    category: "SIGNAL / IOT",
    year: "2025",
    description: "Spatial-temporal sequential network combining 1D CNN feature extractors with recurrent LSTM memory cells for multivariate temporal series classification.",
    tags: ["CNN", "LSTM", "Time Series", "Deep Learning"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
  {
    id: "smart-helmet",
    num: "04",
    title: "Smart Helmet Accident Detection",
    category: "SIGNAL / IOT",
    year: "2025",
    description: "Hardware-integrated edge safety system with MPU6050 6-axis IMU fall detection logic, instant GPS coordinates, and GSM emergency alerting.",
    tags: ["MPU6050", "GPS", "GSM", "IIT KGP"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
  {
    id: "digit-recog",
    num: "05",
    title: "Handwritten Digit Recognition",
    category: "CV",
    year: "2025",
    description: "Convolutional neural network pipeline in PyTorch for high-precision handwritten digit recognition with custom kernel visualization and evaluation.",
    tags: ["MNIST", "CNN", "PyTorch", "Deep Learning"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
  {
    id: "transient-svm",
    num: "06",
    title: "Transient Detection Using SVM",
    category: "SIGNAL / IOT",
    year: "2025",
    description: "Signal processing and support vector machine classification system detecting transient non-stationary anomalies across physical sensor telemetry.",
    tags: ["SVM", "Scikit-Learn", "Machine Learning", "Signal Processing"],
    githubUrl: "https://github.com/Ksrisaitej",
  },
];

function Noise() {
  return <div className="noise" aria-hidden="true" />;
}

export type IntroPhase = "black" | "construct" | "settle" | "grid" | "transition" | "complete";

/* ==================================================
   DIMENSIONAL IDENTITY ARCHITECTURAL SEGMENTS
   ================================================== */
interface SegmentDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dx: number;
  dy: number;
  delay: number;
  path?: string;
}

const IDENTITY_SEGMENTS: SegmentDef[] = [
  // SRI — S
  { id: "s1_top", x: 85, y: 30, w: 110, h: 32, dx: -120, dy: 0, delay: 0.05 },
  { id: "s1_up", x: 85, y: 62, w: 32, h: 38, dx: 0, dy: -80, delay: 0.1 },
  { id: "s1_mid", x: 85, y: 94, w: 110, h: 32, dx: 120, dy: 0, delay: 0.15 },
  { id: "s1_low", x: 163, y: 124, w: 32, h: 38, dx: 0, dy: 80, delay: 0.2 },
  { id: "s1_bot", x: 85, y: 158, w: 110, h: 32, dx: -120, dy: 0, delay: 0.25 },

  // SRI — R
  { id: "r1_spine", x: 231, y: 30, w: 34, h: 160, dx: 0, dy: -140, delay: 0.12 },
  { id: "r1_top", x: 265, y: 30, w: 72, h: 32, dx: 100, dy: 0, delay: 0.18 },
  { id: "r1_wall", x: 305, y: 62, w: 32, h: 36, dx: 0, dy: -60, delay: 0.22 },
  { id: "r1_mid", x: 265, y: 94, w: 72, h: 32, dx: 100, dy: 0, delay: 0.28 },
  { id: "r1_leg", x: 271, y: 122, w: 74, h: 68, dx: 80, dy: 80, delay: 0.32, path: "M 271 122 L 307 122 L 349 190 L 309 190 Z" },

  // SRI — I
  { id: "i1_pillar", x: 381, y: 30, w: 36, h: 160, dx: 0, dy: -150, delay: 0.16 },

  // SAI — S
  { id: "s2_top", x: 511, y: 30, w: 110, h: 32, dx: -120, dy: 0, delay: 0.08 },
  { id: "s2_up", x: 511, y: 62, w: 32, h: 38, dx: 0, dy: -80, delay: 0.14 },
  { id: "s2_mid", x: 511, y: 94, w: 110, h: 32, dx: 120, dy: 0, delay: 0.2 },
  { id: "s2_low", x: 589, y: 124, w: 32, h: 38, dx: 0, dy: 80, delay: 0.26 },
  { id: "s2_bot", x: 511, y: 158, w: 110, h: 32, dx: -120, dy: 0, delay: 0.3 },

  // SAI — A
  { id: "a1_left", x: 657, y: 30, w: 80, h: 160, dx: -90, dy: 90, delay: 0.15, path: "M 657 190 L 703 30 L 737 30 L 691 190 Z" },
  { id: "a1_right", x: 719, y: 30, w: 80, h: 160, dx: 90, dy: 90, delay: 0.2, path: "M 765 190 L 719 30 L 753 30 L 799 190 Z" },
  { id: "a1_cross", x: 683, y: 122, w: 86, h: 26, dx: -100, dy: 0, delay: 0.25 },
  { id: "a1_apex", x: 717, y: 30, w: 34, h: 32, dx: 0, dy: -80, delay: 0.1 },

  // SAI — I
  { id: "i2_pillar", x: 841, y: 30, w: 36, h: 160, dx: 0, dy: -150, delay: 0.18 },

  // TEJ — T
  { id: "t1_top", x: 971, y: 30, w: 124, h: 32, dx: 0, dy: -100, delay: 0.1 },
  { id: "t1_pillar", x: 1015, y: 62, w: 36, h: 128, dx: 0, dy: 120, delay: 0.2 },

  // TEJ — E
  { id: "e1_spine", x: 1131, y: 30, w: 34, h: 160, dx: 0, dy: -140, delay: 0.14 },
  { id: "e1_top", x: 1165, y: 30, w: 82, h: 32, dx: 110, dy: 0, delay: 0.18 },
  { id: "e1_mid", x: 1165, y: 94, w: 66, h: 28, dx: 110, dy: 0, delay: 0.24 },
  { id: "e1_bot", x: 1165, y: 158, w: 82, h: 32, dx: 110, dy: 0, delay: 0.3 },

  // TEJ — J
  { id: "j1_top", x: 1287, y: 30, w: 68, h: 32, dx: 0, dy: -90, delay: 0.12 },
  { id: "j1_drop", x: 1321, y: 62, w: 34, h: 96, dx: 0, dy: 100, delay: 0.2 },
  { id: "j1_hook", x: 1287, y: 156, w: 68, h: 40, dx: -80, dy: 60, delay: 0.28, path: "M 1355 156 L 1355 170 C 1355 194 1321 196 1287 192 L 1287 164 C 1307 166 1321 166 1321 156 Z" },
];

const REGISTRATION_MARKS = [
  { x: 85, y: 30 },
  { x: 231, y: 30 },
  { x: 381, y: 30 },
  { x: 511, y: 30 },
  { x: 717, y: 30 },
  { x: 841, y: 30 },
  { x: 971, y: 30 },
  { x: 1131, y: 30 },
  { x: 1321, y: 30 },
];

function DimensionalIdentity({ phase }: { phase: IntroPhase }) {
  const isConstructed = phase !== "black";
  const isSettled = phase === "settle" || phase === "grid" || phase === "transition" || phase === "complete";
  const showCrosshairs = phase === "construct";

  return (
    <svg
      viewBox="0 0 1440 220"
      className="dimensional-sculpture-svg"
      aria-label="SRI SAI TEJ"
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <defs>
        {/* Front Face Titanium Gradient */}
        <linearGradient id="metalFace" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F2F1ED" />
          <stop offset="100%" stopColor="#DCDAD5" />
        </linearGradient>

        {/* Chiseled 3D Bevel Dark Base */}
        <linearGradient id="extrusionBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252932" />
          <stop offset="60%" stopColor="#15171C" />
          <stop offset="100%" stopColor="#0B0D10" />
        </linearGradient>

        {/* Ambient Depth Filter */}
        <filter id="dimensionalShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="45" stdDeviation="50" floodColor="#000000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Registration / Alignment Crosshairs (Only during mechanical assembly) */}
      <g
        className="registration-layer"
        style={{
          opacity: showCrosshairs ? 0.6 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {REGISTRATION_MARKS.map((m, idx) => (
          <g key={idx} transform={`translate(${m.x}, ${m.y})`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="var(--blue)" />
          </g>
        ))}
      </g>

      {/* Base Layer: Extruded 3D Chiseled Depth */}
      <g
        className="identity-extrusion-layer"
        transform="translate(4, 7)"
        filter="url(#dimensionalShadow)"
      >
        {IDENTITY_SEGMENTS.map((s) => (
          <g
            key={`ext_${s.id}`}
            style={{
              transform: isConstructed ? "translate(0px, 0px)" : `translate(${s.dx}px, ${s.dy}px)`,
              opacity: isConstructed ? 1 : 0,
              transition: `transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) ${s.delay}s, opacity 0.4s ease ${s.delay}s`,
            }}
          >
            {s.path ? (
              <path d={s.path} fill="url(#extrusionBase)" />
            ) : (
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="url(#extrusionBase)" />
            )}
          </g>
        ))}
      </g>

      {/* Front Monolithic Face with Specular Bevel Highlights */}
      <g className="identity-face-layer">
        {IDENTITY_SEGMENTS.map((s) => (
          <g
            key={`face_${s.id}`}
            style={{
              transform: isConstructed ? "translate(0px, 0px)" : `translate(${s.dx}px, ${s.dy}px)`,
              opacity: isConstructed ? 1 : 0,
              transition: `transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) ${s.delay}s, opacity 0.4s ease ${s.delay}s`,
            }}
          >
            {s.path ? (
              <path d={s.path} fill="url(#metalFace)" />
            ) : (
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="url(#metalFace)" />
            )}

            {/* Specular Reflective Bevel Lines */}
            {s.path ? (
              <path
                d={s.path}
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            ) : (
              <>
                {/* Top Chamfer Light Reflection */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={s.x + s.w}
                  y2={s.y}
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.5"
                />
                {/* Left Edge Light Reflection */}
                <line
                  x1={s.x}
                  y1={s.y}
                  x2={s.x}
                  y2={s.y + s.h}
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.5"
                />
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

function DenmuGrid({ introPhase }: { introPhase?: IntroPhase }) {
  let phaseClass = "grid-intro-active";
  if (introPhase === "black" || introPhase === "construct" || introPhase === "settle") {
    phaseClass = "grid-intro-hidden";
  } else if (introPhase === "grid") {
    phaseClass = "grid-intro-phase4";
  }

  return (
    <div className={`denmu-grid-container ${phaseClass}`} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`grid-col col-${i + 1}`} />
      ))}
    </div>
  );
}

function SectionHeader({ n, label, title, body }: { n: string; label: string; title: string; body: string }) {
  const lines = title.split(/\\n|\n/);
  return (
    <header className="section-head">
      <div className="section-index mono">{n} / {label}</div>
      <h2>
        {lines.map((line, idx) => (
          <span key={idx} className="header-line">{line}</span>
        ))}
      </h2>
      <p>{body}</p>
    </header>
  );
}

/* ==================================================
   HERO: DENMU-INSPIRED STARTING PAGE FOR SRI SAI TEJ
   ================================================== */
function DenmuHero({
  prefersReduced,
  introPhase = "complete",
  onSkipIntro,
}: {
  prefersReduced?: boolean;
  introPhase?: IntroPhase;
  onSkipIntro?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("perception");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  let heroStateClass = "hero-intro-complete";
  if (
    introPhase === "black" ||
    introPhase === "construct" ||
    introPhase === "settle" ||
    introPhase === "grid"
  ) {
    heroStateClass = "hero-intro-hidden";
  } else if (introPhase === "transition") {
    heroStateClass = "hero-intro-revealing";
  }

  return (
    <section className={`denmu-hero-page ${heroStateClass}`} id="top">
      {/* Phase 1: Pure Anticipation Black Shield */}
      {introPhase !== "complete" && (
        <div
          className={`intro-black-shield ${introPhase !== "black" ? "is-fading" : ""}`}
          aria-hidden="true"
        />
      )}

      {/* Opening Intro Sequence Dimensional Sculpture Stage */}
      {introPhase !== "complete" && (
        <div className={`intro-sequence-overlay phase-${introPhase}`}>
          <button
            type="button"
            className="skip-intro-btn mono"
            onClick={() => onSkipIntro?.()}
            title="Press Esc to skip"
          >
            [ SKIP INTRO ]
          </button>
          <div className="intro-identity-stage">
            <DimensionalIdentity phase={introPhase} />
          </div>
        </div>
      )}

      {/* Interactive 3D Spline Scene */}
      <div className="spline-scene-container">
        <Spline
          scene="https://prod.spline.design/k2iV3JQWJzFuEeW7/scene.splinecode"
        />
        <div className="ambient-vignette" />
      </div>

      {/* Top Header Zone */}
      <header className="denmu-header-zone">
        {/* Giant Display Typography (SRI 視 SAI 智 TEJ) */}
        <div className="denmu-brand-banner" aria-label="SRI SAI TEJ">
          <div className="brand-glyph-group">
            <span className="brand-glyph">SRI</span>
            <span className="brand-glyph kanji" title="Vision / Perception">視</span>
            <span className="brand-glyph">SAI</span>
            <span className="brand-glyph kanji" title="Intelligence / Learning">智</span>
            <span className="brand-glyph">TEJ</span>
          </div>
        </div>

        {/* 6-Column Grid-Aligned Navigation Bar */}
        <nav className="denmu-nav-bar" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-tab mono ${activeTab === item.id ? "is-active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.num} {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Bottom Content Zone */}
      <div className="denmu-bottom-zone">
        {/* Left: Headline & Core Identity Statement */}
        <div className="mission-statement-wrap">
          <div className="hero-meta-row mono">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              MACHINE LEARNING / COMPUTER VISION / ROBOTICS
            </p>
            <span className="academic-badge">IIT KHARAGPUR // BSC PHYSICS</span>
          </div>

          <h1 className="mission-statement">
            <span>I BUILD SYSTEMS THAT SEE,</span>
            <span>LEARN &amp; ACT.</span>
          </h1>

          <p className="mission-sub">
            Developing machine learning, computer vision, and robotic perception systems — from foundational vision transformers to real-time object tracking and spatial trajectory planning.
          </p>
        </div>

        {/* Right: Floating Feature Project Card (Denmu Style) */}
        <a
          href="#perception"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("perception");
          }}
          className="release-widget-card"
          aria-label="Feature Project: Hyperspectral Object Tracking"
        >
          <div className="release-thumb-wrap">
            <img
              src={`${basePath}/hundred_line_thumb.jpg`}
              alt="Hyperspectral Object Tracking Preview"
              className="release-thumb-img"
            />
          </div>

          <div className="release-info mono">
            <span className="release-tag">FEATURE PROJECT</span>
            <span className="release-title">HYPERSPECTRAL</span>
            <span className="release-subtitle">OBJECT TRACKING</span>
            <span className="release-arrow">&darr;</span>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ==================================================
   CV TRACKING VIEWPORT (SECTION 01)
   ================================================== */
function CVTrackingView() {
  return (
    <div className="cv-viewport" role="img" aria-label="Computer vision hyperspectral multi-object tracking visualization">
      <div className="cv-overlay-scanline" />
      <div className="cv-hud-top mono">
        <span>CAM_HYPERSPECTRAL_01 // 850nm BAND</span>
        <span>REC &#x25cf; [00:42:19:04]</span>
      </div>
      <div className="cv-feed">
        <div className="cv-sensor-field" />
        
        {/* Primary Tracklet Bounding Box */}
        <div className="cv-bbox target-primary">
          <div className="bbox-tag mono">
            <span className="bbox-id">ID_04 // TARGET</span>
            <span className="bbox-conf">0.984</span>
          </div>
          <div className="bbox-reticle" />
          <div className="bbox-vector" />
        </div>

        {/* Secondary Tracklet */}
        <div className="cv-bbox target-secondary">
          <div className="bbox-tag mono">
            <span className="bbox-id">ID_02 // OBJECT</span>
            <span className="bbox-conf">0.946</span>
          </div>
        </div>

        {/* Predicted Kalman Position */}
        <div className="cv-bbox target-predicted">
          <div className="bbox-tag mono">
            <span className="bbox-id">KALMAN_PRED [T+1]</span>
          </div>
        </div>

        {/* Center Optical Crosshair */}
        <div className="cv-center-cross">
          <div className="cross-h" />
          <div className="cross-v" />
          <span className="mono cross-coord">TRACK_CENTER: [421, 688]</span>
        </div>
      </div>
      <div className="cv-hud-bottom mono">
        <span>PIPELINE: YOLO + DEEPSORT + KALMAN</span>
        <span>LATENCY: 14.2ms // 68.4 FPS</span>
      </div>
    </div>
  );
}

/* ==================================================
   SECTION 01: PERCEPTION
   ================================================== */
function Perception() {
  return (
    <section id="perception" className="section perception">
      <SectionHeader
        n="01"
        label="PERCEPTION"
        title={"MAKE THE\nINVISIBLE LEGIBLE."}
        body="Building systems that locate, distinguish, and track entities across visual and multi-spectral scenes with temporal consistency."
      />

      <div className="taxonomy mono">
        <span>OBJECT DETECTION</span>
        <span>OBJECT TRACKING</span>
        <span>COMPUTER VISION</span>
        <span>HYPERSPECTRAL IMAGING</span>
        <span>VISUAL REPRESENTATION</span>
        <span>STATE ESTIMATION</span>
      </div>

      <div className="feature-project">
        <div className="project-side mono">
          <span>ID: 04 // TARGET</span>
          <span>ID: 02 // CANDIDATE</span>
          <span>F_017 &rarr; F_018 &rarr; F_019</span>
          <span>DETECT &rarr; ASSOCIATE &rarr; TRACK</span>
        </div>

        <CVTrackingView />

        <div className="project-copy">
          <div className="mono small-label">FEATURE PROJECT / COMPUTER VISION &amp; TRACKING</div>
          <h3>HYPERSPECTRAL<br />OBJECT TRACKING</h3>
          <p>
            Investigation into multi-object detection and persistent tracking across multi-spectral visual feeds using deep feature embeddings, state estimation, and spatial association.
          </p>
          <div className="tech mono">
            <span>YOLO</span>
            <span>DEEPSORT</span>
            <span>KALMAN FILTER</span>
            <span>PYTORCH</span>
            <span>HYPERSPECTRAL</span>
          </div>
        </div>
      </div>

      {/* Applied Projects Showcase */}
      <ProjectShowcase />
    </section>
  );
}

function ProjectSchematic({ id }: { id: string }) {
  if (id === "flower-cls") {
    return (
      <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Oxford 102 CNN Feature Extraction Blueprint">
        <defs>
          <linearGradient id="flowerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(200, 245, 66, 0.25)" />
            <stop offset="100%" stopColor="rgba(63, 92, 255, 0.05)" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="#07080A" />

        {/* Feature Map Segmentation Contours */}
        <g transform="translate(25, 30)">
          <rect x="0" y="0" width="145" height="145" fill="#0A0D10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          {/* Bounding ROI */}
          <rect x="22" y="22" width="100" height="100" fill="url(#flowerGrad)" stroke="#C8F542" strokeWidth="1.2" strokeDasharray="3 3" />
          {/* Petal contour lines */}
          <path d="M 72 32 C 85 47, 85 62, 72 72 C 59 62, 59 47, 72 32 Z" fill="rgba(200, 245, 66, 0.25)" stroke="#C8F542" strokeWidth="1" />
          <path d="M 112 72 C 97 85, 82 85, 72 72 C 82 59, 97 59, 112 72 Z" fill="rgba(200, 245, 66, 0.25)" stroke="#C8F542" strokeWidth="1" />
          <path d="M 72 112 C 59 97, 59 82, 72 72 C 85 82, 85 97, 72 112 Z" fill="rgba(200, 245, 66, 0.25)" stroke="#C8F542" strokeWidth="1" />
          <path d="M 32 72 C 47 59, 62 59, 72 72 C 62 85, 47 85, 32 72 Z" fill="rgba(200, 245, 66, 0.25)" stroke="#C8F542" strokeWidth="1" />
          <circle cx="72" cy="72" r="7" fill="#C8F542" />
          {/* Reticle ticks */}
          <line x1="17" y1="22" x2="27" y2="22" stroke="#C8F542" strokeWidth="1.5" />
          <line x1="22" y1="17" x2="22" y2="27" stroke="#C8F542" strokeWidth="1.5" />
          <line x1="117" y1="122" x2="127" y2="122" stroke="#C8F542" strokeWidth="1.5" />
          <line x1="122" y1="117" x2="122" y2="127" stroke="#C8F542" strokeWidth="1.5" />
          <text x="4" y="160" fill="#666763" fontSize="8" fontFamily="monospace">ROI [X: 112, Y: 84, S: 224×224]</text>
        </g>

        {/* Neural Network Decomposition Diagram */}
        <g transform="translate(195, 30)">
          <text x="0" y="10" fill="#A0A09B" fontSize="8.5" fontFamily="monospace" fontWeight="bold">RESNET-50 FEATURE MAP</text>
          
          {/* Layer Flow */}
          <rect x="0" y="20" width="70" height="20" fill="#111317" stroke="rgba(255,255,255,0.15)" rx="2" />
          <text x="8" y="33" fill="#F2F1ED" fontSize="7.5" fontFamily="monospace">CONV 7×7</text>

          <line x1="70" y1="30" x2="88" y2="30" stroke="#C8F542" strokeWidth="1.2" />

          <rect x="88" y="20" width="88" height="20" fill="#111317" stroke="#3F5CFF" rx="2" />
          <text x="94" y="33" fill="#3F5CFF" fontSize="7.5" fontFamily="monospace">RES-BLOCK [×4]</text>

          {/* Skip connection arc */}
          <path d="M 35 20 C 35 5, 132 5, 132 20" fill="none" stroke="#C8F542" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="65" y="10" fill="#C8F542" fontSize="7" fontFamily="monospace">x + F(x)</text>

          {/* Classification Probabilities */}
          <text x="0" y="65" fill="#A0A09B" fontSize="8" fontFamily="monospace">SOFTMAX PREDICTION:</text>
          
          {/* Bar 1 */}
          <text x="0" y="82" fill="#C8F542" fontSize="8" fontFamily="monospace">0102 // PASSION FLOWER</text>
          <rect x="0" y="87" width="135" height="5" fill="rgba(255,255,255,0.08)" rx="1" />
          <rect x="0" y="87" width="130" height="5" fill="#C8F542" rx="1" />
          <text x="142" y="92" fill="#C8F542" fontSize="8" fontFamily="monospace">98.4%</text>

          {/* Bar 2 */}
          <text x="0" y="108" fill="#777873" fontSize="8" fontFamily="monospace">0044 // CANTERBURY BELLS</text>
          <rect x="0" y="113" width="135" height="4" fill="rgba(255,255,255,0.08)" rx="1" />
          <rect x="0" y="113" width="10" height="4" fill="#777873" rx="1" />
          <text x="142" y="117" fill="#777873" fontSize="8" fontFamily="monospace">1.2%</text>

          {/* Bar 3 */}
          <text x="0" y="132" fill="#555652" fontSize="8" fontFamily="monospace">0089 // WATER LILY</text>
          <rect x="0" y="137" width="135" height="4" fill="rgba(255,255,255,0.08)" rx="1" />
          <rect x="0" y="137" width="4" height="4" fill="#555652" rx="1" />
          <text x="142" y="141" fill="#555652" fontSize="8" fontFamily="monospace">0.4%</text>
        </g>

        {/* Footer Telemetry */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <text x="20" y="218" fill="#62635F" fontSize="8" fontFamily="monospace">PYTORCH RESNET-50 // 102 CLASSES // TEST ACCURACY: 94.8%</text>
      </svg>
    );
  }

  if (id === "signature-verify") {
    return (
      <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Siamese Network Signature Verification Blueprint">
        <rect width="400" height="240" fill="#07080A" />

        {/* Top Branch: Reference Signature */}
        <g transform="translate(25, 25)">
          <rect x="0" y="0" width="155" height="58" fill="#0A0D10" stroke="rgba(56, 189, 248, 0.3)" rx="2" />
          <text x="8" y="14" fill="#38BDF8" fontSize="8" fontFamily="monospace">REFERENCE (X1) // REGISTERED</text>
          <path d="M 15 44 C 35 20, 45 54, 65 29 S 95 48, 115 24 S 138 44, 146 34" fill="none" stroke="#F2F1ED" strokeWidth="1.6" />
          <circle cx="15" cy="44" r="2.5" fill="#38BDF8" />
          <circle cx="65" cy="29" r="2.5" fill="#38BDF8" />
          <circle cx="115" cy="24" r="2.5" fill="#38BDF8" />
        </g>

        {/* Bottom Branch: Input Signature */}
        <g transform="translate(25, 98)">
          <rect x="0" y="0" width="155" height="58" fill="#0A0D10" stroke="rgba(255, 255, 255, 0.15)" rx="2" />
          <text x="8" y="14" fill="#A0A09B" fontSize="8" fontFamily="monospace">TEST SAMPLE (X2) // CLAIMED</text>
          <path d="M 15 43 C 36 21, 46 53, 66 30 S 96 47, 116 25 S 137 45, 145 35" fill="none" stroke="#A0A09B" strokeWidth="1.6" strokeDasharray="4 2" />
          <circle cx="15" cy="43" r="2" fill="#38BDF8" />
          <circle cx="66" cy="30" r="2" fill="#38BDF8" />
          <circle cx="116" cy="25" r="2" fill="#38BDF8" />
        </g>

        {/* Twin CNN Encoders and Convergence */}
        <g transform="translate(200, 36)">
          <rect x="0" y="0" width="55" height="28" fill="#11141A" stroke="#38BDF8" rx="2" />
          <text x="6" y="17" fill="#38BDF8" fontSize="8" fontFamily="monospace">CNN G_W</text>

          <rect x="0" y="74" width="55" height="28" fill="#11141A" stroke="#38BDF8" rx="2" />
          <text x="6" y="91" fill="#38BDF8" fontSize="8" fontFamily="monospace">CNN G_W</text>

          <path d="M 55 14 L 85 51" stroke="#38BDF8" strokeWidth="1.2" />
          <path d="M 55 88 L 85 51" stroke="#38BDF8" strokeWidth="1.2" />

          {/* Distance Metric Comparator */}
          <circle cx="100" cy="51" r="15" fill="#0E1217" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="92" y="54" fill="#F2F1ED" fontSize="8.5" fontFamily="monospace">D_w</text>

          <line x1="115" y1="51" x2="135" y2="51" stroke="#38BDF8" strokeWidth="1.5" />

          {/* Verification Badge */}
          <rect x="135" y="38" width="45" height="26" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" rx="2" />
          <text x="140" y="54" fill="#38BDF8" fontSize="8" fontFamily="monospace" fontWeight="bold">PASS</text>
        </g>

        {/* Bottom Distance Metric Display */}
        <g transform="translate(25, 172)">
          <rect x="0" y="0" width="350" height="42" fill="#0A0D10" stroke="rgba(255,255,255,0.08)" rx="2" />
          <text x="10" y="16" fill="#777873" fontSize="8" fontFamily="monospace">EUCLIDEAN EMBEDDING DISTANCE:</text>
          <text x="10" y="31" fill="#38BDF8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">D_w = 0.041 &lt; THRESHOLD τ (0.500)</text>
          <text x="210" y="31" fill="#10B981" fontSize="8.5" fontFamily="monospace">AUTHENTIC: 99.1%</text>
        </g>
      </svg>
    );
  }

  if (id === "leviathan-ts") {
    return (
      <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Leviathan Time Series CNN-LSTM Blueprint">
        <rect width="400" height="240" fill="#07080A" />

        {/* Oscilloscope Grid */}
        <line x1="25" y1="35" x2="375" y2="35" stroke="rgba(255,255,255,0.05)" />
        <line x1="25" y1="75" x2="375" y2="75" stroke="rgba(255,255,255,0.05)" />
        <line x1="25" y1="115" x2="375" y2="115" stroke="rgba(255,255,255,0.05)" />
        <line x1="25" y1="155" x2="375" y2="155" stroke="rgba(255,255,255,0.05)" />

        {/* Waveform Channel 1: Sensor Signal */}
        <path
          d="M 25 55 Q 45 20, 65 55 T 105 55 T 145 35 T 165 80 T 185 25 T 205 70 T 225 55 T 265 55 T 305 45 T 335 65 T 375 55"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="1.8"
        />
        <text x="28" y="27" fill="#A78BFA" fontSize="8" fontFamily="monospace">CH_01: MULTIVARIATE TELEMETRY STREAM [512-HZ]</text>

        {/* Waveform Channel 2: 1D CNN Activation Feature Map */}
        <path
          d="M 25 105 Q 55 105, 85 90 T 145 105 T 175 130 T 195 75 T 215 115 T 255 105 T 315 100 T 375 105"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
        <text x="28" y="95" fill="#38BDF8" fontSize="8" fontFamily="monospace">1D-CONV FEATURE MAP ACTIVATION [KERNEL: 5×1]</text>

        {/* Waveform Channel 3: LSTM Recurrent Hidden State */}
        <path
          d="M 25 145 L 155 145 Q 175 145, 185 130 Q 195 160, 205 130 L 225 145 L 375 145"
          fill="none"
          stroke="#C8F542"
          strokeWidth="1.5"
        />
        <text x="28" y="137" fill="#C8F542" fontSize="8" fontFamily="monospace">LSTM CELL STATE h_t // SEQUENCE ENCODING</text>

        {/* Sliding Kernel Receptive Field Bracket */}
        <rect x="160" y="30" width="55" height="130" fill="rgba(167, 139, 250, 0.1)" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 3" />
        <text x="165" y="23" fill="#A78BFA" fontSize="7" fontFamily="monospace">WINDOW [Δt]</text>

        {/* Anomaly Detection Marker */}
        <line x1="185" y1="25" x2="185" y2="165" stroke="#EF4444" strokeWidth="1.2" />
        <circle cx="185" cy="80" r="4" fill="#EF4444" />
        <text x="195" y="83" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">ANOMALY TRIGGER</text>

        {/* Telemetry Bar */}
        <g transform="translate(25, 185)">
          <rect x="0" y="0" width="350" height="32" fill="#0A0D10" stroke="rgba(255,255,255,0.08)" rx="2" />
          <text x="10" y="20" fill="#888984" fontSize="8" fontFamily="monospace">1D_CNN (64 FILTERS) + BIDIRECTIONAL LSTM (128 UNITS)</text>
          <text x="265" y="20" fill="#A78BFA" fontSize="8" fontFamily="monospace">ACC: 96.8%</text>
        </g>
      </svg>
    );
  }

  if (id === "smart-helmet") {
    return (
      <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Smart Helmet Accident Detection Blueprint">
        <rect width="400" height="240" fill="#07080A" />

        {/* Left Side: 3-Axis IMU Acceleration Vector Sphere */}
        <g transform="translate(25, 25)">
          <rect x="0" y="0" width="150" height="150" fill="#0A0D10" stroke="rgba(20, 184, 166, 0.3)" rx="2" />
          <text x="8" y="14" fill="#14B8A6" fontSize="8" fontFamily="monospace">MPU6050 6-AXIS IMU // VECTOR</text>

          <circle cx="75" cy="80" r="45" fill="none" stroke="rgba(255,255,255,0.06)" />
          <circle cx="75" cy="80" r="30" fill="none" stroke="rgba(255,255,255,0.08)" />
          <circle cx="75" cy="80" r="15" fill="none" stroke="rgba(255,255,255,0.1)" />

          <line x1="20" y1="80" x2="130" y2="80" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" />
          <line x1="75" y1="25" x2="75" y2="135" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" />

          {/* Spike Vector */}
          <line x1="75" y1="80" x2="115" y2="45" stroke="#EF4444" strokeWidth="2.5" />
          <circle cx="115" cy="45" r="4" fill="#EF4444" />
          
          <text x="8" y="140" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">|a| = 5.2g &gt; 3.0g [CRITICAL]</text>
        </g>

        {/* Right Side: Incident Dispatch Telemetry */}
        <g transform="translate(195, 25)">
          <text x="0" y="12" fill="#14B8A6" fontSize="9" fontFamily="monospace" fontWeight="bold">EMERGENCY TELEMETRY HUD</text>

          <rect x="0" y="22" width="180" height="40" fill="#0A0D10" stroke="rgba(255,255,255,0.12)" rx="2" />
          <text x="8" y="37" fill="#777873" fontSize="7.5" fontFamily="monospace">GPS FIX: NEO-6M SATELLITE</text>
          <text x="8" y="52" fill="#F2F1ED" fontSize="8.5" fontFamily="monospace">22.3149° N, 87.3105° E</text>

          <rect x="0" y="70" width="180" height="48" fill="#0A0D10" stroke="rgba(20, 184, 166, 0.4)" rx="2" />
          <text x="8" y="85" fill="#14B8A6" fontSize="7.5" fontFamily="monospace">SIM800L GSM BROADCAST:</text>
          <text x="8" y="98" fill="#F2F1ED" fontSize="7.5" fontFamily="monospace">SOS SMS → DISPATCHED</text>
          <text x="8" y="110" fill="#10B981" fontSize="7" fontFamily="monospace">[ACK: TOWER_CONNECT_OK]</text>

          {/* Badges */}
          <g transform="translate(0, 128)">
            <rect x="0" y="0" width="52" height="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" rx="2" />
            <text x="8" y="12" fill="#A0A09B" fontSize="7.5" fontFamily="monospace">I2C BUS</text>

            <rect x="60" y="0" width="52" height="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" rx="2" />
            <text x="67" y="12" fill="#A0A09B" fontSize="7.5" fontFamily="monospace">AT CMD</text>

            <rect x="120" y="0" width="56" height="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" rx="2" />
            <text x="125" y="12" fill="#14B8A6" fontSize="7.5" fontFamily="monospace">IIT KGP</text>
          </g>
        </g>

        {/* Footer Bar */}
        <g transform="translate(25, 185)">
          <rect x="0" y="0" width="350" height="32" fill="#0A0D10" stroke="rgba(255,255,255,0.08)" rx="2" />
          <text x="10" y="20" fill="#888984" fontSize="8" fontFamily="monospace">EMBEDDED C++ // ISR SENSOR INTERRUPTS // REAL-TIME ACCIDENT TELEMETRY</text>
        </g>
      </svg>
    );
  }

  if (id === "digit-recog") {
    return (
      <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Handwritten Digit Recognition CNN Matrix Blueprint">
        <rect width="400" height="240" fill="#07080A" />

        {/* 28x28 Subpixel Matrix (Handwritten '7') */}
        <g transform="translate(25, 25)">
          <rect x="0" y="0" width="145" height="145" fill="#050709" stroke="rgba(245, 158, 11, 0.3)" rx="2" />
          <text x="6" y="12" fill="#F59E0B" fontSize="7.5" fontFamily="monospace">INPUT TENSOR: [1×28×28]</text>

          <g transform="translate(20, 20)">
            <rect x="10" y="12" width="75" height="14" fill="#F59E0B" opacity="0.9" />
            <path d="M 85 12 L 40 85 L 25 85 L 70 12 Z" fill="#F59E0B" opacity="0.85" />
            
            {/* Sliding 3x3 Convolution Kernel */}
            <rect x="38" y="24" width="24" height="24" fill="rgba(245, 158, 11, 0.2)" stroke="#F2F1ED" strokeWidth="1.2" />
            <text x="40" y="38" fill="#F2F1ED" fontSize="6.5" fontFamily="monospace">3×3</text>
          </g>

          <text x="6" y="138" fill="#777873" fontSize="7.5" fontFamily="monospace">PIXEL VALUES: [0.0 - 1.0]</text>
        </g>

        {/* Feature Map Projection & Softmax Logits */}
        <g transform="translate(195, 25)">
          <text x="0" y="10" fill="#F59E0B" fontSize="8.5" fontFamily="monospace" fontWeight="bold">CONV2D → RELU → MAXPOOL</text>
          <text x="0" y="26" fill="#777873" fontSize="7.5" fontFamily="monospace">SOFTMAX CLASSIFICATION LOGITS:</text>

          {[
            { digit: 0, prob: 0 },
            { digit: 1, prob: 2 },
            { digit: 2, prob: 1 },
            { digit: 3, prob: 0 },
            { digit: 4, prob: 0 },
            { digit: 5, prob: 0 },
            { digit: 6, prob: 0 },
            { digit: 7, prob: 99.8 },
            { digit: 8, prob: 0 },
            { digit: 9, prob: 1 },
          ].map((item, idx) => (
            <g key={item.digit} transform={`translate(0, ${34 + idx * 11})`}>
              <text x="0" y="8" fill={item.prob > 50 ? "#F59E0B" : "#555652"} fontSize="7.5" fontFamily="monospace" fontWeight={item.prob > 50 ? "bold" : "normal"}>
                {item.digit}:
              </text>
              <rect x="18" y="2" width="115" height="5" fill="rgba(255,255,255,0.06)" rx="1" />
              <rect x="18" y="2" width={item.prob > 50 ? 112 : Math.max(1, item.prob * 1.1)} height="5" fill={item.prob > 50 ? "#F59E0B" : "#777873"} rx="1" />
              {item.prob > 50 && (
                <text x="138" y="8" fill="#F59E0B" fontSize="7.5" fontFamily="monospace" fontWeight="bold">99.8%</text>
              )}
            </g>
          ))}
        </g>

        {/* Footer */}
        <g transform="translate(25, 185)">
          <rect x="0" y="0" width="350" height="32" fill="#0A0D10" stroke="rgba(255,255,255,0.08)" rx="2" />
          <text x="10" y="20" fill="#888984" fontSize="8" fontFamily="monospace">PYTORCH CNN // MNIST BENCHMARK // TRAIN LOSS: 0.0142 // TEST ACC: 99.2%</text>
        </g>
      </svg>
    );
  }

  // id === "transient-svm"
  return (
    <svg viewBox="0 0 400 240" className="project-schematic-svg" aria-label="Transient Detection SVM Phase Space Blueprint">
      <rect width="400" height="240" fill="#07080A" />

      {/* Top: Signal Transient Waveform */}
      <g transform="translate(25, 20)">
        <rect x="0" y="0" width="350" height="48" fill="#0A0D10" stroke="rgba(16, 185, 129, 0.25)" rx="2" />
        <text x="8" y="12" fill="#10B981" fontSize="7.5" fontFamily="monospace">TIME-DOMAIN TRANSIENT BURST PULSE</text>
        
        <path
          d="M 10 30 L 80 30 Q 95 29, 110 30 L 130 30 L 140 14 L 146 43 L 152 12 L 158 38 L 164 30 L 340 30"
          fill="none"
          stroke="#F2F1ED"
          strokeWidth="1.4"
        />
        <rect x="135" y="8" width="35" height="36" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
        <text x="178" y="24" fill="#10B981" fontSize="7.5" fontFamily="monospace">TRANSIENT SPIKE</text>
      </g>

      {/* Bottom: SVM Feature Space & Separating Hyperplane */}
      <g transform="translate(25, 80)">
        <rect x="0" y="0" width="350" height="125" fill="#0A0D10" stroke="rgba(255,255,255,0.08)" rx="2" />
        <text x="8" y="14" fill="#777873" fontSize="7.5" fontFamily="monospace">2D FEATURE SPACE: PEAK AMPLITUDE vs RISE TIME</text>

        <line x1="40" y1="105" x2="290" y2="25" stroke="#10B981" strokeWidth="1.8" />
        <line x1="30" y1="90" x2="280" y2="10" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="50" y1="120" x2="300" y2="40" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.2" strokeDasharray="4 3" />

        {/* Support Vectors */}
        <circle cx="110" cy="58" r="5" fill="none" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="110" cy="58" r="2.5" fill="#10B981" />
        
        <circle cx="210" cy="85" r="5" fill="none" stroke="#3F5CFF" strokeWidth="1.5" />
        <circle cx="210" cy="85" r="2.5" fill="#3F5CFF" />

        {/* Scatter Normal Data Points */}
        <circle cx="190" cy="100" r="2" fill="#555652" />
        <circle cx="230" cy="95" r="2" fill="#555652" />
        <circle cx="250" cy="105" r="2" fill="#555652" />
        <circle cx="180" cy="115" r="2" fill="#555652" />

        {/* Scatter Transient Anomaly Points */}
        <circle cx="70" cy="40" r="2.5" fill="#10B981" />
        <circle cx="90" cy="30" r="2.5" fill="#10B981" />
        <circle cx="60" cy="55" r="2.5" fill="#10B981" />

        <text x="180" y="30" fill="#10B981" fontSize="7.5" fontFamily="monospace">w^T x + b = 0 [DECISION]</text>
        <text x="118" y="70" fill="#10B981" fontSize="7" fontFamily="monospace">SUPPORT VECTOR</text>

        <text x="10" y="116" fill="#62635F" fontSize="7.5" fontFamily="monospace">KERNEL: RBF (RADIAL BASIS) // C: 10.0 // MARGIN: MAXIMAL</text>
      </g>
    </svg>
  );
}

function ProjectShowcase() {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredProjects =
    filter === "ALL"
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.category === filter);

  const categories = [
    { label: "ALL WORKS (06)", value: "ALL" },
    { label: "COMPUTER VISION", value: "CV" },
    { label: "DEEP LEARNING", value: "DEEP LEARNING" },
    { label: "SIGNAL & IOT", value: "SIGNAL / IOT" },
  ];

  return (
    <div className="project-showcase-section">
      <div className="showcase-header-bar">
        <div className="showcase-header-title">
          <span className="mono">APPLIED WORKS // ARCHIVE</span>
          <h3>SELECTED ML &amp; VISION PROJECTS</h3>
        </div>

        <div className="project-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`filter-tab-btn ${filter === cat.value ? "active" : ""}`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className="work-card" key={project.id}>
            <div className="work-card-thumb-wrap">
              <ProjectSchematic id={project.id} />
              <div className="work-card-hud-badge">
                {project.num} // {project.category}
              </div>
            </div>

            <div className="work-card-body">
              <div className="work-card-meta mono">
                <span className="meta-category">{project.category}</span>
                <span className="meta-year">{project.year}</span>
              </div>

              <h4 className="work-card-title">{project.title}</h4>

              <p className="work-card-desc">{project.description}</p>

              <div className="work-card-tags">
                {project.tags.map((tag) => (
                  <span className="work-card-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="work-card-footer">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <span>SOURCE CODE</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <span className="work-card-status-dot">DEPLOYED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================
   SECTION 02: LEARNING (FIRST PRINCIPLES)
   ================================================== */
function Learning() {
  return (
    <section id="learning" className="section learning">
      <SectionHeader
        n="02"
        label="LEARNING"
        title={"OPEN THE BOX.\nBUILD THE THING."}
        body="Understanding modern deep learning from first principles. Less opaque black boxes, more hands-on mathematical architecture."
      />

      <div className="archive">
        {learning.map(([id, status, title, sub, tags]) => (
          <div key={id} className="archive-row">
            <span className="mono archive-id">{id}</span>
            <span className={`mono archive-status ${status === "IMPLEMENTED" ? "is-imp" : ""}`}>
              {status}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{sub}</p>
            </div>
            <span className="mono archive-tags">{tags}</span>
            <span className="arrow">&nearr;</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 03: ACTION (ROBOTICS PATH PLANNING)
   ================================================== */
function Action() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [robotPos, setRobotPos] = useState({ x: 80, y: 360, angle: -15 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathScale = useTransform(scrollYProgress, [0.18, 0.78], [0, 1]);

  useEffect(() => {
    const unsubscribe = pathScale.on("change", (latest) => {
      const path = pathRef.current;
      if (!path) return;
      try {
        const total = path.getTotalLength();
        const clamped = Math.max(0, Math.min(1, latest));
        const point = path.getPointAtLength(clamped * total);
        const forward = Math.min(total, (clamped + 0.015) * total);
        const nextPoint = path.getPointAtLength(forward);
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRobotPos({ x: point.x, y: point.y, angle });
      } catch {
        // Fallback gracefully
      }
    });
    return () => unsubscribe();
  }, [pathScale]);

  const trajectoryD = "M 80 360 C 200 360, 220 290, 320 290 S 480 160, 560 160 S 800 240, 920 100";

  return (
    <section id="action" ref={containerRef} className="section action">
      <SectionHeader
        n="03"
        label="ACTION"
        title={"FROM SEEING\nTO DOING."}
        body="Investigating mobile robotics, collision-avoidance trajectory planning, and perception-informed embodied action."
      />

      <div className="action-topics mono">
        <span>ROBOTICS</span>
        <span>PATH FINDING</span>
        <span>PATH PLANNING</span>
        <span>NAVIGATION</span>
        <span>ROBOT TRACKING</span>
        <span>VISION-LANGUAGE-ACTION</span>
      </div>

      <div className="planning-scene-container" role="img" aria-label="Interactive robotics collision avoidance path planning simulation">
        <div className="planning-hud-top mono">
          <span>ALGORITHM: RRT* / A* TRAJECTORY PLANNER</span>
          <span>COLLISION PROBABILITY: 0.00% // SAFE</span>
        </div>

        <svg className="planning-svg" viewBox="0 0 1000 450" preserveAspectRatio="none">
          <defs>
            <filter id="glowPath" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3F5CFF" floodOpacity="0.4" />
            </filter>
            <pattern id="costmapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1000" height="450" fill="url(#costmapGrid)" />

          {/* Obstacle Fields with Safety Clearance */}
          <g>
            <rect x="130" y="70" width="130" height="100" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
            <rect x="140" y="80" width="110" height="80" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="150" y="125" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_01 [STATIC]</text>
          </g>

          <g>
            <rect x="190" y="390" width="160" height="50" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="210" y="420" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_02 [BOUNDARY]</text>
          </g>

          <g>
            <rect x="390" y="270" width="140" height="110" fill="rgba(255, 255, 255, 0.01)" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
            <rect x="400" y="280" width="120" height="90" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="415" y="330" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_03 [DENSE]</text>
          </g>

          <g>
            <rect x="420" y="20" width="110" height="80" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="435" y="65" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_04 [ZONE]</text>
          </g>

          <g>
            <rect x="650" y="30" width="140" height="90" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="670" y="80" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_05 [STATIC]</text>
          </g>

          <g>
            <rect x="670" y="300" width="170" height="90" fill="#0B0D0F" stroke="rgba(255, 255, 255, 0.12)" />
            <text x="690" y="350" fill="#62635F" fontSize="8" fontFamily="monospace">OBS_06 [PERIMETER]</text>
          </g>

          {/* Static Reference Base Path */}
          <path d={trajectoryD} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" strokeDasharray="6 6" />

          {/* Scroll-Driven Animated Active Trajectory Path */}
          <motion.path
            ref={pathRef}
            d={trajectoryD}
            fill="none"
            stroke="#3F5CFF"
            strokeWidth="3.5"
            filter="url(#glowPath)"
            style={{ pathLength: pathScale }}
          />

          {/* Waypoints */}
          <circle cx="80" cy="360" r="5" fill="#070809" stroke="#F2F1ED" strokeWidth="2" />
          <text x="60" y="390" fill="#A0A09B" fontSize="9" fontFamily="monospace">START [q_init]</text>

          <circle cx="320" cy="290" r="4" fill="#3F5CFF" />
          <text x="310" y="275" fill="#A0A09B" fontSize="8" fontFamily="monospace">WP_01</text>

          <circle cx="560" cy="160" r="4" fill="#3F5CFF" />
          <text x="550" y="145" fill="#A0A09B" fontSize="8" fontFamily="monospace">WP_02</text>

          <circle cx="920" cy="100" r="7" fill="none" stroke="#3F5CFF" strokeWidth="1.5" />
          <circle cx="920" cy="100" r="3" fill="#3F5CFF" />
          <text x="890" y="80" fill="#3F5CFF" fontSize="9" fontFamily="monospace">TARGET [q_goal]</text>

          {/* Dynamic Mobile Robot Agent Following Trajectory */}
          <g transform={`translate(${robotPos.x}, ${robotPos.y}) rotate(${robotPos.angle})`}>
            <path d="M 0 0 L 40 -20 L 40 20 Z" fill="rgba(63, 92, 255, 0.06)" stroke="rgba(63, 92, 255, 0.25)" strokeWidth="1" />
            <circle cx="0" cy="0" r="13" fill="#0F1114" stroke="#F2F1ED" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="5" fill="#3F5CFF" />
            <line x1="0" y1="0" x2="16" y2="0" stroke="#526CFF" strokeWidth="1.5" />
          </g>
        </svg>

        <div className="planning-caption mono">
          PERCEIVE &bull; LOCAL COSTMAP &bull; TRAJECTORY EXECUTION
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 04: RESEARCH
   ================================================== */
function Research() {
  return (
    <section id="research" className="section research">
      <SectionHeader
        n="04"
        label="RESEARCH"
        title={"QUESTIONS\nWORTH FOLLOWING."}
        body="An active index of questions, technical hypotheses, and open explorations in modern machine learning and vision."
      />

      <div className="research-list">
        {research.map(([topic, description]) => (
          <div className="research-row" key={topic}>
            <h3>{topic}</h3>
            <p>{description}</p>
            <span className="arrow">&nearr;</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 05: EXPERIMENTS NOTEBOOK
   ================================================== */
function Experiments() {
  return (
    <section id="experiments" className="section experiments">
      <SectionHeader
        n="05"
        label="EXPERIMENTS"
        title={"AN EVOLVING\nRESEARCH NOTEBOOK."}
        body="Exploratory implementations categorized by technical state: reading, studying, exploring, or building."
      />

      <div className="experiment-index">
        {experiments.map(([name, status], i) => (
          <div className="experiment-row" key={name}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <h3>{name}</h3>
            <span className="mono status-tag">{status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 06: ABOUT & BACKGROUND
   ================================================== */
function About() {
  return (
    <section id="about" className="section about">
      <div className="about-grid">
        <div>
          <div className="section-index mono">06 / ABOUT</div>
          <h2>
            I BUILD,<br />EXPERIMENT,<br />READ,<br />LEARN.
          </h2>
        </div>

        <div className="about-copy">
          <p>
            I’m Sri Sai Tej, an undergraduate at IIT Kharagpur exploring machine learning, computer vision, and intelligent robotics.
          </p>
          <p>
            I focus on understanding models from first principles—dissecting attention mechanisms in vision transformers, implementing autograd computational graphs from scratch, and building tracking algorithms to connect visual perception with embodied action.
          </p>
          <div className="education mono">
            <span>ACADEMIC BACKGROUND:</span>
            <span>BSC PHYSICS // IIT KHARAGPUR</span>
          </div>
        </div>

        <div className="about-photo" role="img" aria-label="Visual identity card for Sri Sai Tej">
          <div className="about-photo-reticle mono">
            <span>IIT KGP</span>
            <span>[ST_PERCEPTION]</span>
          </div>
          <span className="mono">RESEARCH &bull; PERCEPTION &bull; ROBOTICS</span>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   FOOTER
   ================================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-statement">
        PERCEIVE.<br />LEARN.<br />ACT.
      </div>
      <div className="footer-bottom">
        <div>
          <b>SRI SAI TEJ</b>
          <span className="mono">IIT KHARAGPUR &bull; ML / CV / ROBOTICS</span>
        </div>
        <div className="footer-links mono">
          <a href="#perception" className="micro-link">WORK &nearr;</a>
          <a href="#learning" className="micro-link">LEARNING &nearr;</a>
          <a href="#action" className="micro-link">ACTION &nearr;</a>
          <a href="#about" className="micro-link">ABOUT &nearr;</a>
          <a href="mailto:email@example.com" className="micro-link">EMAIL &nearr;</a>
        </div>
        <div className="final-mark">ST</div>
      </div>
    </footer>
  );
}

/* ==================================================
   MAIN PAGE ROOT
   ================================================== */
export default function Page() {
  const prefersReduced = useReducedMotion() ?? false;
  const [introPhase, setIntroPhase] = useState<IntroPhase>(prefersReduced ? "complete" : "black");

  // Opening sequence timer choreography
  useEffect(() => {
    if (prefersReduced) {
      setIntroPhase("complete");
      return;
    }

    const t1 = setTimeout(() => setIntroPhase("construct"), 900);   // Phase 1 -> 2: Reveal & construct
    const t2 = setTimeout(() => setIntroPhase("settle"), 2400);     // Phase 2 -> 3: Oversize scale & settle
    const t3 = setTimeout(() => setIntroPhase("grid"), 3500);       // Phase 3 -> 4: Grid appears
    const t4 = setTimeout(() => setIntroPhase("transition"), 4200); // Phase 4 -> 5: Transition into hero
    const t5 = setTimeout(() => setIntroPhase("complete"), 5300);   // Complete, fully interactive

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setIntroPhase("complete");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prefersReduced]);

  // Smooth scroll with Lenis (only active when intro completes)
  useEffect(() => {
    if (introPhase !== "complete") return;

    const lenis = new Lenis({ smoothWheel: !prefersReduced });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [prefersReduced, introPhase]);

  const handleSkipIntro = () => {
    setIntroPhase("complete");
  };

  return (
    <main>
      <Noise />
      <DenmuGrid introPhase={introPhase} />
      <DenmuHero
        prefersReduced={prefersReduced}
        introPhase={introPhase}
        onSkipIntro={handleSkipIntro}
      />
      <Perception />
      <Learning />
      <Action />
      <Research />
      <Experiments />
      <About />
      <Footer />
    </main>
  );
}
