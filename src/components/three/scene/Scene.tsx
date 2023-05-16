import React, { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import dynamic from "next/dynamic";
import CameraMan from "@/components/three/scene/CameraMan";
import Environment from "@/components/three/scene/Environment";
import Lights from "@/components/three/scene/Lights";
import Box from "@/components/three/objects/Box";
const DynamicModel = dynamic(() => import("@/components/three/objects/Model"), {
  loading: () => null,
  ssr: false,
});

// //https://codesandbox.io/s/three-fiber-zoom-to-object-camera-controls-solution-final-sbgx0?file=/src/App.js:1829-1836

const Scene = () => {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  return (
    <>
      <Lights />
      <Environment />

      <Box />
      {/*<mesh*/}
      {/*  onClick={(e: ThreeEvent<any>) => {*/}
      {/*    setFocus(e.object.position);*/}
      {/*    setZoom(!zoom);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <DynamicModel />*/}
      {/*</mesh>*/}
      {/*<CameraMan zoom={zoom} focus={focus} />*/}
    </>
  );
};

export default Scene;
