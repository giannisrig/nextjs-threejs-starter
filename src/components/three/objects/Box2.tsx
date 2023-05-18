import { Mesh } from "three";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppDispatch } from "@/libs/store/store";
import { setSceneObjectsLoaded } from "@/slices/threeSlice";
import { ThreeStateObjectsLoadedAction } from "@/types/three/state";

const Box = ({ color = 0xf5d9d4, stateScene, name, ...props }) => {
  const ref = useRef<Mesh>();

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // If we can access the object then it's loaded
    if (ref.current) {
      // Set up the objects loaded action for state
      const objectLoaded: ThreeStateObjectsLoadedAction = {
        scene: stateScene,
        value: name,
      };

      // add the object name to the scene state
      dispatch(setSceneObjectsLoaded(objectLoaded));
    }
  }, [dispatch, name, stateScene, ref]);

  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 3;
    // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
  });
  return (
    <mesh ref={ref} scale={10} position={[0, 0, 120]} {...props}>
      <boxGeometry />
      <meshLambertMaterial color={color} emissive={0xad8f93} emissiveIntensity={0.5} />
    </mesh>
  );
};

export default Box;
