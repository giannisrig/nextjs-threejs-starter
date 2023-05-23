import { Vector3 } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import CameraTargetGUI from "@/components/three/camera/cameraTarget/cameraTargetGUI";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";

const CameraTarget = ({ showGUI = false, ...props }) => {
  // Redux Cameraman State from the active scene
  const { cameramanState } = useThreeCameramanState();

  // Get the Target settings
  const targetSettings: CameraTarget = showGUI ? CameraTargetGUI() : cameraTargetSettings;

  return (
    <mesh
      scale={targetSettings.scale}
      position={new Vector3(cameramanState.targetPosition.x, cameramanState.targetPosition.y, cameramanState.targetPosition.z)}
      {...props}
    >
      <sphereGeometry />
      <meshStandardMaterial color={targetSettings.color} visible={targetSettings.show} />
    </mesh>
  );
};

export default CameraTarget;
