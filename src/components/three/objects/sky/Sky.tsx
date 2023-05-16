import { Mesh, ShaderMaterialParameters } from "three";
import * as THREE from "three";
import { useRef } from "react";
import skyShader from "@/components/three/objects/sky/skyShader";
import skySettings, { SkySettings } from "@/components/three/objects/sky/skySettings";
import SkyGUI from "@/components/three/objects/sky/SkyGUI";

const Sky = ({ showGUI = false }) => {
  const ref = useRef<Mesh>();

  // Set up the settings for the ground plane and use GUI controls if enabled
  const settings: SkySettings = showGUI ? SkyGUI() : skySettings;

  // Define the sky shader
  const shaderSettings: ShaderMaterialParameters = {
    name: "SkyNewShader",
    side: THREE.BackSide,
    uniforms: {
      topColor: { value: settings.uniforms.topColor },
      bottomColor: { value: settings.uniforms.bottomColor },
      offset: { value: settings.uniforms.offset },
      exponent: { value: settings.uniforms.exponent },
    },
    vertexShader: skyShader.vertexShader,
    fragmentShader: skyShader.fragmentShader,
  };

  return (
    <mesh ref={ref} position={[settings.position.x, settings.position.y, settings.position.z]}>
      <boxBufferGeometry args={[settings.geometry.x, settings.geometry.y, settings.geometry.z]} />
      <shaderMaterial args={[shaderSettings]} />
    </mesh>
  );
};

export default Sky;
