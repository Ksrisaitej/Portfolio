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
  { id: "vision", num: "01", label: "VISION" },
  { id: "from-scratch", num: "02", label: "FROM SCRATCH" },
  { id: "robotics", num: "03", label: "ROBOTICS" },
  { id: "skills", num: "04", label: "SKILLS" },
  { id: "about", num: "05", label: "ABOUT" },
];

function Noise() {
  return <div className="noise" aria-hidden="true" />;
}

/* ==================================================
   OPENING INTRO SEQUENCE: DIMENSIONAL SCULPTURE
   ================================================== */
type IntroPhase = "black" | "construct" | "settle" | "grid" | "transition" | "complete";

function DimensionalIdentity({ phase }: { phase: IntroPhase }) {
  const isBlack = phase === "black";
  const isConstruct = phase === "construct";
  const isSettle = phase === "settle";
  const isGrid = phase === "grid" || phase === "transition" || phase === "complete";

  const showExtrusion = isConstruct || isSettle || isGrid;
  const showRegistration = isSettle || isGrid;

  return (
    <svg
      viewBox="0 0 1440 220"
      className="dimensional-sculpture-svg"
      aria-label="SRI SAI TEJ"
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="metalFace" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F2F1ED" />
          <stop offset="100%" stopColor="#DCDAD5" />
        </linearGradient>

        <linearGradient id="extrusionBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252932" />
          <stop offset="60%" stopColor="#15171C" />
          <stop offset="100%" stopColor="#0B0D10" />
        </linearGradient>

        <filter id="dimensionalShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#000000" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="45" stdDeviation="50" floodColor="#000000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Registration Marks */}
      <g
        className="registration-layer"
        style={{
          opacity: showRegistration ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {[85, 231, 381, 511, 717, 841, 971, 1131, 1321].map((cx, idx) => (
          <g key={idx} transform={`translate(${cx}, 30)`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="var(--blue)" />
          </g>
        ))}
      </g>

      {/* 3D Extrusion Layer */}
      <g
        className="identity-extrusion-layer"
        transform="translate(4, 7)"
        filter="url(#dimensionalShadow)"
      >
        {/* S */}
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(-120px, 0px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.4s ease 0.05s" }}>
          <rect x="85" y="30" width="110" height="32" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(0px, -80px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.4s ease 0.1s" }}>
          <rect x="85" y="62" width="32" height="38" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(120px, 0px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.4s ease 0.15s" }}>
          <rect x="85" y="94" width="110" height="32" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(0px, 80px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.4s ease 0.2s" }}>
          <rect x="163" y="124" width="32" height="38" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(-120px, 0px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, opacity 0.4s ease 0.25s" }}>
          <rect x="85" y="158" width="110" height="32" fill="url(#extrusionBase)" />
        </g>

        {/* R */}
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(0px, -140px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, opacity 0.4s ease 0.12s" }}>
          <rect x="231" y="30" width="34" height="160" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(100px, 0px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, opacity 0.4s ease 0.18s" }}>
          <rect x="265" y="30" width="72" height="32" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(0px, -60px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.22s, opacity 0.4s ease 0.22s" }}>
          <rect x="305" y="62" width="32" height="36" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(100px, 0px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, opacity 0.4s ease 0.28s" }}>
          <rect x="265" y="94" width="72" height="32" fill="url(#extrusionBase)" />
        </g>
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(80px, 80px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.32s, opacity 0.4s ease 0.32s" }}>
          <path d="M 271 122 L 307 122 L 349 190 L 309 190 Z" fill="url(#extrusionBase)" />
        </g>

        {/* I */}
        <g style={{ transform: showExtrusion ? "translate(0, 0)" : "translate(0px, -150px)", opacity: showExtrusion ? 0.9 : 0, transition: "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, opacity 0.4s ease 0.16s" }}>
          <rect x="381" y="30" width="36" height="160" fill="url(#extrusionBase)" />
        </g>
      </g>

      {/* Front Face Sculptural Typography */}
      <g className="identity-front-layer">
        {/* S */}
        <path d="M 85 30 L 195 30 L 195 62 L 117 62 L 117 94 L 195 94 L 195 190 L 85 190 L 85 158 L 163 158 L 163 126 L 85 126 Z" fill="url(#metalFace)" />
        {/* R */}
        <path d="M 231 30 L 337 30 L 337 98 L 307 98 L 349 190 L 309 190 L 271 126 L 265 126 L 265 190 L 231 190 Z M 265 60 L 303 60 L 303 96 L 265 96 Z" fill="url(#metalFace)" />
        {/* I */}
        <rect x="381" y="30" width="36" height="160" fill="url(#metalFace)" />

        {/* SAI */}
        <path d="M 511 30 L 621 30 L 621 62 L 543 62 L 543 94 L 621 94 L 621 190 L 511 190 L 511 158 L 589 158 L 589 126 L 511 126 Z" fill="url(#metalFace)" />
        <path d="M 655 190 L 705 30 L 741 30 L 791 190 L 755 190 L 743 148 L 703 148 L 691 190 Z M 711 118 L 735 118 L 723 72 Z" fill="url(#metalFace)" />
        <rect x="825" y="30" width="36" height="160" fill="url(#metalFace)" />

        {/* TEJ */}
        <path d="M 955 30 L 1075 30 L 1075 62 L 1033 62 L 1033 190 L 997 190 L 997 62 L 955 62 Z" fill="url(#metalFace)" />
        <path d="M 1109 30 L 1219 30 L 1219 62 L 1145 62 L 1145 94 L 1209 94 L 1209 124 L 1145 124 L 1145 158 L 1221 158 L 1221 190 L 1109 190 Z" fill="url(#metalFace)" />
        <path d="M 1253 30 L 1357 30 L 1357 150 C 1357 178, 1335 190, 1301 190 C 1271 190, 1251 176, 1247 156 L 1281 150 C 1283 158, 1291 162, 1301 162 C 1315 162, 1321 156, 1321 144 L 1321 62 L 1253 62 Z" fill="url(#metalFace)" />
      </g>
    </svg>
  );
}

function DenmuGrid({ introPhase }: { introPhase: IntroPhase }) {
  let phaseClass = "grid-intro-phase4";
  if (introPhase === "black" || introPhase === "construct" || introPhase === "settle") {
    phaseClass = "grid-intro-hidden";
  } else if (introPhase === "grid") {
    phaseClass = "grid-intro-phase3";
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
   HERO: STARTING LAYOUT ANCHORED AROUND RESUME
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
  const [activeTab, setActiveTab] = useState("vision");

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
      {/* Intro Overlay */}
      {introPhase !== "complete" && (
        <div
          className={`intro-black-shield ${introPhase !== "black" ? "is-fading" : ""}`}
          aria-hidden="true"
        />
      )}

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
        <Spline scene="https://prod.spline.design/k2iV3JQWJzFuEeW7/scene.splinecode" />
        <div className="ambient-vignette" />
      </div>

      {/* Top Header Zone */}
      <header className="denmu-header-zone">
        <div className="denmu-brand-banner" aria-label="KADIMI SRI SAI TEJ">
          <div className="brand-glyph-group">
            <span className="brand-glyph">SRI</span>
            <span className="brand-glyph kanji" title="Vision / Perception">視</span>
            <span className="brand-glyph">SAI</span>
            <span className="brand-glyph kanji" title="Intelligence / Learning">智</span>
            <span className="brand-glyph">TEJ</span>
          </div>
        </div>

        {/* 5-Column Grid Navigation */}
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
        <div className="mission-statement-wrap">
          <div className="hero-meta-row mono">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              PHYSICS UNDERGRADUATE @ IIT KHARAGPUR // HYDERABAD, INDIA
            </p>
            <span className="academic-badge">IIT KGP &bull; 2025–2029</span>
          </div>

          <h1 className="mission-statement">
            <span>I BUILD SYSTEMS THAT SEE,</span>
            <span>LEARN &amp; ACT.</span>
          </h1>

          <p className="mission-sub">
            Physics undergraduate at IIT Kharagpur engineering machine learning systems in PyTorch from first principles — from custom autograd computational graphs and from-scratch Transformers to real-time object tracking, 3D perception, and robotic action.
          </p>

          {/* Direct Resume Quick Connect HUD */}
          <div className="hero-contact-hud mono">
            <a href="mailto:srisaitej999@gmail.com" className="hud-pill">
              <span className="hud-dot" />
              srisaitej999@gmail.com
            </a>
            <a href="tel:+919014792881" className="hud-pill">
              +91 90147 92881
            </a>
            <a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer" className="hud-pill link-hover">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/sri-sai-tej/" target="_blank" rel="noopener noreferrer" className="hud-pill link-hover">
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Floating Feature Project Card (Denmu Style) */}
        <a
          href="#vision"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("vision");
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
            <span className="release-tag">PRIMARY INTEREST</span>
            <span className="release-title">COMPUTER VISION</span>
            <span className="release-subtitle">&amp; OBJECT TRACKING</span>
            <span className="release-arrow">&darr;</span>
          </div>
        </a>
      </div>
    </section>
  );
}


/* ==================================================
   SECTION 01: APOLLO MODULAR PERCEPTION GRID (a-f)
   ================================================== */
function VisionSection() {
  return (
    <section id="vision" className="apollo-section">
      <div className="apollo-header">
        <span className="apollo-tag">/ 01.00 APOLLO PERCEPTION</span>
        <h2 className="apollo-title">PERCEPTION</h2>
        <p className="apollo-desc">
          Computer vision, multi-spectral decomposition, and persistent state estimation. Engineering deep architectures that locate, classify, and track dynamic entities in real time.
        </p>
      </div>

      {/* 4-Column Modular Grid (The Apollo 6-Card Architecture) */}
      <div className="apollo-grid-4">
        {/* Card ( a ) - Hyperspectral Tracking with Notched Shelf Cutout */}
        <div className="apollo-card apollo-shelf-tr">
          <div className="apollo-pin" aria-hidden="true" />
          <div className="apollo-card-top">
            <span className="apollo-index">( a )</span>
          </div>
          <div>
            <h3 className="apollo-card-title">HYPERSPECTRAL TRACKING</h3>
            <p className="apollo-card-body">
              Multi-spectral persistent entity tracking via deep embedding associations and Kalman kinematic estimation.
            </p>
            <ul className="apollo-card-bullets">
              <li>YOLO Bounding Box Detection</li>
              <li>DeepSORT Feature Association</li>
              <li>Kalman State Vector Filtering</li>
              <li>14.2ms Low-Latency Inference</li>
            </ul>
          </div>
        </div>

        {/* Card ( b ) - ViT-B/16 from Scratch with Notched Shelf Cutout */}
        <div className="apollo-card apollo-shelf-tr">
          <div className="apollo-pin" aria-hidden="true" />
          <div className="apollo-card-top">
            <span className="apollo-index">( b )</span>
          </div>
          <div>
            <h3 className="apollo-card-title">ViT-B/16 FROM SCRATCH</h3>
            <p className="apollo-card-body">
              Complete Vision Transformer reimplemented from first principles in PyTorch without library abstractions.
            </p>
            <ul className="apollo-card-bullets">
              <li>~86M Parameters in Raw PyTorch</li>
              <li>196 Image Patches (16×16)</li>
              <li>768-D Latent Projections</li>
              <li>12-Head Self-Attention (12 Blocks)</li>
            </ul>
          </div>
        </div>

        {/* Card ( c ) - Wide Double-Column Card: Oxford-102 ResNet & Pipeline */}
        <div className="apollo-card apollo-card-wide">
          <div className="apollo-card-top">
            <span className="apollo-index">( c )</span>
            <span className="apollo-pill pill-orange">87%+ VAL ACCURACY</span>
          </div>
          <div>
            <h3 className="apollo-card-title">GENERAL PURPOSE BOTANICAL CLASSIFICATION &amp; DATA PIPELINE</h3>
            <p className="apollo-card-body">
              Achieved 87%+ validation accuracy across 102 botanical classes (8,189 images) via ResNet transfer learning. Engineered an automated NumPy and pandas ingestion workflow that slashed preprocessing latency by 40% with stratified dataset splits and dynamic tensor augmentations.
            </p>
            <div className="apollo-badge-row">
              <span className="apollo-pill pill-orange">87%+ VALIDATION</span>
              <span className="apollo-pill">-40% PIPELINE OVERHEAD</span>
              <span className="apollo-pill">8,189 DATASET SAMPLES</span>
              <span className="apollo-pill">ADAMW + COSINE LR</span>
            </div>
          </div>
        </div>

        {/* Card ( d ) - Micrograd Scalar Autograd with Notched Shelf Cutout */}
        <div className="apollo-card apollo-shelf-tr">
          <div className="apollo-pin" aria-hidden="true" />
          <div className="apollo-card-top">
            <span className="apollo-index">( d )</span>
          </div>
          <div>
            <h3 className="apollo-card-title">SCALAR AUTOGRAD ENGINE</h3>
            <p className="apollo-card-body">
              Built dynamic DAG computational graph engine with reverse-mode automatic differentiation from scratch.
            </p>
            <ul className="apollo-card-bullets">
              <li>Dynamic DAG Topological Traversal</li>
              <li>Neuron, Layer, and MLP Modules</li>
              <li>Manual Adjoint Backpropagation</li>
              <li>PyTorch Baseline Machine Parity</li>
            </ul>
          </div>
        </div>

        {/* Card ( e ) - Siamese Signature Verification */}
        <div className="apollo-card">
          <div className="apollo-card-top">
            <span className="apollo-index">( e )</span>
            <span className="apollo-pill pill-orange">95.5% ACCURACY</span>
          </div>
          <div>
            <h3 className="apollo-card-title">ONE-SHOT SIAMESE NETWORK</h3>
            <p className="apollo-card-body">
              Engineered biometric identity verification system reaching 95.5% accuracy at optimal threshold t=0.25 on 2,640 signature pairs.
            </p>
            <ul className="apollo-card-bullets">
              <li>Contrastive Loss Optimization</li>
              <li>CEDAR &amp; ICDAR 2011 Benchmarks</li>
              <li>FAR vs. FRR Sensitivity Trade-off</li>
              <li>OpenCV Stroke Binarization</li>
            </ul>
          </div>
        </div>

        {/* Solid International Vermilion Accent Card - LET'S TALK */}
        <a href="mailto:srisaitej999@gmail.com" className="apollo-card-orange">
          <span className="orange-card-headline">LET&apos;S TALK &rarr;</span>
          <span className="orange-card-sub">OPEN FOR ML &amp; CV RESEARCH</span>
        </a>

        {/* Card ( f ) - Transformer from Scratch with Notched Shelf Cutout */}
        <div className="apollo-card apollo-shelf-tr">
          <div className="apollo-pin" aria-hidden="true" />
          <div className="apollo-card-top">
            <span className="apollo-index">( f )</span>
          </div>
          <div>
            <h3 className="apollo-card-title">TRANSFORMER &amp; CUSTOM BPE</h3>
            <p className="apollo-card-body">
              &lsquo;Attention Is All You Need&rsquo; encoder-decoder with custom BPE tokenizer built from scratch.
            </p>
            <ul className="apollo-card-bullets">
              <li>Custom Byte-Pair Merge Routines</li>
              <li>Multi-Head Self-Attention (d_k=64)</li>
              <li>Cross-Attention Token Verification</li>
              <li>Shakespeare Corpus Validation</li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ==================================================
   SECTION 02: ABOUT & HORIZONTAL WIRE TIMELINE
   ================================================== */
function AboutSection() {
  return (
    <section id="about" className="apollo-section">
      <div className="apollo-header">
        <span className="apollo-tag">/ 02.00 RESEARCH PHILOSOPHY &amp; BACKGROUND</span>
        <h2 className="apollo-title">ABOUT US</h2>
        <p className="apollo-desc">
          Physics undergraduate at the Indian Institute of Technology, Kharagpur with hands-on experience designing and training machine learning systems in PyTorch from first principles. Comfortable across mathematical proofs, computational graphs, raw tensor operations, and embodied robotic action.
        </p>
      </div>

      {/* Apollo Horizontal Wire Timeline */}
      <div className="apollo-timeline-container">
        <div className="apollo-wire-axis" aria-hidden="true" />

        <div className="apollo-timeline-grid">
          {/* Milestone 2023 */}
          <div className="apollo-milestone">
            <div className="apollo-milestone-year">2023</div>
            <div className="apollo-milestone-lens">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="#FF4625" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="20" cy="20" r="4" fill="#FF4625" />
                <path d="M 8 20 L 32 20 M 20 8 L 20 32" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>
            </div>
            <div className="apollo-milestone-info">
              <h4 className="apollo-milestone-head">BHASHYAM COLLEGE, GUNTUR</h4>
              <div className="apollo-milestone-sub">MPC &bull; MATHEMATICS &amp; PHYSICS</div>
              <p className="apollo-milestone-text">
                Rigorous grounding in vector calculus, linear algebra, Newtonian mechanics, and analytical geometry.
              </p>
            </div>
          </div>

          {/* Milestone 2024 */}
          <div className="apollo-milestone">
            <div className="apollo-milestone-year">2024</div>
            <div className="apollo-milestone-lens">
              <svg viewBox="0 0 40 40" fill="none">
                <rect x="8" y="10" width="10" height="10" stroke="#FF4625" strokeWidth="1.5" />
                <rect x="22" y="20" width="10" height="10" stroke="#FF4625" strokeWidth="1.5" />
                <line x1="18" y1="15" x2="22" y2="25" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="apollo-milestone-info">
              <h4 className="apollo-milestone-head">DEEP LEARNING FROM SCRATCH</h4>
              <div className="apollo-milestone-sub">AUTOGRAD &amp; BPE ENGINES</div>
              <p className="apollo-milestone-text">
                Engineered Micrograd scalar autograd engine, custom Byte-Pair Encoding tokenizer, and manual backprop algorithms.
              </p>
            </div>
          </div>

          {/* Milestone 2025 */}
          <div className="apollo-milestone">
            <div className="apollo-milestone-year">2025</div>
            <div className="apollo-milestone-lens">
              <svg viewBox="0 0 40 40" fill="none">
                <polygon points="20,6 34,32 6,32" stroke="#FF4625" strokeWidth="1.5" fill="rgba(255,70,37,0.1)" />
                <circle cx="20" cy="22" r="3" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="apollo-milestone-info">
              <h4 className="apollo-milestone-head">IIT KHARAGPUR</h4>
              <div className="apollo-milestone-sub">B.S. IN PHYSICS (2025–2029)</div>
              <p className="apollo-milestone-text">
                Undergraduate studies in Physics. Implemented ViT-B/16 from scratch, hyperspectral CV tracking, and ResNet transfer learning.
              </p>
            </div>
          </div>

          {/* Milestone 2026+ */}
          <div className="apollo-milestone">
            <div className="apollo-milestone-year">2026+</div>
            <div className="apollo-milestone-lens">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="14" stroke="#FF4625" strokeWidth="1.5" />
                <path d="M 14 20 L 26 20 M 21 15 L 26 20 L 21 25" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="apollo-milestone-info">
              <h4 className="apollo-milestone-head">FUTURE RESEARCH HORIZONS</h4>
              <div className="apollo-milestone-sub">ROBOTICS &amp; EMBODIED VLA</div>
              <p className="apollo-milestone-text">
                Spatial 3D perception, local costmap collision avoidance, and Vision-Language-Action (VLA) continuous robotic policies.
              </p>
            </div>
          </div>
        </div>

        {/* Apollo Full-Width Action Button Strip */}
        <a href="mailto:srisaitej999@gmail.com" className="apollo-timeline-cta-strip">
          [ CONNECT WITH SRI SAI TEJ &bull; srisaitej999@gmail.com &bull; +91 90147 92881 &rarr; ]
        </a>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 03: ARCHITECTURES IN THE LAB (APOLLO NEWS)
   ================================================== */
function FromScratchSection() {
  return (
    <section id="from-scratch" className="apollo-section">
      <div className="apollo-header">
        <span className="apollo-tag">/ 03.00 DEEP LEARNING FROM FIRST PRINCIPLES</span>
        <h2 className="apollo-title">IN THE LAB</h2>
        <p className="apollo-desc">
          Opening the neural network black box. Manual gradient computation, custom autograd engines, and from-scratch Transformer tokenization.
        </p>
      </div>

      <div className="apollo-news-grid">
        {/* Card 1: Transformer & BPE */}
        <div className="apollo-news-card apollo-news-notch-br">
          <div className="apollo-news-pin" aria-hidden="true" />
          <div className="apollo-news-top">
            <div className="apollo-news-tag">ATTENTION IS ALL YOU NEED</div>
            <h3 className="apollo-news-title">TRANSFORMER &amp; CUSTOM BPE TOKENIZER</h3>
            <p className="apollo-news-desc">
              Complete encoder-decoder model built from scratch with custom vocabulary generation, byte-pair merge rules, and multi-head self-attention validated on the Complete Works of Shakespeare.
            </p>
          </div>

          <div className="apollo-news-schematic">
            <svg viewBox="0 0 380 120">
              <rect width="380" height="120" fill="#0A0D10" />
              <rect x="20" y="25" width="85" height="70" fill="#14171E" stroke="#FF4625" rx="2" />
              <text x="26" y="44" fill="#FF4625" fontSize="7.5" fontFamily="monospace">BPE TOKENIZER</text>
              <text x="26" y="62" fill="#8E909A" fontSize="7" fontFamily="monospace">Merge Rules</text>
              <text x="26" y="78" fill="#F4F3EE" fontSize="7" fontFamily="monospace">[T_1 ... T_n]</text>

              <path d="M 115 60 L 135 60" stroke="#FF4625" strokeWidth="1.5" />

              <rect x="145" y="20" width="105" height="80" fill="#14171E" stroke="#FFFFFF" rx="2" />
              <text x="152" y="38" fill="#FFFFFF" fontSize="8" fontFamily="monospace">ENCODER 6× BLOCKS</text>
              <text x="152" y="56" fill="#8E909A" fontSize="7" fontFamily="monospace">Multi-Head (d_k=64)</text>
              <text x="152" y="72" fill="#8E909A" fontSize="7" fontFamily="monospace">LayerNorm &amp; Residual</text>

              <path d="M 260 60 L 275 60" stroke="#FF4625" strokeWidth="1.5" />

              <rect x="285" y="20" width="80" height="80" fill="#14171E" stroke="#FF4625" rx="2" />
              <text x="291" y="38" fill="#FF4625" fontSize="8" fontFamily="monospace">DECODER</text>
              <text x="291" y="56" fill="#8E909A" fontSize="7" fontFamily="monospace">Masked Attn</text>
              <text x="291" y="72" fill="#F4F3EE" fontSize="7" fontFamily="monospace">Softmax Out</text>
            </svg>
          </div>

          <a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer" className="apollo-news-link">
            EXPLORE REPOSITORY &rarr;
          </a>
        </div>

        {/* Card 2: ViT-B/16 Compute Scaling */}
        <div className="apollo-news-card apollo-news-notch-br">
          <div className="apollo-news-pin" aria-hidden="true" />
          <div className="apollo-news-top">
            <div className="apollo-news-tag">COMPUTE SCALING STUDY</div>
            <h3 className="apollo-news-title">VISION TRANSFORMER (ViT-B/16)</h3>
            <p className="apollo-news-desc">
              Reimplemented ViT-B/16 from scratch in PyTorch (~86M params). Investigated scaling behavior and inductive bias dependencies on 6,960 Oxford Flowers-102 samples.
            </p>
          </div>

          <div className="apollo-news-schematic">
            <svg viewBox="0 0 380 120">
              <rect width="380" height="120" fill="#0A0D10" />
              <rect x="20" y="25" width="60" height="60" fill="#14171E" stroke="#FF4625" />
              <line x1="20" y1="45" x2="80" y2="45" stroke="rgba(255,255,255,0.2)" />
              <line x1="20" y1="65" x2="80" y2="65" stroke="rgba(255,255,255,0.2)" />
              <line x1="40" y1="25" x2="40" y2="85" stroke="rgba(255,255,255,0.2)" />
              <line x1="60" y1="25" x2="60" y2="85" stroke="rgba(255,255,255,0.2)" />
              <text x="20" y="102" fill="#8E909A" fontSize="6.5" fontFamily="monospace">196 PATCHES (16×16)</text>

              <path d="M 90 55 L 115 55" stroke="#FF4625" strokeWidth="1.5" />

              <rect x="125" y="25" width="105" height="60" fill="#14171E" stroke="#FFFFFF" rx="2" />
              <text x="133" y="44" fill="#FFFFFF" fontSize="8" fontFamily="monospace">768-D PROJ</text>
              <text x="133" y="60" fill="#FF4625" fontSize="7.5" fontFamily="monospace">+ CLS &amp; POS EMBED</text>

              <path d="M 240 55 L 260 55" stroke="#FF4625" strokeWidth="1.5" />

              <rect x="270" y="20" width="95" height="70" fill="#14171E" stroke="#FF4625" rx="2" />
              <text x="278" y="38" fill="#FF4625" fontSize="8" fontFamily="monospace">12× ENCODERS</text>
              <text x="278" y="54" fill="#8E909A" fontSize="7" fontFamily="monospace">12-Head Self-Attn</text>
              <text x="278" y="70" fill="#8E909A" fontSize="7" fontFamily="monospace">MLP (3072)</text>
            </svg>
          </div>

          <a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer" className="apollo-news-link">
            EXPLORE REPOSITORY &rarr;
          </a>
        </div>

        {/* Card 3: Micrograd Autograd DAG */}
        <div className="apollo-news-card apollo-news-notch-br">
          <div className="apollo-news-pin" aria-hidden="true" />
          <div className="apollo-news-top">
            <div className="apollo-news-tag">CORE MATHEMATICS</div>
            <h3 className="apollo-news-title">MICROGRAD: SCALAR AUTOGRAD ENGINE</h3>
            <p className="apollo-news-desc">
              Dynamic computational graph construction with topological DAG reverse-mode automatic differentiation. Modular Neuron, Layer, and MLP classes verified against PyTorch to machine precision.
            </p>
          </div>

          <div className="apollo-news-schematic">
            <svg viewBox="0 0 380 120">
              <rect width="380" height="120" fill="#0A0D10" />
              <circle cx="45" cy="40" r="14" fill="#14171E" stroke="#FF4625" />
              <text x="39" y="43" fill="#F4F3EE" fontSize="7.5" fontFamily="monospace">x_1</text>

              <circle cx="45" cy="80" r="14" fill="#14171E" stroke="#FF4625" />
              <text x="39" y="83" fill="#F4F3EE" fontSize="7.5" fontFamily="monospace">w_1</text>

              <line x1="59" y1="40" x2="110" y2="60" stroke="rgba(255,255,255,0.2)" />
              <line x1="59" y1="80" x2="110" y2="60" stroke="rgba(255,255,255,0.2)" />

              <circle cx="125" cy="60" r="15" fill="#14171E" stroke="#FFFFFF" />
              <text x="121" y="64" fill="#FFFFFF" fontSize="9" fontFamily="monospace">&times;</text>

              <line x1="140" y1="60" x2="195" y2="60" stroke="rgba(255,255,255,0.2)" />
              <rect x="200" y="45" width="55" height="30" fill="#14171E" stroke="#FF4625" rx="2" />
              <text x="212" y="63" fill="#FF4625" fontSize="8" fontFamily="monospace">tanh</text>

              <line x1="255" y1="60" x2="295" y2="60" stroke="#FF4625" strokeWidth="1.5" />
              <circle cx="310" cy="60" r="14" fill="#14171E" stroke="#FFFFFF" />
              <text x="306" y="63" fill="#FFFFFF" fontSize="8" fontFamily="monospace">L</text>
            </svg>
          </div>

          <a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer" className="apollo-news-link">
            EXPLORE REPOSITORY &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 04: ROBOTICS & 3D PERCEPTION
   ================================================== */
function RoboticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const [robotPos, setRobotPos] = useState({ x: 80, y: 360, angle: -45 });

  const trajectoryD = "M 80 360 C 140 330, 200 370, 320 290 S 460 310, 560 160 S 760 180, 920 100";

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (!pathRef.current) return;
      const length = pathRef.current.getTotalLength();
      const progress = Math.max(0, Math.min(1, (v - 0.15) / 0.6));
      const point = pathRef.current.getPointAtLength(progress * length);

      const lookAhead = Math.min(length, progress * length + 2);
      const nextPoint = pathRef.current.getPointAtLength(lookAhead);
      const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

      setRobotPos({ x: point.x, y: point.y, angle });
    });
  }, [scrollYProgress]);

  return (
    <section id="robotics" className="apollo-section" ref={containerRef}>
      <div className="apollo-header">
        <span className="apollo-tag">/ 04.00 EMBODIED ACTION &amp; SPATIAL AI</span>
        <h2 className="apollo-title">ROBOTICS &amp; 3D</h2>
        <p className="apollo-desc">
          Connecting visual perception with physical agency: spatial 3D voxel representations, local costmap collision avoidance, and Vision-Language-Action (VLA) robotic policies.
        </p>
      </div>

      {/* Interactive Path Planning & Obstacle Costmap Simulation */}
      <div className="apollo-robotics-canvas-wrap">
        <div className="planning-scene-container" role="img" aria-label="Interactive robotics collision avoidance path planning simulation">
          <svg viewBox="0 0 1000 450" className="planning-canvas">
            <defs>
              <pattern id="gridPatternRobotics" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              </pattern>
              <filter id="glowPathApollo">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF4625" floodOpacity="0.9" />
              </filter>
            </defs>

            <rect width="1000" height="450" fill="#07080A" />
            <rect width="1000" height="450" fill="url(#gridPatternRobotics)" />

            {/* Obstacle Costmap Zones */}
            <g>
              <rect x="180" y="160" width="120" height="100" fill="#12151B" stroke="#FF4625" strokeWidth="1" />
              <text x="195" y="215" fill="#FF4625" fontSize="8" fontFamily="monospace">OBS_01 [STATIC COSTMAP]</text>
            </g>

            <g>
              <circle cx="430" cy="270" r="55" fill="#12151B" stroke="#FF4625" strokeWidth="1" />
              <text x="395" y="275" fill="#FF4625" fontSize="8" fontFamily="monospace">OBS_02 [DYNAMIC ZONE]</text>
            </g>

            <g>
              <rect x="650" y="120" width="140" height="90" fill="#12151B" stroke="#FF4625" strokeWidth="1" />
              <text x="665" y="170" fill="#FF4625" fontSize="8" fontFamily="monospace">OBS_03 [BOUNDARY]</text>
            </g>

            {/* Reference Trajectory */}
            <path d={trajectoryD} fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" strokeDasharray="6 6" />

            {/* Active Generated Trajectory */}
            <motion.path
              ref={pathRef}
              d={trajectoryD}
              fill="none"
              stroke="#FF4625"
              strokeWidth="4"
              filter="url(#glowPathApollo)"
              style={{ pathLength: pathScale }}
            />

            {/* Waypoints */}
            <circle cx="80" cy="360" r="5" fill="#070809" stroke="#FFFFFF" strokeWidth="2" />
            <text x="50" y="390" fill="#8E909A" fontSize="9" fontFamily="monospace">START [q_init]</text>

            <circle cx="320" cy="290" r="4" fill="#FF4625" />
            <text x="310" y="275" fill="#8E909A" fontSize="8" fontFamily="monospace">WP_01</text>

            <circle cx="560" cy="160" r="4" fill="#FF4625" />
            <text x="550" y="145" fill="#8E909A" fontSize="8" fontFamily="monospace">WP_02</text>

            <circle cx="920" cy="100" r="8" fill="none" stroke="#FF4625" strokeWidth="2" />
            <circle cx="920" cy="100" r="3" fill="#FF4625" />
            <text x="870" y="80" fill="#FF4625" fontSize="9" fontFamily="monospace">TARGET [q_goal]</text>

            {/* Mobile Robot Agent */}
            <g transform={`translate(${robotPos.x}, ${robotPos.y}) rotate(${robotPos.angle})`}>
              <path d="M 0 0 L 40 -20 L 40 20 Z" fill="rgba(255, 70, 37, 0.12)" stroke="rgba(255, 70, 37, 0.4)" strokeWidth="1" />
              <circle cx="0" cy="0" r="14" fill="#0E1013" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="#FF4625" />
              <line x1="0" y1="0" x2="16" y2="0" stroke="#FF4625" strokeWidth="2" />
            </g>
          </svg>

          <div className="planning-caption mono">
            PERCEPTION-INFORMED TRAJECTORY GENERATION &bull; LOCAL COSTMAP EVALUATION
          </div>
        </div>
      </div>

      {/* 3 Apollo Horizon Cards */}
      <div className="apollo-horizons-grid">
        <div className="apollo-horizon-card">
          <span className="apollo-horizon-num">04.01 // SPATIAL</span>
          <h4>3D PERCEPTION</h4>
          <p>
            Representing physical environments via depth maps, point clouds, and spatial voxel grids. Transitioning from 2D pixel coordinates to metric 3D bounding geometry.
          </p>
        </div>
        <div className="apollo-horizon-card">
          <span className="apollo-horizon-num">04.02 // EMBODIED</span>
          <h4>ROBOTIC TRAJECTORY PLANNING</h4>
          <p>
            Autonomous obstacle avoidance and path generation across dynamic local costmaps. Coordinating perception inputs with real-time kinodynamic constraints.
          </p>
        </div>
        <div className="apollo-horizon-card">
          <span className="apollo-horizon-num">04.03 // MULTIMODAL</span>
          <h4>VISION-LANGUAGE-ACTION (VLA)</h4>
          <p>
            Investigating end-to-end multimodal policies that ground natural language instructions directly into robotic manipulation and continuous action tokens.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 05: TECHNICAL COMPETENCIES (APOLLO CHASSIS)
   ================================================== */
function SkillsSection() {
  return (
    <section id="skills" className="apollo-section">
      <div className="apollo-header">
        <span className="apollo-tag">/ 05.00 TECHNICAL MATRIX</span>
        <h2 className="apollo-title">COMPETENCIES</h2>
        <p className="apollo-desc">
          Core languages, deep learning architectures, and classical machine learning methods verified across hands-on implementations.
        </p>
      </div>

      <div className="apollo-skills-grid">
        {/* Category 1: Core Stack */}
        <div className="apollo-skill-chassis">
          <div className="apollo-skill-header">
            <span className="apollo-skill-cat">01 // CORE &amp; LANGUAGES</span>
          </div>
          <ul className="apollo-skill-items">
            <li><span>Python</span> <span className="apollo-skill-pill pill-hot">Primary</span></li>
            <li><span>PyTorch</span> <span className="apollo-skill-pill pill-hot">From Scratch</span></li>
            <li><span>NumPy</span> <span className="apollo-skill-pill">Linear Algebra</span></li>
            <li><span>pandas</span> <span className="apollo-skill-pill">Pipelines</span></li>
            <li><span>scikit-learn</span> <span className="apollo-skill-pill">ML Baseline</span></li>
            <li><span>OpenCV</span> <span className="apollo-skill-pill">Preprocessing</span></li>
            <li><span>Git / GitHub</span> <span className="apollo-skill-pill">Version Control</span></li>
          </ul>
        </div>

        {/* Category 2: Deep Learning */}
        <div className="apollo-skill-chassis">
          <div className="apollo-skill-header">
            <span className="apollo-skill-cat">02 // DEEP LEARNING</span>
          </div>
          <ul className="apollo-skill-items">
            <li><span>Transformers</span> <span className="apollo-skill-pill pill-hot">From Scratch</span></li>
            <li><span>Vision Transformers</span> <span className="apollo-skill-pill pill-hot">ViT-B/16</span></li>
            <li><span>CNN &amp; ResNet</span> <span className="apollo-skill-pill">Transfer Learning</span></li>
            <li><span>LSTM &amp; Sequence</span> <span className="apollo-skill-pill">Time Series</span></li>
            <li><span>Siamese Networks</span> <span className="apollo-skill-pill">Contrastive Loss</span></li>
            <li><span>Self-Attention</span> <span className="apollo-skill-pill">Multi-Head</span></li>
            <li><span>BPE Tokenization</span> <span className="apollo-skill-pill pill-hot">From Scratch</span></li>
          </ul>
        </div>

        {/* Category 3: Classical ML & Methods */}
        <div className="apollo-skill-chassis">
          <div className="apollo-skill-header">
            <span className="apollo-skill-cat">03 // MACHINE LEARNING</span>
          </div>
          <ul className="apollo-skill-items">
            <li><span>Supervised Learning</span> <span className="apollo-skill-pill">Classification</span></li>
            <li><span>Unsupervised Learning</span> <span className="apollo-skill-pill">Clustering</span></li>
            <li><span>Transfer Learning</span> <span className="apollo-skill-pill">Pretrained</span></li>
            <li><span>Time Series Modeling</span> <span className="apollo-skill-pill">Multivariate</span></li>
            <li><span>Support Vector Machines</span> <span className="apollo-skill-pill">RBF Kernel</span></li>
            <li><span>Manual Backprop</span> <span className="apollo-skill-pill pill-hot">Autograd DAG</span></li>
            <li><span>FAR &amp; FRR Evaluation</span> <span className="apollo-skill-pill">ROC Metrics</span></li>
          </ul>
        </div>

        {/* Category 4: Research Directions */}
        <div className="apollo-skill-chassis">
          <div className="apollo-skill-header">
            <span className="apollo-skill-cat">04 // RESEARCH DIRECTIONS</span>
          </div>
          <ul className="apollo-skill-items">
            <li><span>Computer Vision</span> <span className="apollo-skill-pill pill-hot">Primary Focus</span></li>
            <li><span>Object Detection &amp; Tracking</span> <span className="apollo-skill-pill pill-hot">Real-Time</span></li>
            <li><span>3D Spatial Perception</span> <span className="apollo-skill-pill">Metric Geometry</span></li>
            <li><span>Generative Modeling</span> <span className="apollo-skill-pill">Latent Priors</span></li>
            <li><span>Multimodal Learning</span> <span className="apollo-skill-pill">Vision-Language</span></li>
            <li><span>Robotics &amp; VLA</span> <span className="apollo-skill-pill pill-hot">Embodied Policies</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   FOOTER: ICONIC FULL-BLEED INTERNATIONAL VERMILION BANNER
   ================================================== */
function Footer() {
  return (
    <footer className="apollo-footer-banner">
      <div className="apollo-footer-cta-wrap">
        <a href="mailto:srisaitej999@gmail.com" className="apollo-giant-cta">
          <span>Get in Touch</span>
          <span className="apollo-cta-arrow">&rarr;</span>
        </a>
      </div>

      <div className="apollo-footer-cols">
        <div className="apollo-footer-brand">
          <h4>KADIMI SRI SAI TEJ</h4>
          <p>PHYSICS UNDERGRADUATE @ IIT KHARAGPUR // ML &amp; COMPUTER VISION</p>
        </div>

        <div className="apollo-footer-col">
          <h5>RESEARCH</h5>
          <ul>
            <li><a href="#vision">Computer Vision</a></li>
            <li><a href="#from-scratch">Transformers &amp; ViT</a></li>
            <li><a href="#robotics">Robotics &amp; 3D</a></li>
            <li><a href="#skills">Competencies</a></li>
          </ul>
        </div>

        <div className="apollo-footer-col">
          <h5>CONNECT</h5>
          <ul>
            <li><a href="mailto:srisaitej999@gmail.com">srisaitej999@gmail.com</a></li>
            <li><a href="tel:+919014792881">+91 90147 92881</a></li>
            <li><a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
            <li><a href="https://www.linkedin.com/in/sri-sai-tej/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          </ul>
        </div>

        <div className="apollo-footer-col">
          <h5>ACADEMIC</h5>
          <ul>
            <li><a href="#about">IIT Kharagpur (2025–2029)</a></li>
            <li><a href="#about">B.S. in Physics</a></li>
            <li><a href="#about">Bhashyam College (MPC)</a></li>
            <li><a href="#about">Hyderabad, India</a></li>
          </ul>
        </div>
      </div>

      <div className="apollo-footer-bottom-bar">
        <span>&copy; {new Date().getFullYear()} KADIMI SRI SAI TEJ &bull; IIT KHARAGPUR</span>
        <span>DESIGN INSPIRED BY APOLLO &bull; INTERNATIONAL VERMILION &bull; WCAG 2.2 AA</span>
      </div>
    </footer>
  );
}


/* ==================================================
   ROOT PAGE
   ================================================== */
export default function Home() {
  const [introPhase, setIntroPhase] = useState<IntroPhase>("black");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIntroPhase("complete");
      return;
    }

    const t1 = setTimeout(() => setIntroPhase("construct"), 400);
    const t2 = setTimeout(() => setIntroPhase("settle"), 1400);
    const t3 = setTimeout(() => setIntroPhase("grid"), 2200);
    const t4 = setTimeout(() => setIntroPhase("transition"), 3100);
    const t5 = setTimeout(() => setIntroPhase("complete"), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [prefersReduced]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && introPhase !== "complete") {
        setIntroPhase("complete");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [introPhase]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main>
      <Noise />
      <DenmuGrid introPhase={introPhase} />
      <DenmuHero
        prefersReduced={!!prefersReduced}
        introPhase={introPhase}
        onSkipIntro={() => setIntroPhase("complete")}
      />
      <VisionSection />
      <FromScratchSection />
      <RoboticsSection />
      <SkillsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
