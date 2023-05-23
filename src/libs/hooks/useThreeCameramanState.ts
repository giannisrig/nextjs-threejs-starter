import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import { useEffect, useState } from "react";

const useThreeCameramanState = <ThreeCameramanState>(): { name: string; defaultCameramanState: CameramanState; cameramanState: CameramanState } => {
  // Get the three state
  const threeState: ThreeState = useThreeState();

  // Set the default cameraman
  const defaultCameraman: CameramanState = threeState.default.cameraman;

  // State for the scene name and the active cameraman state
  const [sceneName, setSceneName] = useState("default");
  const [activeSceneCameramanState, setActiveSceneCameramanState] = useState(defaultCameraman);

  useEffect(() => {
    // Return if there's no active scene
    if (!threeState.activeScene) return;

    if (!threeState.pageScene || threeState.pageScene !== threeState.activeScene) return;

    // Return if the active scene hasn't changed
    if (sceneName === threeState.scenes[threeState.activeScene].name) return;

    // Set the active scene name
    setSceneName(threeState.scenes[threeState.activeScene].name);

    // Change the state with the new cameraman state
    setActiveSceneCameramanState(threeState.scenes[threeState.activeScene].cameraman);
  }, [sceneName, threeState.activeScene, threeState.pageScene, threeState.scenes]);

  return {
    name: sceneName,
    cameramanState: activeSceneCameramanState,
    defaultCameramanState: defaultCameraman,
  };
};

export default useThreeCameramanState;
