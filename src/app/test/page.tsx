"use client";
import Scene2 from "@/components/three/scenes/Scene2";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import PageTitle from "@/components/common/page/PageTitle";
export default function Test() {
  return (
    <>
      <div className="relative h-screen"></div>
      <PageTitle title={"Built with Next JS"} />
      {/* The scene will be cast to threejs canvas */}
      <ThreeInput>
        <Scene2 />
      </ThreeInput>
    </>
  );
}
