"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import NeuralField from "./NeuralField";

/**
 * Fixed, full-bleed background canvas — now deliberately restrained.
 * - `z-[-1]` + `pointer-events-none`: strictly decorative, behind everything.
 * - `opacity-35` on the wrapper: the 3D layer is a texture, not a focal
 *   point. This is applied to the wrapper (not individual materials) so it
 *   uniformly dims nodes, edges, pulses and bloom together in one pass.
 * - `dpr` capped at 1.5 protects frame rate on high-density displays.
 */
export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-35">
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
            intensity={0.9}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.85}
            radius={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
