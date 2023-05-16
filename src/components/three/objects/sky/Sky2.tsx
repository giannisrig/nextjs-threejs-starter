import { BackSide, UniformsUtils, Vector3, Matrix4, Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SkyShader = {
  uniforms: {
    turbidity: { value: 0.2 },
    rayleigh: { value: 0.8 },
    mieCoefficient: { value: 0.005 },
    mieDirectionalG: { value: 0.08 },
    sunPosition: { value: new Vector3(-1000, 80, -1500) },
    up: { value: new Vector3(0, 1, 0) },
  },

  vertexShader: /* glsl */ `
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		// const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );
		const vec3 totalRayleigh = vec3( 8.804542996261093E-6, 1.3562911419845635E-5, 5.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		// const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );
    const vec3 MieConst = vec3( 5.8399918514433978E14, 2.7798023919660528E14, 1.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,

  fragmentShader: /* glsl */ `
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPos );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 1.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

		}`,
};

// https://github.com/shff/opengl_sky/blob/master/main.c
const SkyShader2 = {
  uniforms: {
    time: { value: 0.0 },
    cirrus: { value: 0.4 },
    cumulus: { value: 0.8 },
    P: { value: new Matrix4([]) },
    V: { value: new Matrix4([]) },
  },

  // uniform float time = 0.0;
  // uniform float cirrus = 0.4;
  // uniform float cumulus = 0.8;
  // uniform mat4 P;
  // uniform mat4 V;

  vertexShader: /* glsl */ `
    out vec3 pos;
    out vec3 fsun;
    uniform mat4 P;
    uniform mat4 V;
    uniform float time;
    
    const vec2 data[4] = vec2[](
      vec2(-1.0,  1.0), vec2(-1.0, -1.0),
      vec2( 1.0,  1.0), vec2( 1.0, -1.0));
    
    void main()
    {
      gl_Position = vec4(data[gl_VertexID], 0.0, 1.0);
      pos = transpose(mat3(V)) * (inverse(P) * gl_Position).xyz;
      fsun = vec3(0.0, sin(time * 0.01), cos(time * 0.01));
    }	
  `,

  fragmentShader: /* glsl */ `
		in vec3 pos;
    in vec3 fsun;
    // out vec4 color;
    layout(location = 0) out vec4 color;
    uniform float time;
    uniform float cirrus;
    uniform float cumulus;
  
    const float Br = 0.0025;
    const float Bm = 0.0003;
    const float g =  0.9800;
    const vec3 nitrogen = vec3(0.650, 0.570, 0.475);
    const vec3 Kr = Br / pow(nitrogen, vec3(4.0));
    const vec3 Km = Bm / pow(nitrogen, vec3(0.84));
  
    float hash(float n)
    {
      return fract(sin(n) * 43758.5453123);
    }
  
    float noise(vec3 x)
    {
      vec3 f = fract(x);
      float n = dot(floor(x), vec3(1.0, 157.0, 113.0));
      return mix(mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
                     mix(hash(n + 157.0), hash(n + 158.0), f.x), f.y),
                 mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                     mix(hash(n + 270.0), hash(n + 271.0), f.x), f.y), f.z);
    }
  
    const mat3 m = mat3(0.0, 1.60,  1.20, -1.6, 0.72, -0.96, -1.2, -0.96, 1.28);
    float fbm(vec3 p)
    {
      float f = 0.0;
      f += noise(p) / 2.0; p = m * p * 1.1;
      f += noise(p) / 4.0; p = m * p * 1.2;
      f += noise(p) / 6.0; p = m * p * 1.3;
      f += noise(p) / 12.0; p = m * p * 1.4;
      f += noise(p) / 24.0;
      return f;
    }
  
    void main()
    {
      if (pos.y < 0.0)
        discard;
  
      // Atmosphere Scattering
      float mu = dot(normalize(pos), normalize(fsun));
      float rayleigh = 1.0 / (8.0 * 3.14) * (1.0 + mu * mu);
      vec3 mie = (Kr + Km * (1.0 - g * g) / (2.0 + g * g) / pow(1.0 + g * g - 2.0 * g * mu, 1.5)) / (Br + Bm);
  
      vec3 day_extinction = exp(-exp(-((pos.y + fsun.y * 4.0) * (exp(-pos.y * 16.0) + 0.1) / 80.0) / Br) * (exp(-pos.y * 16.0) + 0.1) * Kr / Br) * exp(-pos.y * exp(-pos.y * 8.0 ) * 4.0) * exp(-pos.y * 2.0) * 4.0;
      vec3 night_extinction = vec3(1.0 - exp(fsun.y)) * 0.2;
      vec3 extinction = mix(day_extinction, night_extinction, -fsun.y * 0.2 + 0.5);
      color.rgb = rayleigh * mie * extinction;
  
      // Cirrus Clouds
      float density = smoothstep(1.0 - cirrus, 1.0, fbm(pos.xyz / pos.y * 2.0 + time * 0.05)) * 0.3;
      color.rgb = mix(color.rgb, extinction * 4.0, density * max(pos.y, 0.0));
  
      // Cumulus Clouds
      for (int i = 0; i < 3; i++)
      {
        float density = smoothstep(1.0 - cumulus, 1.0, fbm((0.7 + float(i) * 0.01) * pos.xyz / pos.y + time * 0.3));
        color.rgb = mix(color.rgb, extinction * density * 5.0, min(density, 1.0) * max(pos.y, 0.0));
      }
  
      // Dithering Noise
      color.rgb += noise(pos * 1000.0) * 0.01;
      
    }
		`,
};
function Sky2() {
  const ref = useRef<Mesh>();

  useFrame((state, delta) => {
    // ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 3;
    // ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
    // ref.current.material.uniforms.rayleigh.value += 0.01 + Math.sin(state.clock.elapsedTime);
    // ref.current.material.uniforms.sunPosition.value = new Vector3(500, 150, Math.abs(Math.sin(state.clock.elapsedTime)) * 3, 0);
  });

  const skyShaderMaterialArgs = {
    name: "SkyShader",
    fragmentShader: SkyShader.fragmentShader,
    vertexShader: SkyShader.vertexShader,
    uniforms: UniformsUtils.clone(SkyShader.uniforms),
    side: 2,
    depthWrite: false,
    isSky: true,
    // glslVersion: THREE.GLSL3,
  };

  return (
    <mesh ref={ref} position={[0, -300, 0]}>
      <boxBufferGeometry args={[1000, 1000, 2000]} />
      <shaderMaterial args={[skyShaderMaterialArgs]} />
      {/*<meshStandardMaterial color="hotpink" attach={"material"} />*/}
    </mesh>
  );
}

export default Sky2;
