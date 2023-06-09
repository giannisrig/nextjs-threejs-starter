"use client";
import PageScene from "@/components/three/containers/PageScene";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import Scene1 from "@/components/three/scenes/Scene1";
import React from "react";
import useThreeState from "@/libs/hooks/useThreeState";
import { ThreeState } from "@/types/three/state";

export default function HomePage() {
  // Get the scenes state
  const { scenes } = useThreeState() as ThreeState;

  return (
    <PageScene sceneIndex={1}>
      <div className="relative h-screen"></div>
      <h1 className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black">
        App:Creating Memorable Human Experiences
      </h1>

      <ThreeInput>
        <group visible={scenes[1].isLoaded}>
          <Scene1 />
        </group>
      </ThreeInput>

      {/* The scene will be lazy loaded to the main threejs canvas */}
    </PageScene>
  );
}
