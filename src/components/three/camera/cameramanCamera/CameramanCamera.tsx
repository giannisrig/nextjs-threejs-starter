"use client";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial, PerspectiveCamera, Vector3 } from "three";
import { useControls } from "leva";

const CameramanCamera = ({ setChanged }) => {
  // Redux Cameraman State
  const { cameramanState, defaultCameramanState } = useThreeCameramanState();

  // Our camera ref object
  const cameraRef = useRef<PerspectiveCamera>(null);

  const { cameraPosition } = useControls(
    "Camera Cameraman",
    {
      cameraPosition: {
        value: cameramanState.cameraPosition.toArray(),
        step: 1,
      },
    },
    {
      collapsed: true,
    }
  );

  // Triggered every time the camera position state changes
  useEffect(() => {
    if (cameraRef.current) {
      // Mutate the camera position, the cameraman will detect the change
      cameraRef.current.position.set(cameramanState.cameraPosition.x, cameramanState.cameraPosition.y, cameramanState.cameraPosition.z);
    }
  }, [cameraRef, cameramanState.cameraPosition]);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    if (cameraRef.current) {
      if (cameraPosition !== cameraRef.current.position.toArray()) {
        setChanged(true);
      }
    }
  }, [setChanged, cameraRef, cameraPosition]);

  return <perspectiveCamera ref={cameraRef} fov={45} position={cameraPosition} />;
};

export default CameramanCamera;
