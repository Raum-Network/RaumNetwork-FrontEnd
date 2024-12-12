import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    colors[i * 3] = Math.random() * 0.3 + 0.7;
    colors[i * 3 + 1] = Math.random() * 0.3 + 0.7;
    colors[i * 3 + 2] = Math.random() * 0.3 + 0.7;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.075;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}