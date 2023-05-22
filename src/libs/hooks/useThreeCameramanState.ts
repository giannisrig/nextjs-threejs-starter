import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import CameramanGUI from "@/components/three/camera/cameraman/CameramanGUI";

const useThreeCameramanState = <ThreeCameramanState>(
  showGUI
): { defaultCameramanState: CameramanState; cameramanState: CameramanState } => {
  // Get the camera and cameraman state
  const threeState: ThreeState = useThreeState();
  const cameramanState: CameramanState = showGUI ? CameramanGUI() : threeState.cameraman;
  const defaultCameraman: CameramanState = threeState.default.cameraman;
  return {
    cameramanState: cameramanState,
    defaultCameramanState: defaultCameraman,
  };
};

export default useThreeCameramanState;
