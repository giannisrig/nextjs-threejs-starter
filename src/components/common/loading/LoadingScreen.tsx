"use client";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import React, { useState } from "react";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";
import { setEntered } from "@/slices/loadingSlice";

const LoadingScreen = () => {
  // Set up the state for showin the loading screen
  const [showScreen, setShowScreen] = useState(true);

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the Redux state for the objects loaded and scene loaded
  const { sceneLoaded } = useThreeState() as ThreeState;

  const clickHandler = () => {
    // Hide the loading screen
    setShowScreen(false);

    // Update the entered state
    dispatch(setEntered(true));
  };

  return (
    <>
      {showScreen && (
        <div className="fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center bg-white text-center text-black">
          {!sceneLoaded && <h4>Loading</h4>}
          {sceneLoaded && <button onClick={clickHandler}>Enter</button>}
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
