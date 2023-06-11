"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { CameramanState, ThreeState } from "@/types/three/state";
import { useAppDispatch } from "@/libs/store/store";
import { useEffect, useState } from "react";
import { setCameraControls, setSceneLoaded } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";
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

  const { objectsLoaded } = useThreeState() as ThreeState;

  // Set the scene loaded to false
  // dispatch(setSceneLoaded(false));

  useEffect(() => {
    if (objectsDeps === objectsLoaded) {
      console.log("Scene Objects loaded");
      // Remove the loading screen
      dispatch(setLoading(false));
    }
  }, [objectsLoaded, objectsDeps, dispatch]);

  useEffect(() => {
    // Update the camera controls
    const newCameraman: CameramanState = {
      targetPosition: targetPosition,
      cameraPosition: cameraPosition,
    };

    dispatch(setCameraControls(newCameraman));
  }, [cameraPosition, dispatch, targetPosition]);

  return <group>{children}</group>;
};

export default Scene;
