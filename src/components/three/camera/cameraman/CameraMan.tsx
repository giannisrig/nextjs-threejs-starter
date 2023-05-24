import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import CameraTarget from "@/components/three/camera/cameraTarget/CameraTarget";
import CameramanCamera from "@/components/three/camera/cameramanCamera/CameramanCamera";
import { useControls } from "leva";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";

CameraControls.install({ THREE });

function CameraMan({ useCameraman = false }) {
  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Ref objects, these refs are used for the cameraman actions
  const cameramanRef = useRef(null);

  // Get the active cameraman state
  const { cameramanState } = useThreeCameramanState();

  // Set up the Leva controls for the cameraman
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [, set] = useControls("Cameraman Settings", () => ({
    cameraPosition: {
      value: cameramanState.cameraPosition.toArray(),
      step: 1,
      onChange: (cameraPosition) => {
        if (cameramanRef.current && cameramanRef.current.children[0]) {
          cameramanRef.current.children[0].position.set(...cameraPosition);
        }
      },
    },
    targetPosition: {
      value: cameramanState.targetPosition.toArray(),
      step: 1,
      onChange: (targetPosition) => {
        if (cameramanRef.current && cameramanRef.current.children[1]) {
          cameramanRef.current.children[1].position.set(...targetPosition);
        }
      },
    },
  }));

  // This code runs when the cameraman state changes, usually because there's a new active scene
  // It sets the values of the updated state to the leva controls
  useEffect(() => {
    // Update the leva controls with the values of the new cameraman state
    set({ cameraPosition: cameramanState.cameraPosition.toArray() });
    set({ targetPosition: cameramanState.targetPosition.toArray() });
  }, [set, cameramanState.cameraPosition, cameramanState.targetPosition]);

  // RAF to handle the cameraman controls
  // useFrame((state, delta) => {
  //   // Make sure the cameraman objects are defined
  //   if (cameramanRef.current && cameramanRef.current.children[0] && cameramanRef.current.children[1]) {
  //     // Set the position of the camera and the target to look at
  //     // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#setLookAt
  //     controls.setLookAt(
  //       cameramanRef.current.children[0].position.x,
  //       cameramanRef.current.children[0].position.y,
  //       cameramanRef.current.children[0].position.z,
  //       cameramanRef.current.children[1].position.x,
  //       cameramanRef.current.children[1].position.y,
  //       cameramanRef.current.children[1].position.z,
  //       true
  //     );
  //   }
  //
  //   // Update the controls
  //   controls.update(delta);
  // });

  return (
    <group ref={cameramanRef} visible={useCameraman}>
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <CameramanCamera />
      {/* This component is used for the cameraman's target position to look at */}
      <CameraTarget />
    </group>
  );
}

export default CameraMan;
