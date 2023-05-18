import { Vector3 } from "three";
import { useControls } from "leva";
import { DefaultCameramanSettings } from "@/types/three/settings";
import { RootState, useAppSelector } from "@/libs/store/store";

const CameramanGUI = () => {
  // Get the cameraman state
  const cameramanState: DefaultCameramanSettings = useAppSelector((state: RootState) => {
    return state.three.cameraman;
  });

  // Set up the Ground Object controls GUI from leva
  const { action, targetPosition } = useControls("Cameraman Settings", {
    action: { value: cameramanState.action },
    targetPosition: { value: cameramanState.targetPosition.toArray(), step: 1 },
  });

  // Create a GroundSettings type object
  const cameramanSettings: DefaultCameramanSettings = {
    action: action,
    targetPosition: new Vector3(...targetPosition),
  };

  return cameramanSettings;
};

export default CameramanGUI;
