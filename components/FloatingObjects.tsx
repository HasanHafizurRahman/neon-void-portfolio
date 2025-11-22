import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  pageDepth: number;
}

// Reusable animated shape
const CyberShape: React.FC<{ 
  position: [number, number, number]; 
  color: string; 
  type: 'icosa' | 'octa' | 'torus';
  scale?: number;
}> = ({ position, color, type, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {type === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
        {type === 'octa' && <octahedronGeometry args={[1, 0]} />}
        {type === 'torus' && <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />}
        
        {/* Wireframe for tech look */}
        <meshStandardMaterial 
          color={color} 
          wireframe 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const DataParticles: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    // Simple cluster of small boxes representing data
    const particles = Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} floatIntensity={2} position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2
        ]}>
            <mesh scale={0.1}>
                <boxGeometry />
                <meshBasicMaterial color="#00f3ff" />
            </mesh>
        </Float>
    ));
    return <group position={position}>{particles}</group>;
}

export const FloatingObjects: React.FC<Props> = ({ pageDepth }) => {
  return (
    <group>
      {/* Intro Section - Just ahead */}
      <CyberShape position={[2, 0, -5]} color="#00f3ff" type="icosa" />
      <CyberShape position={[-2, -1, -8]} color="#ff00aa" type="octa" scale={0.5} />

      {/* About Section */}
      <CyberShape position={[-3, 1, -pageDepth - 5]} color="#ff00aa" type="torus" />
      
      {/* Skills Section */}
      <DataParticles position={[0, 0, -(pageDepth * 2) - 5]} />
      <CyberShape position={[3, -1, -(pageDepth * 2) - 2]} color="#00f3ff" type="octa" />

      {/* Projects Section */}
      {/* Frames representing screens */}
      <group position={[0, 0, -(pageDepth * 3) - 5]}>
         <mesh position={[-2.5, 0, 0]} rotation={[0, 0.5, 0]}>
            <planeGeometry args={[3, 2]} />
            <meshBasicMaterial color="#00f3ff" wireframe />
         </mesh>
         <mesh position={[2.5, 0, 0]} rotation={[0, -0.5, 0]}>
            <planeGeometry args={[3, 2]} />
            <meshBasicMaterial color="#ff00aa" wireframe />
         </mesh>
      </group>

      {/* Contact Section */}
      <CyberShape position={[0, 2, -(pageDepth * 4) - 5]} color="#00f3ff" type="icosa" scale={2} />
    </group>
  );
};