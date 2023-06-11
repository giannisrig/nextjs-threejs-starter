"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import { ThreeOutput } from "@/components/three/tunnel/ThreeOutput";
import { Euler, Vector3 } from "three";

const ThreeCanvas = () => {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, stencil: true, depth: true }}
      camera={{
        position: new Vector3(150, 11, 77),
        rotation: new Euler(0, 0, 0, "XYZ"),
        fov: 37,
        near: 0.1,
        far: 4000,
        zoom: 1,
        focus: 20,
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
