import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const TestSceneLoader = () => {
  const mainSceneRef = useThree().scene;

  // useEffect(() => {
  //   mainSceneRef.add(object);
  //   return () => {
  //     mainSceneRef.remove(object);
  //     object.geometry.dispose();
  //     object.material.dispose();
  //   };
  // }, [mainSceneRef, object]);

  return null;
};

export default TestSceneLoader;
