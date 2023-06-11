"use client";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import { useRef, useEffect } from "react";
import { PerspectiveCamera as PerspectiveCameraImpl } from "three";
import { useControls } from "leva";

const CameraPosition = ({ setChanged }) => {
  // Redux Cameraman State
  const { cameramanState } = useThreeCameramanState();

  // Our camera ref object
  const cameraRef = useRef<PerspectiveCameraImpl>(null);

  const [{ cameraPosition }, set] = useControls(
    "Cameraman Controls",
    () => ({
      cameraPosition: {
        label: "Camera Position",
        value: cameramanState.cameraPosition.toArray(),
        step: 1,
      },
    }),
    { collapsed: true }
  );

  // Triggered every time the camera position state changes
  useEffect(() => {
    if (cameraRef.current) {
      // Mutate the camera position, the cameraman will detect the change
      cameraRef.current.position.set(cameramanState.cameraPosition.x, cameramanState.cameraPosition.y, cameramanState.cameraPosition.z);

      // Update the parent state that the camera target changed
      setChanged(true);

      // Update the leva control value for the target position with the state value
      set({ cameraPosition: cameramanState.cameraPosition.toArray() });

      console.log("camera position state changed", cameramanState.cameraPosition);
    }
  }, [cameraRef, cameramanState.cameraPosition, set, setChanged]);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    if (cameraRef.current && cameraPosition) {
      setChanged(true);
    }
  }, [setChanged, cameraRef, cameraPosition]);

  return <perspectiveCamera ref={cameraRef} fov={45} position={cameraPosition} />;
};

export default CameraPosition;
