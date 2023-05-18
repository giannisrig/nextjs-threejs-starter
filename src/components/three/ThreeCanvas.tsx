import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import cameraSettings from "@/libs/three/cameraSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraMan from "@/components/three/camera/CameraMan";
import { Vector3 } from "three";

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
        <SceneHelper cameraGUI={true} orbitControls={true} grid={true} axes={true} stats={true} />
        <GlobalScene />
        <ThreeSceneLoader />
        {/*<CameraMan zoom={false} targetPosition={new Vector3(0, 0, 120)} cameraPosition={new Vector3(0, 14, 0)} />*/}
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
