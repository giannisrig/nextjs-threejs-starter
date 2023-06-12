"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { CameramanState, ThreeState } from "@/types/three/state";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { useEffect } from "react";
import { setCameraControls, setSceneLoaded, setObjectsLoaded } from "@/slices/threeSlice";
import { Vector3 } from "three";
import useThreeState from "@/libs/hooks/useThreeState";

interface SceneContainerProps extends ReactNodeWrapper {
  targetPosition: Vector3;
  cameraPosition: Vector3;
  objectsDeps: number;
}

const Scene = ({ targetPosition, cameraPosition, objectsDeps, children }: SceneContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the Redux state for the objects loaded and scene loaded
  const { objectsLoaded, sceneLoaded } = useThreeState() as ThreeState;

  // Get the Redux state for the enteredWebsite
  const enteredWebsite = useAppSelector((state: RootState) => state.loading.entered); // updated

  // This code runs to reset the sceneLoaded & objectsLoaded state
  useEffect(() => {
    // Update the camera controls
    dispatch(setSceneLoaded(false));
    dispatch(setObjectsLoaded(0));

    // Create a new camera position that is slightly away from the one that will be set
    // We need this so that we can have a nice camera transition when entering the website for first time
    // Set up the new cameraman state
    const newCameraman: CameramanState = {
      targetPosition: new Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 70),
      cameraPosition: new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z + 70),
    };

    // Update the state
    dispatch(setCameraControls(newCameraman));
    console.log("Set scene loaded to false");
    console.log("Set scene objects to 0");
  }, [cameraPosition, dispatch, targetPosition]);

  useEffect(() => {
    if (objectsDeps === objectsLoaded) {
      console.log("Scene Objects loaded");

      // Set the scene loaded to true
      dispatch(setSceneLoaded(true));
    }
  }, [objectsLoaded, objectsDeps, dispatch]);

  useEffect(() => {
    // When the scene is loaded and the user has entered the website
    if (sceneLoaded && enteredWebsite) {
      console.log("Updating the cameraman state");

      // Set up the new cameraman state
      const newCameraman: CameramanState = {
        targetPosition: targetPosition,
        cameraPosition: cameraPosition,
      };

      // Update the state
      dispatch(setCameraControls(newCameraman));
    }
  }, [cameraPosition, dispatch, targetPosition, sceneLoaded, enteredWebsite]);

  return <group>{children}</group>;
};

export default Scene;
