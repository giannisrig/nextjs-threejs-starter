"use client";
import { Mesh, MeshStandardMaterial, Vector3 } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

const CameraTarget = ({ setChanged }) => {
  // Set up the ref for our camera target Mesh
  const targetRef = useRef<Mesh>(null);

  // Redux Cameraman State from the active scene
  const { cameramanState, defaultCameramanState } = useThreeCameramanState();

  // Get the Target settings
  const targetSettings: CameraTarget = cameraTargetSettings;

  // Set up the camera target controls from Leva
  // The controls have the default values of cameraTargetSettings
  // They mutate the object on value changes
  const { targetPosition } = useControls(
    "Camera Target",
    {
      show: {
        value: targetSettings.show,
        onChange: (show) => {
          if (targetRef.current) {
            // Define the mesh standard material for ts reference
            const material = targetRef.current.material as MeshStandardMaterial;
            material.visible = show;
          }
        },
      },
      targetPosition: {
        value: cameramanState.targetPosition.toArray(),
        step: 1,
      },
      scale: {
        value: targetSettings.scale,
        step: 1,
        min: 1,
        max: 10,
        onChange: (scale) => {
          if (targetRef.current) {
            targetRef.current.scale.set(scale, scale, scale);
          }
        },
      },
      color: {
        value: "#" + targetSettings.color.getHexString(),
        onChange: (color) => {
          if (targetRef.current) {
            // Define the mesh standard material for ts reference
            const material = targetRef.current.material as MeshStandardMaterial;

            // Change the color
            material.color.set(color);
          }
        },
      },
    },
    {
      collapsed: true,
    }
  );

  // Triggered every time the redux state target position changes
  useEffect(() => {
    if (targetRef.current) {
      // Mutate the target position, the cameraman will detect the change
      targetRef.current.position.set(cameramanState.targetPosition.x, cameramanState.targetPosition.y, cameramanState.targetPosition.z);
    }
  }, [targetRef, cameramanState.targetPosition]);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    if (targetRef.current) {
      if (targetPosition !== targetRef.current.position.toArray()) {
        setChanged(true);
      }
    }
  }, [setChanged, targetRef, targetPosition]);

  return (
    <mesh ref={targetRef} scale={targetSettings.scale} position={targetPosition}>
      <sphereGeometry />
      <meshStandardMaterial color={targetSettings.color} visible={targetSettings.show} />
    </mesh>
  );
};

export default CameraTarget;
