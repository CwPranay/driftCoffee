
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    id: "menu-item-1",
    name: "Midnight Cascara",
    note: "Notes of dark cherry & tonic",
    category: "Signature",
    price: "$8"
  },
  {
    id: "menu-item-2",
    name: "Ethiopian Reserve",
    note: "Bright citrus & jasmine",
    category: "Pour Over",
    price: "$7"
  },
  {
    id: "menu-item-3",
    name: "Nitro Cold Brew",
    note: "Creamy cocoa & smooth finish",
    category: "Draft",
    price: "$6"
  },
  {
    id: "menu-item-4",
    name: "Iced Lavender Oat",
    note: "Floral sweetness & oat silk",
    category: "Seasonal",
    price: "$7"
  }
];

export function MenuPreview() {
  return (
    <section id="menu" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-accent font-bold tracking-[0.3em] text-xs uppercase">Curated Selection</h3>
            <h2 className="text-5xl font-headline font-bold text-primary">The Seasonal Menu</h2>
          </motion.div>
          <p className="text-muted-foreground max-w-sm text-right">
            Our menu evolves with the harvest, ensuring every bean is served at its peak sensory potential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => {
            const imageData = PlaceHolderImages.find(img => img.id === item.id);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-secondary/10 mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {imageData && (
                    <Image
                      src={imageData.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint={imageData.imageHint}
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/80 backdrop-blur-md text-primary hover:bg-white/90 border-none font-bold">
                      {item.price}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{item.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
