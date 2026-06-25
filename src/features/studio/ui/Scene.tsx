"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, AdaptiveDpr, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Vehicle } from "./Vehicle";
import { scroll, HERO } from "./scrollStore";

const MODEL_URL = "/models/hauler.glb";
useGLTF.preload(MODEL_URL);

// The hauler is HIDDEN during the new hero (an image-based section); it enters
// after, then the camera dollies IN (small→big) while orbiting. Frame-rate
// independent + pointer parallax.
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(0, 3, 16));
  useFrame((state, delta) => {
    const p = scroll.progress;
    const g = group.current;
    if (!g) return;
    g.visible = p > HERO;
    const e0 = THREE.MathUtils.clamp((p - HERO) / (1 - HERO), 0, 1);
    const e = e0 * e0 * (3 - 2 * e0); // smoothstep over the journey
    const t = state.clock.elapsedTime;

    // The hauler DRIVES the route (cab faces +X): enters from the left, drives
    // forward across the frame and grows, with a road bob + subtle sway.
    const driveX = THREE.MathUtils.lerp(-4.6, 1.6, e);
    g.position.x = THREE.MathUtils.lerp(g.position.x, driveX, 0.12);
    g.position.y = g.visible ? Math.sin(t * 5) * 0.045 : 0;
    g.rotation.z = Math.sin(t * 2.3) * 0.008;

    // camera dollies in (small→big) with a gentle orbit, fixed look target
    const dist = THREE.MathUtils.lerp(16, 6, e);
    const az = THREE.MathUtils.lerp(0.34, -0.2, e);
    const height = THREE.MathUtils.lerp(3.0, 1.7, e);
    target.current.set(
      Math.sin(az) * dist + state.pointer.x * 0.5,
      height + state.pointer.y * 0.3,
      Math.cos(az) * dist
    );
    state.camera.position.lerp(target.current, 1 - Math.pow(0.0009, delta));
    state.camera.lookAt(0, 0.85, 0);
  });
  return <group ref={group}>{children}</group>;
}

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [6, 1.7, 7], fov: 35, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 9, 4]} intensity={1.6} castShadow />
      <Suspense fallback={null}>
        {/* Real outdoor HDRI → true reflections on the truck + cars. background=false keeps the page light. */}
        <Environment files="/hdri/sky_1k.hdr" environmentIntensity={1.0} />

        <Rig>
          <Vehicle url={MODEL_URL} target={5.6} />
          <ContactShadows position={[0, 0.001, 0]} opacity={0.22} scale={22} blur={3} far={6} resolution={1024} color="#2a2618" />
        </Rig>
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
