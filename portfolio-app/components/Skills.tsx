"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { AccentHeading, Accent } from "./AccentHeading";

interface Skill {
  name: string;
  category: string;
  description: string;
  color: string;
  icon: string;
}

const skillsData: Skill[] = [
  // 💻 Programming
  {
    name: "Python",
    category: "Programming",
    description: "Core language for ML development, scientific scripting, and data pipelines.",
    color: "#3776AB",
    icon: "💻"
  },
  {
    name: "NumPy",
    category: "Programming",
    description: "High-performance vectorized computations and multidimensional array operations.",
    color: "#013243",
    icon: "🔢"
  },
  {
    name: "Pandas",
    category: "Programming",
    description: "Data manipulation, structured analysis, and robust preprocessing pipelines.",
    color: "#15045C",
    icon: "🐼"
  },
  {
    name: "Matplotlib",
    category: "Programming",
    description: "Advanced scientific visualization, 2D/3D plotting, and publishing-grade charts.",
    color: "#11557C",
    icon: "📊"
  },
  {
    name: "Jupyter Notebook",
    category: "Programming",
    description: "Interactive research environment for prototyping, documenting, and testing.",
    color: "#F37626",
    icon: "🪐"
  },
  {
    name: "Git & GitHub",
    category: "Programming",
    description: "Distributed version control, collaborative development, and CI/CD pipelines.",
    color: "#F05032",
    icon: "🐙"
  },

  // 🤖 Machine Learning
  {
    name: "Supervised Learning",
    category: "Machine Learning",
    description: "Implementing classification, regression, SVMs, decision trees, and ensemble models.",
    color: "#00C49F",
    icon: "📈"
  },
  {
    name: "Unsupervised Learning",
    category: "Machine Learning",
    description: "Clustering algorithms (K-Means, DBSCAN) and dimensionality reduction (PCA, t-SNE).",
    color: "#FFBB28",
    icon: "🧩"
  },
  {
    name: "Model Evaluation & Validation",
    category: "Machine Learning",
    description: "Diagnosing bias-variance trade-offs, cross-validation, ROC/AUC, and metric analysis.",
    color: "#FF8042",
    icon: "📐"
  },
  {
    name: "Feature Engineering",
    category: "Machine Learning",
    description: "Imputation, data transformations, custom encoders, and feature selection strategies.",
    color: "#0088FE",
    icon: "⚙️"
  },
  {
    name: "Scikit-learn",
    category: "Machine Learning",
    description: "Primary library for constructing robust pipelines and standardized ML models.",
    color: "#F7931E",
    icon: "🔧"
  },
  {
    name: "End-to-End ML Pipelines",
    category: "Machine Learning",
    description: "Automating data loading, parsing, feature selection, training, and output serialization.",
    color: "#8884D8",
    icon: "⛓️"
  },

  // 🧠 Deep Learning
  {
    name: "PyTorch",
    category: "Deep Learning",
    description: "Core tensor architecture for designing custom neural nets and dynamic computation graphs.",
    color: "#EE4C2C",
    icon: "🔥"
  },
  {
    name: "Neural Networks",
    category: "Deep Learning",
    description: "Multi-layer perceptrons, backpropagation, gradient calculations, and loss solvers.",
    color: "#A78BFA",
    icon: "🕸️"
  },
  {
    name: "CNNs",
    category: "Deep Learning",
    description: "Convolutional layers, pooling, feature maps, and spatial vision models.",
    color: "#EC4899",
    icon: "🖼️"
  },
  {
    name: "Transfer Learning",
    category: "Deep Learning",
    description: "Adapting pre-trained vision weights (ResNets, ViTs) to niche custom datasets.",
    color: "#14B8A6",
    icon: "🔄"
  },
  {
    name: "Training & Optimization",
    category: "Deep Learning",
    description: "Implementing learning rate schedulers, weight decays, AdamW/SGD, and clip gradients.",
    color: "#3B82F6",
    icon: "⚡"
  },
  {
    name: "Computer Vision Fundamentals",
    category: "Deep Learning",
    description: "Image processing, bounding box operations, spatial warping, and pixel transformations.",
    color: "#10B981",
    icon: "👁️"
  },

  // 🎮 Reinforcement Learning
  {
    name: "Markov Decision Processes",
    category: "Reinforcement Learning",
    description: "Modeling environments using dynamic states, transitions, rewards, and discount factors.",
    color: "#F59E0B",
    icon: "🎲"
  },
  {
    name: "Q-Learning",
    category: "Reinforcement Learning",
    description: "Implementing temporal difference tabular schemes to discover optimal policies.",
    color: "#EF4444",
    icon: "🎯"
  },
  {
    name: "Deep Q Networks (DQN)",
    category: "Reinforcement Learning",
    description: "Using deep nets to approximate action values with experience replay and target nets.",
    color: "#8B5CF6",
    icon: "👾"
  },
  {
    name: "Exploration vs Exploitation",
    category: "Reinforcement Learning",
    description: "Balancing environment search and return optimization via epsilon-greedy and UCB.",
    color: "#EC4899",
    icon: "⚖️"
  },
  {
    name: "Policy & Value Functions",
    category: "Reinforcement Learning",
    description: "Approximating state values and structural policy trajectories using analytical methods.",
    color: "#06B6D4",
    icon: "🗺️"
  },
  {
    name: "OpenAI Gymnasium",
    category: "Reinforcement Learning",
    description: "Writing and training agents inside standard simulation physics benchmarks.",
    color: "#10B981",
    icon: "🏋️"
  },

  // 📐 Mathematics & Physics
  {
    name: "Linear Algebra for ML",
    category: "Mathematics & Physics",
    description: "Understanding singular value decomposition, eigenvectors, projections, and dot spaces.",
    color: "#A855F7",
    icon: "📐"
  },
  {
    name: "Calculus for Optimization",
    category: "Mathematics & Physics",
    description: "Partial derivatives, multi-dimensional gradients, Jacobians, and optimization steps.",
    color: "#3B82F6",
    icon: "📈"
  },
  {
    name: "Probability & Statistics",
    category: "Mathematics & Physics",
    description: "Bayesian frameworks, random variables, hypothesis scoring, and likelihood projections.",
    color: "#14B8A6",
    icon: "🎲"
  },
  {
    name: "Classical Mechanics",
    category: "Mathematics & Physics",
    description: "Lagrangian mechanics, pendulum kinetics, equations of motion, and physical integration.",
    color: "#F43F5E",
    icon: "🧲"
  },
  {
    name: "Mathematical Modeling",
    category: "Mathematics & Physics",
    description: "Translating physical and statistical processes into solvable systems of equations.",
    color: "#EAB308",
    icon: "📝"
  },
  {
    name: "Physics-Based Simulation",
    category: "Mathematics & Physics",
    description: "Writing Verlet, Euler integration algorithms and rigid/particle system colliders.",
    color: "#06B6D4",
    icon: "🌀"
  },

  // 🔬 AI & Research
  {
    name: "Research Paper Reading",
    category: "AI & Research",
    description: "Deconstructing novel architectures, technical proofs, and research methodologies.",
    color: "#10B981",
    icon: "📖"
  },
  {
    name: "Research Paper Implementation",
    category: "AI & Research",
    description: "Building neural topologies and pipelines directly from raw equations in paper texts.",
    color: "#F43F5E",
    icon: "🏗️"
  },
  {
    name: "Experiment Design",
    category: "AI & Research",
    description: "Establishing controlled seeds, multi-seed baseline averages, and telemetry sweeps.",
    color: "#A855F7",
    icon: "🧪"
  },
  {
    name: "Model Debugging",
    category: "AI & Research",
    description: "Scanning gradient streams, activation tracking, and debugging underperforming layers.",
    color: "#EAB308",
    icon: "🐛"
  },
  {
    name: "Technical Documentation",
    category: "AI & Research",
    description: "Writing mathematically precise LaTeX research reviews, design specs, and code guides.",
    color: "#3B82F6",
    icon: "📘"
  }
];

const categories = [
  "All",
  "Programming",
  "Machine Learning",
  "Deep Learning",
  "Reinforcement Learning",
  "Mathematics & Physics",
  "AI & Research"
];

// Helper to render customized, high-fidelity SVGs inside the glass spheres
function SkillSphereGraphic({ name, color }: { name: string; color: string }) {
  const getArtwork = () => {
    switch (name) {
      case "Python":
        return (
          <g filter="url(#cyber-glow)">
            <path d="M35 45 C35 33, 47 28, 50 28 C53 28, 65 33, 65 45 C65 57, 35 52, 35 64 C35 76, 47 72, 50 72" fill="none" stroke="#3776AB" strokeWidth="4" strokeLinecap="round" />
            <path d="M65 55 C65 67, 53 72, 50 72 C47 72, 35 67, 35 55 C35 43, 65 48, 65 36 C65 24, 53 28, 50 28" fill="none" stroke="#FFE873" strokeWidth="4" strokeLinecap="round" />
            <circle cx="42" cy="34" r="1.5" fill="#fff" />
            <circle cx="58" cy="66" r="1.5" fill="#fff" />
          </g>
        );
      case "NumPy":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
            <path d="M50 22 L78 36 L50 50 L22 36 Z" />
            <path d="M50 50 L78 64 L50 78 L22 64 Z" />
            <path d="M22 36 L22 64" />
            <path d="M50 50 L50 78" />
            <path d="M78 36 L78 64" />
            <circle cx="50" cy="36" r="2.5" fill={color} />
            <circle cx="36" cy="43" r="2" fill={color} />
            <circle cx="64" cy="43" r="2" fill={color} />
            <circle cx="50" cy="64" r="2.5" fill={color} />
          </g>
        );
      case "Pandas":
        return (
          <g filter="url(#cyber-glow)" stroke={color} fill="none">
            <rect x="25" y="38" width="10" height="34" rx="2" strokeWidth="2" />
            <rect x="39" y="26" width="10" height="46" rx="2" strokeWidth="2" />
            <rect x="53" y="44" width="10" height="28" rx="2" strokeWidth="2" />
            <rect x="67" y="32" width="10" height="40" rx="2" strokeWidth="2" />
            <path d="M20 62 L38 46 L52 54 L76 28" stroke="#C8F542" strokeWidth="3" strokeLinecap="round" />
            <circle cx="76" cy="28" r="3" fill="#fff" />
          </g>
        );
      case "PyTorch":
        return (
          <g filter="url(#cyber-glow)" stroke={color} fill="none">
            <ellipse cx="50" cy="50" rx="14" ry="26" transform="rotate(-30 50 50)" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="6" ry="15" transform="rotate(-30 50 50)" strokeWidth="2" />
            <circle cx="50" cy="50" r="4.5" fill="#fff" />
            <circle cx="50" cy="50" r="32" strokeWidth="0.75" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
          </g>
        );
      case "Neural Networks":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="1.5" fill="none">
            <circle cx="30" cy="35" r="3.5" fill={color} />
            <circle cx="30" cy="50" r="3.5" fill={color} />
            <circle cx="30" cy="65" r="3.5" fill={color} />
            <circle cx="50" cy="25" r="3.5" fill="#fff" />
            <circle cx="50" cy="41.6" r="3.5" fill="#fff" />
            <circle cx="50" cy="58.3" r="3.5" fill="#fff" />
            <circle cx="50" cy="75" r="3.5" fill="#fff" />
            <circle cx="70" cy="35" r="3.5" fill={color} />
            <circle cx="70" cy="50" r="3.5" fill={color} />
            <circle cx="70" cy="65" r="3.5" fill={color} />
            
            <line x1="33" y1="35" x2="47" y2="25" />
            <line x1="33" y1="35" x2="47" y2="41.6" />
            <line x1="33" y1="35" x2="47" y2="58.3" />
            <line x1="33" y1="50" x2="47" y2="25" />
            <line x1="33" y1="50" x2="47" y2="41.6" />
            <line x1="33" y1="50" x2="47" y2="58.3" />
            <line x1="33" y1="50" x2="47" y2="75" />
            <line x1="33" y1="65" x2="47" y2="41.6" />
            <line x1="33" y1="65" x2="47" y2="58.3" />
            <line x1="33" y1="65" x2="47" y2="75" />
            
            <line x1="53" y1="25" x2="67" y2="35" />
            <line x1="53" y1="25" x2="67" y2="50" />
            <line x1="53" y1="41.6" x2="67" y2="35" />
            <line x1="53" y1="41.6" x2="67" y2="50" />
            <line x1="53" y1="41.6" x2="67" y2="65" />
            <line x1="53" y1="58.3" x2="67" y2="35" />
            <line x1="53" y1="58.3" x2="67" y2="50" />
            <line x1="53" y1="58.3" x2="67" y2="65" />
            <line x1="53" y1="75" x2="67" y2="50" />
            <line x1="53" y1="75" x2="67" y2="65" />
          </g>
        );
      case "Classical Mechanics":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
            <line x1="50" y1="20" x2="50" y2="45" />
            <circle cx="50" cy="20" r="2" fill="#fff" />
            <circle cx="50" cy="45" r="4" fill={color} />
            <line x1="50" y1="45" x2="68" y2="64" />
            <circle cx="68" cy="64" r="5" fill="#fff" />
            <path d="M28 45 A22 22 0 0 0 72 45" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" strokeWidth="1" />
            <path d="M32 64 A38 38 0 0 0 76 56" stroke={`${color}22`} strokeDasharray="3 3" strokeWidth="1" />
          </g>
        );
      case "OpenAI Gymnasium":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
            <rect x="35" y="60" width="30" height="12" rx="2" />
            <line x1="50" y1="60" x2="50" y2="30" strokeWidth="3" />
            <circle cx="50" cy="28" r="4.5" fill="#fff" />
            <path d="M30 40 Q50 20 70 40" stroke="#C8F542" strokeDasharray="3 3" strokeWidth="1.5" />
            <circle cx="35" cy="66" r="2" fill="#fff" />
            <circle cx="65" cy="66" r="2" fill="#fff" />
          </g>
        );
      case "Calculus for Optimization":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
            <path d="M20 70 Q45 20 80 40" />
            <line x1="30" y1="35" x2="65" y2="22" stroke="#fff" />
            <circle cx="46" cy="28.5" r="3" fill="#C8F542" />
            <path d="M46 28.5 L46 70" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="20" y1="70" x2="80" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </g>
        );
      case "Linear Algebra for ML":
        return (
          <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
            <line x1="50" y1="80" x2="50" y2="20" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="50" x2="80" y2="50" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="72" y2="32" stroke="#C8F542" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="35" y2="30" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="72" cy="32" r="3.5" fill="#fff" />
            <circle cx="35" cy="30" r="3.5" fill="#fff" />
            <path d="M57 45 A10 10 0 0 0 45 46" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>
        );
      default:
        // Elegant fallback geometric abstract systems tailored to the remaining categories
        if (name.includes("Pipeline") || name.includes("Design") || name.includes("Git")) {
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
              <rect x="22" y="42" width="14" height="16" rx="2" />
              <rect x="43" y="42" width="14" height="16" rx="2" stroke="#fff" />
              <rect x="64" y="42" width="14" height="16" rx="2" />
              <line x1="36" y1="50" x2="43" y2="50" />
              <line x1="57" y1="50" x2="64" y2="50" />
              <circle cx="29" cy="50" r="1.5" fill="#fff" />
              <circle cx="50" cy="50" r="1.5" fill={color} />
              <circle cx="71" cy="50" r="1.5" fill="#fff" />
            </g>
          );
        } else if (name.includes("Research") || name.includes("Doc") || name.includes("Paper")) {
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
              <rect x="28" y="24" width="44" height="52" rx="3" />
              <line x1="36" y1="36" x2="64" y2="36" strokeWidth="3" />
              <line x1="36" y1="46" x2="56" y2="46" strokeWidth="2.5" />
              <line x1="36" y1="56" x2="60" y2="56" strokeWidth="2" />
              <line x1="36" y1="64" x2="48" y2="64" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="64" cy="64" r="3" fill="#C8F542" />
            </g>
          );
        } else if (name.includes("Simulation") || name.includes("Mechanics") || name.includes("Model")) {
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
              <circle cx="50" cy="50" r="28" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="14" />
              <circle cx="50" cy="22" r="3" fill="#fff" />
              <circle cx="64" cy="50" r="4.5" fill="#C8F542" />
              <circle cx="50" cy="50" r="3" fill="#fff" />
              <line x1="50" y1="50" x2="64" y2="50" />
            </g>
          );
        } else if (name.includes("Learning") || name.includes("Neural") || name.includes("CNN")) {
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="1.8" fill="none">
              <circle cx="50" cy="50" r="22" />
              <path d="M22 50 L78 50" />
              <path d="M50 22 L50 78" />
              <circle cx="50" cy="50" r="6.5" fill="#fff" />
              <circle cx="28" cy="50" r="3" fill={color} />
              <circle cx="72" cy="50" r="3" fill={color} />
              <circle cx="50" cy="28" r="3" fill="#C8F542" />
              <circle cx="50" cy="72" r="3" fill="#C8F542" />
            </g>
          );
        } else if (name.includes("Evaluation") || name.includes("Debug") || name.includes("Engine")) {
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="2" fill="none">
              <circle cx="50" cy="50" r="26" />
              <line x1="50" y1="50" x2="70" y2="30" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="50" cy="50" r="4.5" fill="#fff" />
              <path d="M30 65 L40 55 L45 62 L60 40 L70 48" stroke="#C8F542" strokeWidth="1.5" />
            </g>
          );
        } else {
          // Standard geometric math-grid / abstract spiral
          return (
            <g filter="url(#cyber-glow)" stroke={color} strokeWidth="1.5" fill="none">
              <circle cx="50" cy="50" r="30" />
              <path d="M50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50 Z" />
              <circle cx="50" cy="50" r="3.5" fill="#fff" />
              <circle cx="50" cy="20" r="2" fill={color} />
              <circle cx="80" cy="50" r="2" fill={color} />
              <circle cx="50" cy="80" r="2" fill={color} />
              <circle cx="20" cy="50" r="2" fill={color} />
            </g>
          );
        }
    }
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115 group-hover:rotate-2"
    >
      <defs>
        <radialGradient id={`bg-grad-${name.replace(/\s+/g, '-').toLowerCase()}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${color}3D`} />
          <stop offset="60%" stopColor={`${color}05`} />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <filter id="cyber-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Black backdrop circle */}
      <circle cx="50" cy="50" r="48" fill="#030303" />
      {/* Neon glowing center backplate */}
      <circle cx="50" cy="50" r="47" fill={`url(#bg-grad-${name.replace(/\s+/g, '-').toLowerCase()})`} />
      
      {/* Cyber coordinates / fine lens lines */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      <path d="M 10 50 Q 50 18 90 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
      <path d="M 10 50 Q 50 82 90 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
      
      {/* Central Illustration */}
      {getArtwork()}
    </svg>
  );
}

// Custom 3D rotating Wireframe Globe using Keyframes inside React
export function WireframeGlobe({ color }: { color: string }) {
  const activeColor = color === "transparent" ? "rgba(255, 255, 255, 0.08)" : color;
  const glowShadow = color === "transparent" 
    ? "inset 0 0 25px rgba(255, 255, 255, 0.03), 0 0 20px rgba(255, 255, 255, 0.02)" 
    : `inset 0 0 25px ${color}33, 0 0 35px ${color}22`;

  return (
    <div 
      className="relative w-[150px] h-[150px] md:w-[170px] md:h-[170px] rounded-full flex items-center justify-center overflow-hidden bg-black/60 border transition-all duration-700 ease-out"
      style={{
        borderColor: color === "transparent" ? "rgba(255, 255, 255, 0.06)" : `${color}40`,
        boxShadow: glowShadow
      }}
    >
      {/* 3D Glass shine layer */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none" 
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`
        }} 
      />
      <div className="absolute top-[4%] left-[8%] w-[84%] h-[40%] rounded-full bg-gradient-to-b from-white/15 to-transparent rotate-[-12deg] pointer-events-none" />

      {/* Rotating wireframe lines */}
      <svg className="w-[84%] h-[84%] opacity-40 transition-colors duration-500" viewBox="0 0 100 100">
        <style>{`
          @keyframes rotY {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          @keyframes rotX {
            0% { transform: rotateX(0deg); }
            100% { transform: rotateX(360deg); }
          }
          @keyframes rotZ {
            0% { transform: rotateZ(0deg); }
            100% { transform: rotateZ(360deg); }
          }
          .spin-lat { 
            animation: rotY 14s linear infinite; 
            transform-origin: center;
          }
          .spin-lon { 
            animation: rotX 20s linear infinite; 
            transform-origin: center;
          }
          .spin-diag { 
            animation: rotZ 28s linear infinite; 
            transform-origin: center;
          }
        `}</style>
        
        {/* Outer boundary */}
        <circle cx="50" cy="50" r="46" fill="none" stroke={activeColor} strokeWidth="0.5" />
        
        {/* Latitudes */}
        <g className="spin-lat" style={{ transformStyle: 'preserve-3d' }}>
          <ellipse cx="50" cy="50" rx="46" ry="12" fill="none" stroke={activeColor} strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="46" ry="26" fill="none" stroke={activeColor} strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="46" ry="38" fill="none" stroke={activeColor} strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        </g>
        
        {/* Longitudes */}
        <g className="spin-lon" style={{ transformStyle: 'preserve-3d' }}>
          <ellipse cx="50" cy="50" rx="12" ry="46" fill="none" stroke={activeColor} strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="26" ry="46" fill="none" stroke={activeColor} strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="38" ry="46" fill="none" stroke={activeColor} strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        </g>
        
        {/* Star grids */}
        <g className="spin-diag">
          <line x1="12" y1="12" x2="88" y2="88" stroke={color === "transparent" ? "rgba(255,255,255,0.06)" : `${color}20`} strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="88" y1="12" x2="12" y2="88" stroke={color === "transparent" ? "rgba(255,255,255,0.06)" : `${color}20`} strokeWidth="0.5" strokeDasharray="3 3" />
        </g>
      </svg>
      
      {/* Glowing heart/core dot */}
      <div 
        className="absolute w-2.5 h-2.5 rounded-full transition-all duration-500" 
        style={{
          backgroundColor: color === "transparent" ? "#ffffff" : color,
          boxShadow: color === "transparent" 
            ? "0 0 15px 2px rgba(255, 255, 255, 0.4)" 
            : `0 0 20px 4px ${color}`
        }} 
      />
    </div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

  // Filter skills based on tab selection
  const filteredSkills = skillsData.filter(
    (skill) => activeTab === "All" || skill.category === activeTab
  );

  // If "All" is active, initially display a highly curated core selection of 18 high-impact skills to avoid overloading, and let user toggle "Show All" to see all 35.
  const isAllTab = activeTab === "All";
  const displayedSkills = (isAllTab && !showAllSkills) 
    ? filteredSkills.slice(0, 18) 
    : filteredSkills;

  // Active glowing borders or colors based on hovered skill or defaults
  const currentGlowColor = hoveredSkill ? hoveredSkill.color : "transparent";

  return (
    <section id="skills" className="relative dot-grid-bg">
      <div className="section">
        <SectionLabel number="03">Capabilities</SectionLabel>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <AccentHeading>
            Tech <Accent>stack</Accent> & skills
          </AccentHeading>
          
          <p className="text-sm text-text-secondary max-w-[340px] leading-relaxed">
            Hover over any glass sphere below to decode the specific framework proficiency, core metrics, and usage contexts.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="relative flex flex-wrap gap-2 mb-16 border-b border-border-subtle pb-4 pointer-events-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setShowAllSkills(false); // Reset toggle when tab changes
              }}
              className="relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-colors duration-300 outline-none cursor-pointer"
              style={{
                color: activeTab === cat ? "var(--bg-primary)" : "var(--text-secondary)"
              }}
            >
              {activeTab === cat && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-[#C8F542] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Core Content Layout: Side-by-side or Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: The Interactive Info Hub / Decoder Globe */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:sticky lg:top-28">
            <div className="relative p-6 w-full max-w-[320px] rounded-3xl border border-border-faint bg-background/40 backdrop-blur-md flex flex-col items-center overflow-hidden">
              
              {/* Outer ambient blur reflecting current skill */}
              <div 
                className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[70px] pointer-events-none transition-all duration-700 ease-out"
                style={{
                  background: hoveredSkill ? `${hoveredSkill.color}22` : "rgba(255, 255, 255, 0.01)"
                }}
              />
              
              {/* The 3D rotating globe */}
              <div className="my-6">
                <WireframeGlobe color={currentGlowColor} />
              </div>

              {/* Text Decoder Board */}
              <div className="relative z-10 w-full min-h-[140px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {hoveredSkill ? (
                    <motion.div
                      key={hoveredSkill.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center"
                    >
                      {/* Skill Icon + Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{hoveredSkill.icon}</span>
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase border"
                          style={{
                            borderColor: `${hoveredSkill.color}33`,
                            backgroundColor: `${hoveredSkill.color}11`,
                            color: hoveredSkill.color
                          }}
                        >
                          {hoveredSkill.category}
                        </span>
                      </div>
                      
                      {/* Skill Name */}
                      <h4 className="text-xl font-bold tracking-tight text-text-primary mb-3">
                        {hoveredSkill.name}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-[12px] md:text-[13px] text-text-secondary leading-relaxed text-center px-2">
                        {hoveredSkill.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-[9px] font-mono tracking-widest uppercase text-text-tertiary mb-2">
                        System telemetry online
                      </span>
                      <h4 className="text-base font-medium tracking-wide text-text-secondary mb-3 font-mono">
                        [ Capabilities Decoder ]
                      </h4>
                      <p className="text-[12px] text-text-tertiary leading-relaxed text-center px-4">
                        Hover over any sphere in the grid to establish high-fidelity link and reveal specialization insights.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Spheres Grid */}
          <div className="lg:col-span-8">
            <motion.div 
              layout
              className="flex flex-wrap justify-center lg:justify-start gap-5 pointer-events-auto"
            >
              <AnimatePresence mode="popLayout">
                {displayedSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex flex-col items-center justify-center cursor-pointer select-none"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ width: "120px" }}
                  >
                    {/* Glowing Glass Orb Wrapper */}
                    <div 
                      className="relative w-[110px] h-[110px] rounded-full overflow-hidden transition-all duration-500 ease-out border"
                      style={{
                        borderColor: hoveredSkill?.name === skill.name ? `${skill.color}50` : "rgba(255, 255, 255, 0.05)",
                        boxShadow: hoveredSkill?.name === skill.name 
                          ? `0 0 25px ${skill.color}40, inset 0 0 15px rgba(255,255,255,0.1), inset -6px -6px 20px rgba(0,0,0,0.8)`
                          : "inset 0 0 15px rgba(255,255,255,0.06), inset -6px -6px 20px rgba(0,0,0,0.9), 0 8px 20px rgba(0,0,0,0.6)"
                      }}
                    >
                      {/* Interactive convex SVG artwork graphic */}
                      <SkillSphereGraphic name={skill.name} color={skill.color} />
                      
                      {/* Glass specular light sweeps (Curved highlight overlay) */}
                      <div className="absolute top-[4%] left-[8%] w-[84%] h-[40%] rounded-full bg-gradient-to-b from-white/20 to-transparent rotate-[-12deg] pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-80" />
                      <div className="absolute bottom-[4%] right-[8%] w-[84%] h-[24%] rounded-full bg-radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%) rotate-[15deg] pointer-events-none opacity-50" />
                    </div>

                    {/* Skill tag overlay */}
                    <span 
                      className="mt-3 text-[11px] font-mono font-medium tracking-wide text-center transition-colors duration-300"
                      style={{
                        color: hoveredSkill?.name === skill.name ? skill.color : "var(--text-secondary)"
                      }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Core Expand Button for All Tab */}
            {isAllTab && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="btn-pill btn-pill-ghost px-6 py-2.5 bg-background/30 backdrop-blur-sm transition-all duration-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span>{showAllSkills ? "Show Core Highlights" : `View All ${skillsData.length} Skills`}</span>
                  <span className={`transition-transform duration-300 ${showAllSkills ? "rotate-180" : ""}`}>↓</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Accent / Learn Dividers */}
        <motion.div
          className="mt-16 flex items-center gap-4 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(200, 245, 66, 0.15))",
            }}
          />
          <span className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase">
            Physics × Simulation × Machine Learning
          </span>
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: "linear-gradient(90deg, rgba(200, 245, 66, 0.15), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
