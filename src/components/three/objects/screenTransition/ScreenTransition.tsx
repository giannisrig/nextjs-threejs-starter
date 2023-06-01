import { ShaderMaterial, Source, Texture } from "three";
import { useTexture } from "@react-three/drei";
import screenTransitionShader from "./screenTransitionShader";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import gsap from "gsap";

const ScreenTransition = () => {
  // Define the ref element for the current Plane
  const planeMesh = useRef(null);

  // Get the viewport:Size from ThreeJs
  const { viewport } = useThree();

  // Load our global Textures that will be used in all carousel items
  const transparentTexture: Texture | Texture[] = useTexture<string | string[]>("/images/transparent.png");
  const distortedTexture: Texture | Texture[] = useTexture<string | string[]>("/images/waternormals.jpg");
  const whiteTexture: Texture | Texture[] = useTexture<string | string[]>("/images/white.jpg");

  const { animate } = useControls(
    "Screen Transition",
    {
      animate: { value: false },
      // position: { value: [0, -310, 0], step: 0.5 },
      // scale: { value: 3, step: 1, min: 1, max: 50 },
      // rotation: { value: [0, 0, 0], step: 0.5 },
    },
    {
      collapsed: true,
    }
  );

  // This code runs when the carousel item is on the edge of the screen
  useEffect(() => {
    // Make sure our current mesh is not null
    if (planeMesh.current) {
      // Get the Shader Material of the current plane mesh
      const material: ShaderMaterial = planeMesh.current.material;

      console.log("Should do animate", animate);

      gsap.to(material.uniforms.dispFactor, {
        value: animate ? 1 : 0,
      });
    }
  }, [animate]);

  // Return the Shader Materials Args
  const shaderArgs = useMemo(() => {
    // Set the texture source
    if (transparentTexture instanceof Texture) {
      // const source: Source = whiteTexture.source;

      // The uniforms are used to apply animations to the fragmentShader
      return {
        uniforms: {
          effectFactor: { value: 4.2 },
          effectX: { value: 1 },
          effectY: { value: 1 },
          dispFactor: { value: 0 },
          hover: { value: 0 },
          mainTexture: { value: whiteTexture },
          transparentTexture: { value: transparentTexture },
          dispTexture: { value: distortedTexture },
          //
          uProgress: { value: 0 },
          uZoomScale: { value: { x: 1, y: 1 } },
          uRes: { value: { x: viewport.width, y: viewport.height } },
          uImageRes: {
            value: { x: viewport.width, y: viewport.height },
          },
        },
        vertexShader: screenTransitionShader.vertexShader,
        fragmentShader: screenTransitionShader.fragmentShader,
      };
    }
  }, [distortedTexture, transparentTexture, whiteTexture]);

  return (
    <mesh ref={planeMesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default ScreenTransition;
