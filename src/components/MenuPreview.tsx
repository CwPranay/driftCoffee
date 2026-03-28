"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    name: "Midnight Cascara",
    note: "Notes of dark cherry & tonic",
    category: "Signature",
    price: "$8",
    image: "/menu/midnight.webp",
  },
  {
    name: "Ethiopian Reserve",
    note: "Bright citrus & jasmine",
    category: "Pour Over",
    price: "$7",
    image: "/menu/ethiopian.webp",
  },
  {
    name: "Nitro Cold Brew",
    note: "Creamy cocoa & smooth finish",
    category: "Draft",
    price: "$6",
    image: "/menu/nitro.webp",
  },
  {
    name: "Iced Lavender Oat",
    note: "Floral sweetness & oat silk",
    category: "Seasonal",
    price: "$7",
    image: "/menu/lavander.webp",
  },
];

export function MenuPreview() {
  return (
    <section id="menu" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-accent font-bold tracking-[0.3em] text-xs uppercase">
              Curated Selection
            </h3>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
              The Seasonal Menu
            </h2>
          </motion.div>

          <p className="text-muted-foreground max-w-sm text-right leading-relaxed">
            Our menu evolves with the harvest, ensuring every bean is served at its peak sensory potential.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* IMAGE CARD */}
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-secondary/10 mb-5 shadow-md group-hover:shadow-xl transition-all duration-500">
                
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={index === 0}
                />

                {/* PRICE BADGE */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/80 backdrop-blur-md text-primary border-none font-semibold px-3 py-1">
                    {item.price}
                  </Badge>
                </div>

                {/* SUBTLE OVERLAY ON HOVER */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />
              </div>

              {/* TEXT */}
              <div className="space-y-2 px-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-primary">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  {item.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}