import React, { Suspense } from "react";
import Box2 from "@/components/three/objects/Box2";
import Scene from "@/components/three/containers/Scene";
import { RootState, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState } from "@/types/three/state";

const Scene2 = () => {
  // Define the current scene
  const scene = 2;

  // Get the scene object dependencies
  const { objectsDependencies } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene scene={scene} deps={objectsDependencies}>
      <Suspense>
        <Box2 stateScene={scene} name={objectsDependencies[0]} />
      </Suspense>
    </Scene>
  );
};

export default Scene2;
