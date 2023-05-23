import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeState, ThreeStateLoadingAction } from "@/types/three/state";
import { useEffect } from "react";
import sameArrays from "@/libs/utils/sameArrays";
import { setSceneLoaded } from "@/slices/threeSlice";

interface SceneContainerProps extends ReactNodeWrapper {
  scene: number;
  deps: string[];
}

const Scene = ({ scene, deps, children }: SceneContainerProps) => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the current scene state for name and objects loaded
  const { name, objectsLoaded, isLoaded } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);
  const { activeScene, pageScene } = useAppSelector((state: RootState) => state.three as ThreeState);

  useEffect(() => {
    if (isLoaded) return;
    if (activeScene === scene) return;
    if (!pageScene || pageScene !== scene) return;

    // If the objects loaded are the same as the dependencies models
    if (sameArrays(objectsLoaded, deps)) {
      // Set up the data to update the scene state loaded value
      const loadedAction: ThreeStateLoadingAction = {
        scene: scene,
        value: true,
      };

      console.log("Loaded Scene " + scene);

      // Update the state and start loading the scene
      dispatch(setSceneLoaded(loadedAction));
    }
  }, [dispatch, name, deps, objectsLoaded, scene, isLoaded, activeScene, pageScene]);

  return <>{children}</>;
};

export default Scene;
