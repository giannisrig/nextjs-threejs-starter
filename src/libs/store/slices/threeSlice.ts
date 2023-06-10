import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CameramanState, ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three";
import threeSettings from "@/libs/three/threeSettings";

// Set up the initial state all scenes
const scenes: ThreeSceneState[] = threeSettings.scenes.map((item: ThreeSceneState) => {
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
  cameraman: threeSettings.cameraman,
  activeScene: 0,
  pageScene: 0,
  scenes: scenes,
  default: {
    camera: { ...threeSettings.default.camera, name: "default" },
    cameraman: { ...threeSettings.default.cameraman, action: false },
  },
};

export const threeSlice = createSlice({
  name: "three",
  initialState,
  reducers: {
    setActiveScene(state, action: PayloadAction<number>) {
      state.activeScene = action.payload;
    },
    setSceneLoaded(state, action: PayloadAction<ThreeStateLoadingAction>) {
      const { scene, value } = action.payload;
      state.scenes[scene].isLoaded = value;
    },
    setCameraControls(state, action: PayloadAction<CameramanState>) {
      state.cameraman = action.payload;
    },
  },
});

export const { setSceneLoaded, setActiveScene, setCameraControls } = threeSlice.actions;
export default threeSlice.reducer;
