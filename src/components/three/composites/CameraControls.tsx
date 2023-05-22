import CameraMan from "@/components/three/camera/cameraman/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import CameraGUI from "@/components/three/camera/cameraGUI/CameraGUI";

const CameraControls = ({ useCameraman = true, useCameramanGUI = false, orbitControls = false, defaultCameraGUI = false }) => {
  return (
    <>
      {orbitControls && <OrbitControls />}
      {useCameraman && <CameraMan showGUI={useCameramanGUI} />}
      {defaultCameraGUI && <CameraGUI />}
    </>
  );
};

export default CameraControls;
