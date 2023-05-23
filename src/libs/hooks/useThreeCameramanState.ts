import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import CameramanGUI from "@/components/three/camera/cameraman/CameramanGUI";
import { useEffect, useState } from "react";

const useThreeCameramanState = <ThreeCameramanState>(showGUI): { defaultCameramanState: CameramanState; cameramanState: CameramanState } => {
  // Get the three state
  const threeState: ThreeState = useThreeState();

  // Set the default cameraman
  const defaultCameraman: CameramanState = threeState.default.cameraman;

  // State for the scene name and the active cameraman state
  const [sceneName, setSceneName] = useState("default");
  const [activeSceneCameramanState, setActiveSceneCameramanState] = useState(defaultCameraman);
  const cameramanGUI = showGUI ? CameramanGUI(activeSceneCameramanState) : null;

  useEffect(() => {
    // Return if there's no active scene
    if (!threeState.activeScene) return;

    // Return if the active scene hasn't changed
    if (sceneName === threeState.scenes[threeState.activeScene].name) return;

    // Set the active scene name
    setSceneName(threeState.scenes[threeState.activeScene].name);

    // Change the state with the new cameraman state
    setActiveSceneCameramanState(threeState.scenes[threeState.activeScene].cameraman);
  }, [sceneName, threeState.activeScene, threeState.scenes]);

  return {
    cameramanState: showGUI ? cameramanGUI : activeSceneCameramanState,
    defaultCameramanState: defaultCameraman,
  };
};

export default useThreeCameramanState;
