import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import threeSettings from "@/libs/three/threeSettings";

const ThreeCanvas = () => {
  const defaultCameraSettings = useMemo(() => {
    return threeSettings.default.camera;
  }, []);

  const [dpr, setDpr] = useState(1);

  // useEffect(() => {
  //   setDpr(window.devicePixelRatio);
  // }, []);

  return (
    <Canvas
      dpr={dpr}
      shadows
      gl={{ antialias: true }}
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
        <CameraControls useCameraman={true} defaultCameraGUI={true} orbitControls={false} />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
