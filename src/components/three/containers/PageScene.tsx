import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setActiveScene, setSceneLoading, setCameraMan, setCameraManAction } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";
import { CameramanState, ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";

interface ThreeSceneProps extends ReactNodeWrapper {
  sceneIndex: number;
}

const PageScene = ({ sceneIndex, children }: ThreeSceneProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state and the main scene state
  const {
    sceneState,
    cameraman,
    globalSceneState,
    loading,
    activeScene,
  }: { activeScene: number; sceneState: ThreeSceneState; globalSceneState: ThreeSceneState; loading: boolean; cameraman: CameramanState } =
    useAppSelector((state: RootState) => {
      const threeState: ThreeState = state.three;
      return {
        cameraman: threeState.cameraman, // Get the cameraman state
        activeScene: threeState.activeScene, // Get the active scene from state
        sceneState: threeState.scenes[sceneIndex], // The Scene State of the current scene
        globalSceneState: threeState.scenes[0], // The global scene state
        loading: state.loading.loading, // The loading screen loading state
      };
    });

  useEffect(() => {
    // Make sure the Global Scene has loaded first
    if (!globalSceneState.isLoaded) return;
    if (sceneState.isLoading) return;
    // Set up the loading action data
    const loadingAction: ThreeStateLoadingAction = {
      scene: sceneIndex,
      value: true,
    };

    // Update the state and start loading the scene
    dispatch(setSceneLoading(loadingAction));

    console.log("Will start loading: ", sceneState.name);
  }, [dispatch, sceneIndex, globalSceneState, sceneState.name, sceneState.isLoading]);

  // Remove the loading screen when scene is loaded
  useEffect(() => {
    if (activeScene === sceneIndex) return;

    // When both the global scene and the current one have loaded set the LoadingScreen to false
    if (globalSceneState.isLoaded && sceneState.isLoaded) {
      // console.log("Current page scene and global scene have loaded");

      if (loading) {
        dispatch(setLoading(false));
        // console.log("Remove the loading screen");
      }

      console.log("Set active scene: ", sceneState.name);
      // Make the current scene the active one
      dispatch(setActiveScene(sceneIndex));
      dispatch(setCameraManAction(false));

      const newCameraManState: CameramanState = {
        action: true,
        cameraPosition: sceneState.cameraman.cameraPosition ? sceneState.cameraman.cameraPosition : cameraman.cameraPosition,
        targetPosition: sceneState.cameraman.targetPosition ? sceneState.cameraman.targetPosition : cameraman.targetPosition,
      };

      // console.log(newCameraManState);

      dispatch(setCameraMan(newCameraManState));
    }
  }, [activeScene, globalSceneState, sceneState, dispatch, loading, sceneIndex, cameraman.targetPosition, cameraman.cameraPosition]);

  return <>{children}</>;
};

export default PageScene;
