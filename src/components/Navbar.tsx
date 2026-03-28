"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // adjust sensitivity
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500",
        isHeroVisible
          ? "bg-transparent py-6"
          : "bg-white/80 backdrop-blur-md shadow-sm py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}

        <div className="flex items-center gap-12">
          <a href="#" className="text-2xl font-headline tracking-tighter text-primary font-black">
            Drift
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a href="#experience" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Experience</a>
            <a href="#menu" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Menu</a>
            <a href="#about" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Our Origin</a>
          </div>
        </div>


        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary">
            <ShoppingBag className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>

          <Button className="hidden md:inline-flex bg-primary text-primary-foreground rounded-full px-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            Reserve Beans
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b md:hidden">
          <div className="flex flex-col p-8 gap-6">
            <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Origin</a>
          </div>
        </div>
      )}
    </nav>
  );
}