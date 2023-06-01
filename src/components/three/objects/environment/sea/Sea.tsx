import React, { useRef, useMemo } from "react";
import seaSettings, { SeaSettings } from "./seaSettings";
import SeaGUI from "./SeaGUI";
import * as THREE from "three";
import { Mesh, ShaderMaterial } from "three";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { extend, useLoader, useFrame, Object3DNode } from "@react-three/fiber";
import { Water } from "three-stdlib";
extend({ Water });

// Create our custom element
class CustomWater extends Water {}

// Extend so the reconciler will learn about it
extend({ CustomWater });

declare module "@react-three/fiber" {
  interface ThreeElements {
    customWater: Object3DNode<CustomWater, typeof CustomWater>;
  }
}

const Sea = ({ showGUI = true }) => {
  // Our ref item for the sea, needed to animate it
  const ref = useRef<Mesh>();

  // Set up the settings for the ground plane and use GUI controls if enabled
  const settings: SeaSettings = showGUI ? SeaGUI() : seaSettings;

  // Load the water normals texture
  const waterNormals = useLoader(THREE.TextureLoader, "/images/waternormals.jpg");

  // Repeat the texture infinitely
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  // Set up the sea geometry
  const geom = useMemo(() => new THREE.BoxGeometry(settings.geometry.x, settings.geometry.y), [settings.geometry.x, settings.geometry.y]);

  // Set up the options for the sea
  const config = useMemo(
    () => ({
      textureWidth: settings.uniforms.textureSize,
      textureHeight: settings.uniforms.textureSize,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(settings.uniforms.sunDirection.x, settings.uniforms.sunDirection.y, settings.uniforms.sunDirection.z),
      sunColor: settings.uniforms.sunColor,
      waterColor: settings.uniforms.waterColor,
      distortionScale: settings.uniforms.distortionScale,
      fog: settings.uniforms.fog,
      side: settings.uniforms.side,
    }),
    [
      settings.uniforms.distortionScale,
      settings.uniforms.fog,
      settings.uniforms.side,
      settings.uniforms.sunColor,
      settings.uniforms.sunDirection.x,
      settings.uniforms.sunDirection.y,
      settings.uniforms.sunDirection.z,
      settings.uniforms.textureSize,
      settings.uniforms.waterColor,
      waterNormals,
    ]
  );
  useFrame((state, delta) => {
    if (!ref.current) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const material: ShaderMaterial = ref.current.material;
    material.uniforms.time.value += delta * 0.15;
    // ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.02;
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <customWater ref={ref} args={[geom, config]} position={[0, 0, 0]} visible={settings.visible} rotation-x={-Math.PI / 2} />;
};

export default Sea;
