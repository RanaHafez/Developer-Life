import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Error from "./Error";

const radius = 6;
const errors = [1, 1.1, 0.2, 0.5, 0.1];

const errorsData = errors.map((scale, index) => {
  const phi = Math.acos(1 - (2 * (index + 1)) / errors.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;

  return {
    baseScale: scale,
    position: [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ],
  };
});

export default function Errors() {
  const scroll = useScroll();
  const errorsRef = useRef();
  // scroll windows
  const appearStart = 0.25;
  const appearEnd = 0.5;

  const disappearStart = 0.7;
  const disappearEnd = 0.9;
  let visibleCount = 0;
  useFrame(() => {
    // nothing needed here anymore
    const total = errorsData.length;
    visibleCount = total;
    // 1️⃣ APPEAR: 0 → total
    if (scroll.offset > appearStart) {
      const t = THREE.MathUtils.clamp(
        (scroll.offset - appearStart) / (appearEnd - appearStart),
        0,
        1
      );
      visibleCount = Math.floor(t * total);
      errorsRef.current.children.forEach((child, index) => {
        const progress = THREE.MathUtils.clamp(t * total - index, 0, 1);
        const s = THREE.MathUtils.lerp(0, 1, progress);
        child.scale.set(s, s, s);
      });
    }
    if (scroll.offset > disappearStart) {
      const t = THREE.MathUtils.clamp(
        (scroll.offset - disappearStart) / (disappearEnd - disappearStart),
        0,
        1
      );
      visibleCount = Math.floor(t * total);
      errorsRef.current.children.forEach((child, index) => {
        const progress = THREE.MathUtils.clamp(t * total - index, 0, 1);
        const s = THREE.MathUtils.lerp(1, 0, progress);
        child.scale.set(s, s, s);
      });
    }
  });

  return (
    <group name="error-group" ref={errorsRef}>
      {errorsData.map((error, idx) => (
        <Error
          key={idx}
          position={error.position}
          baseScale={error.baseScale}
          visible={true}
        />
      ))}
    </group>
  );
}
