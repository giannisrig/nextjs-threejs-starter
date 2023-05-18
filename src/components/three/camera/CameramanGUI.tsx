import { Vector3 } from "three";
import { useControls } from "leva";
import { RootState, useAppSelector } from "@/libs/store/store";
import { CameramanState } from "@/types/three/state";

const CameramanGUI = () => {
  // Get the cameraman state
  const cameramanState: CameramanState = useAppSelector((state: RootState) => {
    return state.three.cameraman;
  });

  // Set up the Cameraman controls GUI from leva
  // We will use the state values as the initial ones
  const { action, targetPosition } = useControls("Cameraman Settings", {
    action: { value: cameramanState.action },
    targetPosition: { value: cameramanState.targetPosition.toArray(), step: 1 },
  });

  // Create a CameramanState type object
  const cameramanSettings: CameramanState = {
    action: action,
    targetPosition: new Vector3(...targetPosition),
  };

  return cameramanSettings;
};

export default CameramanGUI;
