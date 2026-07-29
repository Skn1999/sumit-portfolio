import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Custom Shader for Particle Morphing & Antique Japanese Metallic Coin Shading
const MetallicParticleShader = {
  uniforms: {
    uTexture: { value: null },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uProgress;
    uniform float uTime;
    uniform vec2 uMouse;

    attribute vec3 aStartPosition;
    attribute vec3 aTargetPosition;
    attribute vec2 aUv;
    attribute float aRandom;

    varying vec2 vUv;
    varying float vProgress;
    varying float vRandom;
    varying vec3 vWorldPosition;

    // Simplex 3D noise helper function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j * ns.x);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Smooth cubic ease out
    float cubicEaseOut(float t) {
      float f = t - 1.0;
      return f * f * f + 1.0;
    }

    void main() {
      vUv = aUv;
      vRandom = aRandom;

      // Stagger progress per particle using random seed
      float staggeredProgress = clamp((uProgress - aRandom * 0.25) / 0.75, 0.0, 1.0);
      float easeP = cubicEaseOut(staggeredProgress);
      vProgress = easeP;

      // Noise turbulence during dispersal
      vec3 noise = vec3(
        snoise(aStartPosition + vec3(uTime * 0.2, 0.0, 0.0)),
        snoise(aStartPosition + vec3(0.0, uTime * 0.2, 0.0)),
        snoise(aStartPosition + vec3(0.0, 0.0, uTime * 0.2))
      ) * (1.0 - easeP) * 0.4;

      // Interpolate between floating 3D cloud and 2D target grid
      vec3 currentPos = mix(aStartPosition, aTargetPosition, easeP) + noise;

      // Subtle mouse tilt reaction when fully morphed
      vec2 distMouse = (aTargetPosition.xy - uMouse) * 0.08 * easeP;
      currentPos.z += sin(length(distMouse) * 8.0 - uTime * 2.0) * 0.02 * easeP;

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      vWorldPosition = currentPos;

      // Particle sizing: starts large and soft, shrinks slightly into sharp coin relief
      float pSize = mix(8.0, 3.5, easeP);
      gl_PointSize = pSize * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uProgress;
    uniform float uTime;
    uniform vec2 uMouse;

    varying vec2 vUv;
    varying float vProgress;
    varying float vRandom;
    varying vec3 vWorldPosition;

    void main() {
      // Circular point sprite shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      float distSq = dot(coord, coord);
      if (distSq > 0.25) discard;

      // Soft edge falloff
      float alphaEdge = smoothstep(0.25, 0.05, distSq);

      // Sample base texture
      vec4 texColor = texture2D(uTexture, vUv);
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      // Japanese Antique Coin Color Palette
      // Warm antique bronze/gold highlights with oxidized slate patina shadow
      vec3 antiqueGold = vec3(0.85, 0.68, 0.42);
      vec3 polishedBronze = vec3(0.96, 0.82, 0.58);
      vec3 patinaDark = vec3(0.12, 0.14, 0.16);
      vec3 copperReflect = vec3(0.78, 0.52, 0.35);

      // Height emboss effect based on luminance
      float height = smoothstep(0.1, 0.9, luminance);

      // Metallic base shading
      vec3 metallicColor = mix(patinaDark, antiqueGold, height);

      // Specular metallic sheen based on interactive light vector
      vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0, 1.5));
      vec3 normal = normalize(vec3(
        (luminance - 0.5) * 1.5,
        (luminance - 0.5) * 1.5,
        1.0
      ));
      float spec = pow(max(dot(normal, lightDir), 0.0), 12.0);
      metallicColor += polishedBronze * spec * 0.6;

      // Rim light reflection
      float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);
      metallicColor += copperReflect * pow(rim, 3.0) * 0.4;

      // Blend between initial ambient particle color and final metallic portrait
      vec3 initialParticleColor = mix(vec3(0.4, 0.4, 0.45), antiqueGold, vRandom);
      vec3 finalColor = mix(initialParticleColor, metallicColor, vProgress);

      // Combine opacity
      float alpha = mix(0.7, 0.95, vProgress) * alphaEdge;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

interface ParticleMeshProps {
  imagePath: string;
  mousePos: { x: number; y: number };
}

const ParticleMesh: React.FC<ParticleMeshProps> = ({ imagePath, mousePos }) => {
  const texture = useTexture(imagePath);
  const meshRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Grid dimensions (approx 14,400 particles for high-fidelity portrait detail)
  const cols = 100;
  const rows = 133;
  const count = cols * rows;

  const { startPositions, targetPositions, uvs, randoms } = useMemo(() => {
    const start = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const uvArray = new Float32Array(count * 2);
    const randArray = new Float32Array(count);

    const aspect = 3 / 4;
    const width = 1.8 * aspect;
    const height = 1.8;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Target position on 2D grid matching aspect ratio
      const u = col / (cols - 1);
      const v = 1.0 - row / (rows - 1);
      const tx = (u - 0.5) * width;
      const ty = (v - 0.5) * height;
      const tz = 0;

      target[i * 3] = tx;
      target[i * 3 + 1] = ty;
      target[i * 3 + 2] = tz;

      // Dispersed random 3D position for initial state
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 1.5;

      start[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      start[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      start[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      uvArray[i * 2] = u;
      uvArray[i * 2 + 1] = v;

      randArray[i] = Math.random();
    }

    return {
      startPositions: start,
      targetPositions: target,
      uvs: uvArray,
      randoms: randArray,
    };
  }, [count, cols, rows]);

  // Animate progress on load
  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    // Smoothly increment progress uniform over 2 seconds
    const elapsedTime = clock.getElapsedTime();
    const progress = Math.min(elapsedTime / 1.8, 1.0);

    materialRef.current.uniforms.uProgress.value = progress;
    materialRef.current.uniforms.uTime.value = elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mousePos.x, mousePos.y),
      0.05
    );
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[targetPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aStartPosition"
          args={[startPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aTargetPosition"
          args={[targetPositions, 3]}
        />
        <bufferAttribute attach="attributes-aUv" args={[uvs, 2]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[MetallicParticleShader]}
        uniforms-uTexture-value={texture}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

export const HeroParticleCanvas: React.FC<{ imagePath: string }> = ({
  imagePath,
}) => {
  const reduced = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = -((e.clientY - rect.top) / rect.height - 0.5);
    setMousePos({ x, y });
  };

  // Fallback to static image for reduced motion
  if (reduced || !isLoaded) {
    return (
      <img
        src={imagePath}
        alt="Sumit profile"
        className="w-full h-full object-cover rounded-xl"
      />
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full h-full relative cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full rounded-xl"
      >
        <React.Suspense fallback={null}>
          <ParticleMesh imagePath={imagePath} mousePos={mousePos} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default HeroParticleCanvas;
