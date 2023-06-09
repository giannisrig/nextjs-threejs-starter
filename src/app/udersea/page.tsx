"use client";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import Scene3 from "@/components/three/scenes/Scene3";

export default function Undersea() {
  return (
    <>
      <div className="relative h-screen"></div>
      <h1 className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black">
        Undersea
      </h1>
      {/* The scene will be cast to threejs canvas */}
      <ThreeInput>
        <Scene3 />
      </ThreeInput>
    </>
  );
}
