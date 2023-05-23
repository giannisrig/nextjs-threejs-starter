import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreType } from "leva/src/types";

export interface SetLevaStoreAction {
  name: string;
  store: StoreType;
}
export interface SetLevaShowControlsAction {
  name: string;
  showControls: boolean;
}

export interface LevaState {
  panels: {
    [key: string]: {
      showControls: boolean;
      store: StoreType;
    };
  };
}

// Set up the initial state for Three
const initialState: LevaState = {
  panels: {
    camera: {
      store: null,
      showControls: true,
    },
  },
};

export const levaSlice = createSlice({
  name: "leva",
  initialState,
  reducers: {
    setLevaStore(state, action: PayloadAction<SetLevaStoreAction>) {
      const { name, store } = action.payload;
      state.panels[name].store = store;
    },
    setLevaShowControls(state, action: PayloadAction<SetLevaShowControlsAction>) {
      const { name, showControls } = action.payload;
      state.panels[name].showControls = showControls;
    },
  },
});

export const { setLevaStore, setLevaShowControls } = levaSlice.actions;
export default levaSlice.reducer;
