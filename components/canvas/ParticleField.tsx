"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EMERALD = new THREE.Color("#2ee6a8");
const CYAN = new THREE.Color("#5be3ff");

interface ParticleFieldProps {
  count?: number;
}

interface Particle {
  position: THREE.Vector3;
  phase: number;
  baseScale: number;
  jitter: number;
  colorMix: number; // 0 (bottom, emerald) -> 1 (top, cyan)
}

/**
 * Signature element: a single InstancedMesh rendering every particle in one
 * draw call (no per-particle Object3D, no per-particle geometry — this is
 * what keeps 6000 instances + Bloom inside frame budget).
 *
 * Particles sit on a Fibonacci sphere rather than random noise — a
 * deliberate, evenly-spaced "scan" pattern that reads as clinical precision
 * rather than a generic dust cloud, and gently breathes in/out to feel
 * alive without ever distracting from the DOM content above it.
 */
export default function ParticleField({ count = 6000 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute static per-particle data once. Re-randomizing every render
  // would both thrash the GC and make the field visually "jump."
  const particles = useMemo<Particle[]>(() => {
    const radius = 4.2;
    const list: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // -1 -> 1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden-angle spiral

      const position = new THREE.Vector3(
        Math.cos(theta) * radiusAtY,
        y,
        Math.sin(theta) * radiusAtY
      ).multiplyScalar(radius);

      list.push({
        position,
        phase: (i * 12.9898) % (Math.PI * 2), // deterministic, not Math.random
        baseScale: 0.018 + ((i * 7) % 13) / 13 * 0.024,
        jitter: 0.12 + ((i * 3) % 11) / 11 * 0.2,
        colorMix: (y + 1) / 2,
      });
    }
    return list;
  }, [count]);

  // Build the per-instance color buffer once and hand it to the geometry.
  const instanceColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const tmp = new THREE.Color();
    particles.forEach((p, i) => {
      tmp.copy(EMERALD).lerp(CYAN, p.colorMix);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    });
    return colors;
  }, [particles, count]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(instanceColors, 3)
    );

    // Explicit cleanup on unmount. R3F will also auto-dispose JSX-declared
    // geometry/material, but for an instanced mesh carrying a manually
    // attached buffer, disposing both here is the safe, explicit guarantee
    // against leaking GPU buffers when this section is removed/HMR'd.
    return () => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    };
  }, [instanceColors]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();

    // Slow ambient rotation of the entire field — never disorienting,
    // always reads as "idle," never as "loading."
    mesh.rotation.y = t * 0.045;
    mesh.rotation.x = Math.sin(t * 0.025) * 0.08;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const breathe = 1 + Math.sin(t * 0.6 + p.phase) * p.jitter * 0.08;
      dummy.position.copy(p.position).multiplyScalar(breathe);
      const pulse = 1 + Math.sin(t * 1.4 + p.phase) * 0.25;
      dummy.scale.setScalar(p.baseScale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}
