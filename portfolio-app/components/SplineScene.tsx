"use client";

/**
 * SplineScene — Full-viewport Spline 3D background using Web Components
 *
 * Switches from the React wrapper to the vanilla Web Component (<spline-viewer>)
 * to resolve React 19 Strict Mode animation bugs and responsive constraint issues.
 */

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  mobileBreakpoint?: number;
  children?: React.ReactNode;
}

/** Check if this device can handle a WebGL 3D scene */
function shouldLoadSpline(mobileBreakpoint: number): boolean {
  if (typeof window === "undefined") return false;

  const isMobile = window.innerWidth < mobileBreakpoint;
  const isLowEnd = navigator.hardwareConcurrency <= 2;

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  const noWebGL = !gl;

  return !isMobile && !noWebGL;
}

// Add TypeScript support for the custom element
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "events-target"?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

export function SplineScene({
  sceneUrl,
  className = "",
  mobileBreakpoint = 768,
  children,
}: SplineSceneProps) {
  const [canLoad, setCanLoad] = useState(false);

  // Only run on client
  useEffect(() => {
    setCanLoad(shouldLoadSpline(mobileBreakpoint));
  }, [mobileBreakpoint]);

  const showSpline = canLoad && sceneUrl;

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
      }}
    >
      {/* Load the vanilla Spline Web Component script */}
      {showSpline && (
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
        />
      )}

      {/* Fallback layer — shows while checking or loading */}
      <div
        className="spline-fallback"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div className="fallback-orb fallback-orb-1" />
        <div className="fallback-orb fallback-orb-2" />
        <div className="fallback-orb fallback-orb-3" />
        <div className="fallback-grid" />
      </div>

      {/* Spline Vanilla Web Component */}
      {showSpline && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "25vw",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <spline-viewer
            url={sceneUrl}
            events-target="global"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* Content overlay */}
      {children && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            height: "100%",
            pointerEvents: "none", // let clicks pass through to Spline
          }}
        >
          <div style={{ pointerEvents: "auto" }}>{children}</div>
        </div>
      )}
    </div>
  );
}
