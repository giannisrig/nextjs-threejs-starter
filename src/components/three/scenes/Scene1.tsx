import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import Scene from "@/components/three/containers/Scene";
import { ThreeSceneState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";

const Scene1 = () => {
  // Define the current scene
  const scene = 1;

  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  // Get the scene object dependencies
  const { objectsDependencies } = scenes[scene] as ThreeSceneState;

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene scene={scene} deps={objectsDependencies}>
      <Suspense>
        <GLTFModel
          url={"/models/website-scene.glb"}
          showGUI={true}
          stateScene={scene}
          name={objectsDependencies[0]}
          modelPosition={[0, 0, 0]}
          modelScale={6}
        />
      </Suspense>
    </Scene>
  );
};

export default Scene1;
