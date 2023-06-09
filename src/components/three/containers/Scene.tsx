"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three/state";
import { useEffect } from "react";
import sameArrays from "@/libs/utils/sameArrays";
import { setActiveScene, setPageScene, setSceneLoaded, setSceneLoading } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";

interface SceneContainerProps extends ReactNodeWrapper {
  scene: number;
  deps: string[];
}

const Scene = ({ scene, deps, children }: SceneContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state for name and objects loaded
  const { name, objectsLoaded, isLoaded } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);
  const { pageScene } = useAppSelector((state: RootState) => state.three as ThreeState);

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

  useEffect(() => {
    if (isLoaded) return;
    if (activeScene === scene) return;
    if (!pageScene || pageScene !== scene) return;

    // If the objects loaded are the same as the dependencies models
    if (objectsLoaded && sameArrays(objectsLoaded, deps)) {
      // Set up the data to update the scene state loaded value
      const loadedAction: ThreeStateLoadingAction = {
        scene: scene,
        value: true,
      };

      // console.log("Loaded Scene " + scene);

      // Update the state and start loading the scene
      dispatch(setSceneLoaded(loadedAction));
    }
  }, [dispatch, name, deps, objectsLoaded, scene, isLoaded, activeScene, pageScene]);

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

  return <>{children}</>;
};

export default Scene;
