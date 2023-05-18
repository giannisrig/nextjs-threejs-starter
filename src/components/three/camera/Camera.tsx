import CameraGUI from "@/components/three/camera/CameraGUI";
import CameraMan from "@/components/three/camera/CameraMan";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { DefaultCameramanSettings } from "@/types/three/settings";
import { RootState, useAppSelector } from "@/libs/store/store";
import CameramanGUI from "@/components/three/camera/CameramanGUI";
import { ThreeState } from "@/types/three/state";

const Camera = ({ orbitControls = false, cameraGUI = false, useCameraman = false, cameramanGUI = false }) => {
  // Get the cameraman state
  const cameraman: DefaultCameramanSettings = useAppSelector(
    (state: RootState) => state.three.cameraman as DefaultCameramanSettings
  );

  // Set up the settings for the cameraman and use GUI controls if enabled
  const cameramanSettings: DefaultCameramanSettings = cameramanGUI ? CameramanGUI() : cameraman;

  return (
    <>
      {orbitControls && <OrbitControls />}
      {cameraGUI && <CameraGUI />}
      {useCameraman && <CameraMan cameraman={cameramanSettings} />}
    </>
  );
};

export default Camera;
