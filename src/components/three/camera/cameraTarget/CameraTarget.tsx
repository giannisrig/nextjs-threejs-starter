import { Vector3 } from "three";
import { useRef } from "react";
import { CameramanState, ThreeState } from "@/types/three/state";
import useThreeState from "@/libs/hooks/useThreeState";

const CameraTarget = ({ showTarget = false, ...props }) => {
  const targetRef = useRef(null);
  const threeState: ThreeState = useThreeState();
  const defaultCameraman: CameramanState = threeState.default.cameraman;

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
