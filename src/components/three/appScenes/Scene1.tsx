import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setScene1Loading } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";

const Scene1 = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const scene1Loaded = selector((state: RootState) => state.three.scene1Loaded); // updated
  const mainSceneLoaded = selector((state: RootState) => state.three.mainSceneLoaded); // updated

  // Start loading the scene 1
  useEffect(() => {
    // Update the state and start loading the scene for homepage
    dispatch(setScene1Loading(true));
  }, [dispatch]);

  // Remove the loading screen when scene 1 is loaded
  useEffect(() => {
    if (mainSceneLoaded && scene1Loaded) {
      dispatch(setLoading(false));
    }
  }, [scene1Loaded, mainSceneLoaded, dispatch]);

  return null;
};

export default Scene1;
