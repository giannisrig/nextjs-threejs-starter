"use client";
import { RootState, useAppSelector } from "@/libs/store/store";
import React from "react";

const LoadingScreen = () => {
  const loading = useAppSelector((state: RootState) => state.loading.loading); // updated
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center bg-white text-center text-black">
          <h4>Loading</h4>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
