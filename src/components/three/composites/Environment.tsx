import Sky from "@/components/three/objects/environment/sky/Sky";
import React from "react";
import Sea from "@/components/three/objects/environment/sea/Sea";
import Ground from "@/components/three/objects/environment/ground/Ground";

const Environment = () => {
  return (
    <>
      <Sky showGUI={true} />
      <Ground showGUI={true} />
      {/*<Sea />*/}
    </>
  );
};

export default Environment;
