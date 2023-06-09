"use client";
import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import threeSettings from "@/libs/three/threeSettings";
import { ThreeOutput } from "@/components/three/tunnel/ThreeOutput";

const ThreeCanvas = () => {
  const defaultCameraSettings = useMemo(() => {
    return threeSettings.default.camera;
  }, []);

  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, stencil: true, depth: true }}
      camera={{
        position: defaultCameraSettings.position,
        rotation: defaultCameraSettings.rotation,
        fov: defaultCameraSettings.fov,
        near: defaultCameraSettings.near,
        far: defaultCameraSettings.far,
        zoom: defaultCameraSettings.zoom,
        focus: defaultCameraSettings.focus,
      }}
    >
      <Suspense fallback={<GlobalScene />}>
        <SceneHelper />
        <CameraControls />
        <GlobalScene />
        <ThreeOutput />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
