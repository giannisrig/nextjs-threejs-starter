"use client";
import { Mesh, MeshStandardMaterial } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

const CameraTarget = ({ ...props }) => {
  // Set up the ref for our camera target Mesh
  const targetRef = useRef<Mesh>(null);

  // Redux Cameraman State from the active scene
  const { cameramanState, defaultCameramanState } = useThreeCameramanState();

  // Get the Target settings
  const targetSettings: CameraTarget = cameraTargetSettings;

  // Set up the camera target controls from Leva
  // The controls have the default values of cameraTargetSettings
  // They mutate the object on value changes
  useControls(
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

  // Triggered every time the target position state changes
  useEffect(() => {
    if (targetRef.current) {
      // Mutate the target position, the cameraman will detect the change
      targetRef.current.position.set(cameramanState.targetPosition.x, cameramanState.targetPosition.y, cameramanState.targetPosition.z);
    }
  }, [targetRef, cameramanState.targetPosition]);

  return (
    <mesh
      ref={targetRef}
      scale={targetSettings.scale}
      position={[defaultCameramanState.targetPosition.x, defaultCameramanState.targetPosition.y, defaultCameramanState.targetPosition.z]}
      {...props}
    >
      <sphereGeometry />
      <meshStandardMaterial color={targetSettings.color} visible={targetSettings.show} />
    </mesh>
  );
};

export default CameraTarget;
