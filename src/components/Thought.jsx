import { Text } from "@react-three/drei";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useControls } from "leva";
export default function Thought({ position, text }) {
  const tl = useRef();
  const textRef = useRef();
  const scroll = useScroll();
  useEffect(() => {}, [textRef]);

  const { thoughtColor } = useControls({
    thoughtColor: "#16003B",
  });
  return (
    <Text
      font={"fonts/GoogleSansCode-Regular.ttf"}
      ref={textRef}
      fontSize={0.7}
      position={position}
    >
      {text}
      <meshStandardMaterial color={thoughtColor} />
    </Text>
  );
}
