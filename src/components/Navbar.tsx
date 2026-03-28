"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-8 px-6 md:px-12 bg-transparent"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-headline tracking-tighter text-primary font-black">
            Drift
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a href="#experience" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Experience</a>
            <a href="#menu" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Menu</a>
            <a href="#about" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">Our Origin</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary hover:text-accent">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-accent transition-all duration-500 rounded-full px-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            Reserve Beans
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-8 gap-6">
            <a href="#experience" className="text-sm font-bold uppercase tracking-[0.2em]">Experience</a>
            <a href="#menu" className="text-sm font-bold uppercase tracking-[0.2em]">Menu</a>
            <a href="#about" className="text-sm font-bold uppercase tracking-[0.2em]">Our Origin</a>
            <Button className="w-full bg-primary mt-4 py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">Reserve Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
