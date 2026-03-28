"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { HeroScroll } from "@/components/HeroScroll";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FlavorGenerator } from "@/components/FlavorGenerator";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            
            {/* Cinematic Hero */}
            <section id="experience">
              <HeroScroll />
            </section>

            {/* Product Section */}
            <ProductShowcase />

            {/* AI Experience */}
            <FlavorGenerator />

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-primary/10 bg-white">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                <div className="space-y-4 max-w-sm">
                  <h2 className="text-3xl font-headline font-black text-primary">Drift Coffee</h2>
                  <p className="text-muted-foreground">
                    Redefining the premium coffee experience through cinematic precision and sensory excellence.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent">Discover</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#" className="hover:text-primary transition-colors">Our Menu</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Origins</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Brewing Guides</a></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent">Connect</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-[0.2em]">
                <p>&copy; 2024 Drift Coffee Roasters. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                  <a href="#" className="hover:text-primary">Privacy Policy</a>
                  <a href="#" className="hover:text-primary">Terms of Service</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}