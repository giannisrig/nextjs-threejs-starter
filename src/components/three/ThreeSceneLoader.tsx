"use client";
import React from "react";
import { ThreeState } from "@/types/three";
import Scene1 from "@/components/three/scenes/Scene1";
import Scene2 from "@/components/three/scenes/Scene2";
import Scene3 from "@/components/three/scenes/Scene3";
import useThreeState from "@/libs/hooks/useThreeState";

const ThreeSceneLoader = () => {
  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  return (
    <>
      <group visible={scenes[1].isLoaded}>
        <Scene1 />
      </group>
      <group visible={scenes[2].isLoaded}>
        <Scene2 />
      </group>
      <group visible={scenes[3].isLoaded}>
        <Scene3 />
      </group>
    </>
  );
};

export default ThreeSceneLoader;
