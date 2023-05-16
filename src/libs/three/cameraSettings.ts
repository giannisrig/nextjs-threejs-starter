import { Euler, Vector3 } from "three";

interface CameraSettings {
  position: Vector3;
  rotation: Euler;
  fov: number;
  far: number;
  near: number;
  zoom: number;
  focus: number;
}

const cameraSettings: CameraSettings = {
  position: new Vector3(28, 17, 125),
  rotation: new Euler(0, 0, 0, "XYZ"),
  fov: 75,
  near: 0.1,
  far: 1000,
  zoom: 1,
  focus: 20,
};

export default cameraSettings;
