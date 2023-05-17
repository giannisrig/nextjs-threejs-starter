import { Mesh } from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppDispatch } from "@/libs/store/store";
import { setScene2Loaded } from "@/slices/sceneSlice";

const Box = () => {
  const ref = useRef<Mesh>();

  const dispatch = useAppDispatch();

  // Update the state and start loading the scene for homepage
  dispatch(setScene2Loaded(true));

  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 3;
    // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
  });
  return (
    <mesh ref={ref} scale={10} position={[0, 0, 120]}>
      <boxGeometry />
      <meshLambertMaterial color={0xf5d9d4} emissive={0xad8f93} emissiveIntensity={0.5} />
    </mesh>
  );
};

export default Box;
