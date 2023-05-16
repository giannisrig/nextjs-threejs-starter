import Box from "@/components/three/objects/Box";
import React, { useEffect } from "react";
import { setScene1Loaded } from "@/slices/sceneSlice";
import { useAppDispatch } from "@/libs/store/store";
import Ground from "@/components/three/objects/ground/Ground";

const Scene1 = () => {
  // Set the Redux Dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScene1Loaded(true));
    console.log("Scene 1 loaded, maybe cameraman does something");
  }, [dispatch]);

  return (
    <>
      <Box />
    </>
  );
};

export default Scene1;
