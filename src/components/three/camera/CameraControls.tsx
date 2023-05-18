import CameraGUI from "@/components/three/camera/CameraGUI";
import CameraMan from "@/components/three/camera/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { RootState, useAppSelector } from "@/libs/store/store";
import CameramanGUI from "@/components/three/camera/CameramanGUI";
import { CameramanState, CameraState, ThreeState } from "@/types/three/state";
import Camera from "@/components/three/camera/Camera";

const CameraControls = ({ cameraGUI = false, useCameraman = true, cameramanGUI = false, orbitControls = false }) => {
  // Get the camera and cameraman state
  const { camera, cameraman } = useAppSelector((state: RootState) => state.three as ThreeState);

  // Set up the settings for the cameraman and use GUI controls if enabled
  const cameraState: CameraState = cameraGUI ? CameraGUI() : camera;
  const cameramanState: CameramanState = cameramanGUI ? CameramanGUI() : cameraman;

  return (
    <>
      {orbitControls && <OrbitControls />}
      {useCameraman && <CameraMan cameramanState={cameramanState} cameraState={cameraState} />}
    </>
  );
};

export default CameraControls;
