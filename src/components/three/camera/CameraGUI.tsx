import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { PerspectiveCamera } from "three";
import { RootState, useAppSelector } from "@/libs/store/store";
import { DefaultCameraSettings } from "@/types/three/settings";

const CameraGUI = () => {
  // Get the Scene camera
  const { camera } = useThree();

  // Get the camera state
  const cameraState: DefaultCameraSettings = useAppSelector((state: RootState) => {
    return state.three.camera;
  });

  // Set up the camera controls GUI from leva
  const { position, rotation, fov, zoom, near, far, focus } = useControls("Camera Settings", {
    position: { value: cameraState.position.toArray(), step: 0.1 },
    rotation: { value: [cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z], step: 0.1 },
    fov: { value: cameraState.fov, min: 0, max: 180, step: 1 },
    zoom: { value: cameraState.zoom, min: 0, max: 10, step: 0.1 },
    near: { value: cameraState.near, min: 0, max: 10, step: 0.1 },
    far: { value: cameraState.far, min: 0, max: 10000, step: 10 },
    focus: { value: cameraState.focus, min: 0, max: 100, step: 0.1 },
  });

  if (camera instanceof PerspectiveCamera) {
    // update camera properties
    camera.position.set(...position);
    camera.rotation.set(...rotation);
    camera.fov = fov;
    camera.zoom = zoom;
    camera.near = near;
    camera.far = far;
    camera.focus = focus;
    camera.updateProjectionMatrix();
  }

  return null;
};

export default CameraGUI;
