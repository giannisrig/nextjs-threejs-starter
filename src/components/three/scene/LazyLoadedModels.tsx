import GLTFModel from "@/components/three/objects/gltf/GLTFModel";
import React, { Suspense } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import Box2 from "@/components/three/objects/Box2";

const LazyLoadedModels = () => {
  // Set up the Redux State Selector
  const selector = useAppSelector;
  const scene1Loading = selector((state: RootState) => state.three.scene1Loading); // updated
  const scene2Loading = selector((state: RootState) => state.three.scene2Loading); // updated

  {
    /* Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big */
  }
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
