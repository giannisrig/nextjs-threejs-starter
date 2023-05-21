import CameraMan from "@/components/three/camera/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";

const CameraControls = ({ showGUI = false, useCameraman = true, orbitControls = false }) => {
  return (
    <>
      {orbitControls && <OrbitControls />}
      {useCameraman && <CameraMan showGUI={showGUI} />}
    </>
  );
};

export default CameraControls;
