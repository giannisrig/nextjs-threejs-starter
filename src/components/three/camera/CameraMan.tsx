import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import CameraTarget from "@/components/three/camera/cameraTarget/CameraTarget";
import Camera from "@/components/three/camera/camera/Camera";

CameraControls.install({ THREE });

function CameraMan() {
  // console.log("cameraman updated", { cameramanState, cameraState });

  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Ref objects, these refs are used for the cameraman actions
  const cameramanRef = useRef(null);

  // Get the action trigger
  // const action = cameramanState.action;

  // Hook for controlling the standard camera props
  // useEffect(() => {
  //   if (camera instanceof PerspectiveCamera) {
  //     // Update camera properties based on when the action is triggered or not
  //     // If the action is not triggered, we show the default camera settings
  //     action
  //       ? cameraControlsRef.current.position.set(cameraState.position.x, cameraState.position.y, cameraState.position.z)
  //       : cameraControlsRef.current.position.set(
  //           defaultCamera.position.x,
  //           defaultCamera.position.y,
  //           defaultCamera.position.z
  //         );
  //     action
  //       ? camera.rotation.set(cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z)
  //       : camera.rotation.set(defaultCamera.rotation.x, defaultCamera.rotation.y, defaultCamera.rotation.z);
  //     camera.fov = action ? cameraState.fov : defaultCamera.fov;
  //     camera.zoom = action ? cameraState.zoom : defaultCamera.zoom;
  //     camera.near = action ? cameraState.near : defaultCamera.near;
  //     camera.far = action ? cameraState.far : defaultCamera.far;
  //     camera.focus = action ? cameraState.focus : defaultCamera.focus;
  //
  //     // Update the projection, must be called after any change of the camera params
  //     // Read more: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix
  //   }
  // }, [action, camera, cameraState, defaultCamera]);

  // RAF to handle the cameraman controls
  useFrame((state, delta) => {
    // console.log(cameramanRef.current.children);

    // Make sure the cameraman objects are defined
    if (cameramanRef.current && cameramanRef.current.children[0] && cameramanRef.current.children[1]) {
      // Set the position of the camera and the target to look at
      // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#setLookAt
      controls.setLookAt(
        cameramanRef.current.children[0].position.x,
        cameramanRef.current.children[0].position.y,
        cameramanRef.current.children[0].position.z,
        cameramanRef.current.children[1].position.x,
        cameramanRef.current.children[1].position.y,
        cameramanRef.current.children[1].position.z,
        true
      );
    }

    // Update the controls
    controls.update(delta);
  });

  return (
    <group ref={cameramanRef}>
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <Camera showGUI={true} />
      {/* This component is used for the cameraman's target position to look at */}
      <CameraTarget showTarget={true} showGUI={true} />
    </group>
  );
}

export default CameraMan;
