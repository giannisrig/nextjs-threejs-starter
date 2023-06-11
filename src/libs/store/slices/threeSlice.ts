import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CameramanState, ThreeState } from "@/types/three";
import { Vector3 } from "three";

// Set up the initial state for Three
const initialState: ThreeState = {
  cameraman: {
    cameraPosition: new Vector3(150, 11, 77),
    targetPosition: new Vector3(16, 11, -35),
  },
};

export const threeSlice = createSlice({
  name: "three",
  initialState,
  reducers: {
    setCameraControls(state, action: PayloadAction<CameramanState>) {
      state.cameraman = action.payload;
    },
  },
});

export const { setCameraControls } = threeSlice.actions;
export default threeSlice.reducer;
