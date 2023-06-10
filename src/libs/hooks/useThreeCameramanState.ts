import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import { useEffect, useState } from "react";

const useThreeCameramanState = <ThreeCameramanState>(): { cameramanState: CameramanState } => {
  // Get the three state
  const { cameraman } = useThreeState() as ThreeState;
  const [activeSceneCameramanState, setActiveSceneCameramanState] = useState(cameraman);

  useEffect(() => {
    // Return if there's no active scene
    if (cameraman === activeSceneCameramanState) return;

    // Change the state with the new cameraman state
    setActiveSceneCameramanState(cameraman);
  }, [activeSceneCameramanState, cameraman]);

  return {
    cameramanState: activeSceneCameramanState,
  };
};

export default useThreeCameramanState;
