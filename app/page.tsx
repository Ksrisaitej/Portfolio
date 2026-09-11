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
              src="/hundred_line_thumb.jpg"
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
    </section>
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
