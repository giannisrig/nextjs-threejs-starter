import { Euler, Vector3 } from "three";

export interface CameraState {
  name: string;
  position: Vector3;
  rotation: Euler;
  fov: number;
  far: number;
  near: number;
  zoom: number;
  focus: number;
}
export interface CameramanState {
  name?: string;
  action?: boolean;
  targetPosition: Vector3;
  cameraPosition: Vector3;
  zoom?: number;
}

export interface ThreeSceneState {
  name: string;
  cameraman?: CameramanState;
  objectsDependencies: string[];
  isLoading?: boolean;
  isLoaded?: boolean;
  objectsLoaded?: string[];
}

export interface ThreeState {
  activeScene: number;
  default: {
    camera: CameraState;
    cameraman: CameramanState;
  };
  scenes: ThreeSceneState[];
}

export interface ThreeStateLoadingAction {
  scene: number;
  value: boolean;
}

export interface ThreeStateObjectsLoadedAction {
  scene: number;
  value: string;
}
