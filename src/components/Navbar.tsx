"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12",
        isScrolled ? "glass-morphism py-3 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-headline tracking-tighter text-primary">
            Drift
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#experience" className="text-sm font-medium hover:text-accent transition-colors">Experience</a>
            <a href="#menu" className="text-sm font-medium hover:text-accent transition-colors">Menu</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">Our Origin</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary hover:text-accent">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 rounded-full px-6">
            Reserve Beans
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 gap-4">
            <a href="#experience" className="text-lg font-medium py-2">Experience</a>
            <a href="#menu" className="text-lg font-medium py-2">Menu</a>
            <a href="#about" className="text-lg font-medium py-2">Our Origin</a>
            <Button className="w-full bg-primary mt-4">Order Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
}