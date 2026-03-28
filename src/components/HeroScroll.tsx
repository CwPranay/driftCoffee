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
      // 1. Update Frame Animation
      const index = Math.min(Math.floor(v * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
      setCurrentFrameUrl(getFrameUrl(index));

      // 2. Update Text Phases
      // 0% -> 30%: Phase 0
      // 30% -> 70%: Phase 1
      // 70% -> 100%: Phase 2
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
    // Immediate preload for first 20 frames
    for (let i = 0; i < 20; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
    }
    // Background preload for the rest
    const preloadAll = async () => {
      for (let i = 20; i < FRAME_COUNT; i++) {
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
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Text Content (Synced with Scroll) */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-16 z-20 order-2 md:order-1">
          <div className="max-w-xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <h2 className="text-xs uppercase tracking-[0.5em] text-accent font-bold">
                  The Art of the Slow Pour
                </h2>
                <h1 className="text-4xl md:text-7xl font-headline font-black tracking-tighter text-primary leading-[1.1]">
                  {textStates[phase].title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  {textStates[phase].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Animated Image Frame Sequence */}
        <div className="flex-1 relative flex items-center justify-center bg-secondary/10 order-1 md:order-2">
          {/* Subtle Parallax Detail: Background Gradient Blur */}
          <motion.div 
            style={{ 
              scale: useSpring(useScroll({ target: containerRef }).scrollYProgress, { stiffness: 50, damping: 20 }),
              opacity: 0.5
            }}
            className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 blur-3xl rounded-full"
          />

          <div className="relative w-full h-[60vh] md:h-full max-w-2xl flex items-center justify-center">
            <img
              id="heroImage"
              src={currentFrameUrl}
              alt="Drift Coffee Animation Frame"
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_35px_35px_rgba(143,89,36,0.15)] transition-opacity duration-300"
              style={{ transitionProperty: 'opacity' }}
            />
          </div>
        </div>
      </div>

      {/* Visual Indicator: Scroll Hint */}
      <motion.div 
        initial={{ opacity: 1 }}
        style={{ opacity: useSpring(useScroll({ target: containerRef }).scrollYProgress, { stiffness: 100, damping: 30 }).on("change", (v) => 1 - v * 5) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/20 to-transparent" />
      </motion.div>
    </div>
  );
}
