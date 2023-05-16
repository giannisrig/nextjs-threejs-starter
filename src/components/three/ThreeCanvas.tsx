import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "@/components/three/scene/Scene";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/helpers/CameraControls";
import cameraSettings from "@/libs/three/cameraSettings";

const ThreeCanvas = () => {
  return (
    <Canvas
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
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <CameraControls />
      <OrbitControls />
      <SceneHelper />
    </Canvas>
  );
};

export default ThreeCanvas;
