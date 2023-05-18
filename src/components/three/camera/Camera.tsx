import { RootState, useAppSelector } from "@/libs/store/store";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { CameraState } from "@/types/three/state";

interface CameraProps {
  cameraState: CameraState;
}

const Camera = ({ cameraState }: CameraProps) => {
  console.log("Camera updated", cameraState);

  // Get the Scene camera
  const { camera } = useThree();

  // Get the default camera state
  const defaultCamera: CameraState = useAppSelector((state: RootState) => state.three.default.camera as CameraState);

  // Get the action trigger
  const { action } = cameraState;

  // Make sure we have a perspective camera
  if (camera instanceof PerspectiveCamera) {
    // Update camera properties based on when the action is triggered or not
    // Ff the action is not triggered then we show the default camera settings
    action
      ? camera.position.set(cameraState.position.x, cameraState.position.y, cameraState.position.z)
      : camera.position.set(defaultCamera.position.x, defaultCamera.position.y, defaultCamera.position.z);
    action
      ? camera.rotation.set(cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z)
      : camera.rotation.set(defaultCamera.rotation.x, defaultCamera.rotation.y, defaultCamera.rotation.z);
    camera.fov = action ? cameraState.fov : defaultCamera.fov;
    camera.zoom = action ? cameraState.zoom : defaultCamera.zoom;
    camera.near = action ? cameraState.near : defaultCamera.near;
    camera.far = action ? cameraState.far : defaultCamera.far;
    camera.focus = action ? cameraState.focus : defaultCamera.focus;

    // Update the projection, must be called after any change of the camera params
    // Read more: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix
    camera.updateProjectionMatrix();
  }

  return null;
};

export default Camera;
