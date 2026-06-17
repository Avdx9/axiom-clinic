"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";

/**
 * Fixed, full-bleed background canvas.
 *
 * - `pointer-events-none` + `-z-10` keep it strictly decorative: it never
 *   intercepts clicks/scrolls meant for the DOM content layered above it.
 * - `dpr` is capped at 1.5 to protect frame rate on high-density displays —
 *   bloom + 6000 instances is comparatively heavy, this keeps it cinematic
 *   without melting mid-range laptops.
 */
export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 50 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <ParticleField count={6000} />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.35}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            radius={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
