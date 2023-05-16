import { Color, Euler, Vector2, Vector3 } from "three";
import { SceneItem } from "@/types/three";

// Define the type for the settings, extending the core SceneItem type
export interface GroundSettings extends SceneItem {
  geometry: Vector2;
  color: Color;
}

// Set the initial values of the ground object
const groundSettings: GroundSettings = {
  geometry: new Vector2(1000, 1000),
  position: new Vector3(0, 0, 0),
  rotation: new Euler(-Math.PI / 2, 0, 0),
  color: new Color(0x65a0b3),
};

export default groundSettings;
