import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Desk(props) {
  const { nodes, materials } = useGLTF("/models/Desk.glb");
  return (
    <group {...props} dispose={null} receiveShadow castShadow>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk_01_Cube037_1.geometry}
        material={materials["795548"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk_01_Cube037_1_1.geometry}
        material={materials["1A1A1A"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk_01_Cube037_1_2.geometry}
        material={materials["455A64"]}
      />
    </group>
  );
}
