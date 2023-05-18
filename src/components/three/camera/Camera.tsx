import CameraGUI from "@/components/three/camera/CameraGUI";
import CameraMan from "@/components/three/camera/CameraMan";
import React from "react";
import { Vector3 } from "three";

const Camera = ({ cameraGUI = false, cameraman = false }) => {
  return (
    <>
      {cameraGUI && <CameraGUI />}
      {cameraman && (
        <CameraMan zoom={false} targetPosition={new Vector3(0, 0, 120)} cameraPosition={new Vector3(0, 14, 0)} />
      )}
    </>
  );
};

export default Camera;
