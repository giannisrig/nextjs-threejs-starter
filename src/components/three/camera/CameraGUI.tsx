import { useControls } from "leva";
import { Euler, Vector3 } from "three";
import { RootState, useAppSelector } from "@/libs/store/store";
import { CameraState } from "@/types/three/state";

const CameraGUI = () => {
  // Get the camera state
  const cameraState: CameraState = useAppSelector((state: RootState) => {
    return state.three.camera;
  });

  // Set up the camera controls GUI from leva
  const { action, position, rotation, fov, zoom, near, far, focus } = useControls("Camera Settings", {
    action: { value: cameraState.action },
    position: { value: cameraState.position.toArray(), step: 1 },
    rotation: { value: [cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z], step: 1 },
    fov: { value: cameraState.fov, min: 1, max: 180, step: 1 },
    zoom: { value: cameraState.zoom, min: 0.5, max: 20, step: 1 },
    near: { value: cameraState.near, min: 0.5, max: 10, step: 1 },
    far: { value: cameraState.far, min: 0.1, max: 10000, step: 10 },
    focus: { value: cameraState.focus, min: 1, max: 100, step: 1 },
  });

  const cameraSettings: CameraState = {
    action: action,
    position: new Vector3(...position),
    rotation: new Euler(...rotation),
    fov: fov,
    zoom: zoom,
    near: near,
    far: far,
    focus: focus,
  };

  return cameraSettings;
};

export default CameraGUI;
