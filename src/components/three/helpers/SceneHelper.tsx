import { Stats } from "@react-three/drei";
import React from "react";

const SceneHelper = ({ axes = false, grid = false, stats = false }) => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  return (
    <>
      <group visible={axes}>
        <axesHelper args={[1000]} />
      </group>
      <group visible={grid}>
        <gridHelper args={[1000, 100]} />
      </group>
      <group visible={stats}>
        <Stats />
      </group>
    </>
  );
};

export default SceneHelper;
