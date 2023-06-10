"use client";
import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import Scene from "@/components/three/containers/Scene";
import { Vector3 } from "three";

const Scene1 = () => {
  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <Scene objects={1} cameraPosition={new Vector3(80, 11, 86)} targetPosition={new Vector3(-43, 14, -31)}>
      <Suspense>
        <GLTFModel url={"/models/website-scene-1.glb"} showGUI={true} name={"Scene 1 Object"} modelPosition={[0, 0, 0]} modelScale={6} />
      </Suspense>
    </Scene>
  );
};

export default Scene1;
