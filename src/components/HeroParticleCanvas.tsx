import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
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

    isOutline[i] = (col === 0 || col === cols - 1 || row === 0 || row === rows - 1) ? 1.0 : 0.0;
  }
  return { positions, uvs, isOutline };
}

// 2. 3D GLTF Mesh Surface Point Sampler
function samplePointsFromGLTFScene(scene: THREE.Object3D, count: number) {
  const positions = new Float32Array(count * 3);
  const isOutline = new Float32Array(count);

  const meshes: THREE.Mesh[] = [];
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
      meshes.push(child as THREE.Mesh);
    }
  });

  if (meshes.length === 0) {
    return { positions, isOutline };
  }

  let targetMesh = meshes[0];
  for (const m of meshes) {
    if (m.geometry.attributes.position.count > targetMesh.geometry.attributes.position.count) {
      targetMesh = m;
    }
  }

  targetMesh.geometry.computeBoundingBox();
  const box = targetMesh.geometry.boundingBox || new THREE.Box3();
  const center = new THREE.Vector3();
  box.getCenter(center);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
  const scale = 1.4 / maxDim;

  try {
    const sampler = new MeshSurfaceSampler(targetMesh).build();
    const tempPos = new THREE.Vector3();
    const tempNorm = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPos, tempNorm);
      tempPos.sub(center).multiplyScalar(scale);

      positions[i * 3] = tempPos.x;
      positions[i * 3 + 1] = tempPos.y;
      positions[i * 3 + 2] = tempPos.z;

      const dotZ = Math.abs(tempNorm.z);
      isOutline[i] = (dotZ < 0.35 || i % 3 === 0) ? 1.0 : 0.0;
    }
  } catch (e) {
    console.warn("MeshSurfaceSampler fallback:", e);
    const posAttr = targetMesh.geometry.attributes.position;
    const vCount = posAttr.count;
    for (let i = 0; i < count; i++) {
      const idx = i % vCount;
      const x = (posAttr.getX(idx) - center.x) * scale;
      const y = (posAttr.getY(idx) - center.y) * scale;
      const z = (posAttr.getZ(idx) - center.z) * scale;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      isOutline[i] = (i % 3 === 0) ? 1.0 : 0.0;
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

      vec3 noise = vec3(
        sin(startP.y * 5.0 + uTime * 2.0) * 0.12,
        cos(startP.x * 5.0 + uTime * 2.0) * 0.12,
        sin(startP.z * 5.0 + uTime * 2.0) * 0.12
      ) * (1.0 - easeP);

      vec3 currentPos = mix(startP, targetP, easeP) + noise;

      // Slow 3D rotation for GLTF 3D models
      if (uTargetIndex != 0) {
        float angle = uTime * 0.3 * easeP;
        float cosA = cos(angle);
        float sinA = sin(angle);
        mat2 rot = mat2(cosA, -sinA, sinA, cosA);
        currentPos.xz = rot * currentPos.xz;
      }

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);

      // Point size logic:
      // When Hovering (uIsHovering > 0.5): Outline particles pop to 9.0px, fill particles shrink to 3.0px.
      // When Solidified (uIsHovering == 0.0): Points expand to 10.5px to form a dense solid 3D surface!
      float baseSize = mix(8.0, 4.5, easeP);
      if (uIsHovering > 0.5) {
        if (aIsOutline > 0.5) {
          baseSize = 9.0;
        } else {
          baseSize = 2.5;
        }
      } else {
        baseSize = mix(baseSize, 10.5, uSolidifyProgress);
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
        // Apple Glass UI Translucent Spheres for GLTF 3D Models (👆🏻, 📺, 📝)
        vec3 glassBody = vec3(0.85, 0.92, 0.98);
        vec3 goldAccent = vec3(0.95, 0.82, 0.50);
        vec3 cyanGlow = vec3(0.40, 0.85, 0.95);

        vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0, 1.5));
        float spec = pow(max(dot(vec3(0.0, 0.0, 1.0), lightDir), 0.0), 12.0);

        finalColor = mix(glassBody, goldAccent, vRandom * 0.5) + cyanGlow * spec * 0.8;
      }

      // OUTLINE VS SOLIDIFICATION STATE
      if (uIsHovering > 0.5) {
        // HOVER INTENT MODE: Show ONLY glowing outline wireframe
        if (vIsOutline > 0.5) {
          finalColor = mix(finalColor, vec3(0.98, 0.85, 0.55), 0.85);
          finalAlpha = 0.98;
        } else {
          finalAlpha = 0.05; // Interior fill particles dim almost completely
        }
      } else {
        // SOLIDIFIED MODE (Navigation complete): All particles fill in to form solid 3D object
        if (uTargetIndex != 0) {
          finalAlpha = mix(0.05, 0.98, uSolidifyProgress);
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

  const handGLTF = useGLTF(`${import.meta.env.BASE_URL}models/pointing-hand.glb`);
  const tvGLTF = useGLTF(`${import.meta.env.BASE_URL}models/tv-screen.glb`);
  const docGLTF = useGLTF(`${import.meta.env.BASE_URL}models/document.glb`);

  const location = useLocation();
  const { intendedRoute } = useNavIntent();

  const activeCategory = getCategoryKey(location.pathname);
  const intendedCategory = intendedRoute ? getCategoryKey(intendedRoute) : activeCategory;
  const isHovering = intendedRoute !== null;

  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  const solidMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  const prevCategoryRef = useRef<CategoryKey>(activeCategory);
  const targetCategoryRef = useRef<CategoryKey>(intendedCategory);
  const morphProgressRef = useRef<number>(1.0);
  const solidifyProgressRef = useRef<number>(isHovering ? 0.0 : 1.0);

  const cols = 110;
  const rows = 146;
  const count = cols * rows;

  const { posHero, uvs, posUX, posVisual, posWritings, isOutline, randoms } = useMemo(() => {
    const hero = generateHeroGrid(count, cols, rows);
    const ux = samplePointsFromGLTFScene(handGLTF.scene, count);
    const vis = samplePointsFromGLTFScene(tvGLTF.scene, count);
    const wr = samplePointsFromGLTFScene(docGLTF.scene, count);

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
  }, [count, cols, rows, handGLTF, tvGLTF, docGLTF]);

  // When intended category or active route changes, trigger morph & solidification animation
  useEffect(() => {
    if (intendedCategory !== targetCategoryRef.current) {
      prevCategoryRef.current = targetCategoryRef.current;
      targetCategoryRef.current = intendedCategory;
      morphProgressRef.current = 0.0;
    }
  }, [intendedCategory]);

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const targetMouse = new THREE.Vector2(mousePos.x, mousePos.y);

    if (morphProgressRef.current < 1.0) {
      morphProgressRef.current = Math.min(morphProgressRef.current + delta / 1.0, 1.0);
    }

    const targetSolidify = isHovering ? 0.0 : 1.0;
    solidifyProgressRef.current += (targetSolidify - solidifyProgressRef.current) * Math.min(delta * 4.0, 1.0);

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uCurrentIndex.value = categoryToIndex(prevCategoryRef.current);
      particleMaterialRef.current.uniforms.uTargetIndex.value = categoryToIndex(targetCategoryRef.current);
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
      {/* 1. Multi-Category Morphing Particles */}
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

      {/* 2. Solidified Image Mesh (For Hero Photo on Homepage when not hovering) */}
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

useGLTF.preload(`${import.meta.env.BASE_URL}models/pointing-hand.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}models/tv-screen.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}models/document.glb`);

export default HeroParticleCanvas;
