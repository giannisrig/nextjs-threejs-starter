import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import threeSettings from "@/libs/three/threeSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";

const ThreeCanvas = () => {
  const onCanvasCreated = () => {
    // const { gl } = canvas;
    // console.log("Canvas UUID:", gl);
    console.log("ThreeJsCanvas Created");
  };

  return (
    <Canvas
      onCreated={onCanvasCreated}
      onCompositionUpdate={onCanvasCreated}
      gl={{ antialias: true }}
      camera={{
        position: threeSettings.default.camera.position,
        rotation: threeSettings.default.camera.rotation,
        fov: threeSettings.default.camera.fov,
        near: threeSettings.default.camera.near,
        far: threeSettings.default.camera.far,
        zoom: threeSettings.default.camera.zoom,
        focus: threeSettings.default.camera.focus,
      }}
    >
      <Suspense fallback={<GlobalScene />}>
        <SceneHelper grid={false} axes={true} stats={true} />
        <CameraControls showGUI={true} useCameraman={true} orbitControls={false} />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
