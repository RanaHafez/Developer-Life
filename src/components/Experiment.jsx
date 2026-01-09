import {
  OrbitControls,
  Environment,
  ContactShadows,
  useScroll,
} from "@react-three/drei";
import Laptop from "./Laptop";
import Desk from "./Desk";
import { useControls } from "leva";
import { Scroll, Stage } from "@react-three/drei";
import { Interface } from "./Interface";
import { Mug } from "./Mug";
import { MathUtils, MeshStandardMaterial } from "three";
import Sun from "./Sun";
import Thoughts from "./Thoughts";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import gsap from "gsap";
import { bleach } from "three/examples/jsm/tsl/display/BleachBypass.js";
const phases = {
  warm: {
    ambientLightIntensity: 1.2,
    ambientLightColor: "#ffffff",
    directionalLightColor: "#fff1d6",
    directionalLightIntensity: 2,
    hemisphereLightIntensity: 0.6,
    skyColor: "#dfefff",
    groundColor: "#e6dccf",
  },
  focus: {
    ambientLightIntensity: 0.6,
    ambientLightColor: "#ffffff",
    directionalLightColor: "#e8ecff",
    directionalLightIntensity: 6,
    hemisphereLightIntensity: 0.3,
    skyColor: "#dfefff",
    groundColor: "#e6dccf",
  },
  stress: {
    ambientLightIntensity: 0.05,
    ambientLightColor: "#ffffff",
    directionalLightColor: "#c45a5a",
    directionalLightIntensity: 10,
    hemisphereLightIntensity: 0.1,
    skyColor: "#dfefff",
    groundColor: "#e6dccf",
  },
  breakthrough: {
    ambientLightIntensity: 0.7,
    ambientLightColor: "#ffffff",
    directionalLightColor: "#dbe6ff",
    directionalLightIntensity: 5,
    hemisphereLightIntensity: 0.5,
    skyColor: "#dfefff",
    groundColor: "#e6dccf",
  },
  final: {
    ambientLightIntensity: 0.25,
    ambientLightColor: "",
    directionalLightColor: "#ffd8b0",
    directionalLightIntensity: 1,
    hemisphereLightIntensity: 0.3,
    skyColor: "#dfefff",
    groundColor: "#e6dccf",
  },
};
function Experiment() {
  const {
    laptop_position,
    mug_position,
    mug_rotation,
    sun_rotation,
    sun_position,
    thoughts_position,
  } = useControls({
    laptop_position: {
      x: 0,
      y: 4.8,
      z: 0,
    },
    mug_position: {
      x: 2.6,
      y: 4.8,
      z: 1,
    },
    mug_rotation: {
      value: 180,
      step: 1,
      max: 180,
      min: 0,
    },
    sun_rotation: {
      value: 219,
      step: 1,
      max: 360,
      min: 0,
    },
    sun_position: {
      x: -10,
      y: 0,
      z: 0,
    },
    thoughts_position: {
      x: 0,
      y: 10,
      z: 0,
    },
  });
  const start = 0.25;
  let end = 1 / 5;

  const stressStart = 0.5;
  const stressEnd = 0.7;
  const scroll = useScroll();
  const ambientLightRef = useRef();
  const directionalLightRef = useRef();
  const hemisphereLightRef = useRef();

  const { scene } = useThree();
  const blue = useRef(new THREE.Color(33 / 255, 32 / 255, 32 / 255));
  const startBG = useRef(new THREE.Color(248 / 255, 246 / 255, 243 / 255));
  const focusBG = useRef(new THREE.Color(30 / 255, 34 / 255, 51 / 255));
  const debugBG = useRef(new THREE.Color(12 / 255, 15 / 255, 26 / 255));
  const clarityBG = useRef(new THREE.Color(207 / 255, 216 / 255, 255 / 255));
  const directionalLightColorFocus = useRef(
    new THREE.Color(232 / 255, 236 / 255, 255 / 255)
  );
  const directionalLightColorStress = useRef(
    new THREE.Color(196 / 255, 90 / 255, 90 / 255)
  );
  const directionalLightColorBreakthrough = useRef(
    new THREE.Color(219 / 255, 230 / 255, 255 / 255)
  );
  const directionalLightColorFinal = useRef(
    new THREE.Color(255 / 255, 216 / 255, 176 / 255)
  );
  const endScene = useRef(new THREE.Color(255 / 255, 216 / 255, 176 / 255));

  const tl = useRef();
  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(scene.background, {
      duration: 1,
      r: startBG.current.r,
      g: startBG.current.g,
      b: startBG.current.b,
    });
    tl.current.to(scene.background, {
      duration: 2,
      r: focusBG.current.r,
      g: focusBG.current.g,
      b: focusBG.current.b,
    });
    tl.current.to(
      directionalLightRef.current.color,
      {
        duration: 1,
        r: directionalLightColorFocus.current.r,
        g: directionalLightColorFocus.current.g,
        b: directionalLightColorFocus.current.b,
      },
      "<"
    );
    tl.current.to(
      ambientLightRef.current,
      { duration: 1, intensity: phases.focus.ambientLightIntensity },
      "<"
    );
    tl.current.to(
      directionalLightRef.current,
      { duration: 1, intensity: phases.focus.directionalLightIntensity },
      "<"
    );
    tl.current.to(
      hemisphereLightRef.current,
      { duration: 1, intensity: phases.focus.hemisphereLightIntensity },
      "<"
    );
    tl.current.to(scene.background, {
      duration: 2,
      r: debugBG.current.r,
      g: debugBG.current.g,
      b: debugBG.current.b,
    });
    tl.current.to(
      directionalLightRef.current.color,
      {
        duration: 1,
        r: directionalLightColorStress.current.r,
        g: directionalLightColorStress.current.g,
        b: directionalLightColorStress.current.b,
      },
      "<"
    );
    tl.current.to(
      directionalLightRef.current,
      { duration: 1, intensity: phases.stress.directionalLightIntensity },
      "<"
    );
    tl.current.to(
      ambientLightRef.current,
      { duration: 1, intensity: phases.stress.ambientLightIntensity },
      "<"
    );
    tl.current.to(scene.background, {
      duration: 2,
      r: clarityBG.current.r,
      g: clarityBG.current.g,
      b: clarityBG.current.b,
    });
    tl.current.to(
      ambientLightRef.current,
      { duration: 1, intensity: phases.breakthrough.ambientLightIntensity },
      "<"
    );
    tl.current.to(
      hemisphereLightRef.current,
      { duration: 1, intensity: phases.breakthrough.hemisphereLightIntensity },
      "<"
    );
    tl.current.to(
      directionalLightRef.current,
      { duration: 1, intensity: phases.breakthrough.directionalLightIntensity },
      "<"
    );
    tl.current.to(
      directionalLightRef.current.color,
      {
        duration: 1,
        r: directionalLightColorBreakthrough.current.r,
        g: directionalLightColorBreakthrough.current.g,
        b: directionalLightColorBreakthrough.current.b,
      },
      "<"
    );
    tl.current.to(scene.background, {
      duration: 1,
      r: endScene.current.r,
      g: endScene.current.g,
      b: endScene.current.b,
    });
    tl.current.to(
      directionalLightRef.current,
      { duration: 1, intensity: phases.final.directionalLightIntensity },
      "<"
    );
    tl.current.to(
      ambientLightRef.current,
      { duration: 1, intensity: phases.final.ambientLightIntensity },
      "<"
    );
    tl.current.to(
      hemisphereLightRef.current,
      { duration: 1, intensity: phases.final.hemisphereLightIntensity },
      "<"
    );
    tl.current.to(
      directionalLightRef.current.color,
      {
        duration: 1,
        r: directionalLightColorFinal.current.r,
        g: directionalLightColorFinal.current.g,
        b: directionalLightColorFinal.current.b,
      },
      "<"
    );
    tl.current.pause();
  });
  useFrame(() => {
    tl.current.progress(scroll.offset);
  });
  return (
    <>
      <ambientLight
        ref={ambientLightRef}
        intensity={phases.warm.ambientLightIntensity}
        color={phases.warm.ambientLightColor}
      />
      <directionalLight position={[-6, 10, 0]} castShadow />
      <directionalLight
        ref={directionalLightRef}
        intensity={phases.warm.directionalLightIntensity}
        color={phases.warm.directionalLightColor}
        position={[-6, 10, -10]}
        castShadow
      />
      <directionalLight position={[6, 10, 0]} castShadow />
      <hemisphereLight
        ref={hemisphereLightRef}
        intensity={phases.warm.hemisphereLightIntensity}
        color={phases.warm.skyColor}
        groundColor={phases.warm.groundColor}
      />
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
        // enabled={false}
        enableRotate={false}
      />
      <Environment preset="night" />

      <Mug
        scale={0.02}
        position={[mug_position.x, mug_position.y, mug_position.z]}
        rotation={[0, MathUtils.degToRad(mug_rotation), 0]}
      />
      <Desk />
      <Laptop
        scale={0.03}
        position={[laptop_position.x, laptop_position.y, laptop_position.z]}
      />
      <Sun
        position={[sun_position.x, sun_position.y, sun_position.z]}
        rotation={[0, MathUtils.degToRad(sun_rotation), 0]}
        // castShadow
      />
      <Thoughts
        position={[
          thoughts_position.x,
          thoughts_position.y,
          thoughts_position.z,
        ]}
      />
      <mesh rotation-x={0} receiveShadow>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color={"#ef7d76"} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
export default Experiment;
