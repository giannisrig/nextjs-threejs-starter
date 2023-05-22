import { useControls } from "leva";
import { PerspectiveCamera } from "three";
import { RootState, useAppSelector } from "@/libs/store/store";
import { CameraState } from "@/types/three/state";
import { useThree } from "@react-three/fiber";

const CameraGUI = () => {
  // Get the camera state
  const defaultCameraState: CameraState = useAppSelector((state: RootState) => {
    return state.three.default.camera;
  });

  // Get the Scene camera
  const { camera }: { camera: PerspectiveCamera } = useThree();

  // Set up the camera controls GUI from leva
  const { position, rotation, fov, zoom, near, far } = useControls("Default Camera Settings", {
    position: {
      value: [defaultCameraState.position.x, defaultCameraState.position.y, defaultCameraState.position.z],
      step: 0.1,
    },
    rotation: {
      value: [defaultCameraState.rotation.x, defaultCameraState.rotation.y, defaultCameraState.rotation.z],
      step: 0.1,
    },
    fov: { value: defaultCameraState.fov, min: 0, max: 180, step: 1 },
    zoom: { value: defaultCameraState.zoom, min: 0, max: 10, step: 0.1 },
    near: { value: defaultCameraState.near, min: 0, max: 10, step: 0.1 },
    far: { value: defaultCameraState.far, min: 0, max: 10000, step: 10 },
  });

  // update camera properties
  camera.position.set(...position);
  camera.rotation.set(...rotation);
  camera.fov = fov;
  camera.zoom = zoom;
  camera.near = near;
  camera.far = far;
  camera.updateProjectionMatrix();

  return null;
};

export default CameraGUI;
