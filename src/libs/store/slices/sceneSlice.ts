import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SceneState {
  mainSceneLoaded: boolean;
  scene1Loading: boolean;
  scene1Loaded: boolean;
  scene2Loading: boolean;
  scene2Loaded: boolean;
}

const initialState: SceneState = {
  mainSceneLoaded: false,
  scene1Loading: false,
  scene1Loaded: false,
  scene2Loading: false,
  scene2Loaded: false,
};

export const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setMainSceneLoaded(state, action: PayloadAction<boolean>) {
      state.mainSceneLoaded = action.payload;
    },
    setScene1Loading(state, action: PayloadAction<boolean>) {
      state.scene1Loading = action.payload;
    },
    setScene1Loaded(state, action: PayloadAction<boolean>) {
      state.scene1Loaded = action.payload;
    },
    setScene2Loading(state, action: PayloadAction<boolean>) {
      state.scene2Loading = action.payload;
    },
    setScene2Loaded(state, action: PayloadAction<boolean>) {
      state.scene2Loaded = action.payload;
    },
  },
});

export const { setMainSceneLoaded, setScene1Loading, setScene1Loaded, setScene2Loading, setScene2Loaded } =
  sceneSlice.actions;
export default sceneSlice.reducer;
