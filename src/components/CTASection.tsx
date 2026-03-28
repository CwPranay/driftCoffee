
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[64px] overflow-hidden bg-primary p-12 md:p-24 text-center space-y-10 shadow-[0_32px_64px_-12px_rgba(45,34,22,0.3)]"
        >
          {/* Decorative background blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 space-y-6">
            <h3 className="text-accent font-bold tracking-[0.4em] text-xs uppercase">Begin the Journey</h3>
            <h2 className="text-5xl md:text-7xl font-headline font-bold text-white leading-tight">
              Start Your Daily Ritual.
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the difference of intentional roasting and cinematic extraction delivered directly to your door.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Button size="lg" className="bg-white text-primary hover:bg-accent hover:text-white rounded-full px-12 h-16 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-xl">
              Reserve Beans
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-primary hover:bg-white/10 rounded-full px-12 h-16 text-xs font-bold uppercase tracking-[0.2em]">
              Join the Club
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
