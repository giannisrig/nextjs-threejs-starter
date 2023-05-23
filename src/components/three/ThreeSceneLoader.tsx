import React from "react";
import { ThreeState } from "@/types/three";
import Scene1 from "@/components/three/scenes/Scene1";
import Scene2 from "@/components/three/scenes/Scene2";
import useThreeState from "@/libs/hooks/useThreeState";

const ThreeSceneLoader = () => {
  // Get the scenes state
  const { scenes, activeScene } = useThreeState() as ThreeState;

  return (
    <>
      <group visible={scenes[1].isLoaded && activeScene === 1}>
        <Scene1 />
      </group>
      <group visible={scenes[2].isLoaded && activeScene === 2}>
        <Scene2 />
      </group>
    </>
  );
};

export default ThreeSceneLoader;
