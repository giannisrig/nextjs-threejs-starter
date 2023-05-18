import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setActiveScene, setSceneLoading, setCamera, setCameraMan } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";
import { ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";

interface ThreeSceneProps extends ReactNodeWrapper {
  sceneIndex: number;
}

const ThreeScene = ({ sceneIndex, children }: ThreeSceneProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state and the main scene state
  const {
    activeScene,
    sceneState,
    globalSceneState,
    loading,
  }: { activeScene: number; sceneState: ThreeSceneState; globalSceneState: ThreeSceneState; loading: boolean } =
    useAppSelector((state: RootState) => {
      const threeState: ThreeState = state.three;
      return {
        activeScene: threeState.activeScene,
        sceneState: threeState.scenes[sceneIndex],
        globalSceneState: threeState.scenes[0],
        loading: state.loading.loading,
      };
    });

  // Get the camera and cameraman state
  const { camera, cameraman } = useAppSelector((state: RootState) => state.three as ThreeState);

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
    // When both the global scene and the current one have loaded set the LoadingScreen to false
    if (globalSceneState.isLoaded && sceneState.isLoaded) {
      console.log("Current page scene and global scene have loaded");

      if (loading) {
        dispatch(setLoading(false));
        console.log("Remove the loading screen");
      }

      console.log("Set active scene: ", sceneState.name);
      dispatch(setActiveScene(sceneIndex));
    }
  }, [globalSceneState, sceneState, dispatch, loading, sceneIndex]);

  // Remove the loading screen when scene is loaded
  useEffect(() => {
    if (activeScene !== sceneIndex) return;
    console.log("Should change the cameraman because active scene now is ", activeScene);

    // const newCamera = camera;
    // const newCameraman = cameraman;
    // newCamera.position = sceneState.camera.position;
    // newCameraman.targetPosition = sceneState.cameraman.targetPosition;
    // dispatch(setCamera(newCamera));
    // dispatch(setCameraMan(newCameraman));
  }, [sceneState, activeScene, sceneIndex, camera, cameraman, dispatch]);

  return <>{children}</>;
};

export default ThreeScene;
