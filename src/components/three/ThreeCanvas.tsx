import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/three/scene/MainScene";
import cameraSettings from "@/libs/three/cameraSettings";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import { Preload } from "@react-three/drei";
import { ThreeTunnelOutput } from "@/components/three/threeTunnel/ThreeTunnelOutput";
import DynamicScenes from "@/components/three/scene/DynamicScenes";

const ThreeCanvas = () => {
  return (
    <Canvas
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
      <Suspense fallback={null}>
        <SceneHelper cameraGUI={true} orbitControls={true} grid={true} axes={true} stats={true} />
        <MainScene />
        <DynamicScenes />
        {/* Render anything sent through the tunnel! */}
        <ThreeTunnelOutput />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
