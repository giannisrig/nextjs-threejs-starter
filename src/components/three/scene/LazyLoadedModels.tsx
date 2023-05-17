import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import Box2 from "@/components/three/objects/Box2";

const LazyLoadedModels = () => {
  const selector = useAppSelector;
  const scene1Loading = selector((state: RootState) => state.scene.scene1Loading); // updated
  const scene2Loading = selector((state: RootState) => state.scene.scene2Loading); // updated

  return (
    <>
      {scene1Loading && (
        <Suspense>
          <GLTFModel url={"/models/website-scene.glb"} />
        </Suspense>
      )}
      {scene2Loading && (
        <Suspense>
          <Box2 />
        </Suspense>
      )}
    </>
  );
};

export default LazyLoadedModels;
