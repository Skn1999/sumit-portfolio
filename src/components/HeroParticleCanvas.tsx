import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";
import { useNavIntent } from "@/contexts/NavIntentContext";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CategoryKey = "hero" | "ux-design" | "visual-design" | "writings";

function getCategoryKey(path: string | null): CategoryKey {
  if (!path) return "hero";
  if (path.startsWith("/ux-design") || path.startsWith("/projects")) return "ux-design";
  if (path.startsWith("/visual-design")) return "visual-design";
  if (path.startsWith("/writings") || path.startsWith("/ux-bites")) return "writings";
  return "hero";
}

function categoryToIndex(cat: CategoryKey): number {
  switch (cat) {
    case "hero": return 0;
    case "ux-design": return 1;
    case "visual-design": return 2;
    case "writings": return 3;
  }
}

/* ── High-Precision Vector THREE.Shape Generators ── */

// 1. Hero Grid (Profile Photo)
function generateHeroGrid(count: number, cols: number, rows: number) {
  const positions = new Float32Array(count * 3);
  const uvs = new Float32Array(count * 2);
  const isOutline = new Float32Array(count);

  const aspect = 3 / 4;
  const width = 1.8 * aspect;
  const height = 1.8;

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const u = col / (cols - 1);
    const v = 1.0 - row / (rows - 1);

    positions[i * 3] = (u - 0.5) * width;
    positions[i * 3 + 1] = (v - 0.5) * height;
    positions[i * 3 + 2] = 0;

    uvs[i * 2] = u;
    uvs[i * 2 + 1] = v;

    // Edge boundary marked as outline
    isOutline[i] = (col === 0 || col === cols - 1 || row === 0 || row === rows - 1) ? 1.0 : 0.0;
  }
  return { positions, uvs, isOutline };
}

// 2. UX Design: 👆🏻 Pointing Hand Vector Shape
function generatePointingHandShape(count: number) {
  const positions = new Float32Array(count * 3);
  const isOutline = new Float32Array(count);

  // Construct precise 2D vector path for pointing hand
  const shape = new THREE.Shape();
  // Extended Index Finger
  shape.moveTo(-0.06, 0.72);
  shape.absarc(0.0, 0.72, 0.06, Math.PI, 0, true);
  shape.lineTo(0.06, 0.1);
  // Folded Middle Finger
  shape.absarc(0.14, 0.1, 0.08, Math.PI, 0, true);
  shape.lineTo(0.22, -0.15);
  // Folded Ring Finger
  shape.absarc(0.28, -0.15, 0.07, Math.PI, 0, true);
  shape.lineTo(0.35, -0.38);
  // Folded Pinky Finger
  shape.absarc(0.40, -0.38, 0.06, Math.PI, 0, true);
  shape.lineTo(0.44, -0.62);
  // Wrist & Base
  shape.bezierCurveTo(0.38, -0.85, -0.22, -0.85, -0.32, -0.62);
  // Thumb Contour
  shape.bezierCurveTo(-0.38, -0.32, -0.26, 0.0, -0.16, 0.12);
  shape.lineTo(-0.06, 0.1);
  shape.closePath();

  const numOutline = Math.floor(count * 0.25);
  const outlinePoints = shape.getSpacedPoints(numOutline);

  for (let i = 0; i < count; i++) {
    if (i < outlinePoints.length) {
      // Razor-sharp outline points along vector contour
      const pt = outlinePoints[i];
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      isOutline[i] = 1.0;
    } else {
      // Interior fill points
      const rx = -0.35 + Math.random() * 0.8;
      const ry = -0.8 + Math.random() * 1.5;
      positions[i * 3] = rx * 0.65;
      positions[i * 3 + 1] = ry * 0.65;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      isOutline[i] = 0.0;
    }
  }
  return { positions, isOutline };
}

// 3. Visual Design: 📺 Display Screen Vector Shape
function generateTVScreenShape(count: number) {
  const positions = new Float32Array(count * 3);
  const isOutline = new Float32Array(count);

  const shape = new THREE.Shape();
  const w = 0.9, h = 0.65, r = 0.08;
  shape.moveTo(-w / 2 + r, h / 2);
  shape.lineTo(w / 2 - r, h / 2);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - r);
  shape.lineTo(w / 2, -h / 2 + r);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2 - r, -h / 2);
  shape.lineTo(-w / 2 + r, -h / 2);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2, -h / 2 + r);
  shape.lineTo(-w / 2, h / 2 - r);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2 + r, h / 2);
  shape.closePath();

  const numOutline = Math.floor(count * 0.25);
  const outlinePoints = shape.getSpacedPoints(numOutline);

  for (let i = 0; i < count; i++) {
    if (i < outlinePoints.length) {
      const pt = outlinePoints[i];
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y + 0.08;
      positions[i * 3 + 2] = 0;
      isOutline[i] = 1.0;
    } else {
      const u = (Math.random() - 0.5) * (w - 0.05);
      const v = 0.08 + (Math.random() - 0.5) * (h - 0.05);
      positions[i * 3] = u;
      positions[i * 3 + 1] = v;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
      isOutline[i] = 0.0;
    }
  }
  return { positions, isOutline };
}

// 4. Writings: 📝 Memo Document Vector Shape
function generateMemoDocShape(count: number) {
  const positions = new Float32Array(count * 3);
  const isOutline = new Float32Array(count);

  const shape = new THREE.Shape();
  const pw = 0.72, ph = 0.95;
  shape.moveTo(-pw / 2, ph / 2);
  shape.lineTo(pw / 2 - 0.2, ph / 2);
  shape.lineTo(pw / 2, ph / 2 - 0.2);
  shape.lineTo(pw / 2, -ph / 2);
  shape.lineTo(-pw / 2, -ph / 2);
  shape.closePath();

  const numOutline = Math.floor(count * 0.25);
  const outlinePoints = shape.getSpacedPoints(numOutline);

  for (let i = 0; i < count; i++) {
    if (i < outlinePoints.length) {
      const pt = outlinePoints[i];
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = 0;
      isOutline[i] = 1.0;
    } else {
      const u = (Math.random() - 0.5) * (pw - 0.04);
      const v = (Math.random() - 0.5) * (ph - 0.04);
      positions[i * 3] = u;
      positions[i * 3 + 1] = v;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
      isOutline[i] = 0.0;
    }
  }
  return { positions, isOutline };
}

/* ── Shader Material ── */
const MultiCategoryParticleShader = {
  uniforms: {
    uTexture: { value: null },
    uCurrentIndex: { value: 0 },
    uTargetIndex: { value: 0 },
    uMorphProgress: { value: 1.0 },
    uIsHovering: { value: 0.0 },
    uSolidifyProgress: { value: 1.0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uMorphProgress;
    uniform float uIsHovering;
    uniform float uSolidifyProgress;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform int uCurrentIndex;
    uniform int uTargetIndex;

    attribute vec3 aPosHero;
    attribute vec3 aPosUX;
    attribute vec3 aPosVisual;
    attribute vec3 aPosWritings;
    attribute vec2 aUv;
    attribute float aRandom;
    attribute float aIsOutline;

    varying vec2 vUv;
    varying float vRandom;
    varying float vIsOutline;
    varying float vMorphProgress;

    vec3 getPosForIndex(int idx) {
      if (idx == 1) return aPosUX;
      if (idx == 2) return aPosVisual;
      if (idx == 3) return aPosWritings;
      return aPosHero;
    }

    float cubicEaseOut(float t) {
      float f = t - 1.0;
      return f * f * f + 1.0;
    }

    void main() {
      vUv = aUv;
      vRandom = aRandom;
      vIsOutline = aIsOutline;

      float staggeredP = clamp((uMorphProgress - aRandom * 0.25) / 0.75, 0.0, 1.0);
      float easeP = cubicEaseOut(staggeredP);
      vMorphProgress = easeP;

      vec3 startP = getPosForIndex(uCurrentIndex);
      vec3 targetP = getPosForIndex(uTargetIndex);

      // Swirling noise during morphing transition
      vec3 noise = vec3(
        sin(startP.y * 5.0 + uTime * 2.0) * 0.12,
        cos(startP.x * 5.0 + uTime * 2.0) * 0.12,
        sin(startP.z * 5.0 + uTime * 2.0) * 0.12
      ) * (1.0 - easeP);

      vec3 currentPos = mix(startP, targetP, easeP) + noise;
      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);

      // Size calculation: glowing outline particles pop larger when hovering
      float baseSize = mix(8.0, 5.0, easeP);
      if (uIsHovering > 0.5 && aIsOutline > 0.5) {
        baseSize += 3.5;
      }

      gl_PointSize = baseSize * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uMorphProgress;
    uniform float uIsHovering;
    uniform float uSolidifyProgress;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform int uTargetIndex;

    varying vec2 vUv;
    varying float vRandom;
    varying float vIsOutline;
    varying float vMorphProgress;

    void main() {
      // Circular point sprite mask
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (dot(coord, coord) > 0.25) discard;

      float alphaEdge = smoothstep(0.25, 0.05, dot(coord, coord));

      vec3 finalColor = vec3(1.0);
      float finalAlpha = 1.0;

      if (uTargetIndex == 0) {
        // Hero Photo + Japanese Antique Coin Shader
        vec4 texColor = texture2D(uTexture, vUv);
        float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

        vec3 antiqueGold = vec3(0.88, 0.72, 0.45);
        vec3 polishedBronze = vec3(0.98, 0.85, 0.60);
        vec3 copperReflect = vec3(0.80, 0.55, 0.38);

        vec3 normal = normalize(vec3((luminance - 0.5) * 1.2, (luminance - 0.5) * 1.2, 1.0));
        vec3 lightDir = normalize(vec3(uMouse.x * 2.5, uMouse.y * 2.5, 1.8));
        float spec = pow(max(dot(normal, lightDir), 0.0), 16.0);
        float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);

        vec3 metallicShine = antiqueGold * (0.6 + 0.4 * luminance) + polishedBronze * spec * 0.6 + copperReflect * pow(rim, 2.5) * 0.3;
        finalColor = mix(texColor.rgb, metallicShine, 0.4);
        finalAlpha = texColor.a;
      } else {
        // Apple Glass UI Translucent Spheres for 👆🏻, 📺, 📝
        vec3 glassBody = vec3(0.85, 0.92, 0.98);
        vec3 goldAccent = vec3(0.95, 0.82, 0.50);
        vec3 cyanGlow = vec3(0.40, 0.85, 0.95);

        vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0, 1.5));
        float spec = pow(max(dot(vec3(0.0, 0.0, 1.0), lightDir), 0.0), 12.0);

        finalColor = mix(glassBody, goldAccent, vRandom * 0.5) + cyanGlow * spec * 0.8;
        finalAlpha = mix(0.65, 0.95, uSolidifyProgress);
      }

      // OUTLINE HOVER MODE (When user hovers on header item)
      if (uIsHovering > 0.5) {
        if (vIsOutline > 0.5) {
          // Outline particles glow brightly to outline intended target shape
          finalColor = mix(finalColor, vec3(0.98, 0.85, 0.55), 0.75);
          finalAlpha = 0.95;
        } else {
          // Fill particles dim to reveal wireframe outline
          finalAlpha = 0.12;
        }
      }

      float alpha = finalAlpha * alphaEdge;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

// Solid Plane Shader for Hero Photo
const SolidHeroShader = {
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
    uniform float uMouse;

    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      vec3 antiqueGold = vec3(0.88, 0.72, 0.45);
      vec3 polishedBronze = vec3(0.98, 0.85, 0.60);
      vec3 copperReflect = vec3(0.80, 0.55, 0.38);

      vec3 normal = normalize(vec3((luminance - 0.5) * 1.5, (luminance - 0.5) * 1.5, 1.0));
      vec3 lightDir = normalize(vec3(uMouse.x * 2.5, uMouse.y * 2.5, 1.8));
      float spec = pow(max(dot(normal, lightDir), 0.0), 16.0);
      float rim = 1.0 - max(dot(vec3(0.0, 0.0, 1.0), normal), 0.0);

      vec3 metallicShine = antiqueGold * (0.6 + 0.4 * luminance) + polishedBronze * spec * 0.7 + copperReflect * pow(rim, 2.5) * 0.35;
      vec3 finalColor = mix(texColor.rgb, metallicShine, 0.35);

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
  const location = useLocation();
  const { intendedRoute } = useNavIntent();

  const activeCategory = getCategoryKey(location.pathname);
  const intendedCategory = intendedRoute ? getCategoryKey(intendedRoute) : activeCategory;
  const isHovering = intendedRoute !== null;

  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  const solidMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  const prevCategoryRef = useRef<CategoryKey>(activeCategory);
  const morphProgressRef = useRef<number>(1.0);
  const solidifyProgressRef = useRef<number>(1.0);

  const cols = 110;
  const rows = 146;
  const count = cols * rows;

  // Pre-generate all 4 target shape point buffers with high-precision vector shapes
  const { posHero, uvs, posUX, posVisual, posWritings, isOutline, randoms } = useMemo(() => {
    const hero = generateHeroGrid(count, cols, rows);
    const ux = generatePointingHandShape(count);
    const vis = generateTVScreenShape(count);
    const wr = generateMemoDocShape(count);

    const randArray = new Float32Array(count);
    for (let i = 0; i < count; i++) randArray[i] = Math.random();

    return {
      posHero: hero.positions,
      uvs: hero.uvs,
      posUX: ux.positions,
      posVisual: vis.positions,
      posWritings: wr.positions,
      isOutline: ux.isOutline,
      randoms: randArray,
    };
  }, [count, cols, rows]);

  useEffect(() => {
    if (intendedCategory !== prevCategoryRef.current) {
      morphProgressRef.current = 0.0;
    }
  }, [intendedCategory]);

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const targetMouse = new THREE.Vector2(mousePos.x, mousePos.y);

    if (morphProgressRef.current < 1.0) {
      morphProgressRef.current = Math.min(morphProgressRef.current + delta / 1.2, 1.0);
    } else {
      prevCategoryRef.current = intendedCategory;
    }

    const targetSolidify = isHovering ? 0.0 : 1.0;
    solidifyProgressRef.current += (targetSolidify - solidifyProgressRef.current) * Math.min(delta * 5.0, 1.0);

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uCurrentIndex.value = categoryToIndex(prevCategoryRef.current);
      particleMaterialRef.current.uniforms.uTargetIndex.value = categoryToIndex(intendedCategory);
      particleMaterialRef.current.uniforms.uMorphProgress.value = morphProgressRef.current;
      particleMaterialRef.current.uniforms.uIsHovering.value = isHovering ? 1.0 : 0.0;
      particleMaterialRef.current.uniforms.uSolidifyProgress.value = solidifyProgressRef.current;
      particleMaterialRef.current.uniforms.uTime.value = elapsedTime;
      particleMaterialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.08);
    }

    if (solidMaterialRef.current) {
      const showSolidPlane = activeCategory === "hero" && !isHovering;
      solidMaterialRef.current.uniforms.uProgress.value = showSolidPlane ? solidifyProgressRef.current : 0.0;
      solidMaterialRef.current.uniforms.uTime.value = elapsedTime;
      solidMaterialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.08);
    }
  });

  const aspect = 3 / 4;
  const planeWidth = 1.8 * aspect;
  const planeHeight = 1.8;

  return (
    <group>
      {/* 1. Multi-Category Morphing Vector Glass & Metallic Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posHero, 3]} />
          <bufferAttribute attach="attributes-aPosHero" args={[posHero, 3]} />
          <bufferAttribute attach="attributes-aPosUX" args={[posUX, 3]} />
          <bufferAttribute attach="attributes-aPosVisual" args={[posVisual, 3]} />
          <bufferAttribute attach="attributes-aPosWritings" args={[posWritings, 3]} />
          <bufferAttribute attach="attributes-aUv" args={[uvs, 2]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
          <bufferAttribute attach="attributes-aIsOutline" args={[isOutline, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={particleMaterialRef}
          args={[MultiCategoryParticleShader]}
          uniforms-uTexture-value={texture}
          transparent
          depthWrite={false}
        />
      </points>

      {/* 2. Solidified Image Mesh (Only for Hero Photo on Homepage when not hovering) */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
        <shaderMaterial
          ref={solidMaterialRef}
          args={[SolidHeroShader]}
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
