"use client";
import React from "react";
import DefaultCamera from "@/components/three/camera/defaultCamera/DefaultCamera";
import CameramanControls from "@/components/three/camera/cameraman/CameramanControls";

const CameraControls = () => {
  return (
    <>
      <CameramanControls />
      {/*<DefaultCamera />*/}
    </>
  );
};

export default CameraControls;
