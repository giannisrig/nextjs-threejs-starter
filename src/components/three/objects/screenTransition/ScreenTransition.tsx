import { Color, ShaderMaterial, Source, Texture } from "three";
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
  const distortedTexture: Texture | Texture[] = useTexture<string | string[]>("/images/distortion.png");
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

      // gsap.to(material.uniforms.dispFactor, {
      //   value: animate ? 1 : 0,
      //   duration: 1,
      // })
      if (animate) {
        planeMesh.current.visible = true;
        gsap.to(material.uniforms.dispFactor, {
          value: 1,
          duration: 1,
        });
        gsap.to(planeMesh.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
        });
      } else {
        // setTimeout(() => {
        //   planeMesh.current.visible = false;
        // }, 500);

        gsap.to(material.uniforms.dispFactor, {
          value: 0,
          duration: 1,
        });
        gsap.to(planeMesh.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        });
      }
    }
  }, [animate]);

  // Return the Shader Materials Args
  // const shaderArgs = useMemo(() => {
  //   // Set the texture source
  //   if (transparentTexture instanceof Texture) {
  //     // const source: Source = whiteTexture.source;
  //
  //     // The uniforms are used to apply animations to the fragmentShader
  //     return {
  //       uniforms: {
  //         effectFactor: { value: 4.2 },
  //         effectX: { value: 1 },
  //         effectY: { value: 1 },
  //         dispFactor: { value: 0 },
  //         hover: { value: 0 },
  //         mainTexture: { value: whiteTexture },
  //         transparentTexture: { value: transparentTexture },
  //         dispTexture: { value: distortedTexture },
  //         //
  //         uProgress: { value: 0 },
  //         uZoomScale: { value: { x: 1, y: 1 } },
  //         uRes: { value: { x: viewport.width, y: viewport.height } },
  //         uImageRes: {
  //           value: { x: viewport.width, y: viewport.height },
  //         },
  //       },
  //       vertexShader: screenTransitionShader.vertexShader,
  //       fragmentShader: screenTransitionShader.fragmentShader,
  //     };
  //   }
  // }, [distortedTexture, transparentTexture, whiteTexture]);

  // Return the Shader Materials Args
  const shaderArgs = useMemo(() => {
    // Set the texture source
    if (distortedTexture instanceof Texture && viewport.width && viewport.height) {
      // const source: Source = whiteTexture.source;

      return {
        uniforms: {
          effectFactor: { type: "f", value: 1.2 },
          dispFactor: { type: "f", value: 0 },
          texture1: { type: "t", value: transparentTexture },
          texture2: { type: "t", value: whiteTexture },
          disp: { type: "t", value: distortedTexture },
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
        fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;
        uniform float dispFactor;
        uniform float effectFactor;
        void main() {
          vec2 uv = vUv;
          vec4 disp = texture2D(disp, uv);
          vec2 distortedPosition = vec2(uv.x, uv.y + dispFactor * (disp.r*effectFactor));
          vec2 distortedPosition2 = vec2(uv.x, uv.y - (1.0 - dispFactor) * (disp.r*effectFactor));
          vec4 _texture1 = texture2D(texture1, distortedPosition);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);
          vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
          gl_FragColor = finalTexture;
        }`,
      };
    }
  }, [distortedTexture, transparentTexture, viewport.height, viewport.width, whiteTexture]);

  return (
    <mesh ref={planeMesh} visible={false}>
      <planeGeometry args={[150, 50]} />
      <shaderMaterial attach="material" args={[shaderArgs]} />
    </mesh>
  );
};

export default ScreenTransition;
