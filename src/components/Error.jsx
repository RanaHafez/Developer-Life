import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function Error({ position, baseScale, visible }) {
  const { scene } = useGLTF("/models/Red X.glb");

  // Clone so every error is its own object
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Parent: controlled by scroll
  const rootRef = useRef();

  // Child: controlled by GSAP
  const pulseRef = useRef();

  /* ---------------- GSAP pulse ---------------- */
  useEffect(() => {
    if (!visible) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(pulseRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.8,
      ease: "power1.inOut",
    });

    return () => tl.kill();
  }, [visible]);

  return (
    <group
      ref={rootRef}
      position={position}
      scale={0}
      rotation={[Math.PI / 2, 0, 0]}
    >
      {/* GSAP touches ONLY this group */}
      <group ref={pulseRef} scale={1}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}
