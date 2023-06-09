"use client";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "three";
import { useControls } from "leva";

const CameramanCamera = ({ setChanged }) => {
  // Redux Cameraman State
  const { cameramanState } = useThreeCameramanState();

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
      setChanged(true);
      console.log("camera position state changed");
    }
  }, [cameraRef, cameramanState.cameraPosition, setChanged]);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    if (cameraRef.current && cameraPosition) {
      setChanged(true);
    }
  }, [setChanged, cameraRef, cameraPosition]);

  return <perspectiveCamera ref={cameraRef} fov={45} position={cameraPosition} />;
};

export default CameramanCamera;
