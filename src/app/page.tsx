"use client";
import Scene1 from "@/components/three/scenes/Scene1";
import { ThreeInput } from "@/components/three/tunnel/ThreeInput";
import PageTitle from "@/components/common/page/PageTitle";
import TextContent from "@/components/common/page/TextContent";
export default function HomePage() {
  return (
    <>
      <div className="relative h-screen"></div>
      <TextContent>
        <PageTitle title={"App:Creating Memorable Human Experiences"} />
      </TextContent>

      {/* The scene will be cast to threejs canvas */}
      <ThreeInput>
        <Scene1 />
      </ThreeInput>
    </>
  );
}
