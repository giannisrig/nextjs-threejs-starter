import { Mesh } from "three";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Define the sky shader
const skyShader = {
  name: "SkyNewShader",
  side: 1,
  uniforms: {
    topColor: { value: new THREE.Color(0x65a0b3) },
    middleColor: { value: new THREE.Color(0xfee592) },
    bottomColor: { value: new THREE.Color(0xe09d86) },
    offset: { value: 400 },
    exponent: { value: 0.6 },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition + offset).y;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
    }
  `,
};

const Sky = () => {
  const ref = useRef<Mesh>();

  useFrame((state, delta) => {
    // ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 3;
    // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
    // ref.current.material.uniforms.rayleigh.value += 0.01 + Math.sin(state.clock.elapsedTime);
    // ref.current.material.uniforms.sunPosition.value = new Vector3(500, 150, Math.abs(Math.sin(state.clock.elapsedTime)) * 3, 0);
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxBufferGeometry args={[1000, 1000, 1000]} />
      <shaderMaterial args={[skyShader]} />
      {/*<meshStandardMaterial color="hotpink" attach={"material"} />*/}
    </mesh>
  );
};

export default Sky;
