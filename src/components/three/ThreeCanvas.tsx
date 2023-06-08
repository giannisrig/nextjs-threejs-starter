"use client";
import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import threeSettings from "@/libs/three/threeSettings";
import dynamic from "next/dynamic";
// const Effects = dynamic(() => import("@/components/three/composites/PostProcessing"), {
//   loading: () => null,
//   ssr: false,
// });

const ThreeCanvas = () => {
  const defaultCameraSettings = useMemo(() => {
    return threeSettings.default.camera;
  }, []);

  // const [dpr, setDpr] = useState(1);

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
        <SceneHelper grid={false} axes={true} stats={true} />
        <CameraControls />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
