"use client";
import { Vector3 } from "three";
import React from "react";
import Scene from "@/components/three/containers/Scene";

const Scene3 = () => {
  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return <Scene objects={1} cameraPosition={new Vector3(80, 41, 86)} targetPosition={new Vector3(-43, -500, -31)}></Scene>;
};

export default Scene3;
