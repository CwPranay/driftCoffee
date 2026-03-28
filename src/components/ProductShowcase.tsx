"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // The new signature product image URL
  const imageUrl = "https://mnjjesosykmgfmnfbwaz.supabase.co/storage/v1/object/sign/coffee2/coffee.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMGY4Y2FmZS05MDc5LTQzYTAtYTQ5OC1jY2Q1NDMyNzU5MzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb2ZmZWUyL2NvZmZlZS5wbmciLCJpYXQiOjE3NzQ2NzY0NTgsImV4cCI6MTkzMjM1NjQ1OH0.h9Z2S06P_j5Xwy6YqfOjub7-Jvu0oDrizOrwCpIaJc";

  return (
    <section id="menu" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-[24px] overflow-hidden bg-secondary/20 flex items-center justify-center shadow-2xl"
        >
          {/* Shimmer Effect while loading */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 z-20 animate-pulse bg-gradient-to-r from-secondary/30 via-secondary/50 to-secondary/30" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent z-0" />
          
          <Image
            src={imageUrl}
            alt="The Signature Drift Iced Coffee"
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-in-out",
              isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-110"
            )}
            onLoadingComplete={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            priority
          />

          {/* Fallback Shimmer if image fails */}
          {hasError && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-secondary/10 backdrop-blur-sm">
               <div className="w-full h-full animate-pulse bg-gradient-to-r from-muted via-muted/40 to-muted" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-accent font-bold tracking-widest text-xs uppercase">Limited Edition</h3>
            <h2 className="text-5xl font-headline font-bold text-primary leading-tight">
              The Midnight<br />Cascara Blend
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A sensory journey through the high altitudes of Ethiopia. Notes of dried cherry, dark cocoa, and a whisper of wild lavender. Crafted for those who appreciate the complexity of a slow, cold extraction.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 h-14 group">
              Explore the Menu
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 h-14">
              Subscription Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
