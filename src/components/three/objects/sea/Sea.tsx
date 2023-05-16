import * as THREE from "three";
import { Mesh } from "three";
import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame, Object3DNode } from "@react-three/fiber";
import { Water } from "three-stdlib";

// Create our custom element
class CustomWater extends Water {}

// Extend so the reconciler will learn about it
extend({ CustomWater });

declare module "@react-three/fiber" {
  interface ThreeElements {
    customWater: Object3DNode<CustomWater, typeof CustomWater>;
  }
}

const Sea = () => {
  const ref = useRef<Mesh>();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/images/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.BoxGeometry(2100, 2100, 10), []);
  const config = useMemo(
    () => ({
      textureWidth: 256,
      textureHeight: 256,
      waterNormals,
      sunDirection: new THREE.Vector3(-10, 0, -1),
      sunColor: 0xffffff,
      waterColor: 0xae94bd,
      distortionScale: 2.7,
      fog: true,
      side: 2,
      format: gl.encoding,
    }),
    [gl.encoding, waterNormals]
  );
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta * 0.2));
  return <customWater ref={ref} args={[geom, config]} position={[0, -5, 0]} rotation-x={-Math.PI / 2} />;
};

export default Sea;
