"use client";
import { RootState, useAppSelector } from "@/libs/store/store";
import React, { useState } from "react";

const LoadingScreen = () => {
  const [showScreen, setShowScreen] = useState(true);
  const loading = useAppSelector((state: RootState) => state.loading.loading); // updated

  const clickHandler = () => {
    setShowScreen(false);
  };

  return (
    <>
      {showScreen && (
        <div className="fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center bg-white text-center text-black">
          {loading && <h4>Loading</h4>}
          {!loading && <button onClick={clickHandler}>Enter</button>}
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
