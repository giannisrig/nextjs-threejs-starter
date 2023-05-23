import { Vector3 } from "three";
import { useControls } from "leva";
import { CameramanState } from "@/types/three/state";

const CameramanGUI = (cameramanState: CameramanState) => {
  // Set up the Cameraman controls GUI from leva
  // We will use the state values as the initial ones
  const { action, targetPosition, cameraPosition } = useControls("Cameraman Settings", {
    action: { value: cameramanState.action },
    cameraPosition: { value: cameramanState.cameraPosition.toArray(), step: 1 },
    targetPosition: { value: cameramanState.targetPosition.toArray(), step: 1 },
  });

  // Create a CameramanState type object
  const cameramanSettings: CameramanState = {
    action: action,
    cameraPosition: new Vector3(...cameraPosition),
    targetPosition: new Vector3(...targetPosition),
  };

  return cameramanSettings;
};

export default CameramanGUI;
