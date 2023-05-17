import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setScene2Loading } from "@/slices/threeSlice";
import { setLoading } from "@/slices/loadingSlice";

const Scene2 = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const scene2Loaded = selector((state: RootState) => state.three.scene2Loaded); // updated
  const mainSceneLoaded = selector((state: RootState) => state.three.mainSceneLoaded); // updated

  // Start loading the scene 2
  useEffect(() => {
    // Update the state and start loading the scene
    dispatch(setScene2Loading(true));
  }, [dispatch]);

  // Remove the loading screen when scene 2 is loaded
  useEffect(() => {
    if (mainSceneLoaded && scene2Loaded) {
      dispatch(setLoading(false));
    }
  }, [scene2Loaded, mainSceneLoaded, dispatch]);

  return null;
};

export default Scene2;
