import Box2 from "@/components/three/objects/Box2";
import { useEffect } from "react";
import { setScene2Loaded } from "@/slices/sceneSlice";
import { useAppDispatch } from "@/libs/store/store";

const Scene2 = () => {
  // Set the Redux Dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScene2Loaded(true));
    console.log("Scene 2 loaded, maybe cameraman does something");
  }, [dispatch]);

  return <Box2 />;
};

export default Scene2;
