"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SilkSurfaceProps {
  widthSegments?: number;
  heightSegments?: number;
}

// Height-field parameters. Two superimposed sine waves at different
// frequencies/speeds — enough to feel organic without ever looking like
// "waves" in the ocean sense. Amplitudes are intentionally tiny (a few
// hundredths of a unit) — this is meant to read as breathing silk, not
// surf.
const A1 = 0.12;
const F1X = 0.6;
const F1Y = 0.5;
const S1 = 0.35;
const S1B = 0.25;

const A2 = 0.06;
const F2 = 0.3;
const S2 = 0.18;

function height(x: number, y: number, t: number) {
  return (
    A1 * Math.sin(x * F1X + t * S1) * Math.cos(y * F1Y + t * S1B) +
    A2 * Math.sin((x + y) * F2 - t * S2)
  );
}

// Analytic partial derivatives of `height` above, used to build per-vertex
// normals directly instead of calling geometry.computeVertexNormals() every
// frame. computeVertexNormals() walks every face to average normals — for
// an ~80x80 segment plane (6,500+ vertices, ~13,000 triangles) recomputed
// every frame, that's meaningfully more expensive than evaluating two
// closed-form derivatives per vertex.
function heightDerivatives(x: number, y: number, t: number) {
  const dhdx =
    A1 * F1X * Math.cos(x * F1X + t * S1) * Math.cos(y * F1Y + t * S1B) +
    A2 * F2 * Math.cos((x + y) * F2 - t * S2);
  const dhdy =
    A1 * F1Y * -Math.sin(x * F1X + t * S1) * Math.sin(y * F1Y + t * S1B) +
    A2 * F2 * Math.cos((x + y) * F2 - t * S2);
  return [dhdx, dhdy];
}

/**
 * The "Liquid Silk" background surface.
 *
 * A single PlaneGeometry, deformed every frame along its local Z axis by a
 * smooth height field, then tilted to recede away from the camera like a
 * tabletop or a sheet of fabric laid out at an angle. No particles, no
 * bloom — light, warm, and meant to be glanced at rather than stared at.
 */
export default function SilkSurface({
  widthSegments = 80,
  heightSegments = 80,
}: SilkSurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 22, widthSegments, heightSegments);
    // Normals are written every frame in useFrame; this just gives the
    // attribute somewhere to live before the first update.
    geo.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3)
    );
    return geo;
  }, [widthSegments, heightSegments]);

  const positionRef = useRef<THREE.BufferAttribute>(
    geometry.attributes.position as THREE.BufferAttribute
  );
  const normalRef = useRef<THREE.BufferAttribute>(
    geometry.attributes.normal as THREE.BufferAttribute
  );

  // Original (flat) x/y per vertex never change — cache them once instead
  // of re-reading from a mutated buffer every frame.
  const basePositions = useMemo(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = new Float32Array(pos.array.length);
    arr.set(pos.array as Float32Array);
    return arr;
  }, [geometry]);

  // `geometry` is created by hand and passed in as a prop rather than
  // JSX-declared as a child — React Three Fiber's automatic disposal only
  // covers the latter, so this is disposed explicitly on unmount.
  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const position = positionRef.current;
    const normal = normalRef.current;
    const normalVec = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      const x = basePositions[i * 3];
      const y = basePositions[i * 3 + 1];
      const z = height(x, y, t);
      position.setZ(i, z);

      const [dhdx, dhdy] = heightDerivatives(x, y, t);
      // Height field z = f(x, y) -> unnormalized normal (-dz/dx, -dz/dy, 1)
      normalVec.set(-dhdx, -dhdy, 1).normalize();
      normal.setXYZ(i, normalVec.x, normalVec.y, normalVec.z);
    }

    position.needsUpdate = true;
    normal.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-0.55, 0, 0]} position={[0, -1.5, -3]}>
      <meshPhysicalMaterial
        color="#fdfbf7"
        roughness={0.6}
        clearcoat={0.3}
        clearcoatRoughness={0.4}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
