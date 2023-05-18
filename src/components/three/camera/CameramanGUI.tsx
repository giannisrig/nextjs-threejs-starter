import { Vector3 } from "three";
import { useControls } from "leva";
import { RootState, useAppSelector } from "@/libs/store/store";
import { CameramanState, ThreeState } from "@/types/three/state";

const CameramanGUI = () => {
  // Get the cameraman state
  const {
    cameramanState,
    activeScene,
  }: {
    cameramanState: CameramanState;
    activeScene: number;
  } = useAppSelector((state: RootState) => {
    return {
      cameramanState: state.three.cameraman,
      activeScene: state.three.activeScene,
    };
  });

  // console.log("cameramanGUI updated", cameramanState);

  // Set up the Cameraman controls GUI from leva
  // We will use the state values as the initial ones
  const { action, targetPosition } = useControls(
    "Cameraman Settings",
    {
      action: { value: cameramanState.action },
      targetPosition: { value: cameramanState.targetPosition.toArray(), step: 1 },
    },
    [activeScene, cameramanState]
  );

  // Create a CameramanState type object
  const cameramanSettings: CameramanState = {
    action: action,
    targetPosition: new Vector3(...targetPosition),
  };

  return cameramanSettings;
};

export default CameramanGUI;
