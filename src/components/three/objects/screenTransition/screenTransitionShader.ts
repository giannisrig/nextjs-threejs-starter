import { Object3DShader } from "@/types/three";

const screenTransitionShader: Object3DShader = {
  vertexShader: `
    varying vec2 vUv;
    uniform vec2 uRes;
    uniform vec2 uImageRes;
    
    vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
      float rs = s.x / s.y; // Aspect screen size
      float ri = i.x / i.y; // Aspect image size
      vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
      vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
      return u * s / st + o;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    
    varying vec2 vUv;
    uniform sampler2D distortedTexture;
    uniform vec3 solidColor;
    uniform float dispFactor;
    uniform vec2 uRes;
    uniform vec2 uImageRes;

    vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
      float rs = s.x / s.y; // Aspect screen size
      float ri = i.x / i.y; // Aspect image size
      vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
      vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
      return u * s / st + o;
    }

    void main() {
      vec2 uv = CoverUV(vUv, uRes, uImageRes);

      // Get the distorted texture coordinates
      vec2 distortedUV = texture(distortedTexture, uv).xy;
      
      // Mix between the transparent vector and solid white vector based on progress
      vec4 transparentVec = vec4(0.0, 0.0, 0.0, 0.0);
      vec4 solidVec = vec4(solidColor, 1.0);
      vec4 mixedVec = mix(transparentVec, solidVec, dispFactor);
      
      vec3 distortedText = texture2D(distortedTexture, distortedUV).rgb;
      vec4 distortedVec = vec4(distortedText, 1.0);
      
      vec4 mixedDistortedVec = mix(distortedVec, mixedVec, dispFactor);
      
      // Apply the distortion effect
      // vec4 finalColor = texture2D(distortedTexture, uv) * mixedDistortedVec;
      vec4 finalColor = mixedDistortedVec;
      
      gl_FragColor = finalColor;
    }
  `,
};

export default screenTransitionShader;
