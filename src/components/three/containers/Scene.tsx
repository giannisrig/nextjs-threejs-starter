"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { useAppDispatch } from "@/libs/store/store";
import { useCallback, useEffect, useState } from "react";
import { setCameraControls } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";
import { Vector3 } from "three";
import { CameramanState } from "@/types/three/state";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";

interface SceneContainerProps extends ReactNodeWrapper {
  objects?: number;
  targetPosition: Vector3;
  cameraPosition: Vector3;
}

const Scene = ({ objects = 0, targetPosition, cameraPosition, children }: SceneContainerProps) => {
  // const [cameraman, setCameraman] = useState(false);

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  const handleRect = useCallback(
    (node) => {
      if (node && node.children.length >= objects) {
        console.log("Scene objects loaded", node.children);
        // dispatch(setActiveScene(scene));
        dispatch(setLoading(false));
      }
    },
    [dispatch, objects]
  );

  useEffect(() => {
    dispatch(setLoading(false));

    // Update the camera controls
    const newCameraman: CameramanState = {
      targetPosition: targetPosition,
      cameraPosition: cameraPosition,
    };

    dispatch(setCameraControls(newCameraman));
  }, [cameraPosition, dispatch, targetPosition]);

  return <group ref={handleRect}>{children}</group>;
};

export default Scene;
