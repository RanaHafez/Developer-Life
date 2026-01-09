import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MORNINGCOLORS } from "../App";
export default function Sun(props) {
  const model = useGLTF("/models/sun.glb");
  const { scene } = useThree();
  const ref = useRef();
  const scroll = useScroll();
  const radius = 11; // distance from center
  const earlyMorningRef = useRef(new THREE.Color(MORNINGCOLORS.earlyMorning));
  const sunriseRef = useRef(new THREE.Color(MORNINGCOLORS.sunrise));
  const sunset = useRef(new THREE.Color(MORNINGCOLORS.sunset));
  const lateMorningRef = useRef(new THREE.Color(MORNINGCOLORS.lateMorning));
  useFrame(() => {
    // scroll.offset is 0 → 1
    const angle = THREE.MathUtils.lerp(
      Math.PI, // left (sunrise)
      0, // right (sunset)
      scroll.offset
    );
    const tSunrise = scroll.range(0.0, 0.2);
    const tEarly = scroll.range(0.2, 0.2);
    const tLate = scroll.range(0.4, 0.3);

    // if (scroll.offset < 0.2) {
    //   scene.background.lerpColors(
    //     sunriseRef.current,
    //     earlyMorningRef.current,
    //     tSunrise
    //   );
    // } else if (scroll.offset < 0.4) {
    //   scene.background.lerpColors(
    //     earlyMorningRef.current,
    //     lateMorningRef.current,
    //     tEarly
    //   );
    // } else if (scroll.offset < 0.7) {
    //   scene.background.lerpColors(
    //     lateMorningRef.current,
    //     sunset.current,
    //     tLate
    //   );
    // }

    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.y = Math.sin(angle) * radius;
  });
  return <primitive ref={ref} object={model.scene} {...props} />;
}
