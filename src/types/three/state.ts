import { DefaultCameramanSettings, DefaultCameraSettings, ThreeSceneSettings } from "@/types/three";

export interface ThreeSceneState extends ThreeSceneSettings {
  isLoading: boolean;
  isLoaded: boolean;
  objectsLoaded: string[];
}

export interface ThreeState {
  camera: DefaultCameraSettings;
  cameraman: DefaultCameramanSettings;
  activeScene: number;
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
