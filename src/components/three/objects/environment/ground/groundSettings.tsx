import { Color, Euler, Vector2, Vector3 } from "three";
import { Object3DSettings } from "@/types/three";

// Define the type for the settings, extending the core SceneItem type
export interface GroundSettings extends Object3DSettings {
  geometry: Vector2;
  color: Color;
  position: Vector3;
  rotation: Euler;
}

// Set the initial values of the ground object
const groundSettings: GroundSettings = {
  geometry: new Vector2(1000, 1000),
  position: new Vector3(0, 0, 0),
  rotation: new Euler(-Math.PI / 2, 0, 0),
  color: new Color(0x000000),
};

export default groundSettings;
