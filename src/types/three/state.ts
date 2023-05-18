import { DefaultCameramanSettings, DefaultCameraSettings, ThreeSceneSettings } from "@/types/three";

export interface ThreeSceneState extends ThreeSceneSettings {
  isLoading: boolean;
  isLoaded: boolean;
  objectsLoaded: string[];
}

export interface CameraState extends DefaultCameraSettings {
  name: string;
}
export interface CameramanState extends DefaultCameramanSettings {
  action: boolean;
}

export interface DefaultCameraControlsState {
  camera: CameraState;
  cameraman: CameramanState;
}

export interface ThreeState {
  camera: CameraState;
  cameraman: CameramanState;
  activeScene: number;
  default: DefaultCameraControlsState;
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
