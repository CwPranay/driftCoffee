"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 119;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use a spring for super smooth transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const index = i.toString().padStart(3, "0");
      img.src = `https://mnjjesosykmgfmnfbwaz.supabase.co/storage/v1/object/sign/coffee/frame_${index}_delay-0.041s.webp`;
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
      };
      loadedImages[i] = img; // Basic loading
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const render = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !canvasRef.current) return;

      const index = Math.round(frameIndex.get());
      const img = images[index];

      if (img && img.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Handle aspect ratio
        const scale = Math.max(
          canvasRef.current.width / img.width,
          canvasRef.current.height / img.height
        );
        const x = (canvasRef.current.width / 2) - (img.width / 2) * scale;
        const y = (canvasRef.current.height / 2) - (img.height / 2) * scale;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    const anim = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(anim);
    };
  }, [images, frameIndex]);

  // Parallax elements
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Parallax Layer */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background z-0" 
        />
        
        {/* Cinematic Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
        />

        {/* Hero Content Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: textOpacity, scale: textScale }}
            className="text-center px-6"
          >
            <h2 className="text-sm uppercase tracking-[0.5em] text-accent font-bold mb-4">
              The Art of the Slow Pour
            </h2>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-primary leading-tight">
              Drift Into<br />Elegance.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Experience coffee that moves at your pace. Premium roasts, cinematic moments, and a flavor profile that lingers.
            </p>
          </motion.div>
        </div>

        {/* Parallax Detail: Floating Droplets */}
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]) }}
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-accent/20 blur-xl z-0"
        />
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-80%"]) }}
          className="absolute bottom-1/4 left-1/4 w-8 h-8 rounded-full bg-primary/10 blur-2xl z-0"
        />
      </div>
    </div>
  );
}