"use client";
import PageScene from "@/components/three/containers/PageScene";

export default function Undersea() {
  return (
    <PageScene sceneIndex={3}>
      <div className="relative h-screen"></div>
      <h1 className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black">
        Undersea
      </h1>
      {/* The scene will be lazy loaded to the main threejs canvas */}
    </PageScene>
  );
}
