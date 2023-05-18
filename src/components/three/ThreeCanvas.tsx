import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import cameraSettings from "@/libs/three/cameraSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import Camera from "@/components/three/camera/Camera";

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
        position: cameraSettings.position,
        rotation: cameraSettings.rotation,
        fov: cameraSettings.fov,
        near: cameraSettings.near,
        far: cameraSettings.far,
        zoom: cameraSettings.zoom,
        focus: cameraSettings.focus,
      }}
    >
      <Suspense fallback={<GlobalScene />}>
        <SceneHelper grid={true} axes={true} stats={true} />
        <Camera cameraGUI={true} useCameraman={true} cameramanGUI={true} orbitControls={false} />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
