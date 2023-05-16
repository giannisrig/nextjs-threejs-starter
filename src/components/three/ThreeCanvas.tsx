import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "@/components/three/scene/Scene";
import cameraSettings from "@/libs/three/cameraSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";

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
        <SceneHelper cameraGUI={true} orbitControls={true} grid={true} axes={true} stats={true} />
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
