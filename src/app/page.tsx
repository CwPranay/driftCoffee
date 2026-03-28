"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { HeroScroll } from "@/components/HeroScroll";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MenuPreview } from "@/components/MenuPreview";
import { OriginSection } from "@/components/OriginSection";
import { FlavorGenerator } from "@/components/FlavorGenerator";
import { CTASection } from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false); // prevent flicker

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // 🔥 SKIP PRELOADER ON MOBILE
      if (mobile) {
        setLoading(false);
      }
    };

    check();
    setIsReady(true); // mark ready after check

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🚨 WAIT until we detect device
  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary">
      <AnimatePresence mode="wait">
        {/* ✅ ONLY SHOW PRELOADER ON DESKTOP */}
        {!isMobile && loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />

            <HeroScroll />

            <ProductShowcase />

            <ExperienceSection />

            <MenuPreview />

            <OriginSection />

            <FlavorGenerator />

            <CTASection />

            <footer className="py-24 px-6 border-t border-primary/10 bg-white">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                <div className="space-y-4 max-w-sm">
                  <h2 className="text-3xl font-headline font-black text-primary">
                    Drift Coffee
                  </h2>
                  <p className="text-muted-foreground">
                    Redefining the premium coffee experience through cinematic precision and sensory excellence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent">
                      Discover
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#menu" className="hover:text-primary">Our Menu</a></li>
                      <li><a href="#about" className="hover:text-primary">Origins</a></li>
                      <li><a href="#experience" className="hover:text-primary">Experience</a></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-accent">
                      Connect
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><a href="#">Instagram</a></li>
                      <li><a href="#">TikTok</a></li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-[0.2em]">
                <p>&copy; 2024 Drift Coffee Roasters</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}