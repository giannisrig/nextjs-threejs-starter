import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SceneState {
  scene2: boolean;
}

const initialState: SceneState = {
  scene2: false,
};

export const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setScene2(state, action: PayloadAction<boolean>) {
      state.scene2 = action.payload;
    },
  },
});

export const { setScene2 } = sceneSlice.actions;
export default sceneSlice.reducer;
