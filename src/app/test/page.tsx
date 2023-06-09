"use client";
import PageScene from "@/components/three/containers/PageScene";
import Scene2 from "@/components/three/scenes/Scene2";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import React from "react";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";

export default function Test() {
  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  return (
    <PageScene sceneIndex={2}>
      <div className="relative h-screen"></div>
      <h1 className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black">
        Test Page
      </h1>
      {/* The scene will be lazy loaded to the main threejs canvas */}
      <ThreeInput>
        <group visible={scenes[2].isLoaded}>
          <Scene2 />
        </group>
      </ThreeInput>
    </PageScene>
  );
}
