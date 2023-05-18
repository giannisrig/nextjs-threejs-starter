import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeStateLoadingAction } from "@/types/three/state";
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
  const { name, objectsLoaded } = useAppSelector((state: RootState) => state.three.scenes[scene] as ThreeSceneState);

  useEffect(() => {
    // If the objects loaded are the same as the dependencies models
    if (sameArrays(objectsLoaded, deps)) {
      console.log("Objects have loaded for: ", name);

      // Set up the data to update the scene state loaded value
      const loadedAction: ThreeStateLoadingAction = {
        scene: scene,
        value: true,
      };

      // Update the state and start loading the scene
      dispatch(setSceneLoaded(loadedAction));
    }
  }, [dispatch, name, deps, objectsLoaded, scene]);

  return <>{children}</>;
};

export default Scene;
