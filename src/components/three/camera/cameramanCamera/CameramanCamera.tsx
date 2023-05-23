import { Vector3 } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";

const CameramanCamera = () => {
  // Redux Cameraman State
  const { cameramanState } = useThreeCameramanState();

  return (
    <perspectiveCamera
      fov={45}
      position={new Vector3(cameramanState.cameraPosition.x, cameramanState.cameraPosition.y, cameramanState.cameraPosition.z)}
    />
  );
};

export default CameramanCamera;
