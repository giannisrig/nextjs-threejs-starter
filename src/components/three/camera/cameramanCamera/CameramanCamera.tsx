"use client";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "three";

const CameramanCamera = () => {
  // Redux Cameraman State
  const { cameramanState, defaultCameramanState } = useThreeCameramanState();

  // Our camera ref object
  const camera = useRef<PerspectiveCamera>(null);

  // Triggered every time the camera position state changes
  useEffect(() => {
    if (camera.current) {
      // Mutate the camera position, the cameraman will detect the change
      camera.current.position.set(cameramanState.cameraPosition.x, cameramanState.cameraPosition.y, cameramanState.cameraPosition.z);
    }
  }, [camera, cameramanState.cameraPosition]);

  return (
    <perspectiveCamera
      ref={camera}
      fov={45}
      position={[defaultCameramanState.cameraPosition.x, defaultCameramanState.cameraPosition.y, defaultCameramanState.cameraPosition.z]}
    />
  );
};

export default CameramanCamera;
