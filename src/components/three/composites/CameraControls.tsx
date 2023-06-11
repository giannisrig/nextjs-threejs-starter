"use client";
import React from "react";
import CameraLevaControls from "@/components/three/camera/cameraLevaControls/CameraLevaControls";
import Cameraman from "@/components/three/camera/cameraman/Cameraman";

const CameraControls = () => {
  return (
    <>
      <Cameraman />
      <CameraLevaControls />
    </>
  );
};

export default CameraControls;
