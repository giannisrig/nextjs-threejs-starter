import { Color, Vector3 } from "three";
import { Object3DSettings } from "@/types/three";

// Define the type for the sky shader uniforms
export interface shaderUniforms {
  topColor: Color;
  bottomColor: Color;
  offset: number;
  exponent: number;
}

// Define the type for the sky settings, extending the core SceneItem type
export interface SkySettings extends Object3DSettings {
  geometry: Vector3;
  uniforms: shaderUniforms;
}

// Set the initial values of the sky object
const skySettings: SkySettings = {
  geometry: new Vector3(8000, 8000, 8000),
  position: new Vector3(0, 0, 0),
  uniforms: {
    topColor: new Color(0x65a0b3),
    bottomColor: new Color(0xe09d86),
    offset: 0,
    exponent: 0.6,
  },
};

export default skySettings;
