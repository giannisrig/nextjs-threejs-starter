"use client";
import PageScene from "@/components/three/containers/PageScene";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import Scene3 from "@/components/three/scenes/Scene3";
import React from "react";

export default function Undersea() {
  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  return (
    <PageScene sceneIndex={3}>
      <div className="relative h-screen"></div>
      <h1 className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black">
        Undersea
      </h1>
      {/* The scene will be lazy loaded to the main threejs canvas */}
      <ThreeInput>
        <group visible={scenes[3].isLoaded}>
          <Scene3 />
        </group>
      </ThreeInput>
    </PageScene>
  );
}
