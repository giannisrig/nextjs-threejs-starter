import { OrbitControls, Stats } from "@react-three/drei";
import CameraGUI from "@/components/three/helpers/CameraGUI";
import React from "react";

const SceneHelper = ({ cameraGUI = false, orbitControls = false, axes = false, grid = false, stats = false }) => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  return (
    <>
      {cameraGUI && <CameraGUI />}
      {orbitControls && <OrbitControls />}
      {axes && <axesHelper args={[1000]} />}
      {grid && <gridHelper args={[1000, 100]} />}
      {stats && <Stats />}
    </>
  );
};

export default SceneHelper;
