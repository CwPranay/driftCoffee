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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
      setCurrentFrameUrl(getFrameUrl(index));

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

  useEffect(() => {
    for (let i = 0; i < 30; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
    }
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
        
        {/* Full-Screen Animation Background - No Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            id="heroImage"
            src={currentFrameUrl}
            alt="Drift Coffee Background Animation"
            className="w-full h-full object-cover object-[right_center] pointer-events-none"
          />
        </div>

        {/* Cinematic Content Overlay - Clean Minimalist Placement */}
        <div className="relative z-10 h-full w-full flex items-center px-[8%] md:pl-[12%] md:pr-0">
          <div className="max-w-[550px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-8"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block mb-4"
                >
                  The Art of the Slow Pour
                </motion.span>
                <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-primary leading-[1.1]">
                  {textStates[phase].title}
                </h1>
                <p className="text-xl md:text-2xl text-primary/70 leading-[1.6] font-medium">
                  {textStates[phase].subtext}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-10"
                >
                  <a 
                    href="#menu" 
                    className="inline-flex items-center justify-center px-12 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all duration-500 shadow-2xl hover:-translate-y-1"
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
          style={{ opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }).on("change", (v) => Math.max(0, 1 - v * 10)) }}
          className="absolute bottom-12 left-[12%] z-30 flex flex-col items-start gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary/40">Scroll to Explore</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
