import { Euler, Vector3 } from "three";

export interface CameraState {
  position: Vector3;
  rotation: Euler;
  fov: number;
  far: number;
  near: number;
  zoom: number;
  focus: number;
}
export interface CameramanState {
  targetPosition: Vector3;
  cameraPosition: Vector3;
  zoom?: number;
}

export interface ThreeState {
  cameraman: CameramanState;
  objectsLoaded?: number;
}
