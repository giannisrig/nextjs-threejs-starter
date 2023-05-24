import { Color } from "three";

export interface CameraTarget {
  show: boolean;
  scale: number;
  color: Color;
}

// Set the initial values of the sky object
const cameraTargetSettings: CameraTarget = {
  scale: 1,
  show: true,
  color: new Color(0xff0000),
};

export default cameraTargetSettings;
