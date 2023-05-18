import { Color, Texture, Vector3 } from "three";
import { Object3DSettings } from "@/types/three";
import * as THREE from "three";

// Define the type for the sky shader uniforms
export interface shaderUniforms {
  textureSize?: number;
  clipBias?: number;
  alpha?: number;
  time?: number;
  waterNormals?: Texture;
  sunDirection?: Vector3;
  sunColor?: Color;
  waterColor?: Color;
  eye?: Vector3;
  distortionScale?: number;
  side?: number;
  fog?: boolean;
}

// Define the type for the sky settings, extending the core SceneItem type
export interface SeaSettings extends Object3DSettings {
  geometry: Vector3;
  uniforms: shaderUniforms;
}

// Set the initial values of the sky object
const seaSettings: SeaSettings = {
  geometry: new Vector3(2100, 2100, 8),
  position: new Vector3(0, -4, 0),
  uniforms: {
    textureSize: 512,
    sunDirection: new THREE.Vector3(-1.8, 0.5, -10),
    sunColor: new Color(0xffffff),
    waterColor: new Color(0x475e96),
    distortionScale: 0.5,
    fog: false,
    side: 2,
  },
};

export default seaSettings;
