"use client";
import Sea from "@/components/three/objects/environment/sea/Sea";
import Skybox from "@/components/three/objects/environment/skybox/Skybox";
import Ground from "@/components/three/objects/environment/ground/Ground";

const Environment = () => {
  return (
    <>
      <Skybox />
      <Ground showGUI={false} />
      <Sea />
    </>
  );
};

export default Environment;
