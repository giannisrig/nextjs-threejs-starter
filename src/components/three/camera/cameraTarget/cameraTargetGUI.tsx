import { Color } from "three";
import { useControls } from "leva";
import cameraTargetSettings, { CameraTarget } from "@/components/three/camera/cameraTarget/cameraTargetSettings";

const CameraTargetGUI = () => {
  // Set up the Ground Object controls GUI from leva
  const { scale, color, show } = useControls("Camera Target", {
    show: { value: cameraTargetSettings.show },
    scale: { value: cameraTargetSettings.scale, step: 1, min: 1, max: 10 },
    color: { value: "#" + cameraTargetSettings.color.getHexString() },
  });

  // Create a GroundSettings type object
  const guiSettings: CameraTarget = {
    scale: scale,
    show: show,
    color: new Color(color),
  };

  return guiSettings;
};

export default CameraTargetGUI;
