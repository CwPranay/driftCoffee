"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 119;
const BASE_URL = "https://mnjjesosykmgfmnfbwaz.supabase.co/storage/v1/object/public/coffee/frame_";

const getFrameUrl = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `${BASE_URL}${paddedIndex}_delay-0.041s.webp`;
};

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameUrl, setCurrentFrameUrl] = useState(getFrameUrl(0));
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress for fluid frame updates
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      // 1. Update Frame Animation (0 to 118)
      const index = Math.min(Math.floor(v * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
      setCurrentFrameUrl(getFrameUrl(index));

      // 2. Update Text Phases based on scroll progress
      if (v < 0.3) {
        if (phase !== 0) setPhase(0);
      } else if (v < 0.7) {
        if (phase !== 1) setPhase(1);
      } else {
        if (phase !== 2) setPhase(2);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, phase]);

  // Performance: Preload frames to avoid flickering
  useEffect(() => {
    // Immediate preload for first 30 frames
    for (let i = 0; i < 30; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
    }
    // Background preload for the rest
    const preloadAll = async () => {
      for (let i = 30; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
      }
    };
    preloadAll();
  }, []);

  const textStates = [
    {
      title: "Pure. Slow. Intentional.",
      subtext: "Experience the rhythm of perfect extraction and premium craft."
    },
    {
      title: "Ice Meets Craft",
      subtext: "A delicate dance of temperature and time, bottled for excellence."
    },
    {
      title: "Crafted for the Perfect Chill",
      subtext: "The ultimate expression of cold-brewed elegance in every drop."
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Full-Screen Animation Background */}
        <div className="absolute inset-0 z-0">
          <img
            id="heroImage"
            src={currentFrameUrl}
            alt="Drift Coffee Background Animation"
            className="w-full h-full object-cover pointer-events-none transition-opacity duration-300"
            style={{ transitionProperty: 'opacity' }}
          />
          
          {/* Readability Overlay: Gradient from left to right */}
          <div 
            className="absolute inset-0 z-1" 
            style={{
              background: 'linear-gradient(to right, rgba(245, 230, 211, 0.95) 0%, rgba(245, 230, 211, 0.7) 40%, rgba(245, 230, 211, 0.2) 100%)'
            }}
          />
        </div>

        {/* Cinematic Content Overlay */}
        <div className="relative z-10 h-full w-full flex items-center px-[8%] md:px-[10%]">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs uppercase tracking-[0.5em] text-accent font-bold block mb-2"
                >
                  The Art of the Slow Pour
                </motion.span>
                <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-primary leading-[1] drop-shadow-sm">
                  {textStates[phase].title}
                </h1>
                <p className="text-xl md:text-2xl text-primary/80 leading-relaxed max-w-lg font-medium">
                  {textStates[phase].subtext}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-8"
                >
                  <a 
                    href="#menu" 
                    className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    Experience Drift
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 1 }}
          style={{ opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }).on("change", (v) => Math.max(0, 1 - v * 8)) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
