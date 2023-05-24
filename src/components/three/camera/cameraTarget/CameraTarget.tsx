import { Color, Vector3 } from "three";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";
import { useControls } from "leva";
import { useRef } from "react";

const CameraTarget = ({ ...props }) => {
  // Set up the ref for our camera target Mesh
  const targetRef = useRef(null);

  // Redux Cameraman State from the active scene
  const { cameramanState } = useThreeCameramanState();

  // Get the Target settings
  const targetSettings: CameraTarget = cameraTargetSettings;

  // Set up the camera target controls from Leva
  // The controls have the default values of cameraTargetSettings
  // They mutate the object on value changes
  useControls(
    "Camera Target",
    {
      show: {
        value: targetSettings.show,
        onChange: (show) => {
          if (targetRef.current) {
            targetRef.current.material.visible = show;
          }
        },
      },
      scale: {
        value: targetSettings.scale,
        step: 1,
        min: 1,
        max: 10,
        onChange: (scale) => {
          if (targetRef.current) {
            targetRef.current.scale.set(scale, scale, scale);
          }
        },
      },
      color: {
        value: "#" + targetSettings.color.getHexString(),
        onChange: (color) => {
          if (targetRef.current) {
            console.log(color);
            targetRef.current.material.color = new Color(color);
          }
        },
      },
    },
    {
      collapsed: true,
    }
  );

  return (
    <mesh
      ref={targetRef}
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
