import React, { Suspense } from "react";
import Box from "@/components/three/objects/common/Box";
import Scene from "@/components/three/containers/Scene";
import { RootState, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState } from "@/types/three/state";
import GLTFModel from "@/components/three/objects/gltf/GLTFModel";

const Scene2 = () => {
  // Define the current scene
  const scene = 2;

  // Get the scene object dependencies
  const { objectsDependencies } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene scene={scene} deps={objectsDependencies}>
      <Suspense>
        <GLTFModel
          url={"/models/pillars.glb"}
          stateScene={scene}
          name={objectsDependencies[0]}
          showGUI={true}
          modelPosition={[-24, 0, 0]}
          modelScale={11}
        />
        {/*<Box stateScene={scene} name={objectsDependencies[0]} />*/}
      </Suspense>
    </Scene>
  );
};

export default Scene2;
