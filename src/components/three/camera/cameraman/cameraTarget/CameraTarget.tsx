"use client";
import { Mesh, MeshStandardMaterial } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraman/cameraTarget/cameraTargetSettings";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

const CameraTarget = ({ setChanged }) => {
  // Set up the ref for our camera target Mesh
  const targetRef = useRef<Mesh>(null);

  // Redux Cameraman State from the active scene
  const { cameramanState } = useThreeCameramanState();

  // Get the Target settings
  const targetSettings: CameraTarget = cameraTargetSettings;

  // Set up the camera target controls from Leva
  // The controls have the default values of the state
  // They mutate the object on value changes except the targetPosition which is used for the camera transition
  const [{ targetPosition }, set] = useControls(
    "Cameraman Controls",
    () => ({
      targetPosition: {
        label: "Target Position",
        value: cameramanState.targetPosition.toArray(),
        step: 1,
      },
      show: {
        label: "Show Target",
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
        label: "Target Size",
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
        label: "Target Color",
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
    }),
    { collapsed: true }
  );

  // Triggered every time the redux state target position changes
  useEffect(() => {
    if (targetRef.current) {
      // Mutate the target position, the cameraman will detect the change
      targetRef.current.position.set(cameramanState.targetPosition.x, cameramanState.targetPosition.y, cameramanState.targetPosition.z);

      // Update the parent state that the camera target changed
      setChanged(true);

      // Update the leva control value for the target position with the state value
      set({ targetPosition: cameramanState.targetPosition.toArray() });

      console.log("target position state changed", cameramanState.targetPosition);
    }
  }, [targetRef, cameramanState.targetPosition, setChanged, set]);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    // If the mesh is defined and there is a non-empty position
    if (targetRef.current && targetPosition) {
      // Update the parent state that the camera target changed
      setChanged(true);
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
