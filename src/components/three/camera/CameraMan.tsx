import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { CameramanState, CameraState, ThreeState } from "@/types/three/state";
import { PerspectiveCamera, Vector3 } from "three";
import CameramanGUI from "@/components/three/camera/CameramanGUI";
import CameraGUI from "@/components/three/camera/CameraGUI";
import useThreeState from "@/libs/hooks/useThreeState";
// import CameraTarget from "@/components/three/camera/cameraTarget/CameraTarget";

CameraControls.install({ THREE });

function CameraMan({ showGUI = false }) {
  // console.log("cameraman updated", { cameramanState, cameraState });

  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Get the Three Redux state
  const threeState: ThreeState = useThreeState();
  const cameramanState: CameramanState = showGUI ? CameramanGUI() : threeState.cameraman;
  const cameraState: CameraState = showGUI ? CameraGUI() : threeState.camera;
  const defaultCameraman: CameramanState = threeState.default.cameraman;
  const defaultCamera: CameraState = threeState.default.camera;

  // Ref objects, these refs are used for the cameraman actions
  const cameramanRef = useRef(null);
  const targetRef = useRef(null);
  const cameraControlsRef = useRef(null);

  // Get the action trigger
  const action = cameramanState.action;

  // Hook for controlling the standard camera props
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      // Update camera properties based on when the action is triggered or not
      // If the action is not triggered, we show the default camera settings
      action
        ? cameraControlsRef.current.position.set(cameraState.position.x, cameraState.position.y, cameraState.position.z)
        : cameraControlsRef.current.position.set(
            defaultCamera.position.x,
            defaultCamera.position.y,
            defaultCamera.position.z
          );
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
    }
  }, [action, camera, cameraState, defaultCamera]);

  /*
   * This codes handles the changes of the properties of the 'R3F' components
   * The props of these components are used later in the useFrame() hook which
   * handles tha cameraman changes based on our Three Redux state
   */
  useEffect(() => {
    // Update the camera position and update the R3F 'perspectiveCamera' component
    if (cameraControlsRef.current && cameramanState.cameraPosition && cameramanState.targetPosition) {
      // If there's an action, then set the position of the camera from the cameramanState
      // Otherwise use the default position ( we could also use a previous state instead of default )
      action
        ? cameraControlsRef.current.position.set(
            cameramanState.cameraPosition.x,
            cameramanState.cameraPosition.y,
            cameramanState.cameraPosition.z
          )
        : cameraControlsRef.current.position.set(
            defaultCameraman.cameraPosition.x,
            defaultCameraman.cameraPosition.y,
            defaultCameraman.cameraPosition.z
          );
    }

    // Update the target position to look at by updating the R3F 'mesh' component for the target object
    if (targetRef.current) {
      // If there's an action, then we set the position of the target from the cameramanState
      // Otherwise use the default target position ( we could also use a previous state instead of default )
      action
        ? targetRef.current.position.set(
            cameramanState.targetPosition.x,
            cameramanState.targetPosition.y,
            cameramanState.targetPosition.z
          )
        : targetRef.current.position.set(
            defaultCameraman.targetPosition.x,
            defaultCameraman.targetPosition.y,
            defaultCameraman.targetPosition.z
          );
    }
  }, [action, cameramanState, defaultCameraman, cameramanRef]);

  // RAF to handle the cameraman controls
  useFrame((state, delta) => {
    // console.log(cameramanRef.current.children);

    if (cameraControlsRef.current && targetRef.current) {
      // Set the position of the camera and the target to look at
      // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#setLookAt
      controls.setLookAt(
        cameraControlsRef.current.position.x,
        cameraControlsRef.current.position.y,
        cameraControlsRef.current.position.z,
        targetRef.current.position.x,
        targetRef.current.position.y,
        targetRef.current.position.z,
        true
      );
    }

    // Update the controls
    controls.update(delta);
  });

  return (
    <group ref={cameramanRef}>
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <perspectiveCamera
        ref={cameraControlsRef}
        fov={45}
        position={
          new Vector3(
            defaultCameraman.cameraPosition.x,
            defaultCameraman.cameraPosition.y,
            defaultCameraman.cameraPosition.z
          )
        }
      />
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <mesh
        ref={targetRef}
        position={
          new Vector3(
            defaultCameraman.targetPosition.x,
            defaultCameraman.targetPosition.y,
            defaultCameraman.targetPosition.z
          )
        }
      >
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </group>
  );
}

export default CameraMan;
