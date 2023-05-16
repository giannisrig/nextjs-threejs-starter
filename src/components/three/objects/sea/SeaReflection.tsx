import * as THREE from "three";
import { Mesh } from "three";
import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame, Object3DNode } from "@react-three/fiber";
import { Water2 } from "three-stdlib";

// Create our custom element
class CustomWater2 extends Water2 {}

// Extend so the reconciler will learn about it
extend({ CustomWater2 });

declare module "@react-three/fiber" {
  interface ThreeElements {
    customWater2: Object3DNode<CustomWater2, typeof CustomWater2>;
  }
}
// color: '#ffffff',
//   scale: 4,
//   flowX: 1,
//   flowY: 1
const SeaReflection = () => {
  const ref = useRef<Mesh>();
  const gl = useThree((state) => state.gl);
  const geom = useMemo(() => new THREE.PlaneGeometry(1000, 1000), []);
  const config = useMemo(
    () => ({
      // textureWidth: 256,
      // textureHeight: 256,
      // waterNormals,
      // sunDirection: new THREE.Vector3(0, 0, 1),
      // sunColor: 0xffffff,
      // waterColor: 0xae94bd,
      // distortionScale: 2.7,
      // fog: false,
      // side: 2,
      // format: gl.encoding,
      color: 0xfffff0,
      scale: 4,
      // flowDirection: new THREE.Vector2(1, 0),
      // textureWidth: 1024,
      // textureHeight: 1024,
    }),
    []
  );
  // useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta * 0.2));
  return <customWater2 ref={ref} args={[geom, config]} position={[0, 1, -1]} rotation-x={Math.PI / 2} />;
};

export default SeaReflection;
