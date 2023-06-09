import { Color, Texture, Vector3 } from "three";
import { Object3DSettings } from "@/types/three";
import * as THREE from "three";

// Define the type for the sky shader uniforms
export interface shaderUniforms {
  textureSize: number;
  clipBias?: number;
  alpha?: number;
  time?: number;
  waterNormals?: Texture;
  sunDirection: Vector3;
  sunColor: Color;
  waterColor: Color;
  eye?: Vector3;
  distortionScale: number;
  side: number;
  fog: boolean;
}

// Define the type for the sky settings, extending the core SceneItem type
export interface SeaSettings extends Object3DSettings {
  visible: boolean;
  geometry: Vector3;
  uniforms: shaderUniforms;

  position: Vector3;
}

// Set the initial values of the sky object
const seaSettings: SeaSettings = {
  visible: true,
  geometry: new Vector3(4000, 4000, 8),
  position: new Vector3(0, -4, 0),
  uniforms: {
    textureSize: 512,
    sunDirection: new THREE.Vector3(-19.2, -2.5, -10.1), //{"sunDirection":[-19.19999999999999,-2.5,-10.1]}
    sunColor: new Color(0xffffff),
    waterColor: new Color(0x48b3e2),
    distortionScale: 0.5,
    fog: false,
    side: 0,
  },
};

export default seaSettings;
