import { Text } from "@react-three/drei";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
const thoughts = [
  "loops",
  "conditions",
  "task",
  "email",
  "meeting",
  "backend",
  "frontend",
  "css",
];
import Error from "./Error";
import Errors from "./Errors";
import Thought from "./Thought";
const radius = 2;

const thoughtsData = thoughts.map((text, index) => {
  const phi = Math.acos(1 - (2 * (index + 1)) / thoughts.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index; // golden angle

  return {
    text,
    position: [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ],
  };
});
function Thoughts(props) {
  const scroll = useScroll();
  const group = useRef();

  const totalThoughts = thoughtsData.length;
  const tl = useRef();

  // scroll window for page 1
  const startApear = 0;
  const endApear = 0.25;

  const startTurnRed = 0.25;
  const endSecond = 0.5;

  const red = useRef(new THREE.Color(107 / 255, 0 / 255, 10 / 255));
  const blue = useRef(new THREE.Color(33 / 255, 32 / 255, 32 / 255));

  const thoughtMaterial = useRef();

  useEffect(() => {
    tl.current = gsap.timeline();
  });
  useFrame(() => {
    const t = THREE.MathUtils.clamp(
      (scroll.offset - startApear) / (endApear - startApear),
      0,
      1
    );

    const startDisapear = 0.65;
    const endDisapear = (scroll.pages - 1) / scroll.pages;

    // how many thoughts should be visible
    const visibleCount = Math.floor(t * totalThoughts);

    group.current.children.forEach((child, index) => {
      if (child.name != "error-group") {
        child.material.opacity = index < visibleCount ? 1 : 0;
      }
    });

    if (scroll.offset < endSecond) {
      const progress = THREE.MathUtils.clamp(
        (scroll.offset - startTurnRed) / (endSecond - startTurnRed),
        0,
        1
      );
      group.current.children.forEach((child, index) => {
        if (child.name != "error-group") {
          const t = THREE.MathUtils.clamp(
            progress * totalThoughts - index,
            0,
            1
          );
          child.material.color.lerpColors(blue.current, red.current, t);
        }
      });
    } else if (scroll.offset < endDisapear) {
      const progress = THREE.MathUtils.clamp(
        (scroll.offset - startDisapear) / (endDisapear - startDisapear),
        0,
        1
      );
      group.current.children.forEach((child, index) => {
        if (child.name != "error-group") {
          const t = THREE.MathUtils.clamp(
            progress * totalThoughts - index,
            0,
            1
          );
          child.material.color.lerpColors(red.current, blue.current, t);
        }
      });
    }
    // disappear window (page 3)
    const startDisappear = 0.7;
    const endDisappear = 0.9;

    if (scroll.offset > startDisappear) {
      const progress = THREE.MathUtils.clamp(
        (scroll.offset - startDisappear) / (endDisappear - startDisappear),
        0,
        1
      );

      group.current.children.forEach((child, index) => {
        // if (child.name !== "error-group") {
        // stagger per thought
        const t = THREE.MathUtils.clamp(progress * totalThoughts - index, 0, 1);

        // scale from 1 → 0
        const s = THREE.MathUtils.lerp(1, 0, t);
        child.scale.set(s, s, s);
        // }
      });
    }

    // group.current.children.addChild();
  });
  return (
    <>
      <group ref={group} {...props}>
        {thoughtsData.map((thought, idx) => {
          return <Thought position={thought.position} text={thought.text} />;
        })}

        <Errors />
      </group>
    </>
  );
}

export default Thoughts;
