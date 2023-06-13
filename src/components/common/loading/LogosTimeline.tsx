"use client";
import React from "react";
import Image from "next/image";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";

const LogosTimeline = () => {
  // Get the Redux state for the objects loaded and scene loaded
  const { sceneLoaded } = useThreeState() as ThreeState;

  return (
    <div className="relative flex items-center gap-30px">
      <Image
        className={!sceneLoaded ? "animate-pulse" : ""}
        src={"/images/nextjs-logo.svg"}
        alt={"NextJS Starter Template"}
        width={80}
        height={80}
        priority={true}
      />
      <Image
        src={"/images/threejs-logo.svg"}
        className={!sceneLoaded ? "animate-pulse" : ""}
        alt={"ThreeJS React NextJS Template"}
        width={100}
        height={100}
        priority={true}
      />
      <Image
        className={!sceneLoaded ? "animate-pulse" : ""}
        src={"/images/demo/vercel.svg"}
        alt={"Vercel Logo"}
        width={80}
        height={80}
        priority={true}
      />
    </div>
  );
};

export default LogosTimeline;
