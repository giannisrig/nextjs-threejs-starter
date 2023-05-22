import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import CameramanGUI from "@/components/three/camera/CameramanGUI";

interface ThreeCameramanState {
  cameramanState: CameramanState;
  defaultCameraman: CameramanState;
}
const getCameramanState = ({ showGUI = true }) => {
  const threeState: ThreeState = useThreeState();
  const cameramanState: CameramanState = showGUI ? CameramanGUI() : threeState.cameraman;
  const defaultCameraman: CameramanState = threeState.default.cameraman;
  const threeCameramanState: ThreeCameramanState = {
    cameramanState: cameramanState,
    defaultCameraman: defaultCameraman,
  };

  return threeCameramanState;
};

export default getCameramanState;
