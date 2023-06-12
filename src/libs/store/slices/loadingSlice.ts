import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  loading: boolean;
  entered: boolean;
}

const initialState: LoadingState = {
  loading: true,
  entered: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setEntered(state, action: PayloadAction<boolean>) {
      state.entered = action.payload;
    },
  },
});

export const { setLoading, setEntered } = loadingSlice.actions;
export default loadingSlice.reducer;
