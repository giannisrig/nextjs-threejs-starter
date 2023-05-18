import React, { Suspense, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState } from "@/types/three";
import Scene1 from "@/components/three/scenes/Scene1";
import Scene2 from "@/components/three/scenes/Scene2";

const ThreeSceneLoader = () => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the scenes state
  const { scenes, activeScene }: { scenes: ThreeSceneState[]; activeScene: number } = useAppSelector(
    (state: RootState) => {
      return state.three;
    }
  );

  // useEffect(() => {
  //   // if (scenes[0].isLoaded && scenes[activeScene].isLoaded) {
  //   //   console.log("Loaded Global scene and scene " + activeScene);
  //   // }
  // }, [dispatch, activeScene]);

  {
    /* Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big */
  }
  return (
    <>
      {scenes[1].isLoading && <Scene1 />}
      {scenes[2].isLoading && <Scene2 />}
    </>
  );
};

export default ThreeSceneLoader;
