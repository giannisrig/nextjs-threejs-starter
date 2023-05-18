import { Euler, Vector3 } from "three";
import { DefaultCameraSettings } from "@/types/three";
// import {Vector3} from "three-stdlib"

const cameraSettings: DefaultCameraSettings = {
  // position: new Vector3(28, 17, 125),
  position: new Vector3(180, 14, 0),
  rotation: new Euler(0, 0, 0, "XYZ"),
  fov: 75,
  near: 0.1,
  far: 1000,
  zoom: 1,
  focus: 20,
};

export default cameraSettings;
