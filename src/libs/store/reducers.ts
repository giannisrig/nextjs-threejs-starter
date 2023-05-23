import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import mobileMenuReducer from "@/slices/mobileMenuSlice";
import overlayReducer from "@/slices/overlaySlice";
import threeReducer from "@/slices/threeSlice";
import loadingReducer from "@/slices/loadingSlice";
import levaReducer from "@/slices/levaSlice";

// Define your reducers here
const rootReducer: Reducer = combineReducers({
  mobileMenu: mobileMenuReducer,
  overlay: overlayReducer,
  three: threeReducer,
  loading: loadingReducer,
  leva: levaReducer,
});

const combinedReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return rootReducer(state, action);
  }
};

export default combinedReducer;
