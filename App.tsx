import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Experience } from './components/Experience';
import { Overlay } from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-[#050505]">
      {/* 
        Canvas setup:
        - fov: 64 for a slightly wide cinematic look
        - position: starting camera position
      */}
      <Canvas
        camera={{
          fov: 64,
          position: [0, 0, 5], 
        }}
        dpr={[1, 2]} // Handle high DPI screens
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Fog to fade objects into the distance for the 'void' effect */}
        <fog attach="fog" args={['#050505', 10, 30]} />

        <Suspense fallback={null}>
          {/* ScrollControls handles the virtual scrolling logic */}
          <ScrollControls pages={5} damping={0.3}>
            {/* The 3D Content */}
            <Experience />
            
            {/* The HTML Overlay mapped to scroll positions */}
            <Overlay />
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Permanent UI HUD */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-50">
         <div className="text-white/50 text-xs font-cyber tracking-[0.3em] uppercase animate-pulse">
            Scroll to Navigate /// System Online
         </div>
      </div>
    </div>
  );
};

export default App;