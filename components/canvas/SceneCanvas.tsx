"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import NeuralField from "./NeuralField";

/**
 * Fixed, full-bleed background canvas, strictly decorative:
 * - `z-[-1]` keeps it behind every DOM section.
 * - `pointer-events-none` guarantees it never intercepts clicks/scroll.
 * - `dpr` capped at 1.5 protects frame rate on high-density displays —
 *   bloom + ~480 nodes + edges + pulses is comparatively heavy.
 */
export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 50 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <NeuralField nodeCount={480} />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.85}
            radius={0.85}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
