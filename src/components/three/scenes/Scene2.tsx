"use client";
import React, { Suspense } from "react";
import Scene from "@/components/three/containers/Scene";
import { ThreeSceneState, ThreeState } from "@/types/three/state";
import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import useThreeState from "@/libs/hooks/useThreeState";

const Scene2 = () => {
  // Define the current scene
  const scene = 2;

  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  // Get the scene object dependencies
  const { objectsDependencies } = scenes[scene] as ThreeSceneState;

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene scene={scene} deps={objectsDependencies}>
      <Suspense>
        <GLTFModel
          url={"/models/NextJSLogo.glb"}
          stateScene={scene}
          name={objectsDependencies[0]}
          showGUI={true}
          modelPosition={[48, 0, 300]}
          modelScale={20}
        />
        {/*<Box stateScene={scene} name={objectsDependencies[0]} />*/}
      </Suspense>
    </Scene>
  );
};

export default Scene2;
