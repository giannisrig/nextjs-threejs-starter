import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CameramanState, ThreeState } from "@/types/three";
import { Vector3 } from "three";

// Set up the initial state for Three
const initialState: ThreeState = {
  cameraman: {
    cameraPosition: new Vector3(150, 11, 77),
    targetPosition: new Vector3(16, 11, -35),
  },
  sceneLoaded: false,
  objectsLoaded: 0,
};

export const threeSlice = createSlice({
  name: "three",
  initialState,
  reducers: {
    setCameraControls(state, action: PayloadAction<CameramanState>) {
      state.cameraman = action.payload;
    },
    setSceneLoaded(state, action: PayloadAction<boolean>) {
      state.sceneLoaded = action.payload;
    },
    setObjectsLoaded(state, action: PayloadAction<number>) {
      state.objectsLoaded = action.payload;
    },
    addObjectsLoaded(state) {
      state.objectsLoaded = state.objectsLoaded ? state.objectsLoaded + 1 : 1;
    },
  },
});

export const { setCameraControls, setSceneLoaded, setObjectsLoaded, addObjectsLoaded } = threeSlice.actions;
export default threeSlice.reducer;
