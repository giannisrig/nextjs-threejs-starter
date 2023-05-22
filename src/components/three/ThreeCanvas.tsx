import React, { Suspense, useMemo } from "react";
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

  return (
    <Canvas
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
        <CameraControls defaultCameraGUI={true} useCameraman={true} orbitControls={false} />
        <GlobalScene />
        <ThreeSceneLoader />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;
