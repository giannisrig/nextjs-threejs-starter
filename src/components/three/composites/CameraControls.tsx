import CameraMan from "@/components/three/camera/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";

const CameraControls = ({ useCameraman = true, orbitControls = false }) => {
  return (
    <>
      {orbitControls && <OrbitControls />}
      {useCameraman && <CameraMan />}
    </>
  );
};

export default CameraControls;
