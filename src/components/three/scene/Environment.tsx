import Sky from "@/components/three/objects/sky/Sky";
import React from "react";
import Sea from "@/components/three/objects/sea/Sea";
import Ground from "@/components/three/objects/ground/Ground";
import { useThree } from "@react-three/fiber";

const Environment = () => {
  const mainSceneRef = useThree().scene;
  console.log(mainSceneRef);

  return (
    <>
      <Sky showGUI={true} />
      <Ground showGUI={true} />
      {/*<Sea />*/}
    </>
  );
};

export default Environment;
