import { Euler, Vector3 } from "three";

export interface Object3DSettings {
  position?: Vector3;
  rotation?: Euler;
}

export interface Object3DShader {
  vertexShader: string;
  fragmentShader: string;
}

export interface DefaultCameraSettings {
  position: Vector3;
  rotation: Euler;
  fov: number;
  far: number;
  near: number;
  zoom: number;
  focus: number;
}

export interface DefaultCameramanSettings {
  action: boolean;
  targetPosition: Vector3;
}

export interface ThreeDefaultSettings {
  camera: DefaultCameraSettings;
  cameraman: DefaultCameramanSettings;
}

export interface SceneCameraSettings {
  position?: Vector3;
  rotation?: Euler;
  fov?: number;
  far?: number;
  near?: number;
  zoom?: number;
  focus?: number;
}

export interface SceneCameramanSettings {
  targetPosition: Vector3;
}

export interface ThreeSceneSettings {
  name: string;
  camera?: SceneCameraSettings;
  cameraman?: SceneCameramanSettings;
  objectsDependencies: string[];
}

export interface ThreeSettings {
  default: ThreeDefaultSettings;
  scenes: ThreeSceneSettings[];
}
