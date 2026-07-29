import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Custom Shader for Particle Morphing
const ParticleMorphShader = {
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

    float cubicEaseOut(float t) {
      float f = t - 1.0;
      return f * f * f + 1.0;
    }

    void main() {
      vUv = aUv;
      vRandom = aRandom;

      // Stagger morph progress per particle
      float staggeredProgress = clamp((uProgress - aRandom * 0.25) / 0.75, 0.0, 1.0);
      float easeP = cubicEaseOut(staggeredProgress);
      vProgress = easeP;

      // Swirling noise during dispersal phase
      vec3 noise = vec3(
        sin(aStartPosition.y * 4.0 + uTime * 1.5) * 0.15,
        cos(aStartPosition.x * 4.0 + uTime * 1.5) * 0.15,
        sin(aStartPosition.z * 4.0 + uTime * 1.5) * 0.15
      ) * (1.0 - easeP);

      vec3 currentPos = mix(aStartPosition, aTargetPosition, easeP) + noise;

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);

      // Particle size expands slightly as they settle to form a continuous grid
      float pSize = mix(8.0, 4.5, easeP);
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

    void main() {
      // Circular point sprite shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (dot(coord, coord) > 0.25) discard;

      // Sample actual image texture at particle UV
      vec4 texColor = texture2D(uTexture, vUv);
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      // Japanese Antique Coin Gold/Bronze Palette
      vec3 antiqueGold = vec3(0.88, 0.72, 0.45);
      vec3 polishedBronze = vec3(0.98, 0.85, 0.60);
      vec3 copperReflect = vec3(0.80, 0.55, 0.38);

      // Height map & normal for metallic relief
      vec3 normal = normalize(vec3((luminance - 0.5) * 1.2, (luminance - 0.5) * 1.2, 1.0));
      vec3 lightDir = normalize(vec3(uMouse.x * 2.5, uMouse.y * 2.5, 1.8));
      float spec = pow(max(dot(normal, lightDir), 0.0), 16.0);
      float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);

      // Metallic sheen overlay
      vec3 metallicShine = antiqueGold * (0.6 + 0.4 * luminance) + polishedBronze * spec * 0.6 + copperReflect * pow(rim, 2.5) * 0.3;
      vec3 styledColor = mix(texColor.rgb, metallicShine, 0.4);

      // Initial particle color fading into actual image color
      vec3 initialParticleColor = mix(antiqueGold, vec3(0.3, 0.3, 0.35), vRandom);
      vec3 finalColor = mix(initialParticleColor, styledColor, vProgress);

      // Opacity fades out smoothly at end of morph as solid plane takes over
      float particleAlpha = texColor.a * (1.0 - smoothstep(0.85, 1.0, uProgress));

      gl_FragColor = vec4(finalColor, particleAlpha);
    }
  `,
};

// Custom Shader for Solidified Final Image & Metallic Coin Effect
const SolidifiedImageShader = {
  uniforms: {
    uTexture: { value: null },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uProgress;
    uniform float uTime;
    uniform vec2 uMouse;

    varying vec2 vUv;

    void main() {
      // Sample high-res original image
      vec4 texColor = texture2D(uTexture, vUv);
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      // Japanese Antique Coin Palette
      vec3 antiqueGold = vec3(0.88, 0.72, 0.45);
      vec3 polishedBronze = vec3(0.98, 0.85, 0.60);
      vec3 copperReflect = vec3(0.80, 0.55, 0.38);

      // Normal reconstruction for metallic sheen
      vec3 normal = normalize(vec3((luminance - 0.5) * 1.5, (luminance - 0.5) * 1.5, 1.0));
      vec3 lightDir = normalize(vec3(uMouse.x * 2.5, uMouse.y * 2.5, 1.8));
      float spec = pow(max(dot(normal, lightDir), 0.0), 16.0);
      float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);

      // Metallic sheen overlay on actual photo
      vec3 metallicShine = antiqueGold * (0.6 + 0.4 * luminance) + polishedBronze * spec * 0.7 + copperReflect * pow(rim, 2.5) * 0.35;
      vec3 finalColor = mix(texColor.rgb, metallicShine, 0.35);

      // Fade in solid mesh when uProgress reaches 0.7 -> 1.0
      float solidAlpha = texColor.a * smoothstep(0.7, 1.0, uProgress);

      gl_FragColor = vec4(finalColor, solidAlpha);
    }
  `,
};

interface SceneContentProps {
  imagePath: string;
  mousePos: { x: number; y: number };
}

const SceneContent: React.FC<SceneContentProps> = ({ imagePath, mousePos }) => {
  const texture = useTexture(imagePath);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  const solidMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  // Particle Grid: 110 x 146 = 16,060 particles
  const cols = 110;
  const rows = 146;
  const count = cols * rows;

  const { startPositions, targetPositions, uvs, randoms } = useMemo(() => {
    const start = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const uvArray = new Float32Array(count * 2);
    const randArray = new Float32Array(count);

    const aspect = 3 / 4;
    const width = 1.85 * aspect;
    const height = 1.85;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const u = col / (cols - 1);
      const v = 1.0 - row / (rows - 1);
      const tx = (u - 0.5) * width;
      const ty = (v - 0.5) * height;

      target[i * 3] = tx;
      target[i * 3 + 1] = ty;
      target[i * 3 + 2] = 0;

      // Random initial 3D cloud
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.4 + Math.random() * 1.6;

      start[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      start[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      start[i * 3 + 2] = (Math.random() - 0.5) * 2.2;

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

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Morph duration: 2.0 seconds
    const progress = Math.min(elapsedTime / 2.0, 1.0);

    const targetMouse = new THREE.Vector2(mousePos.x, mousePos.y);

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uProgress.value = progress;
      particleMaterialRef.current.uniforms.uTime.value = elapsedTime;
      particleMaterialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.05);
    }

    if (solidMaterialRef.current) {
      solidMaterialRef.current.uniforms.uProgress.value = progress;
      solidMaterialRef.current.uniforms.uTime.value = elapsedTime;
      solidMaterialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.05);
    }
  });

  const aspect = 3 / 4;
  const planeWidth = 1.85 * aspect;
  const planeHeight = 1.85;

  return (
    <group>
      {/* 1. Morphing Particles (Active during start -> morph transition) */}
      <points>
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
          ref={particleMaterialRef}
          args={[ParticleMorphShader]}
          uniforms-uTexture-value={texture}
          transparent
          depthWrite={false}
        />
      </points>

      {/* 2. Solidified Image Mesh (Fades in to 100% solid photo + metallic sheen at animation end) */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
        <shaderMaterial
          ref={solidMaterialRef}
          args={[SolidifiedImageShader]}
          uniforms-uTexture-value={texture}
          transparent
          depthWrite
        />
      </mesh>
    </group>
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
      className="w-full h-full relative cursor-pointer overflow-hidden rounded-xl"
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full rounded-xl"
      >
        <React.Suspense fallback={null}>
          <SceneContent imagePath={imagePath} mousePos={mousePos} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default HeroParticleCanvas;
