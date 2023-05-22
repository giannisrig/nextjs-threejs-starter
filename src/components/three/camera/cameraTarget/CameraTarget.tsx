import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import CameraTargetGUI from "@/components/three/camera/cameraTarget/cameraTargetGUI";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";

const CameraTarget = ({ showTargetGUI = true, showGUI = true, ...props }) => {
  // Ref objects, these refs are used for the cameraman actions
  const targetRef = useRef(props.ref);

  // Redux Cameraman State
  const { cameramanState, defaultCameramanState } = useThreeCameramanState(showGUI);

  // Get the action trigger
  const action = cameramanState.action;

  // Get the Target settings
  const targetSettings: CameraTarget = showTargetGUI ? CameraTargetGUI() : cameraTargetSettings;

  /*
   * This codes handles the changes of the properties of the 'R3F' components
   * The props of these components are used later in the useFrame() hook which
   * handles tha cameraman changes based on our Three Redux state
   */
  useEffect(() => {
    // Update the target position to look at by updating the R3F 'mesh' component for the target object
    if (targetRef.current) {
      // If there's an action, then we set the position of the target from the cameramanState
      // Otherwise use the default target position ( we could also use a previous state instead of default )
      action
        ? targetRef.current.position.set(cameramanState.targetPosition.x, cameramanState.targetPosition.y, cameramanState.targetPosition.z)
        : targetRef.current.position.set(
            defaultCameramanState.targetPosition.x,
            defaultCameramanState.targetPosition.y,
            defaultCameramanState.targetPosition.z
          );
    }
  }, [action, cameramanState, defaultCameramanState, targetRef]);

  return (
    <mesh
      ref={targetRef}
      scale={targetSettings.scale}
      position={new Vector3(defaultCameramanState.targetPosition.x, defaultCameramanState.targetPosition.y, defaultCameramanState.targetPosition.z)}
    >
      <sphereGeometry />
      <meshStandardMaterial color={targetSettings.color} visible={targetSettings.show} />
    </mesh>
  );
};

export default CameraTarget;
