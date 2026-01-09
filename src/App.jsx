import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Experiment from "./components/Experiment";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls, Stage } from "@react-three/drei";
import { Interface } from "./components/Interface";
export const MORNINGCOLORS = {
  sunrise: "#3A2E5D", // بنفسجي غامق → الشمس تبرز
  earlyMorning: "#4A6FA5", // أزرق سماوي هادي
  lateMorning: "#7FB7BE", // تركواز فاتح بس مش أبيض
  sunset: "#2E1F3B",
};
function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 20] }} shadows>
        <color attach={"background"} args={["#f8f6f3"]} />
        {/* <Stage
          // adjustCamera
          intensity={0.5}
          shadows="contact"
          environment="night"
        > */}
        <ScrollControls pages={7}>
          <Experiment />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
        {/* </Stage> */}
      </Canvas>
    </>
  );
}

export default App;
