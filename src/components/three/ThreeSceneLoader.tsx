import React from "react";
import { ThreeSceneState } from "@/types/three";
import Scene1 from "@/components/three/scenes/Scene1";
import Scene2 from "@/components/three/scenes/Scene2";
import useThreeState from "@/libs/hooks/useThreeState";

const ThreeSceneLoader = () => {
  // Get the scenes state
  const { scenes }: { scenes: ThreeSceneState[] } = useThreeState();

  return (
    <>
      <group visible={scenes[1].isLoading}>
        <Scene1 />
      </group>
      <group visible={scenes[2].isLoading}>
        <Scene2 />
      </group>
    </>
  );
};

export default ThreeSceneLoader;
