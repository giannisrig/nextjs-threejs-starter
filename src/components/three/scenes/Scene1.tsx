import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import SceneContainer from "@/components/three/containers/SceneContainer";
import { RootState, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState } from "@/types/three/state";

const Scene1 = () => {
  // Define the current scene
  const scene = 1;

  // Get the scene object dependencies
  const { objectsDependencies } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <SceneContainer scene={scene} deps={objectsDependencies}>
      <Suspense>
        <GLTFModel stateScene={scene} name={objectsDependencies[0]} url={"/models/website-scene.glb"} />
      </Suspense>
    </SceneContainer>
  );
};

export default Scene1;
