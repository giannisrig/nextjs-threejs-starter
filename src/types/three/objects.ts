import { Euler, Vector3 } from "three";

export interface Object3DSettings {
  position?: Vector3;
  rotation?: Euler;
}

export interface Object3DShader {
  vertexShader: string;
  fragmentShader: string;
}
