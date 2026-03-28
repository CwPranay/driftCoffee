"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const totalFrames = 30; // Preload the first 30 frames for a smooth start

  useEffect(() => {
    let loadedCount = 0;
    const framesToPreload = Array.from({ length: totalFrames }, (_, i) => {
      const index = i.toString().padStart(3, "0");
      return `https://mnjjesosykmgfmnfbwaz.supabase.co/storage/v1/object/sign/coffee/frame_${index}_delay-0.041s.webp`;
    });

    const preloadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // Continue anyway if one fails
      });
    };

    const preloadAll = async () => {
      for (const url of framesToPreload) {
        await preloadImage(url);
        loadedCount++;
        setProgress((loadedCount / totalFrames) * 100);
      }
      setTimeout(() => onComplete(), 500);
    };

    preloadAll();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000">
      <div className="flex flex-col items-center max-w-xs w-full gap-8">
        <h1 className="text-4xl font-headline tracking-tighter text-primary animate-pulse">
          Drift Coffee
        </h1>
        <div className="w-full">
          <Progress value={progress} className="h-1 bg-secondary" />
        </div>
        <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
          Brewing sensory experience...
        </p>
      </div>
    </div>
  );
}