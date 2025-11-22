import React from 'react';
import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import shanto from '../assets/shanto.webp';

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
      <div className="max-w-5xl w-full">
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
    if (barRef.current) {
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
        <h1 className="text-5xl md:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white neon-text-cyan mb-4 tracking-tighter">
          HASAN Hafizur<span className="text-pink-500">RAHMAN</span>
        </h1>
        <p className="text-xl md:text-3xl text-cyan-200 font-light tracking-[0.3em] mb-8 uppercase">
          Software Developer
        </p>
        <div className="inline-block px-4 py-2 border border-cyan-500/30 text-cyan-400 text-sm font-cyber animate-pulse">
          SYSTEM INITIALIZED // SCROLL TO EXPLORE
        </div>
      </Section>

      {/* SECTION 2: ABOUT ME */}
      <Section align="center">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
          {/* Image Container */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-2 rounded-full border border-pink-500 opacity-50 animate-pulse"></div>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 bg-gray-900 flex items-center justify-center relative z-10">
              {/* PLACEHOLDER IMAGE - Replace src with your actual image path */}
              <img
                src={shanto}
                alt="Hasan Hafizur Rahman"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="glass-panel p-8 rounded-lg border-l-4 border-l-pink-500 text-left">
            <h2 className="text-3xl md:text-4xl font-cyber text-white mb-4">ABOUT ME</h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light mb-4">
              Frontend Developer proficient in <span className="text-cyan-400">TypeScript</span>, <span className="text-cyan-400">JavaScript</span>, <span className="text-cyan-400">ReactJs</span>, and <span className="text-cyan-400">NextJs</span>.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              I specialize in building innovative, high-performance web applications and collaborating with cross-functional teams to deliver exceptional solutions that solve complex problems.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-cyber text-gray-500 uppercase">
              <span className="border border-white/10 px-2 py-1">Dhaka, Bangladesh</span>
              <span className="border border-white/10 px-2 py-1">Available for Hire</span>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: EXPERIENCE */}
      <Section align="left">
        <h2 className="text-4xl md:text-6xl font-cyber text-white mb-10 neon-text-cyan">EXPERIENCE LOG</h2>

        <div className="relative border-l-2 border-cyan-500/30 pl-8 md:pl-12 space-y-12">

          {/* Job 1 */}
          <div className="relative group">
            <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f3ff] group-hover:scale-125 transition-transform"></div>
            <div className="glass-panel p-6 rounded-lg group-hover:bg-white/5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white font-cyber">Frontend Engineer</h3>
                <span className="text-pink-500 font-cyber text-sm">July 2024 - Present</span>
              </div>
              <h4 className="text-cyan-400 text-lg mb-4">Virleaf, Dhaka</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 marker:text-cyan-500">
                <li>Developed a scalable single-vendor e-commerce platform.</li>
                <li>Built core modules for POS: Sales, Products, Purchase, Due Collection.</li>
                <li>Participated in system architecture planning & performance optimization.</li>
              </ul>
            </div>
          </div>

          {/* Job 2 */}
          <div className="relative group">
            <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 bg-gray-700 border-2 border-cyan-500 rounded-full shadow-[0_0_5px_#00f3ff]"></div>
            <div className="glass-panel p-6 rounded-lg group-hover:bg-white/5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white font-cyber">Junior Software Developer</h3>
                <span className="text-gray-500 font-cyber text-sm">Nov 2023 - June 2024</span>
              </div>
              <h4 className="text-cyan-400 text-lg mb-4">HK IT Limited, Dhaka</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 marker:text-pink-500">
                <li>Contributed to HRM software modules (Office, Employee Management).</li>
                <li>Built robust POS solutions focusing on inventory flow & purchase logic.</li>
                <li>Translated Figma mockups into reusable React components.</li>
              </ul>
            </div>
          </div>

        </div>
      </Section>

      {/* SECTION 4: SKILLS */}
      <Section align="right">
        <div className="text-right max-w-4xl ml-auto">
          <h2 className="text-4xl md:text-6xl font-cyber text-pink-500 mb-4 neon-text-pink">CAPABILITIES</h2>
          <p className="text-gray-400 mb-12">CORE TECHNOLOGIES & TOOLS</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
              "Redux Toolkit", "Tailwind CSS", "REST API", "Git / GitHub"
            ].map((skill, i) => (
              <div key={i} className="glass-panel p-4 flex flex-col items-center justify-center hover:bg-cyan-900/20 border border-white/5 hover:border-cyan-500/50 transition-all group">
                <span className="text-white/20 text-xs mb-2 font-cyber group-hover:text-cyan-400 w-full text-left">SYS.0{i + 1}</span>
                <span className="text-white font-bold tracking-wider text-sm md:text-base">{skill}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end gap-6 text-sm text-gray-500 font-cyber">
            <span>TOOLS: VS Code</span>
            <span>//</span>
            <span>Postman</span>
            <span>//</span>
            <span>Figma</span>
          </div>
        </div>
      </Section>

      {/* SECTION 5: PROJECTS */}
      <Section align="center">
        <h2 className="text-4xl md:text-6xl font-cyber text-white mb-16">PROJECT ARCHIVE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* Project 1 */}
          <div className="glass-panel p-8 rounded-none border-t-4 border-t-cyan-500 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300 h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white font-cyber">E-COMMERCE</h3>
                <span className="text-[10px] border border-cyan-500/50 px-2 py-1 text-cyan-400">NEXT.JS</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A full-featured single-vendor e-commerce site. Features real-time API integration, SEO optimization via Next.js, and responsive UI converted from Figma.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">Next.js</span>
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">Tailwind</span>
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">REST API</span>
              </div>
            </div>
            <a href="https://ecom.virleaf.com" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-cyber text-cyan-400 hover:text-white transition-colors">
              LIVE PREVIEW &gt;&gt;
            </a>
          </div>

          {/* Project 2 */}
          <div className="glass-panel p-8 rounded-none border-t-4 border-t-pink-500 flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300 h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white font-cyber">SMART POS</h3>
                <span className="text-[10px] border border-pink-500/50 px-2 py-1 text-pink-500">REACT</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Feature-rich Point of Sale system for SMEs. Includes modules for sales, inventory, due tracking, and dynamic settings. Built with Redux Toolkit for scalable state management.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">React.js</span>
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">Redux Toolkit</span>
                <span className="text-xs bg-white/5 px-2 py-1 text-gray-300">Axios</span>
              </div>
            </div>
            <button className="inline-flex items-center text-sm font-cyber text-pink-500 hover:text-white transition-colors text-left">
              SYSTEM_INTERNAL // CLASSIFIED
            </button>
          </div>

        </div>
      </Section>

      {/* SECTION 6: CONTACT */}
      <Section align="center">
        <div className="glass-panel p-10 max-w-2xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500"></div>

          <h2 className="text-4xl font-cyber text-white mb-2 text-center">ESTABLISH LINK</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">CONNECT WITH HASAN HAFIZUR RAHMAN</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/40 p-4 border border-white/10 text-center">
              <div className="text-xs font-cyber text-cyan-400 mb-1">COMM_CHANNEL (PHONE)</div>
              <div className="text-white text-sm">+880 1776 249691</div>
            </div>
            <div className="bg-black/40 p-4 border border-white/10 text-center">
              <div className="text-xs font-cyber text-pink-500 mb-1">DIGITAL_ID (EMAIL)</div>
              <a href="mailto:hasanshanto922@gmail.com" className="text-white text-sm hover:text-pink-500 transition-colors">hasanshanto922@gmail.com</a>
            </div>
          </div>

          <div className="flex justify-center gap-8 font-cyber text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">GITHUB</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">PORTFOLIO</a>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-600">
              B.A. (Hons.) & M.A. - Jagannath University, Dhaka
            </p>
          </div>
        </div>

        <footer className="mt-20 text-gray-600 text-xs font-cyber">
          NEON_VOID // SYSTEM_VERSION_2.0 // END OF LINE
        </footer>
      </Section>
    </Scroll>
  );
};