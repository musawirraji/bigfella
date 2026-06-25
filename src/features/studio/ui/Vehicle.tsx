"use client";

import { useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import * as THREE from "three";
import { scroll, HERO } from "./scrollStore";

// Loads a GLB, auto-centers it on the ground (min.y = 0) and scales its
// largest dimension to `target` world units so any model reads BIG and
// consistent. Enables shadows. KTX2 transcoder wired for compressed textures.
export function Vehicle({ url, target = 4.5 }: { url: string; target?: number }) {
  const gl = useThree((s) => s.gl);
  const ref = useRef<THREE.Group>(null);

  const { scene } = useGLTF(url, true, false, (loader) => {
    const ktx2 = new KTX2Loader()
      .setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.184.0/examples/jsm/libs/basis/")
      .detectSupport(gl);
    // @ts-expect-error drei's GLTFLoader has setKTX2Loader at runtime
    loader.setKTX2Loader?.(ktx2);
  });

  useLayoutEffect(() => {
    scene.scale.setScalar(1);
    scene.position.set(0, 0, 0);
    let box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const s = target / Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(s);
    box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.set(-center.x, -box.min.y, -center.z);
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        const m = mesh.material;
        (Array.isArray(m) ? m : [m]).forEach((mm) => { mm.transparent = true; });
      }
    });
  }, [scene, target]);

  // Fade in smoothly as the page scrolls into the hauler section (no hard pop).
  const fade = useRef(-1);
  useFrame(() => {
    const f = THREE.MathUtils.smoothstep(scroll.progress, HERO, HERO + 0.09);
    if (Math.abs(f - fade.current) < 0.003) return;
    fade.current = f;
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material;
      if (!m) return;
      (Array.isArray(m) ? m : [m]).forEach((mm) => { mm.opacity = f; mm.depthWrite = f > 0.6; });
    });
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}
