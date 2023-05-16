import { RootState, useAppSelector } from "@/libs/store/store";
import React from "react";
import Scene1 from "@/components/three/sceneLoaders/Scene1";
import Scene2 from "@/components/three/sceneLoaders/Scene2";

const DynamicScenes = () => {
  // const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const scene1Loading = selector((state: RootState) => state.scene.scene1Loading); // updated
  const scene2Loading = selector((state: RootState) => state.scene.scene2Loading); // updated

  return (
    <>
      {scene1Loading && <Scene1 />}
      {scene2Loading && <Scene2 />}
    </>
  );
};

export default DynamicScenes;
