import { Euler, Vector3 } from "three";

export interface SceneItem {
  position?: Vector3;
  rotation?: Euler;
}

export interface SceneShader {
  vertexShader: string;
  fragmentShader: string;
}
