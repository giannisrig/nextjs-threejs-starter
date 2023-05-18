import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useAppDispatch } from "@/libs/store/store";
import { setSceneObjectsLoaded } from "@/libs/store/slices/threeSlice";
import { ThreeStateObjectsLoadedAction } from "@/types/three/state";
import { useEffect, useState } from "react";
import { useControls } from "leva";
import seaSettings from "@/components/three/objects/environment/sea/seaSettings";
import { Vector3 } from "three";

interface GLTFModelProps {
  url: string;
  stateScene: number;
  name: string;
  showGUI: boolean;
  modelPosition: any;
  modelScale?: number;
}

function GLTFModel({ url, stateScene, name, modelPosition, modelScale = 1, showGUI, ...props }: GLTFModelProps) {
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

  const { scale, position } = useControls(name + " Settings", {
    position: { value: modelPosition, step: 0.5 },
    scale: { value: modelScale, step: 1, min: 1, max: 50 },
  });

  const finalSettings = {
    position: showGUI ? position : modelPosition,
    scale: showGUI ? scale : modelScale,
  };

  return (
    <group {...props} dispose={null}>
      <mesh scale={finalSettings.scale} position={new Vector3(...finalSettings.position)}>
        <primitive object={scene} />
      </mesh>
    </group>
  );
}

export default GLTFModel;
