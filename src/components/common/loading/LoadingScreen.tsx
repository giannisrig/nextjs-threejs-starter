"use client";
import { useAppDispatch } from "@/libs/store/store";
import React, { useEffect, useState, useRef } from "react";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";
import { setEntered } from "@/slices/loadingSlice";
import LogosTimeline from "@/components/common/loading/LogosTimeline";

const LoadingScreen = () => {
  const loadingScreen = useRef(null);

  // Set up the state for showing the loading screen
  const [showScreen, setShowScreen] = useState(true);

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the Redux state for the objects loaded and scene loaded
  const { sceneLoaded } = useThreeState() as ThreeState;

  const loadedClass = sceneLoaded ? "" : "invert";

  const clickHandler = () => {
    // Hide the loading screen
    setShowScreen(false);

    // Update the entered state
    dispatch(setEntered(true));
  };

  return (
    <>
      {showScreen && (
        <div
          ref={loadingScreen}
          className={
            "fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center bg-white text-center text-black duration-200 " + loadedClass
          }
        >
          <div className="flex w-max flex-col items-center justify-center gap-25px">
            <LogosTimeline />
            <div className="flex w-max flex-col items-center justify-center gap-5px">
              <h1 className="text-4xl font-bold">NextJS & ThreeJS Starter Template</h1>
              <p className="text-lg">A starter template for NextJS with ThreeJS and @react-three/fiber</p>
            </div>
            <div className="h-[56px]">
              {sceneLoaded && (
                <button
                  className="rounded-[30px] border border-black px-25px py-10px font-semibold transition-colors duration-200 hover:bg-black hover:text-white"
                  onClick={clickHandler}
                >
                  Enter Website
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
