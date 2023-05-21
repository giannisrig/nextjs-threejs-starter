import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";
import CameramanGUI from "@/components/three/camera/CameramanGUI";

const CameraTarget = ({ showTarget = false, showGUI = true, ...props }) => {
  // Ref objects, these refs are used for the cameraman actions
  const targetRef = useRef(props.ref);

  // State
  const threeState: ThreeState = useThreeState();
  const cameramanState: CameramanState = showGUI ? CameramanGUI() : threeState.cameraman;
  const defaultCameraman: CameramanState = threeState.default.cameraman;

  // Get the action trigger
  const action = cameramanState.action;

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
  }, [action, cameramanState, defaultCameraman, targetRef]);

  return (
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
      <meshStandardMaterial color={"red"} opacity={showTarget ? 1 : 0} />
    </mesh>
  );
};

export default CameraTarget;
