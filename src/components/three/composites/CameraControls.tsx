import CameraMan from "@/components/three/camera/cameraman/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import DefaultCamera from "@/components/three/camera/defaultCamera/DefaultCamera";

const CameraControls = ({ useCameraman = true, orbitControls = false, defaultCameraGUI = false }) => {
  return (
    <>
      <group visible={orbitControls}>
        <OrbitControls />
      </group>
      <group visible={useCameraman}>
        <CameraMan useCameraman={useCameraman} />
      </group>
      <group visible={defaultCameraGUI}>
        <DefaultCamera showGUI={defaultCameraGUI} />
      </group>
    </>
  );
};

export default CameraControls;
