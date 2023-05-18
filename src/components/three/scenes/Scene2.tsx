import React, { Suspense } from "react";
import Box2 from "@/components/three/objects/Box2";
import SceneContainer from "@/components/three/containers/SceneContainer";

const objectDeps = ["Box2"];

const Scene2 = () => {
  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return (
    <SceneContainer scene={2} deps={objectDeps}>
      <Suspense>
        <Box2 stateScene={2} name={objectDeps[0]} />
      </Suspense>
    </SceneContainer>
  );
};

export default Scene2;
