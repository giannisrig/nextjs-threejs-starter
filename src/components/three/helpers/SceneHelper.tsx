import { OrbitControls, Stats } from "@react-three/drei";
import React from "react";

const SceneHelper = ({ orbitControls = false, axes = false, grid = false, stats = false }) => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  return (
    <>
      {orbitControls && <OrbitControls />}
      {axes && <axesHelper args={[1000]} />}
      {grid && <gridHelper args={[1000, 100]} />}
      {stats && <Stats />}
    </>
  );
};

export default SceneHelper;
