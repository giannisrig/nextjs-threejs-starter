"use client";
import SceneEmpty from "@/components/three/containers/SceneEmpty";

const Scene3 = () => {
  // Define the current scene
  const scene = 3;

  // Wrap every Lazy loaded Model in a Suspense so that there's no glitch while loading the objects, especially GTLFs which might be pretty big
  return <SceneEmpty scene={scene} />;
};

export default Scene3;
