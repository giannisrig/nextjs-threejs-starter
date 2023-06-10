"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { useAppDispatch } from "@/libs/store/store";
import { useEffect, useRef, useCallback } from "react";
import { setActiveScene } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";

interface SceneContainerProps extends ReactNodeWrapper {
  scene: number;
  deps?: string[];
  objects?: number;
}

const Scene = ({ scene, objects = 0, children }: SceneContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  const handleRect = useCallback(
    (node) => {
      if (node.children.length >= objects) {
        console.log("Scene objects loaded", node.children);
        dispatch(setActiveScene(scene));
        dispatch(setLoading(false));
      }
    },
    [dispatch, objects, scene]
  );

  return <group ref={handleRect}>{children}</group>;
};

export default Scene;
