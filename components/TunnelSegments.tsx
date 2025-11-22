import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TunnelSegmentsProps {
  pageDepth: number;
  count: number;
}

const Ring: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[3, 0.05, 16, 100]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2} 
        toneMapped={false}
      />
    </mesh>
  );
};

const GridFloor: React.FC<{ position: [number, number, number]; length: number }> = ({ position, length }) => {
  return (
    <group position={position}>
       {/* Floor Grid */}
       <gridHelper 
        args={[10, length, 0xff00aa, 0x1a1a1a]} 
        position={[0, -2, -length / 2]} 
        scale={[1, 1, 1]}
      />
      {/* Ceiling Grid (Mirrored) */}
      <gridHelper 
        args={[10, length, 0x00f3ff, 0x1a1a1a]} 
        position={[0, 2, -length / 2]} 
        scale={[1, 1, 1]}
      />
    </group>
  );
};

export const TunnelSegments: React.FC<TunnelSegmentsProps> = ({ pageDepth, count }) => {
  // Create repetitive rings along the Z-axis
  const rings = Array.from({ length: count * 5 }).map((_, i) => {
    const z = -i * (pageDepth / 5);
    const color = i % 2 === 0 ? '#00f3ff' : '#ff00aa';
    return <Ring key={i} position={[0, 0, z]} color={color} />;
  });

  // Infinite-looking grid floor
  // We place a few long grids to cover the distance
  const totalLength = pageDepth * count;

  return (
    <group>
       {rings}
       <GridFloor position={[0, 0, 0]} length={totalLength} />
    </group>
  );
};