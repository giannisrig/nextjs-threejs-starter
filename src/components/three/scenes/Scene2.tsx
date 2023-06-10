"use client";
import React, { Suspense } from "react";
import Scene from "@/components/three/containers/Scene";
import GLTFModel from "@/components/three/objects/gltf/GLTFModel";

const Scene2 = () => {
  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene scene={2} objects={1}>
      <Suspense>
        <GLTFModel url={"/models/NextJSLogo.glb"} name={"Scene 2"} showGUI={true} modelPosition={[48, 0, 300]} modelScale={20} />
        {/*<Box stateScene={scene} name={objectsDependencies[0]} />*/}
      </Suspense>
    </Scene>
  );
};

export default Scene2;
