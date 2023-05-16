import { OrbitControls } from "@react-three/drei";
import CameraControls from "@/components/three/helpers/CameraControls";
import SceneHelper from "@/components/three/helpers/SceneHelper";
import React from "react";

const ThreeHelper = ({ cameraControls = true, orbitControls = true, sceneHelper = true }) => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  return (
    <>
      {cameraControls && <CameraControls />}
      {orbitControls && <OrbitControls />}
      {sceneHelper && <SceneHelper />}
    </>
  );
};

export default ThreeHelper;
