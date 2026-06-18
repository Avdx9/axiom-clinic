"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SilkSurface from "./SilkSurface";

/**
 * Fixed, full-bleed background canvas — strictly decorative.
 * - `z-[-1]` + `pointer-events-none`: behind everything, never intercepts input.
 * - No EffectComposer/Bloom this time: the brief is explicit that this
 *   aesthetic wants soft, warm lighting, not a glow pass.
 * - Background clear color matches the page's stone-50 so there's no seam
 *   if the silk surface doesn't fully cover the viewport at odd aspect ratios.
 */
export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 9], fov: 45 }}
      >
        <color attach="background" args={["#fafaf9"]} />

        {/* Warm, soft lighting — no neon, no cold whites */}
        <ambientLight intensity={0.7} color="#fff4e0" />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#fff4e0" />
        <directionalLight position={[-5, 2, -4]} intensity={0.3} color="#f5e6c8" />

        <Suspense fallback={null}>
          <SilkSurface />
        </Suspense>
      </Canvas>
    </div>
  );
}
