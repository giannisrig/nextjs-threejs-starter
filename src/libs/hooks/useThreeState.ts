import { useState, useEffect } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import { ThreeState } from "@/types/three/state";

const useThreeState = <ThreeState>(): ThreeState => {
  // Get the camera and cameraman state
  return useAppSelector((state: RootState) => state.three as ThreeState);
};

export default useThreeState;
