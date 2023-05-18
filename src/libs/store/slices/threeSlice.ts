import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ThreeSceneSettings,
  ThreeSceneState,
  ThreeState,
  ThreeStateLoadingAction,
  ThreeStateObjectsLoadedAction,
} from "@/types/three";
import threeSettings from "@/libs/three/threeSettings";

// Set up the initial state all scenes
const scenes: ThreeSceneState[] = threeSettings.scenes.map((item: ThreeSceneSettings) => {
  // Add the loading states to the scene
  const sceneInitialState: ThreeSceneState = {
    ...item,
    isLoading: false,
    isLoaded: false,
    objectsLoaded: [],
  };

  // Return the ThreeSceneState
  return sceneInitialState;
});

// Set up the initial state for Three
const initialState: ThreeState = {
  camera: threeSettings.default.camera,
  cameraman: threeSettings.default.cameraman,
  activeScene: null,
  scenes: scenes,
  default: {
    camera: threeSettings.default.camera,
    cameraman: threeSettings.default.cameraman,
  },
};

export const threeSlice = createSlice({
  name: "three",
  initialState,
  reducers: {
    setActiveScene(state, action: PayloadAction<number>) {
      state.activeScene = action.payload;
    },
    setSceneLoading(state, action: PayloadAction<ThreeStateLoadingAction>) {
      const { scene, value } = action.payload;
      state.scenes[scene].isLoading = value;
    },
    setSceneLoaded(state, action: PayloadAction<ThreeStateLoadingAction>) {
      const { scene, value } = action.payload;
      state.scenes[scene].isLoaded = value;
    },
    setSceneObjectsLoaded(state, action: PayloadAction<ThreeStateObjectsLoadedAction>) {
      const { scene, value } = action.payload;
      state.scenes[scene].objectsLoaded.push(value);
    },
  },
});

export const { setSceneLoading, setSceneLoaded, setActiveScene, setSceneObjectsLoaded } = threeSlice.actions;
export default threeSlice.reducer;
