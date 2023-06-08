"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/libs/store/store";
import { ThreeStateObjectsLoadedAction } from "@/types/three/state";
import { setSceneObjectsLoaded } from "@/slices/threeSlice";
import { useControls } from "leva";
import { Euler, Mesh, Vector3 } from "three";

const Skybox = ({ showGUI = true }) => {
  const modelPosition: any = [0, 0, 0];
  const modelRotation: any = [0, 0, 0];
  const modelScale = 1;
  const name = "Skydome";

  // Get the nodes and materials of the model
  const { scene } = useGLTF("/models/skydome.glb", true) as GLTF;
  // console.log(scene);

  const ref = useRef<Mesh>(null);

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set up the objects loaded action for state
    const objectLoaded: ThreeStateObjectsLoadedAction = {
      scene: 0,
      value: name,
    };

    // add the object name to the scene state
    dispatch(setSceneObjectsLoaded(objectLoaded));
  }, [dispatch, scene]);

  const { scale, position, rotation } = useControls(
    name + " Settings",
    {
      position: { value: [0, -310, 0], step: 0.5 },
      scale: { value: 3, step: 1, min: 1, max: 50 },
      rotation: { value: [0, 0, 0], step: 0.5 },
    },
    {
      collapsed: true,
    }
  );

  const finalSettings = {
    position: showGUI ? position : modelPosition,
    scale: showGUI ? scale : modelScale,
    rotation: showGUI ? rotation : modelRotation,
  };

  useFrame((state, delta) => {
    if (ref.current) {
      // ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      ref.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <group dispose={null}>
      <mesh
        ref={ref}
        scale={new Vector3(finalSettings.scale, finalSettings.scale, finalSettings.scale)}
        // rotateX(Math)
        position={new Vector3(...finalSettings.position)}
        rotation={new Euler(...finalSettings.rotation)}
      >
        <primitive object={scene} />
      </mesh>
    </group>
  );
};

export default Skybox;
