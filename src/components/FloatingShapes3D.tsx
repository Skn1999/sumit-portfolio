import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Add this noise texture function
const createNoiseTexture = () => {
  const size = 256;
  const data = new Uint8Array(size * size * 4);

  for (let i = 0; i < size * size * 4; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise;
    data[i + 1] = noise;
    data[i + 2] = noise;
    data[i + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
};

function FloatingShape({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const noiseTexture = createNoiseTexture();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <MeshDistortMaterial
          color={color}
          speed={1}
          distort={0.1}
          radius={0.8}
          transparent
          opacity={0.6}
          roughness={0.8}
          metalness={0.2}
          displacementScale={0.2}
          displacementBias={-0.1}
          displacementMap={noiseTexture}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const noiseTexture = createNoiseTexture();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.7}
          roughness={0.6}
          metalness={0.3}
          displacementScale={0.1}
          displacementBias={-0.05}
          displacementMap={noiseTexture}
        />
      </mesh>
    </Float>
  );
}

const FloatingShapes3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-60 blur-[100px] saturate-[1.2]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingShape position={[-3, 2, 0]} color="#b794f4" />
        <FloatingSphere position={[3, -2, -1]} color="#ffd966" />
        <FloatingShape position={[2, 3, -2]} color="#9f7aea" />
        <FloatingSphere position={[-2, -1, 1]} color="#fff59d" />
      </Canvas>
    </div>
  );
};

export default FloatingShapes3D;
