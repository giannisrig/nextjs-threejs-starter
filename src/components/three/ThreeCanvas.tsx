import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import GlobalScene from "@/components/three/scenes/GlobalScene";
import ThreeSceneLoader from "@/components/three/ThreeSceneLoader";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import CameraControls from "@/components/three/composites/CameraControls";
import threeSettings from "@/libs/three/threeSettings";
import { PerformanceMonitor } from "@react-three/drei";

const ThreeCanvas = () => {
  const defaultCameraSettings = useMemo(() => {
    return threeSettings.default.camera;
  }, []);

  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
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
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      <Suspense fallback={<GlobalScene />}>
        <SceneHelper grid={false} axes={true} stats={true} />
        <CameraControls useCameraman={true} useCameramanGUI={true} defaultCameraGUI={true} orbitControls={false} />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
