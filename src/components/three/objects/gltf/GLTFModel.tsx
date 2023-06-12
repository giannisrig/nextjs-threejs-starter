"use client";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import React, { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { Vector3 } from "three";
import { useAppDispatch } from "@/libs/store/store";
import { addObjectsLoaded } from "@/slices/threeSlice";

interface GLTFModelProps {
  url: string;
  name: string;
  modelPosition: any;
  modelScale?: number;
}

function GLTFModel({ url, name, modelPosition, modelScale = 1, ...props }: GLTFModelProps) {
  const showGUI = true;

  const [rendered, setRendered] = useState(false);

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // Get the nodes and materials of the model
  const { scene } = useGLTF(url, true) as GLTF;

  const ref = useRef(null);

  const { visible, scale, position } = useControls(
    name + " Settings",
    {
      visible: { value: true },
      position: { value: modelPosition, step: 0.5 },
      scale: { value: modelScale, step: 1, min: 1, max: 50 },
    },
    {
      collapsed: true,
    }
  );

  const finalSettings = {
    position: showGUI ? position : modelPosition,
    scale: showGUI ? scale : modelScale,
  };

  // useFrame((state, delta) => {
  //   ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  //   // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
  // });

  useEffect(() => {
    if (!rendered) return;
    // console.log("rendered");
    dispatch(addObjectsLoaded());
  }, [dispatch, rendered]);

  const onRendered = () => {
    if (!rendered) {
      setRendered(true);
    }
  };

  return (
    <group {...props} dispose={null} visible={visible}>
      <mesh
        ref={ref}
        onAfterRender={onRendered}
        scale={finalSettings.scale}
        position={new Vector3(...finalSettings.position)}
        castShadow={true}
        receiveShadow={true}
      >
        <primitive object={scene} />
      </mesh>
    </group>
  );
}

export default GLTFModel;
