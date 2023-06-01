import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three/state";
import { useEffect } from "react";
import sameArrays from "@/libs/utils/sameArrays";
import { setSceneLoaded } from "@/slices/threeSlice";

interface SceneEmptyContainerProps {
  scene: number;
}

const SceneEmpty = ({ scene }: SceneEmptyContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state for name and objects loaded
  const { name, isLoaded } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);
  const { activeScene, pageScene } = useAppSelector((state: RootState) => state.three as ThreeState);

  useEffect(() => {
    if (isLoaded) return;
    if (activeScene === scene) return;
    if (!pageScene || pageScene !== scene) return;

    // Set up the data to update the scene state loaded value
    const loadedAction: ThreeStateLoadingAction = {
      scene: scene,
      value: true,
    };
    //
    // console.log("Loaded Scene " + scene);

    // Update the state and start loading the scene
    dispatch(setSceneLoaded(loadedAction));
  }, [dispatch, name, scene, isLoaded, activeScene, pageScene]);

  return null;
};

export default SceneEmpty;
