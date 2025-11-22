import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { TunnelSegments } from './TunnelSegments';
import { FloatingObjects } from './FloatingObjects';

// Constants used to calculate position along the rail
const PAGE_DEPTH = 15; // Distance between sections on Z axis
const TOTAL_PAGES = 5;

export const Experience: React.FC = () => {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);

  // Group to hold the moving camera rig if needed, 
  // but here we move the camera directly or move the world.
  // Best practice in ScrollControls: Move the camera.
  
  useFrame((state, delta) => {
    // Calculate target Z position based on scroll offset (0 to 1)
    // We move from z=0 to z = - (Total depth)
    const targetZ = -(scroll.offset * PAGE_DEPTH * (TOTAL_PAGES - 1));
    
    // Smooth camera movement using linear interpolation (dampening is handled by ScrollControls, 
    // but explicit lerp here adds an extra layer of cinematic smoothing if desired, 
    // though simply assigning scroll.offset is often enough with ScrollControls damping).
    
    // Actually, ScrollControls damping updates `scroll.offset` smoothly.
    // So we can map directly.
    state.camera.position.z = targetZ + 5; // +5 to keep offset from start

    // Add subtle parallax based on mouse position
    const parallaxX = state.pointer.x * 1.5;
    const parallaxY = state.pointer.y * 1.5;
    
    // Lerp current camera position towards parallax target
    state.camera.position.x += (parallaxX - state.camera.position.x) * delta * 2;
    state.camera.position.y += (parallaxY - state.camera.position.y) * delta * 2;

    // Optional: Rotate camera slightly to look into the turn/movement
    state.camera.rotation.y += (state.pointer.x * -0.05 - state.camera.rotation.y) * delta * 2;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#ff00aa" distance={20} />

      {/* Background Ambience */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={[20, 20, 100]} size={4} speed={0.4} opacity={0.5} color="#00f3ff" />

      {/* The Tunnel / Grid Floor */}
      <TunnelSegments pageDepth={PAGE_DEPTH} count={TOTAL_PAGES + 2} />

      {/* 3D Objects associated with sections */}
      <FloatingObjects pageDepth={PAGE_DEPTH} />
    </>
  );
};