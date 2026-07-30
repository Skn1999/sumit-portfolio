import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import fontData from "three/examples/fonts/helvetiker_bold.typeface.json";
import { useLocation } from "react-router-dom";
import { useNavIntent } from "@/contexts/NavIntentContext";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CategoryKey = "hero" | "ux-design" | "data-engineering" | "writings";

function getCategoryKey(path: string | null): CategoryKey {
  if (!path) return "hero";
  if (path.startsWith("/data-engineering")) return "data-engineering";
  if (
    path.startsWith("/ux-design") ||
    path.startsWith("/projects") ||
    path.startsWith("/design")
  )
    return "ux-design";
  if (path.startsWith("/visual-design")) return "ux-design";
  if (path.startsWith("/writings") || path.startsWith("/ux-bites"))
    return "writings";
  return "hero";
}

function categoryToIndex(cat: CategoryKey): number {
  switch (cat) {
    case "hero":
      return 0;
    case "ux-design":
      return 1;
    case "data-engineering":
      return 2;
    case "writings":
      return 3;
  }
}

// 1. Create 3D Text Mesh for "me"
function create3DTextMesh(text = "me", targetSize = 0.85) {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(fontData);

  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 0.6,
    height: 0.25,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();
  textGeometry.computeBoundingBox();

  const box = textGeometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
  const scale = targetSize / maxDim;
  textGeometry.scale(scale, scale, scale);
  textGeometry.computeVertexNormals();

  const solidMesh = new THREE.Mesh(
    textGeometry,
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe2e8f0), // Bright Lustrous Silver Metal
      metalness: 0.85, // Polished Silver Metal
      roughness: 0.2, // Satin Silver Sheen
      envMapIntensity: 2.0,
    }),
  );

  return { solidMesh };
}

// 2. Prepare 3D GLTF model with baked geometry matrices & Silver Metal Material
function processGLTFModel(originalScene: THREE.Object3D, targetSize = 0.85) {
  const scene = originalScene.clone();
  scene.updateMatrixWorld(true);

  const meshes: THREE.Mesh[] = [];
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
      meshes.push(child as THREE.Mesh);
    }
  });

  if (meshes.length === 0) {
    const fallbackMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5));
    return { solidMesh: fallbackMesh };
  }

  let targetMesh = meshes[0];
  for (const m of meshes) {
    if (
      m.geometry.attributes.position.count >
      targetMesh.geometry.attributes.position.count
    ) {
      targetMesh = m;
    }
  }

  const geometry = targetMesh.geometry.clone();
  targetMesh.updateMatrixWorld(true);
  geometry.applyMatrix4(targetMesh.matrixWorld);

  geometry.center();
  geometry.computeBoundingBox();

  const box = geometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
  const scale = targetSize / maxDim;
  geometry.scale(scale, scale, scale);
  geometry.computeVertexNormals();

  const solidMesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe2e8f0), // Bright Lustrous Silver Metal
      metalness: 0.85, // Polished Silver Metal
      roughness: 0.2, // Satin Silver Sheen
      envMapIntensity: 2.0,
    }),
  );

  return { solidMesh };
}

// Sample points from 3D mesh geometry
function samplePointsFromMesh(targetMesh: THREE.Mesh, count: number) {
  const positions = new Float32Array(count * 3);
  const isOutline = new Float32Array(count);

  try {
    const sampler = new MeshSurfaceSampler(targetMesh).build();
    const tempPos = new THREE.Vector3();
    const tempNorm = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPos, tempNorm);

      positions[i * 3] = tempPos.x;
      positions[i * 3 + 1] = tempPos.y;
      positions[i * 3 + 2] = tempPos.z;

      const dotZ = Math.abs(tempNorm.z);
      isOutline[i] = dotZ < 0.35 || i % 3 === 0 ? 1.0 : 0.0;
    }
  } catch (e) {
    console.warn("MeshSurfaceSampler fallback:", e);
    const posAttr = targetMesh.geometry.attributes.position;
    const vCount = posAttr.count;

    for (let i = 0; i < count; i++) {
      const idx = i % vCount;
      positions[i * 3] = posAttr.getX(idx);
      positions[i * 3 + 1] = posAttr.getY(idx);
      positions[i * 3 + 2] = posAttr.getZ(idx);
      isOutline[i] = i % 3 === 0 ? 1.0 : 0.0;
    }
  }

  return { positions, isOutline };
}

/* ── Wireframe Outline Particle Shader with Organic Vibration Jitter ── */
const OutlineParticleShader = {
  uniforms: {
    uCurrentIndex: { value: 0 },
    uTargetIndex: { value: 0 },
    uMorphProgress: { value: 1.0 },
    uIsHovering: { value: 0.0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uMorphProgress;
    uniform float uIsHovering;
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

      if (uTargetIndex != 0) {
        float angle = uTime * 0.3 * easeP;
        float cosA = cos(angle);
        float sinA = sin(angle);
        currentPos.xz = vec2(
          currentPos.x * cosA + currentPos.z * sinA,
          -currentPos.x * sinA + currentPos.z * cosA
        );
      } else {
        float angle = uTime * 0.3 * (1.0 - easeP);
        float cosA = cos(angle);
        float sinA = sin(angle);
        currentPos.xz = vec2(
          currentPos.x * cosA + currentPos.z * sinA,
          -currentPos.x * sinA + currentPos.z * cosA
        );
      }

      // Organic micro-vibration jitter for outline particles to feel alive
      if (aIsOutline > 0.5) {
        vec3 vibration = vec3(
          sin(uTime * 14.0 + aRandom * 25.0) * 0.012,
          cos(uTime * 16.0 + aRandom * 25.0) * 0.012,
          sin(uTime * 12.0 + aRandom * 20.0) * 0.012
        );
        currentPos += vibration * uIsHovering;
      }

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);

      // Slightly bigger point size for outline particles
      float baseSize = mix(8.0, 5.0, easeP);
      if (aIsOutline > 0.5) {
        baseSize = mix(9.5, 14.0, uIsHovering);
      } else {
        baseSize = 2.0;
      }

      gl_PointSize = baseSize * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uMorphProgress;
    uniform float uIsHovering;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform int uTargetIndex;

    varying vec2 vUv;
    varying float vRandom;
    varying float vIsOutline;
    varying float vMorphProgress;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (dot(coord, coord) > 0.25) discard;

      float alphaEdge = smoothstep(0.25, 0.05, dot(coord, coord));

      vec3 silverShine = vec3(0.95, 0.97, 1.0);
      vec3 finalColor = mix(vec3(0.85, 0.90, 0.95), silverShine, vRandom);

      float finalAlpha = 1.0;
      if (vIsOutline > 0.5) {
        finalAlpha = 0.98 * uIsHovering;
      } else {
        finalAlpha = 0.05 * uIsHovering;
      }

      float alpha = finalAlpha * alphaEdge;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

interface SceneContentProps {
  mousePos: { x: number; y: number };
}

const SceneContent: React.FC<SceneContentProps> = ({ mousePos }) => {
  const meMesh = useMemo(() => create3DTextMesh("me", 0.85).solidMesh, []);

  const handGLTF = useGLTF(
    `${import.meta.env.BASE_URL}models/pointing-hand.glb`,
  );
  const tvGLTF = useGLTF(`${import.meta.env.BASE_URL}models/tv-screen.glb`);
  const docGLTF = useGLTF(`${import.meta.env.BASE_URL}models/document.glb`);

  const { solidMesh: handMesh } = useMemo(
    () => processGLTFModel(handGLTF.scene, 0.85),
    [handGLTF],
  );
  const { solidMesh: tvMesh } = useMemo(
    () => processGLTFModel(tvGLTF.scene, 0.85),
    [tvGLTF],
  );
  const { solidMesh: docMesh } = useMemo(
    () => processGLTFModel(docGLTF.scene, 0.85),
    [docGLTF],
  );

  const location = useLocation();
  const { intendedRoute } = useNavIntent();

  const activeCategory = getCategoryKey(location.pathname);
  const intendedCategory = intendedRoute
    ? getCategoryKey(intendedRoute)
    : activeCategory;
  const isHovering = intendedRoute !== null;

  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  const prevCategoryRef = useRef<CategoryKey>(activeCategory);
  const targetCategoryRef = useRef<CategoryKey>(intendedCategory);
  const morphProgressRef = useRef<number>(1.0);

  const meRef = useRef<THREE.Group>(null!);
  const handRef = useRef<THREE.Group>(null!);
  const tvRef = useRef<THREE.Group>(null!);
  const docRef = useRef<THREE.Group>(null!);

  const cols = 110;
  const rows = 146;
  const count = cols * rows;

  const { posHero, uvs, posUX, posVisual, posWritings, isOutline, randoms } =
    useMemo(() => {
      const hero = samplePointsFromMesh(meMesh, count);
      const ux = samplePointsFromMesh(handMesh, count);
      const vis = samplePointsFromMesh(tvMesh, count);
      const wr = samplePointsFromMesh(docMesh, count);

      const randArray = new Float32Array(count);
      for (let i = 0; i < count; i++) randArray[i] = Math.random();
      const dummyUvs = new Float32Array(count * 2);

      return {
        posHero: hero.positions,
        uvs: dummyUvs,
        posUX: ux.positions,
        posVisual: vis.positions,
        posWritings: wr.positions,
        isOutline: hero.isOutline,
        randoms: randArray,
      };
    }, [count, meMesh, handMesh, tvMesh, docMesh]);

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
      morphProgressRef.current = Math.min(
        morphProgressRef.current + delta / 1.0,
        1.0,
      );
    }

    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.uCurrentIndex.value =
        categoryToIndex(prevCategoryRef.current);
      particleMaterialRef.current.uniforms.uTargetIndex.value = categoryToIndex(
        targetCategoryRef.current,
      );
      particleMaterialRef.current.uniforms.uMorphProgress.value =
        morphProgressRef.current;
      particleMaterialRef.current.uniforms.uIsHovering.value = isHovering
        ? 1.0
        : 0.0;
      particleMaterialRef.current.uniforms.uTime.value = elapsedTime;
      particleMaterialRef.current.uniforms.uMouse.value.lerp(targetMouse, 0.08);
    }

    const currentRot = elapsedTime * 0.3;
    if (meRef.current) meRef.current.rotation.y = currentRot;
    if (handRef.current) handRef.current.rotation.y = currentRot;
    if (tvRef.current) tvRef.current.rotation.y = currentRot;
    if (docRef.current) docRef.current.rotation.y = currentRot;
  });

  const showSolidHero = activeCategory === "hero" && !isHovering;
  const showSolidUX = activeCategory === "ux-design" && !isHovering;
  const showSolidVisual = activeCategory === "data-engineering" && !isHovering;
  const showSolidWritings = activeCategory === "writings" && !isHovering;

  return (
    <group>
      <Environment preset="studio" />

      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={3.5} color="#ffffff" />
      <directionalLight
        position={[-3, -2, 2]}
        intensity={2.2}
        color="#cbd5e1"
      />
      <pointLight position={[0, 4, -3]} intensity={2.8} color="#f8fafc" />

      {/* 1. Wireframe Outline Particle Swarm with Micro-Vibration */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posHero, 3]} />
          <bufferAttribute attach="attributes-aPosHero" args={[posHero, 3]} />
          <bufferAttribute attach="attributes-aPosUX" args={[posUX, 3]} />
          <bufferAttribute
            attach="attributes-aPosVisual"
            args={[posVisual, 3]}
          />
          <bufferAttribute
            attach="attributes-aPosWritings"
            args={[posWritings, 3]}
          />
          <bufferAttribute attach="attributes-aUv" args={[uvs, 2]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
          <bufferAttribute
            attach="attributes-aIsOutline"
            args={[isOutline, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={particleMaterialRef}
          args={[OutlineParticleShader]}
          transparent
          depthWrite={false}
        />
      </points>

      {/* 2. Solidified Silver Metal 3D Text Model: Hero "me" */}
      {showSolidHero && (
        <group ref={meRef}>
          <primitive object={meMesh} />
        </group>
      )}

      {/* 3. Solidified Silver Metal 3D Model: UX Design Pointing Hand (👆🏻) */}
      {showSolidUX && (
        <group ref={handRef}>
          <primitive object={handMesh} />
        </group>
      )}

      {/* 4. Solidified Silver Metal 3D Model: Data Engineering TV Monitor (📺) */}
      {showSolidVisual && (
        <group ref={tvRef}>
          <primitive object={tvMesh} />
        </group>
      )}

      {/* 5. Solidified Silver Metal 3D Model: Writings Document Sheet (📝) */}
      {showSolidWritings && (
        <group ref={docRef}>
          <primitive object={docMesh} />
        </group>
      )}
    </group>
  );
};

export const HeroParticleCanvas: React.FC<{ imagePath?: string }> = ({
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
    if (imagePath) {
      return (
        <img
          src={imagePath}
          alt="Sumit profile"
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }
    return null;
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
          <SceneContent mousePos={mousePos} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}models/pointing-hand.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}models/tv-screen.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}models/document.glb`);

export default HeroParticleCanvas;
