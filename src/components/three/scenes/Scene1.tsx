import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import SceneContainer from "@/components/three/containers/SceneContainer";

const objectDeps = ["Scene1GltfModel"];

const Scene1 = () => {
  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <SceneContainer scene={1} deps={objectDeps}>
      <Suspense>
        <GLTFModel stateScene={1} name={objectDeps[0]} url={"/models/website-scene.glb"} />
      </Suspense>
    </SceneContainer>
  );
};

export default Scene1;
