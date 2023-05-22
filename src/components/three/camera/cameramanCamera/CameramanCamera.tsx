import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";

const CameramanCamera = ({ showGUI = true }) => {
  // Ref objects, these refs are used for the cameraman actions
  const cameraRef = useRef(null);

  // Redux Cameraman State
  const { cameramanState, defaultCameramanState } = useThreeCameramanState(showGUI);

  // Get the action trigger
  const action = cameramanState.action;

  /*
   * This codes handles the changes of the properties of the 'R3F' components
   * The props of these components are used later in the useFrame() hook which
   * handles tha cameraman changes based on our Three Redux state
   */
  useEffect(() => {
    // Update the camera position and update the R3F 'perspectiveCamera' component
    if (cameraRef.current && cameramanState.cameraPosition && defaultCameramanState.cameraPosition) {
      // If there's an action, then set the position of the camera from the cameramanState
      // Otherwise use the default position ( we could also use a previous state instead of default )
      action
        ? cameraRef.current.position.set(
            cameramanState.cameraPosition.x,
            cameramanState.cameraPosition.y,
            cameramanState.cameraPosition.z
          )
        : cameraRef.current.position.set(
            defaultCameramanState.cameraPosition.x,
            defaultCameramanState.cameraPosition.y,
            defaultCameramanState.cameraPosition.z
          );
    }
  }, [action, cameramanState, defaultCameramanState, cameraRef]);

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={45}
      position={
        new Vector3(
          defaultCameramanState.cameraPosition.x,
          defaultCameramanState.cameraPosition.y,
          defaultCameramanState.cameraPosition.z
        )
      }
    />
  );
};

export default CameramanCamera;
