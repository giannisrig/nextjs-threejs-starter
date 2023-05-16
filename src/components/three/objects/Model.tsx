import { Mesh } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import React, { useRef } from "react";

const Model = () => {
  // const gltf = useLoader(GLTFLoader, "http://localhost:3000/models/website-scene.glb");

  // https://www.tabnine.com/code/javascript/functions/react-three-fiber/useLoader
  const gltf = useLoader(GLTFLoader, "http://localhost:3000/models/website-scene.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("http://localhost:3000/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  console.log(gltf);

  const ref = useRef<Mesh>();
  // useFrame((state, delta) => {
  //   ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  //   // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
  // });

  return (
    <mesh ref={ref} scale={1}>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
      {/*<meshStandardMaterial color={0xffffff} />*/}
      {/*<meshLambertMaterial color={0xf5d9d4} emissive={0xad8f93} emissiveIntensity={0.5} />*/}
    </mesh>
  );
};

export default Model;
