import { Mesh } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "@/libs/store/store";
import { setScene1Loaded } from "@/slices/threeSlice";

const Model = () => {
  const [modelLoaded, setModelLoaded] = useState(false);

  // Set the Redux Dispatch
  // const dispatch = useAppDispatch();
  const { scene } = useThree();

  // https://www.tabnine.com/code/javascript/functions/react-three-fiber/useLoader
  const gltf = useLoader(GLTFLoader, "http://localhost:3000/models/website-scene.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("http://localhost:3000/draco/");
    loader.setDRACOLoader(dracoLoader);
    console.log("Object loaded");
    setModelLoaded(true);
    // dispatch(setScene1Loaded(true));
    // console.log("Scene 1 loaded, maybe cameraman does something");
  });

  // console.log(gltf);

  // const ref = useRef<Mesh>();

  return <></>;
  // return modelLoaded ? (
  //   <mesh ref={ref} scale={1}>
  //     <primitive object={gltf.scene} position={[0, 0, 0]} />
  //     {/*<meshStandardMaterial color={0xffffff} />*/}
  //     {/*<meshLambertMaterial color={0xf5d9d4} emissive={0xad8f93} emissiveIntensity={0.5} />*/}
  //   </mesh>
  // ) : null;
};

export default Model;
