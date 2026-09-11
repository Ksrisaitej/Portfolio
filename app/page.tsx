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
              GitHub &nearr;
            </a>
            <a href="https://www.linkedin.com/in/sri-sai-tej/" target="_blank" rel="noopener noreferrer" className="hud-pill link-hover">
              LinkedIn &nearr;
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
   CV TRACKING VIEWPORT (INTERACTIVE SIMULATION)
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
        <span>PIPELINE: YOLO + DEEPSORT + KALMAN FILTER</span>
        <span>LATENCY: 14.2ms // 68.4 FPS</span>
      </div>
    </div>
  );
}

/* ==================================================
   SECTION 01: COMPUTER VISION & OBJECT TRACKING
   ================================================== */
function VisionSection() {
  return (
    <section id="vision" className="section perception">
      <SectionHeader
        n="01"
        label="COMPUTER VISION &amp; TRACKING"
        title={"MAKE THE\nINVISIBLE LEGIBLE."}
        body="My primary research interest. Building deep visual perception pipelines that locate, decompose, and persistently track entities across multi-spectral feeds and complex spatial environments."
      />

      <div className="taxonomy mono">
        <span>OBJECT DETECTION</span>
        <span>OBJECT TRACKING</span>
        <span>VISION TRANSFORMER (ViT-B/16)</span>
        <span>RESNET-50</span>
        <span>HYPERSPECTRAL DECOMPOSITION</span>
        <span>KALMAN STATE ESTIMATION</span>
      </div>

      {/* Feature Project 1: Hyperspectral Object Tracking */}
      <div className="feature-project">
        <div className="project-side mono">
          <span>ID: 04 // TARGET</span>
          <span>ID: 02 // CANDIDATE</span>
          <span>F_017 &rarr; F_018 &rarr; F_019</span>
          <span>DETECT &rarr; ASSOCIATE &rarr; TRACK</span>
        </div>

        <CVTrackingView />

        <div className="project-copy">
          <div className="mono small-label">PRIMARY FOCUS / DETECTION &amp; TRACKING</div>
          <h3>HYPERSPECTRAL<br />OBJECT TRACKING</h3>
          <p>
            Investigation into multi-object detection and persistent tracking across multi-spectral visual feeds using deep feature embeddings, state estimation, and spatial association with Kalman filtering.
          </p>
          <div className="tech mono">
            <span>YOLO</span>
            <span>DEEPSORT</span>
            <span>KALMAN FILTER</span>
            <span>PYTORCH</span>
            <span>OPENCV</span>
          </div>
        </div>
      </div>

      {/* CV Resume Highlights Grid: ViT-B/16 & Oxford-102 */}
      <div className="cv-resume-grid">
        {/* Project 2: Vision Transformer (ViT-B/16) from Scratch */}
        <div className="resume-project-card">
          <div className="card-top-hud mono">
            <span className="card-index">01.02 // ARCHITECTURE FROM SCRATCH</span>
            <span className="card-badge">~86M PARAMETERS</span>
          </div>
          <h3 className="card-title">VISION TRANSFORMER (ViT-B/16) FROM SCRATCH</h3>
          <p className="card-summary">
            Reimplemented the complete ViT-B/16 architecture from scratch in PyTorch without library abstractions. Engineered patch embedding for 196 (16×16) image patches, 768-dimensional latent projections, 12-head self-attention mechanisms, and 12 Transformer encoder blocks.
          </p>

          {/* Technical Schematic: ViT Patch & Attention Pipeline */}
          <div className="schematic-box">
            <svg viewBox="0 0 380 150" className="inner-svg">
              <rect width="380" height="150" fill="#06080A" />
              {/* Image to Patches */}
              <g transform="translate(15, 20)">
                <rect x="0" y="0" width="70" height="70" fill="#0E1217" stroke="#3F5CFF" strokeWidth="1" />
                <line x1="0" y1="23" x2="70" y2="23" stroke="rgba(255,255,255,0.15)" />
                <line x1="0" y1="47" x2="70" y2="47" stroke="rgba(255,255,255,0.15)" />
                <line x1="23" y1="0" x2="23" y2="70" stroke="rgba(255,255,255,0.15)" />
                <line x1="47" y1="0" x2="47" y2="70" stroke="rgba(255,255,255,0.15)" />
                <rect x="23" y="23" width="24" height="24" fill="rgba(63, 92, 255, 0.3)" stroke="#3F5CFF" />
                <text x="2" y="85" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">196 PATCHES (16×16)</text>
              </g>

              {/* Arrow */}
              <path d="M 95 55 L 115 55" stroke="#3F5CFF" strokeWidth="1.5" />

              {/* Linear Projection + Positional Encodings */}
              <g transform="translate(120, 20)">
                <rect x="0" y="10" width="80" height="50" fill="#0E1217" stroke="rgba(255,255,255,0.15)" rx="2" />
                <text x="6" y="28" fill="#F2F1ED" fontSize="8" fontFamily="monospace">LINEAR PROJ</text>
                <text x="6" y="42" fill="#3F5CFF" fontSize="7.5" fontFamily="monospace">768-D EMBED</text>
                <text x="6" y="54" fill="#C8F542" fontSize="7" fontFamily="monospace">+ [CLS] TOKEN</text>
              </g>

              {/* Arrow */}
              <path d="M 205 55 L 225 55" stroke="#3F5CFF" strokeWidth="1.5" />

              {/* Transformer Encoder 12x */}
              <g transform="translate(230, 15)">
                <rect x="0" y="0" width="135" height="75" fill="#0E1217" stroke="#C8F542" rx="2" />
                <text x="8" y="18" fill="#C8F542" fontSize="8.5" fontFamily="monospace" fontWeight="bold">12× ENCODER BLOCKS</text>
                <text x="8" y="34" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">&bull; 12-HEAD SELF-ATTN</text>
                <text x="8" y="48" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">&bull; MLP (3072 HIDDEN)</text>
                <text x="8" y="62" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">&bull; LAYER NORM + RESIDUAL</text>
              </g>

              <line x1="15" y1="110" x2="365" y2="110" stroke="rgba(255,255,255,0.08)" />
              <text x="15" y="132" fill="#8C8D88" fontSize="8" fontFamily="monospace">
                COMPUTE-SCALING STUDY // 6,960 OXFORD-102 IMAGES // 39.65% TEST ACC (EPOCH 18)
              </text>
            </svg>
          </div>

          <div className="card-points">
            <p>
              &bull; <b>Compute &amp; Scaling Study:</b> Conducted controlled empirical experiments on 6,960 Oxford Flowers-102 images to investigate ViT’s dependency on dataset scale and compute budget, attaining 39.65% test accuracy under constrained training.
            </p>
            <p>
              &bull; <b>Manual Tensor Operations:</b> Implemented patch slicing, linear projection, learnable class tokens, 1D positional encodings, and multi-head attention entirely in raw PyTorch.
            </p>
          </div>

          <div className="tech mono">
            <span>PYTHON</span>
            <span>PYTORCH</span>
            <span>SELF-ATTENTION</span>
            <span>ViT-B/16</span>
            <span>OXFORD FLOWERS-102</span>
          </div>
        </div>

        {/* Project 3: Oxford-102 Flower Classification */}
        <div className="resume-project-card">
          <div className="card-top-hud mono">
            <span className="card-index">01.03 // TRANSFER LEARNING &amp; PIPELINE</span>
            <span className="card-badge">87%+ VAL ACCURACY</span>
          </div>
          <h3 className="card-title">OXFORD-102 RESNET FINE-TUNING &amp; DATA PIPELINE</h3>
          <p className="card-summary">
            Achieved 87%+ validation accuracy across 102 fine-grained botanical categories (8,189 images) via ResNet transfer learning, fine-tuned pretrained feature extractors, and hyperparameter optimization.
          </p>

          {/* Technical Schematic: ResNet Residual Skip & Metric */}
          <div className="schematic-box">
            <svg viewBox="0 0 380 150" className="inner-svg">
              <rect width="380" height="150" fill="#06080A" />

              {/* Residual Skip Block */}
              <g transform="translate(20, 20)">
                <rect x="0" y="15" width="65" height="30" fill="#0E1217" stroke="rgba(255,255,255,0.15)" rx="2" />
                <text x="6" y="34" fill="#F2F1ED" fontSize="8" fontFamily="monospace">CONV 3×3</text>

                <line x1="65" y1="30" x2="85" y2="30" stroke="#3F5CFF" strokeWidth="1.2" />

                <rect x="85" y="15" width="65" height="30" fill="#0E1217" stroke="rgba(255,255,255,0.15)" rx="2" />
                <text x="91" y="34" fill="#F2F1ED" fontSize="8" fontFamily="monospace">CONV 3×3</text>

                {/* Residual Arc */}
                <path d="M 32 15 C 32 -2, 117 -2, 117 15" fill="none" stroke="#C8F542" strokeWidth="1.4" strokeDasharray="3 2" />
                <text x="62" y="8" fill="#C8F542" fontSize="7" fontFamily="monospace">x + F(x)</text>
              </g>

              {/* Pipeline Metric */}
              <g transform="translate(195, 18)">
                <rect x="0" y="0" width="165" height="65" fill="#0E1217" stroke="rgba(63, 92, 255, 0.3)" rx="2" />
                <text x="10" y="18" fill="#C8F542" fontSize="8" fontFamily="monospace">PIPELINE OPTIMIZATION</text>
                <text x="10" y="36" fill="#F2F1ED" fontSize="14" fontFamily="monospace" fontWeight="bold">-40% LATENCY</text>
                <text x="10" y="52" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">NUMPY / PANDAS AUGMENTATION</text>
              </g>

              <line x1="20" y1="105" x2="360" y2="105" stroke="rgba(255,255,255,0.08)" />
              <text x="20" y="128" fill="#8C8D88" fontSize="8" fontFamily="monospace">
                DATASET: 8,189 SAMPLES // AUTOMATED SPLIT // ADAMW WITH COSINE ANNEALING
              </text>
            </svg>
          </div>

          <div className="card-points">
            <p>
              &bull; <b>40% Faster Data Pipeline:</b> Slashed preprocessing overhead by 40% by engineering an automated NumPy and pandas dataset ingestion workflow with stratified splits and real-time tensor augmentations.
            </p>
            <p>
              &bull; <b>Fine-Grained Classification:</b> Overcame intra-class variance through cosine learning rate decay and targeted layer unfreezing across deep residual blocks.
            </p>
          </div>

          <div className="tech mono">
            <span>PYTORCH</span>
            <span>RESNET</span>
            <span>TRANSFER LEARNING</span>
            <span>NUMPY</span>
            <span>PANDAS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 02: DEEP LEARNING FROM FIRST PRINCIPLES
   ================================================== */
function FromScratchSection() {
  return (
    <section id="from-scratch" className="section learning">
      <SectionHeader
        n="02"
        label="DEEP LEARNING FROM SCRATCH"
        title={"OPEN THE BOX.\nBUILD THE THING."}
        body="Understanding neural network architectures from the ground up. Manual gradient computation, custom autograd engines, and from-scratch Transformer tokenization without library black boxes."
      />

      <div className="from-scratch-showcase">
        {/* Deep Project 1: Transformer from Scratch */}
        <div className="deep-project-card">
          <div className="deep-header">
            <div>
              <span className="mono tag-pill">ATTENTION IS ALL YOU NEED</span>
              <h3 className="deep-title">TRANSFORMER FROM SCRATCH &amp; CUSTOM BPE TOKENIZER</h3>
            </div>
            <div className="mono stat-badge">COMPLETE WORKS OF SHAKESPEARE</div>
          </div>

          <p className="deep-desc">
            Implemented a complete encoder-decoder Transformer architecture from scratch following <i>‘Attention Is All You Need’</i>, with manual gradient computations, multi-head self-attention mechanisms, and custom tokenization.
          </p>

          <div className="deep-grid-metrics">
            <div className="metric-box">
              <span className="metric-num">BPE</span>
              <span className="metric-label mono">CUSTOM TOKENIZER</span>
              <p className="metric-sub">Built vocabulary generation, byte-pair merge rules, and encode/decode routines from scratch.</p>
            </div>
            <div className="metric-box">
              <span className="metric-num">d_k = 64</span>
              <span className="metric-label mono">MULTI-HEAD ATTENTION</span>
              <p className="metric-sub">Scaled dot-product attention QK^T / &radic;d_k with residual adds and LayerNorm.</p>
            </div>
            <div className="metric-box">
              <span className="metric-num">MAPS</span>
              <span className="metric-label mono">CROSS-ATTENTION VERIFICATION</span>
              <p className="metric-sub">Visualized attention weights across layers to confirm semantic token alignment during generation.</p>
            </div>
          </div>

          {/* Transformer Architecture Diagram */}
          <div className="schematic-box">
            <svg viewBox="0 0 780 180" className="inner-svg">
              <rect width="780" height="180" fill="#06080A" />

              {/* BPE Stage */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="160" height="110" fill="#0A0D10" stroke="#3F5CFF" rx="2" />
                <text x="12" y="24" fill="#3F5CFF" fontSize="9" fontFamily="monospace" fontWeight="bold">BPE TOKENIZER</text>
                <text x="12" y="44" fill="#8C8D88" fontSize="8" fontFamily="monospace">&bull; Raw Text Stream</text>
                <text x="12" y="60" fill="#8C8D88" fontSize="8" fontFamily="monospace">&bull; Merge Operations</text>
                <text x="12" y="76" fill="#8C8D88" fontSize="8" fontFamily="monospace">&bull; Vocabulary Builder</text>
                <text x="12" y="94" fill="#F2F1ED" fontSize="8" fontFamily="monospace">Tokens: [T_1 ... T_n]</text>
              </g>

              <path d="M 195 80 L 225 80" stroke="#3F5CFF" strokeWidth="1.5" />

              {/* Encoder Block */}
              <g transform="translate(230, 25)">
                <rect x="0" y="0" width="220" height="110" fill="#0A0D10" stroke="rgba(255,255,255,0.15)" rx="2" />
                <text x="12" y="24" fill="#F2F1ED" fontSize="9" fontFamily="monospace" fontWeight="bold">ENCODER STACK</text>
                <rect x="12" y="36" width="196" height="26" fill="#11141A" stroke="rgba(255,255,255,0.1)" rx="2" />
                <text x="20" y="53" fill="#C8F542" fontSize="8" fontFamily="monospace">MULTI-HEAD SELF-ATTN (Q, K, V)</text>
                <rect x="12" y="70" width="196" height="26" fill="#11141A" stroke="rgba(255,255,255,0.1)" rx="2" />
                <text x="20" y="87" fill="#8C8D88" fontSize="8" fontFamily="monospace">FEED-FORWARD + LAYER NORM</text>
              </g>

              <path d="M 455 80 L 485 80" stroke="#3F5CFF" strokeWidth="1.5" />

              {/* Decoder Block */}
              <g transform="translate(490, 25)">
                <rect x="0" y="0" width="255" height="110" fill="#0A0D10" stroke="#C8F542" rx="2" />
                <text x="12" y="24" fill="#C8F542" fontSize="9" fontFamily="monospace" fontWeight="bold">DECODER STACK</text>
                <rect x="12" y="34" width="230" height="22" fill="#11141A" stroke="rgba(255,255,255,0.1)" rx="2" />
                <text x="20" y="49" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">MASKED SELF-ATTENTION</text>
                <rect x="12" y="60" width="230" height="22" fill="#11141A" stroke="#3F5CFF" rx="2" />
                <text x="20" y="75" fill="#3F5CFF" fontSize="7.5" fontFamily="monospace">CROSS-ATTENTION (ENC &rarr; DEC)</text>
                <rect x="12" y="86" width="230" height="20" fill="#11141A" stroke="rgba(255,255,255,0.1)" rx="2" />
                <text x="20" y="100" fill="#F2F1ED" fontSize="7.5" fontFamily="monospace">LINEAR + SOFTMAX OUTPUT</text>
              </g>

              <line x1="30" y1="150" x2="745" y2="150" stroke="rgba(255,255,255,0.08)" />
              <text x="30" y="168" fill="#8C8D88" fontSize="8" fontFamily="monospace">
                TRAINED ON SHAKESPEARE // MANUAL GRADIENT COMPUTATION // ATTENTION PROJECTION WEIGHTS VERIFIED
              </text>
            </svg>
          </div>

          <div className="tech mono">
            <span>PYTHON</span>
            <span>NUMPY</span>
            <span>PYTORCH</span>
            <span>BPE TOKENIZATION</span>
            <span>SHAKESPEARE CORPUS</span>
          </div>
        </div>

        {/* Deep Project 2 & 3: Micrograd & Siamese Network */}
        <div className="cv-resume-grid">
          {/* Micrograd */}
          <div className="resume-project-card">
            <div className="card-top-hud mono">
              <span className="card-index">02.02 // CORE MATHEMATICS</span>
              <span className="card-badge">AUTOGRAD ENGINE</span>
            </div>
            <h3 className="card-title">MICROGRAD: SCALAR AUTOGRAD ENGINE</h3>
            <p className="card-summary">
              Built a scalar-valued automatic differentiation engine from scratch in Python, implementing dynamic computational graph construction and reverse-mode automatic differentiation.
            </p>

            <div className="schematic-box">
              <svg viewBox="0 0 380 140" className="inner-svg">
                <rect width="380" height="140" fill="#06080A" />

                {/* DAG Nodes */}
                <g transform="translate(30, 20)">
                  <circle cx="30" cy="25" r="16" fill="#11141A" stroke="#3F5CFF" />
                  <text x="22" y="28" fill="#F2F1ED" fontSize="8" fontFamily="monospace">x_1</text>

                  <circle cx="30" cy="85" r="16" fill="#11141A" stroke="#3F5CFF" />
                  <text x="22" y="88" fill="#F2F1ED" fontSize="8" fontFamily="monospace">w_1</text>

                  {/* Multiply */}
                  <line x1="46" y1="25" x2="90" y2="55" stroke="rgba(255,255,255,0.2)" />
                  <line x1="46" y1="85" x2="90" y2="55" stroke="rgba(255,255,255,0.2)" />
                  <circle cx="105" cy="55" r="16" fill="#11141A" stroke="#C8F542" />
                  <text x="100" y="58" fill="#C8F542" fontSize="9" fontFamily="monospace">&times;</text>

                  {/* Add Bias */}
                  <circle cx="105" cy="110" r="14" fill="#11141A" stroke="#3F5CFF" />
                  <text x="101" y="113" fill="#F2F1ED" fontSize="7.5" fontFamily="monospace">b</text>

                  <line x1="121" y1="55" x2="165" y2="75" stroke="rgba(255,255,255,0.2)" />
                  <line x1="119" y1="110" x2="165" y2="75" stroke="rgba(255,255,255,0.2)" />
                  <circle cx="180" cy="75" r="16" fill="#11141A" stroke="#C8F542" />
                  <text x="176" y="78" fill="#C8F542" fontSize="9" fontFamily="monospace">+</text>

                  {/* Tanh Activation */}
                  <line x1="196" y1="75" x2="235" y2="75" stroke="rgba(255,255,255,0.2)" />
                  <rect x="235" y="60" width="55" height="30" fill="#11141A" stroke="#38BDF8" rx="2" />
                  <text x="244" y="78" fill="#38BDF8" fontSize="8" fontFamily="monospace">tanh</text>

                  {/* Output Node */}
                  <line x1="290" y1="75" x2="315" y2="75" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="328" cy="75" r="13" fill="#11141A" stroke="#F2F1ED" />
                  <text x="323" y="78" fill="#F2F1ED" fontSize="8" fontFamily="monospace">L</text>
                </g>

                <text x="20" y="128" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">
                  BACKPROP: Adjoint &part;L/&part;x computed via topological DAG traversal + SGD update loop
                </text>
              </svg>
            </div>

            <div className="card-points">
              <p>
                &bull; <b>Full Neural Net Framework:</b> Engineered modular <code>Neuron</code>, <code>Layer</code>, and <code>MLP</code> classes on top of the autograd core with gradient zeroing and parameter updates.
              </p>
              <p>
                &bull; <b>PyTorch Baseline Parity:</b> Numerically verified forward outputs and backward gradients against official PyTorch autograd computations to machine precision.
              </p>
            </div>

            <div className="tech mono">
              <span>PYTHON</span>
              <span>COMPUTATIONAL GRAPH</span>
              <span>AUTOMATIC DIFFERENTIATION</span>
              <span>NEURAL NETWORKS</span>
            </div>
          </div>

          {/* Siamese Network */}
          <div className="resume-project-card">
            <div className="card-top-hud mono">
              <span className="card-index">02.03 // ONE-SHOT VERIFICATION</span>
              <span className="card-badge">95.5% ACCURACY</span>
            </div>
            <h3 className="card-title">SIAMESE SIGNATURE VERIFICATION NETWORK</h3>
            <p className="card-summary">
              Engineered biometric identity verification system reaching 95.5% accuracy at optimal threshold t=0.25, implementing a Siamese CNN with contrastive loss on 2,640 signature pairs.
            </p>

            <div className="schematic-box">
              <svg viewBox="0 0 380 140" className="inner-svg">
                <rect width="380" height="140" fill="#06080A" />

                {/* Signature input samples */}
                <g transform="translate(20, 20)">
                  <rect x="0" y="0" width="90" height="35" fill="#0E1217" stroke="rgba(56, 189, 248, 0.3)" rx="2" />
                  <path d="M 10 24 C 25 10, 35 30, 50 15 S 70 28, 80 18" fill="none" stroke="#F2F1ED" strokeWidth="1.4" />
                  <text x="6" y="10" fill="#38BDF8" fontSize="6.5" fontFamily="monospace">GENUINE (X1)</text>

                  <rect x="0" y="50" width="90" height="35" fill="#0E1217" stroke="rgba(255, 255, 255, 0.15)" rx="2" />
                  <path d="M 10 24 C 25 10, 35 30, 50 15 S 70 28, 80 18" fill="none" stroke="#8C8D88" strokeWidth="1.4" strokeDasharray="3 2" />
                  <text x="6" y="10" fill="#8C8D88" fontSize="6.5" fontFamily="monospace">FORGED (X2)</text>
                </g>

                {/* Distance & Metric */}
                <g transform="translate(135, 20)">
                  <rect x="0" y="15" width="80" height="55" fill="#0E1217" stroke="#38BDF8" rx="2" />
                  <text x="6" y="32" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">CONTRASTIVE</text>
                  <text x="6" y="44" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">LOSS L(D_w)</text>
                  <text x="6" y="58" fill="#F2F1ED" fontSize="8" fontFamily="monospace">t = 0.25</text>

                  <line x1="80" y1="42" x2="110" y2="42" stroke="#38BDF8" strokeWidth="1.5" />

                  <rect x="110" y="27" width="105" height="32" fill="#0E1217" stroke="#10B981" rx="2" />
                  <text x="116" y="42" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">95.5% ACCURACY</text>
                  <text x="116" y="53" fill="#8C8D88" fontSize="6.5" fontFamily="monospace">FAR/FRR BALANCED</text>
                </g>

                <text x="20" y="124" fill="#8C8D88" fontSize="7.5" fontFamily="monospace">
                  DATASET: 2,640 PAIRS (CEDAR/ICDAR) // OPENCV BINARIZATION &amp; CONTOUR NORMALIZATION
                </text>
              </svg>
            </div>

            <div className="card-points">
              <p>
                &bull; <b>Error Rate Quantification:</b> Mapped the trade-off between False Accept Rate (FAR) and False Reject Rate (FRR) across 10+ threshold values to locate optimal operating sensitivity.
              </p>
              <p>
                &bull; <b>Image Preprocessing:</b> Built an automated OpenCV pipeline for stroke binarization, noise attenuation, and contour aspect ratio normalization.
              </p>
            </div>

            <div className="tech mono">
              <span>PYTORCH</span>
              <span>CONTRASTIVE LOSS</span>
              <span>OPENCV</span>
              <span>CEDAR / ICDAR 2011</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 03: FUTURE HORIZONS (ROBOTICS, 3D & VLA)
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
    <section id="robotics" className="section action" ref={containerRef}>
      <SectionHeader
        n="03"
        label="FUTURE RESEARCH HORIZONS"
        title={"ROBOTICS, 3D PERCEPTION\n&amp; EMBODIED ACTION."}
        body="Connecting computer vision with the physical world: spatial 3D perception, local costmap collision avoidance, and Vision-Language-Action (VLA) robotic policies."
      />

      {/* Interactive Path Planning & Obstacle Costmap Simulation */}
      <div className="planning-scene-container" role="img" aria-label="Interactive robotics collision avoidance path planning simulation">
        <svg viewBox="0 0 1000 450" className="planning-canvas">
          <defs>
            <pattern id="gridPatternRobotics" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
            <filter id="glowPath">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3F5CFF" floodOpacity="0.8" />
            </filter>
          </defs>

          <rect width="1000" height="450" fill="#07080A" />
          <rect width="1000" height="450" fill="url(#gridPatternRobotics)" />

          {/* Obstacle Costmap Zones */}
          <g>
            <rect x="180" y="160" width="120" height="100" fill="#0E1217" stroke="rgba(255, 255, 255, 0.15)" />
            <text x="200" y="215" fill="#8C8D88" fontSize="8" fontFamily="monospace">OBS_01 [STATIC]</text>
          </g>

          <g>
            <circle cx="430" cy="270" r="55" fill="#0E1217" stroke="rgba(255, 255, 255, 0.15)" />
            <text x="400" y="275" fill="#8C8D88" fontSize="8" fontFamily="monospace">OBS_02 [ZONE]</text>
          </g>

          <g>
            <rect x="650" y="120" width="140" height="90" fill="#0E1217" stroke="rgba(255, 255, 255, 0.15)" />
            <text x="670" y="170" fill="#8C8D88" fontSize="8" fontFamily="monospace">OBS_03 [BOUNDARY]</text>
          </g>

          {/* Reference Static Trajectory */}
          <path d={trajectoryD} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="6 6" />

          {/* Active Generated Trajectory */}
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
          <text x="55" y="390" fill="#8C8D88" fontSize="9" fontFamily="monospace">START [q_init]</text>

          <circle cx="320" cy="290" r="4" fill="#3F5CFF" />
          <text x="310" y="275" fill="#8C8D88" fontSize="8" fontFamily="monospace">WP_01</text>

          <circle cx="560" cy="160" r="4" fill="#3F5CFF" />
          <text x="550" y="145" fill="#8C8D88" fontSize="8" fontFamily="monospace">WP_02</text>

          <circle cx="920" cy="100" r="7" fill="none" stroke="#3F5CFF" strokeWidth="1.5" />
          <circle cx="920" cy="100" r="3" fill="#3F5CFF" />
          <text x="880" y="80" fill="#3F5CFF" fontSize="9" fontFamily="monospace">TARGET [q_goal]</text>

          {/* Mobile Robot Agent */}
          <g transform={`translate(${robotPos.x}, ${robotPos.y}) rotate(${robotPos.angle})`}>
            <path d="M 0 0 L 40 -20 L 40 20 Z" fill="rgba(63, 92, 255, 0.08)" stroke="rgba(63, 92, 255, 0.3)" strokeWidth="1" />
            <circle cx="0" cy="0" r="13" fill="#0F1114" stroke="#F2F1ED" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="5" fill="#3F5CFF" />
            <line x1="0" y1="0" x2="16" y2="0" stroke="#526CFF" strokeWidth="1.5" />
          </g>
        </svg>

        <div className="planning-caption mono">
          PERCEPTION-INFORMED TRAJECTORY GENERATION &bull; LOCAL COSTMAP EVALUATION
        </div>
      </div>

      {/* 3 Research Focus Cards */}
      <div className="horizons-grid">
        <div className="horizon-card">
          <span className="mono horizon-num">03.01 // SPATIAL</span>
          <h4>3D PERCEPTION</h4>
          <p>
            Representing physical environments via depth maps, point clouds, and spatial voxel grids. Transitioning from 2D pixel coordinates to metric 3D bounding geometry.
          </p>
        </div>
        <div className="horizon-card">
          <span className="mono horizon-num">03.02 // EMBODIED</span>
          <h4>ROBOTIC TRAJECTORY PLANNING</h4>
          <p>
            Autonomous obstacle avoidance and path generation across dynamic local costmaps. Coordinating perception inputs with real-time kinodynamic constraints.
          </p>
        </div>
        <div className="horizon-card">
          <span className="mono horizon-num">03.03 // MULTIMODAL</span>
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
   SECTION 04: SKILLS & COMPETENCIES MATRIX
   ================================================== */
function SkillsSection() {
  return (
    <section id="skills" className="section research">
      <SectionHeader
        n="04"
        label="TECHNICAL COMPETENCIES"
        title={"SKILLS &amp; ML WORKFLOW."}
        body="Core languages, deep learning architectures, and classical machine learning methods verified across hands-on implementations."
      />

      <div className="skills-blueprint-grid">
        {/* Category 1: Core Stack */}
        <div className="skill-col">
          <div className="skill-head mono">
            <span className="skill-cat-title">01 // CORE &amp; LANGUAGES</span>
          </div>
          <ul className="skill-list">
            <li><span>Python</span> <span className="mono skill-badge">Primary</span></li>
            <li><span>PyTorch</span> <span className="mono skill-badge">From Scratch</span></li>
            <li><span>NumPy</span> <span className="mono skill-badge">Linear Algebra</span></li>
            <li><span>pandas</span> <span className="mono skill-badge">Data Pipelines</span></li>
            <li><span>scikit-learn</span> <span className="mono skill-badge">ML Baseline</span></li>
            <li><span>OpenCV</span> <span className="mono skill-badge">CV Preprocessing</span></li>
            <li><span>Git / GitHub</span> <span className="mono skill-badge">Version Control</span></li>
          </ul>
        </div>

        {/* Category 2: Deep Learning */}
        <div className="skill-col">
          <div className="skill-head mono">
            <span className="skill-cat-title">02 // DEEP LEARNING</span>
          </div>
          <ul className="skill-list">
            <li><span>Transformers</span> <span className="mono skill-badge">From Scratch</span></li>
            <li><span>Vision Transformers (ViT)</span> <span className="mono skill-badge">ViT-B/16</span></li>
            <li><span>CNN &amp; ResNet</span> <span className="mono skill-badge">Transfer Learning</span></li>
            <li><span>LSTM &amp; Sequence</span> <span className="mono skill-badge">Time Series</span></li>
            <li><span>Siamese Networks</span> <span className="mono skill-badge">Contrastive Loss</span></li>
            <li><span>Self-Attention</span> <span className="mono skill-badge">Multi-Head</span></li>
            <li><span>BPE Tokenization</span> <span className="mono skill-badge">From Scratch</span></li>
          </ul>
        </div>

        {/* Category 3: Classical ML & Methods */}
        <div className="skill-col">
          <div className="skill-head mono">
            <span className="skill-cat-title">03 // MACHINE LEARNING</span>
          </div>
          <ul className="skill-list">
            <li><span>Supervised Learning</span> <span className="mono skill-badge">Classification</span></li>
            <li><span>Unsupervised Learning</span> <span className="mono skill-badge">Clustering</span></li>
            <li><span>Transfer Learning</span> <span className="mono skill-badge">Pretrained</span></li>
            <li><span>Time Series Modeling</span> <span className="mono skill-badge">Multivariate</span></li>
            <li><span>Support Vector Machines</span> <span className="mono skill-badge">RBF Kernel</span></li>
            <li><span>Manual Backpropagation</span> <span className="mono skill-badge">Autograd DAG</span></li>
            <li><span>ROC &amp; FAR/FRR Evaluation</span> <span className="mono skill-badge">Metrics</span></li>
          </ul>
        </div>

        {/* Category 4: Research Interests */}
        <div className="skill-col">
          <div className="skill-head mono">
            <span className="skill-cat-title">04 // RESEARCH DIRECTIONS</span>
          </div>
          <ul className="skill-list">
            <li><span>Computer Vision</span> <span className="mono skill-badge primary-badge">Primary Focus</span></li>
            <li><span>Object Detection &amp; Tracking</span> <span className="mono skill-badge primary-badge">Real-Time</span></li>
            <li><span>3D Perception</span> <span className="mono skill-badge">Spatial Geometry</span></li>
            <li><span>Generative Modeling</span> <span className="mono skill-badge">Latent Priors</span></li>
            <li><span>Multimodal Learning</span> <span className="mono skill-badge">Vision-Language</span></li>
            <li><span>Robotics &amp; VLA</span> <span className="mono skill-badge">Embodied Policies</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 05: EDUCATION, PROFILE & CONNECT
   ================================================== */
function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="about-grid">
        <div>
          <div className="section-index mono">05 / PROFILE &amp; EDUCATION</div>
          <h2>
            PHYSICS.<br />MATHEMATICS.<br />DEEP LEARNING.
          </h2>
        </div>

        <div className="about-copy">
          <p>
            I’m <b>Kadimi Sri Sai Tej</b>, a Physics undergraduate at <b>Indian Institute of Technology, Kharagpur</b> with hands-on experience designing and building machine learning architectures in PyTorch from first principles.
          </p>
          <p>
            I focus on understanding models from first principles: dissecting attention mechanisms in vision transformers, implementing autograd computational graphs from scratch, and building real-time tracking algorithms to connect visual perception with embodied action.
          </p>
          <p>
            Comfortable across the entire machine learning workflow — from raw architecture design and manual gradient computation to robust data pipelines and structured technical documentation.
          </p>

          <div className="education-timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-year mono">JUL 2025 &ndash; APR 2029</div>
                <h4>INDIAN INSTITUTE OF TECHNOLOGY, KHARAGPUR</h4>
                <p className="mono degree">Bachelor of Science (B.S.) in Physics</p>
                <p className="coursework">
                  <b>Relevant Coursework:</b> Programming and Data Structures, Linear Algebra, Advanced Calculus.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-year mono">JUN 2023 &ndash; MAY 2025</div>
                <h4>BHASHYAM COLLEGE OF EDUCATION, GUNTUR</h4>
                <p className="mono degree">MPC (Mathematics, Physics, Chemistry)</p>
              </div>
            </div>
          </div>

          <div className="about-connect-box mono">
            <div className="connect-row">
              <span className="connect-label">LOCATION:</span>
              <span>HYDERABAD, INDIA</span>
            </div>
            <div className="connect-row">
              <span className="connect-label">EMAIL:</span>
              <a href="mailto:srisaitej999@gmail.com" className="connect-link">srisaitej999@gmail.com</a>
            </div>
            <div className="connect-row">
              <span className="connect-label">PHONE:</span>
              <a href="tel:+919014792881" className="connect-link">+91 90147 92881</a>
            </div>
            <div className="connect-row">
              <span className="connect-label">GITHUB:</span>
              <a href="https://github.com/Ksrisaitej" target="_blank" rel="noopener noreferrer" className="connect-link">github.com/Ksrisaitej &nearr;</a>
            </div>
            <div className="connect-row">
              <span className="connect-label">LINKEDIN:</span>
              <a href="https://www.linkedin.com/in/sri-sai-tej/" target="_blank" rel="noopener noreferrer" className="connect-link">linkedin.com/in/sri-sai-tej &nearr;</a>
            </div>
          </div>
        </div>

        <div className="about-photo" role="img" aria-label="Visual identity card for Kadimi Sri Sai Tej">
          <div className="about-photo-reticle mono">
            <span>IIT KHARAGPUR</span>
            <span>[ST_PERCEPTION]</span>
          </div>
          <span className="mono">RESEARCH &bull; COMPUTER VISION &bull; ROBOTICS</span>
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
          <b>KADIMI SRI SAI TEJ</b>
          <span className="mono">IIT KHARAGPUR &bull; COMPUTER VISION &bull; ML</span>
        </div>
        <div className="footer-links mono">
          <a href="#vision" className="micro-link">VISION &nearr;</a>
          <a href="#from-scratch" className="micro-link">FROM SCRATCH &nearr;</a>
          <a href="#robotics" className="micro-link">ROBOTICS &nearr;</a>
          <a href="#skills" className="micro-link">SKILLS &nearr;</a>
          <a href="#about" className="micro-link">ABOUT &nearr;</a>
          <a href="mailto:srisaitej999@gmail.com" className="micro-link">EMAIL &nearr;</a>
        </div>
        <div className="final-mark">ST</div>
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
