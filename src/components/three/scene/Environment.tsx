import Sky from "@/components/three/objects/sky/Sky";
import React from "react";
import Sea from "@/components/three/objects/sea/Sea";
import Ground from "@/components/three/objects/ground/Ground";

const Environment = () => {
  return (
    <>
      <Ground showGUI={true} />
    </>
  );
};

export default Environment;
