"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EMERALD = new THREE.Color("#2ee6a8");
const CYAN = new THREE.Color("#5be3ff");

interface NeuralFieldProps {
  nodeCount?: number;
}

interface NodeData {
  position: THREE.Vector3;
  phase: number;
  baseScale: number;
  colorMix: number; // 0 -> emerald, 1 -> cyan
}

interface EdgeData {
  a: number;
  b: number;
  color: THREE.Color;
}

interface PulseData {
  edgeIndex: number;
  phase: number;
  speed: number;
}

/**
 * "Digital nervous system" background.
 *
 * - Nodes fill a sphere volumetrically (not just the shell) using a
 *   deterministic golden-angle distribution — no Math.random in the layout,
 *   so there's no hydration mismatch and no frame-to-frame jitter.
 * - Edges connect each node to its ~2 nearest neighbours, computed once and
 *   rendered as a single LineSegments draw call (not one mesh per edge).
 * - A handful of pulses travel along edges on a loop, reading as live data
 *   flow rather than a static decoration.
 * - Everything sits under one rotating <group> so nodes/edges/pulses can
 *   never drift out of sync with each other.
 */
export default function NeuralField({ nodeCount = 480 }: NeuralFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const pulseMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // --- Nodes: deterministic, volumetric fill of a sphere ------------------
  const nodes = useMemo<NodeData[]>(() => {
    const radius = 4.4;
    const list: NodeData[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = i / nodeCount;
      const y = 1 - t * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden-angle spiral
      const r = radius * Math.cbrt(0.15 + 0.85 * t); // volumetric, not shell-only

      const position = new THREE.Vector3(
        Math.cos(theta) * radiusAtY,
        y,
        Math.sin(theta) * radiusAtY
      ).multiplyScalar(r);

      list.push({
        position,
        phase: (i * 12.9898) % (Math.PI * 2),
        baseScale: 0.02 + (((i * 7) % 13) / 13) * 0.022,
        colorMix: (y + 1) / 2,
      });
    }
    return list;
  }, [nodeCount]);

  // --- Edges: connect each node to its nearest neighbours, capped --------
  const edges = useMemo<EdgeData[]>(() => {
    const maxNeighbours = 2;
    const maxDist = 1.6;
    const seen = new Set<string>();
    const list: EdgeData[] = [];
    const tmpColor = new THREE.Color();

    for (let i = 0; i < nodes.length; i++) {
      const candidates: { j: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < maxDist) candidates.push({ j, d });
      }
      candidates.sort((a, b) => a.d - b.d);
      for (const { j } of candidates.slice(0, maxNeighbours)) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        tmpColor.copy(EMERALD).lerp(CYAN, (nodes[i].colorMix + nodes[j].colorMix) / 2);
        list.push({ a: i, b: j, color: tmpColor.clone() });
      }
    }
    return list.slice(0, 700); // hard cap — keeps the line draw call cheap
  }, [nodes]);

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      const a = nodes[e.a].position;
      const b = nodes[e.b].position;
      positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
      colors.set([e.color.r, e.color.g, e.color.b, e.color.r, e.color.g, e.color.b], i * 6);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [edges, nodes]);

  // --- Pulses: markers travelling along a subset of edges, looping -------
  const pulses = useMemo<PulseData[]>(() => {
    const count = Math.min(36, edges.length);
    const list: PulseData[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        edgeIndex: Math.floor((i / count) * edges.length),
        phase: (i * 17.27) % 1,
        speed: 0.18 + (((i * 5) % 7) / 7) * 0.22,
      });
    }
    return list;
  }, [edges]);

  // --- Per-instance node colors --------------------------------------------
  const nodeColors = useMemo(() => {
    const colors = new Float32Array(nodes.length * 3);
    const tmp = new THREE.Color();
    nodes.forEach((n, i) => {
      tmp.copy(EMERALD).lerp(CYAN, n.colorMix);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    });
    return colors;
  }, [nodes]);

  // Attach the node color buffer, and explicitly dispose everything this
  // component owns on unmount — the line geometry in particular is created
  // by hand (not JSX-declared), so it would never be auto-disposed otherwise.
  useEffect(() => {
    const mesh = nodeMeshRef.current;
    if (!mesh) return;
    mesh.geometry.setAttribute("color", new THREE.InstancedBufferAttribute(nodeColors, 3));
    return () => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
      else mesh.material.dispose();
    };
  }, [nodeColors]);

  useEffect(() => {
    return () => edgeGeometry.dispose();
  }, [edgeGeometry]);

  useEffect(() => {
    const mesh = pulseMeshRef.current;
    return () => {
      if (!mesh) return;
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
      else mesh.material.dispose();
    };
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    const nodeMesh = nodeMeshRef.current;
    const pulseMesh = pulseMeshRef.current;
    if (!group || !nodeMesh || !pulseMesh) return;

    const t = state.clock.getElapsedTime();

    // Slow ambient rotation — idle, never disorienting
    group.rotation.y = t * 0.035;
    group.rotation.x = Math.sin(t * 0.02) * 0.06;

    // Nodes breathe in place; positions never drift, so edges stay attached
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      dummy.position.copy(n.position);
      const pulse = 1 + Math.sin(t * 1.3 + n.phase) * 0.3;
      dummy.scale.setScalar(n.baseScale * pulse);
      dummy.updateMatrix();
      nodeMesh.setMatrixAt(i, dummy.matrix);
    }
    nodeMesh.instanceMatrix.needsUpdate = true;

    // Pulses travel from node A to node B along their assigned edge, looping
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      const edge = edges[p.edgeIndex];
      if (!edge) continue;
      const progress = (t * p.speed + p.phase) % 1;
      dummy.position.lerpVectors(nodes[edge.a].position, nodes[edge.b].position, progress);
      dummy.scale.setScalar(0.032);
      dummy.updateMatrix();
      pulseMesh.setMatrixAt(i, dummy.matrix);
    }
    pulseMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} vertexColors />
      </instancedMesh>

      <lineSegments geometry={edgeGeometry} frustumCulled={false}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>

      <instancedMesh ref={pulseMeshRef} args={[undefined, undefined, pulses.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#eafff5" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
