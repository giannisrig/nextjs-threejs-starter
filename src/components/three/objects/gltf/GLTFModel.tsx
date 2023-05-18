import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useAppDispatch } from "@/libs/store/store";
import { setSceneObjectsLoaded } from "@/libs/store/slices/threeSlice";
import { ThreeStateObjectsLoadedAction } from "@/types/three/state";
import { useEffect, useState } from "react";

interface GLTFModelProps {
  url: string;
  stateScene: number;
  name: string;
}

function GLTFModel({ url, stateScene, name, ...props }: GLTFModelProps) {
  // Get the nodes and materials of the model
  const { scene } = useGLTF(url, true) as GLTF;

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set up the objects loaded action for state
    const objectLoaded: ThreeStateObjectsLoadedAction = {
      scene: stateScene,
      value: name,
    };

    // add the object name to the scene state
    dispatch(setSceneObjectsLoaded(objectLoaded));
  }, [dispatch, name, stateScene, scene]);

  // useGLTF.preload(url);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default GLTFModel;
