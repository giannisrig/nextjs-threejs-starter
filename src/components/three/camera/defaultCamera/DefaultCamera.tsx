import { PerspectiveCamera } from "three";
import { useThree } from "@react-three/fiber";
import { CameraState, ThreeState } from "@/types/three/state";
import DefaultCameraGUI from "@/components/three/camera/defaultCamera/DefaultCameraGUI";
import useThreeState from "@/libs/hooks/useThreeState";

const DefaultCamera = ({ showGUI = false }) => {
  // Get the Scene camera
  const { camera }: { camera: PerspectiveCamera } = useThree();

  // Get the Three State
  const threeState = useThreeState() as ThreeState;

  // Set the default camera state
  const defaultCameraState: CameraState = threeState.default.camera;

  // Set up the default camera settings
  const defaultCameraSettings: CameraState = showGUI ? DefaultCameraGUI(defaultCameraState) : defaultCameraState;

  // update camera properties
  camera.position.set(...defaultCameraSettings.position.toArray());
  camera.rotation.set(defaultCameraSettings.rotation.x, defaultCameraSettings.rotation.y, defaultCameraSettings.rotation.z);
  camera.fov = defaultCameraSettings.fov;
  camera.zoom = defaultCameraSettings.zoom;
  camera.near = defaultCameraSettings.near;
  camera.far = defaultCameraSettings.far;
  camera.updateProjectionMatrix();

  return <></>;
};

export default DefaultCamera;
