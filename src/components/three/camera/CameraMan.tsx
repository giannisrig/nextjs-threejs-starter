import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { RootState, useAppSelector } from "@/libs/store/store";
import { CameramanState, CameraState } from "@/types/three/state";
import { PerspectiveCamera } from "three";

CameraControls.install({ THREE });

interface CameraManProps {
  cameramanState: CameramanState;
  cameraState: CameraState;
}

function CameraMan({ cameramanState, cameraState }: CameraManProps) {
  // Get the default cameraman state
  const defaultCameraman: CameramanState = useAppSelector(
    (state: RootState) => state.three.default.cameraman as CameramanState
  );

  // Get the default camera state
  const defaultCamera: CameraState = useAppSelector((state: RootState) => state.three.default.camera as CameraState);

  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  // Get the action trigger
  const { action } = cameraState;
  const cameraAction = action;

  const updateCamera = () => {
    // Make sure we have a perspective camera
    if (camera instanceof PerspectiveCamera) {
      // Update camera properties based on when the action is triggered or not
      // Ff the action is not triggered then we show the default camera settings
      cameraAction
        ? camera.position.set(cameraState.position.x, cameraState.position.y, cameraState.position.z)
        : camera.position.set(defaultCamera.position.x, defaultCamera.position.y, defaultCamera.position.z);
      cameraAction
        ? camera.rotation.set(cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z)
        : camera.rotation.set(defaultCamera.rotation.x, defaultCamera.rotation.y, defaultCamera.rotation.z);
      camera.fov = cameraAction ? cameraState.fov : defaultCamera.fov;
      camera.zoom = cameraAction ? cameraState.zoom : defaultCamera.zoom;
      camera.near = cameraAction ? cameraState.near : defaultCamera.near;
      camera.far = cameraAction ? cameraState.far : defaultCamera.far;
      camera.focus = cameraAction ? cameraState.focus : defaultCamera.focus;

      // Update the projection, must be called after any change of the camera params
      // Read more: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix
      camera.updateProjectionMatrix();
    }
  };

  // Define the position to look at
  const look = new THREE.Vector3();

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Return RAF to handle the cameraman controls
  return useFrame((state, delta) => {
    updateCamera();

    // zoom ? pos.set(focus.x, focus.y, focus.z + 5) : pos.set(10, 5, 40);
    cameramanState.action
      ? look.set(
          cameramanState.targetPosition.x,
          cameramanState.targetPosition.y,
          cameramanState.targetPosition.z - 0.2
        )
      : look.set(
          defaultCameraman.targetPosition.x,
          defaultCameraman.targetPosition.y,
          defaultCameraman.targetPosition.z
        );

    // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#lerpLookAt
    // Camera man will look at
    controls
      .setLookAt(
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z,
        look.x,
        look.y,
        look.z,
        true
      )
      .then();
    // controls.lookInDirectionOf(1, 0, 3, true).then();

    // Update the controls
    return controls.update(delta);
  });
}

export default CameraMan;
