import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { PerspectiveCamera } from "three";
import cameraSettings from "@/libs/three/cameraSettings";

const CameraControls = () => {
  // Get the Scene camera
  const { camera } = useThree();

  // Set up the camera controls GUI from leva
  const { position, rotation, fov, zoom, near, far, focus } = useControls({
    position: { value: cameraSettings.position.toArray(), step: 0.1 },
    rotation: { value: [cameraSettings.rotation.x, cameraSettings.rotation.y, cameraSettings.rotation.z], step: 0.1 },
    fov: { value: cameraSettings.fov, min: 0, max: 180, step: 1 },
    zoom: { value: cameraSettings.zoom, min: 0, max: 10, step: 0.1 },
    near: { value: cameraSettings.near, min: 0, max: 10, step: 0.1 },
    far: { value: cameraSettings.far, min: 0, max: 10000, step: 10 },
    focus: { value: cameraSettings.focus, min: 0, max: 100, step: 0.1 },
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

export default CameraControls;
