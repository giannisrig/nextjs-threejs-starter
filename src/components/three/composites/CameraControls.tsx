import CameraMan from "@/components/three/camera/cameraman/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import DefaultCamera from "@/components/three/camera/defaultCamera/DefaultCamera";

const CameraControls = ({ useCameraman = true, useCameramanGUI = false, orbitControls = false, defaultCameraGUI = false }) => {
  if (useCameraman && useCameramanGUI) {
    console.warn("The cameraman GUI is enabled, Note that automatic cameraman change doesn't work when GUI is enabled.");
  }

  return (
    <>
      <group visible={orbitControls}>
        <OrbitControls />
      </group>
      <group visible={useCameraman}>
        <CameraMan showGUI={useCameramanGUI} />
      </group>
      <group visible={defaultCameraGUI}>
        <DefaultCamera showGUI={defaultCameraGUI} />
      </group>
    </>
  );
};

export default CameraControls;
