import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/three/scene/MainScene";
import LazyLoadedModels from "@/components/three/scene/LazyLoadedModels";
import cameraSettings from "@/libs/three/cameraSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraMan from "@/components/three/scene/CameraMan";
import { Vector3 } from "three";

const ThreeCanvas = () => {
  const onCanvasCreated = (canvas) => {
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
      <Suspense fallback={<MainScene />}>
        <SceneHelper cameraGUI={true} orbitControls={true} grid={true} axes={true} stats={true} />
        <MainScene />
        <LazyLoadedModels />
        <CameraMan zoom={false} targetPosition={new Vector3(0, 0, 120)} cameraPosition={new Vector3(0, 14, 0)} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
