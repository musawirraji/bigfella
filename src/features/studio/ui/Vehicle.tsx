"use client";

import { useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import * as THREE from "three";

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
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [scene, target]);

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}
