import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import threeSettings from "@/libs/three/threeSettings";
import PostProcessing from "@/components/three/composites/PostProcessing";

const ThreeCanvas = () => {
  const defaultCameraSettings = useMemo(() => {
    return threeSettings.default.camera;
  }, []);

  const [dpr, setDpr] = useState(1);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, stencil: false, depth: true }}
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
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
