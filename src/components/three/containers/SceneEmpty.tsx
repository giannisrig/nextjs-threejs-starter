"use client";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three/state";
import { useEffect } from "react";
import { setActiveScene, setPageScene, setSceneLoaded, setSceneLoading } from "@/slices/threeSlice";
import sameArrays from "@/libs/utils/sameArrays";
import { setLoading } from "@/slices/loadingSlice";

interface SceneEmptyContainerProps {
  scene: number;
}

const SceneEmpty = ({ scene }: SceneEmptyContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state and the main scene state
  const {
    sceneState,
    globalSceneState,
    loading,
    activeScene,
  }: { activeScene: number; sceneState: ThreeSceneState; globalSceneState: ThreeSceneState; loading: boolean } = useAppSelector(
    (state: RootState) => {
      const threeState: ThreeState = state.three;
      return {
        activeScene: threeState.activeScene, // Get the active scene from state
        sceneState: threeState.scenes[scene], // The Scene State of the current scene
        globalSceneState: threeState.scenes[0], // The global scene state
        loading: state.loading.loading, // The loading screen loading state
      };
    }
  );

  // This code triggers to load the scene
  useEffect(() => {
    // Update the state and start loading the scene
    dispatch(setPageScene(scene));

    // console.log("Will start loading: ", sceneState.name);
  }, [dispatch, scene]);

  // This code triggers to load the scene
  useEffect(() => {
    // Make sure the Global Scene has loaded first
    if (!globalSceneState.isLoaded) return;
    if (sceneState.isLoading) return;
    // Set up the loading action data
    const loadingAction: ThreeStateLoadingAction = {
      scene: scene,
      value: true,
    };

    // Update the state and start loading the scene
    dispatch(setSceneLoading(loadingAction));

    // console.log("Will start loading: ", sceneState.name);
  }, [dispatch, scene, globalSceneState, sceneState.name, sceneState.isLoading]);

  // This code removes the loading screen
  useEffect(() => {
    // If the global scene or the current one haven't loaded yet return
    if (!globalSceneState.isLoaded || !sceneState.isLoaded) return;
    // If there's no screen loading return again
    if (!loading) return;

    dispatch(setLoading(false));
  }, [globalSceneState, sceneState, dispatch, loading]);

  // This code sets the new active scene
  useEffect(() => {
    // If current scene is already the active one return
    if (activeScene === scene) return;
    // If the global scene or the current one haven't loaded yet return
    if (!globalSceneState.isLoaded || !sceneState.isLoaded) return;

    // console.log("Current page scene:", scene);
    // console.log("Set active scene: ", sceneState.name);
    // Make the current scene the active one
    dispatch(setActiveScene(scene));
  }, [activeScene, globalSceneState, sceneState, dispatch, scene]);

  return null;
};

export default SceneEmpty;
