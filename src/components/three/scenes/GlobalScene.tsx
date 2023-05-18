import React, { useEffect } from "react";
import Environment from "@/components/three/composites/Environment";
import Lights from "@/components/three/composites/Lights";
import { setSceneLoaded } from "@/slices/threeSlice";
import { useAppDispatch } from "@/libs/store/store";
import { ThreeStateLoadingAction } from "@/types/three";

const GlobalScene = () => {
  // Set the Redux Dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set up the loading action data
    const loadingAction: ThreeStateLoadingAction = {
      scene: 0,
      value: true,
    };

    // The global scene is loaded
    dispatch(setSceneLoaded(loadingAction));
    console.log("Global scene is loaded");
  }, [dispatch]);

  return (
    <>
      <Lights />
      <Environment />
    </>
  );
};

export default GlobalScene;
