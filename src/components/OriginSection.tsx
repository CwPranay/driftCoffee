
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function OriginSection() {
  const farmImage = PlaceHolderImages.find(img => img.id === "origin-farm");

  return (
    <section id="about" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-accent font-bold tracking-[0.3em] text-xs uppercase">Our Origin</h3>
              <h2 className="text-5xl md:text-6xl font-headline font-bold text-primary leading-tight">
                From Soil to<br />Ceremony.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Our journey begins at 2,000 meters above sea level, in the mineral-rich soil of the Yirgacheffe region. We partner directly with family estates to ensure ethical sourcing and unrivaled quality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MapPin className="w-4 h-4 text-accent" />
                  Yirgacheffe, ET
                </div>
                <p className="text-sm text-muted-foreground">High Altitude (2000m+)</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MapPin className="w-4 h-4 text-accent" />
                  Antigua, GT
                </div>
                <p className="text-sm text-muted-foreground">Volcanic Soil Richness</p>
              </div>
            </div>

            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-full px-10 h-14 uppercase tracking-[0.2em] font-bold text-[10px]">
              Learn Our Craft
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl">
              {farmImage && (
                <Image
                  src={farmImage.imageUrl}
                  alt="Coffee Farm Origin"
                  fill
                  className="object-cover"
                  data-ai-hint={farmImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            {/* Floating Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full opacity-10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
