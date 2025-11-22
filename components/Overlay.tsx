import React from 'react';
import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Reusable Section Layout
const Section: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}> = ({ children, align = 'center', className = '' }) => {
  const alignmentClasses = {
    left: 'items-start text-left pl-8 md:pl-20',
    right: 'items-end text-right pr-8 md:pr-20',
    center: 'items-center text-center'
  };

  return (
    <section className={`h-screen w-screen flex flex-col justify-center ${alignmentClasses[align]} ${className} p-6`}>
      <div className="max-w-4xl w-full">
        {children}
      </div>
    </section>
  );
};

const ProgressBar = () => {
    const scroll = useScroll();
    const barRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLSpanElement>(null);

    useFrame(() => {
        if(barRef.current) {
            barRef.current.style.width = `${scroll.offset * 100}%`;
        }
        if (textRef.current) {
            textRef.current.innerText = `${Math.floor(scroll.offset * 100)}%_COMPLETE`;
        }
    })

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
            <div ref={barRef} className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 shadow-[0_0_10px_#00f3ff]" />
            <div className="absolute top-4 right-4 text-xs font-cyber text-cyan-400" ref={textRef}>0%_COMPLETE</div>
        </div>
    )
}

export const Overlay: React.FC = () => {
  return (
    <Scroll html>
      <ProgressBar />
      
      {/* SECTION 1: WELCOME */}
      <Section align="center">
        <h1 className="text-6xl md:text-9xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white neon-text-cyan mb-4">
          NEON<span className="text-pink-500">VOID</span>
        </h1>
        <p className="text-xl md:text-2xl text-cyan-200 font-light tracking-[0.2em] mb-8">
          CREATIVE DEVELOPER PORTFOLIO
        </p>
        <div className="inline-block px-4 py-2 border border-cyan-500/30 text-cyan-400 text-sm font-cyber animate-pulse">
          SCROLL TO INITIALIZE DIVE
        </div>
      </Section>

      {/* SECTION 2: ABOUT */}
      <Section align="left">
        <div className="glass-panel p-8 md:p-12 rounded-lg border-l-4 border-l-pink-500 transform transition-all hover:scale-[1.02]">
          <h2 className="text-4xl md:text-6xl font-cyber text-white mb-6">THE ARCHITECT</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-xl font-light">
            I build digital experiences that exist at the intersection of 
            <span className="text-cyan-400 font-medium"> design </span> 
            and 
            <span className="text-pink-500 font-medium"> technology</span>. 
            Passionate about WebGL, interactive storytelling, and creating immersive environments on the web.
          </p>
          <div className="mt-8 flex gap-4 text-xs font-cyber text-gray-500">
             <span>LOC: EARTH</span>
             <span>///</span>
             <span>STATUS: ONLINE</span>
          </div>
        </div>
      </Section>

      {/* SECTION 3: SKILLS */}
      <Section align="right">
        <div className="text-right">
          <h2 className="text-4xl md:text-6xl font-cyber text-cyan-400 mb-12 neon-text-cyan">TECH STACK</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "React / Three.js", "TypeScript", "GLSL Shaders", 
              "Node.js", "Tailwind CSS", "Blender"
            ].map((skill, i) => (
              <div key={i} className="glass-panel p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-colors group">
                <span className="text-pink-500 text-xl mb-2 font-cyber group-hover:neon-text-pink">0{i+1}</span>
                <span className="text-white tracking-widest text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 4: PROJECTS */}
      <Section align="center">
        <h2 className="text-4xl md:text-6xl font-cyber text-white mb-16">MISSION LOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { title: "CYBER_DASH", type: "Game Dev", color: "border-cyan-500" },
            { title: "NEURAL_NET", type: "AI Visualizer", color: "border-pink-500" },
            { title: "VOID_COMMERCE", type: "Web3 Platform", color: "border-white" }
          ].map((project, i) => (
            <div key={i} className={`glass-panel p-6 rounded-none border-t-2 ${project.color} flex flex-col h-64 justify-between group hover:-translate-y-2 transition-transform duration-300`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white font-cyber">{project.title}</h3>
                  <span className="text-[10px] border border-white/20 px-2 py-1 text-gray-400">{project.type}</span>
                </div>
                <p className="text-sm text-gray-400">
                  Immersive web experience utilizing raw WebGL and custom physics engines.
                </p>
              </div>
              <button className="self-start text-xs font-cyber text-white/70 group-hover:text-cyan-400 transition-colors">
                ACCESS_DATA &gt;&gt;
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 5: CONTACT */}
      <Section align="center">
        <div className="glass-panel p-10 max-w-2xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500"></div>
          
          <h2 className="text-4xl font-cyber text-white mb-8 text-center">ESTABLISH LINK</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-cyber text-cyan-400">CODENAME</label>
                <input type="text" className="w-full bg-black/50 border border-white/20 p-3 text-white focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all" />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-cyber text-pink-500">FREQUENCY (EMAIL)</label>
                <input type="email" className="w-full bg-black/50 border border-white/20 p-3 text-white focus:border-pink-500 focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,170,0.3)] transition-all" />
              </div>
            </div>
            
            <div className="space-y-2 text-left">
               <label className="text-xs font-cyber text-white/60">TRANSMISSION</label>
               <textarea rows={4} className="w-full bg-black/50 border border-white/20 p-3 text-white focus:border-white focus:outline-none transition-all"></textarea>
            </div>

            <button className="w-full py-4 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-cyber tracking-[0.2em] hover:bg-cyan-500 hover:text-black transition-all duration-300 uppercase">
              Send Transmission
            </button>
          </form>
        </div>
        
        <footer className="mt-20 text-gray-600 text-sm font-cyber">
          SYSTEM_VERSION_2.0 // ALL RIGHTS RESERVED
        </footer>
      </Section>
    </Scroll>
  );
};