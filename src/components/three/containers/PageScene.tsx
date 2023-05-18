import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setActiveScene, setSceneLoading, setCamera, setCameraMan, setCameraManAction } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";
import { CameramanState, CameraState, ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { Euler, Vector3 } from "three";

interface ThreeSceneProps extends ReactNodeWrapper {
  sceneIndex: number;
}

const PageScene = ({ sceneIndex, children }: ThreeSceneProps) => {
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

      dispatch(setCameraManAction(false));

      const newCameraState: CameraState = {
        name: sceneState.name,
        position: new Vector3(sceneState.camera.position.x, sceneState.camera.position.y, sceneState.camera.position.z),
        rotation: sceneState.camera.rotation
          ? new Euler(sceneState.camera.rotation.x, sceneState.camera.rotation.y, sceneState.camera.rotation.z, "XYZ")
          : new Euler(camera.rotation.x, camera.rotation.y, camera.rotation.z),
        fov: sceneState.camera.fov ? sceneState.camera.fov : camera.fov,
        near: sceneState.camera.near ? sceneState.camera.near : camera.near,
        far: sceneState.camera.far ? sceneState.camera.far : camera.far,
        zoom: sceneState.camera.zoom ? sceneState.camera.zoom : camera.zoom,
        focus: sceneState.camera.focus ? sceneState.camera.focus : camera.focus,
      };

      const newCameraManState: CameramanState = {
        action: true,
        targetPosition: sceneState.cameraman.targetPosition
          ? sceneState.cameraman.targetPosition
          : cameraman.targetPosition,
      };

      console.log(newCameraState);
      console.log(newCameraManState);

      dispatch(setCamera(newCameraState));
      dispatch(setCameraMan(newCameraManState));
    }
  }, [
    globalSceneState,
    sceneState,
    dispatch,
    loading,
    sceneIndex,
    camera.rotation.x,
    camera.rotation.y,
    camera.rotation.z,
    camera.fov,
    camera.near,
    camera.far,
    camera.zoom,
    camera.focus,
    cameraman.targetPosition,
  ]);

  // Remove the loading screen when scene is loaded
  // useEffect(() => {
  //   if (activeScene !== sceneIndex) return;
  //   console.log("Should change the cameraman because active scene now is ", activeScene);
  //
  //   const newCameraState: CameraState = {
  //     name: sceneState.name,
  //     position: new Vector3(sceneState.camera.position.x, sceneState.camera.position.y, sceneState.camera.position.z),
  //     rotation: sceneState.camera.rotation
  //       ? new Euler(sceneState.camera.rotation.x, sceneState.camera.rotation.y, sceneState.camera.rotation.z, "XYZ")
  //       : new Euler(camera.rotation.x, camera.rotation.y, camera.rotation.z),
  //     fov: sceneState.camera.fov ? sceneState.camera.fov : camera.fov,
  //     near: sceneState.camera.near ? sceneState.camera.near : camera.near,
  //     far: sceneState.camera.far ? sceneState.camera.far : camera.far,
  //     zoom: sceneState.camera.zoom ? sceneState.camera.zoom : camera.zoom,
  //     focus: sceneState.camera.focus ? sceneState.camera.focus : camera.focus,
  //   };
  //
  //   const newCameraManState: CameramanState = {
  //     action: true,
  //     targetPosition: sceneState.cameraman.targetPosition
  //       ? sceneState.cameraman.targetPosition
  //       : cameraman.targetPosition,
  //   };
  //
  //   dispatch(setCamera(newCameraState));
  //   dispatch(setCameraMan(newCameraManState));
  // }, [sceneState, activeScene, sceneIndex, camera, cameraman, dispatch]);

  return <>{children}</>;
};

export default PageScene;
