
"use client";

import { motion } from "framer-motion";
import { Coffee, Droplets, Thermometer } from "lucide-react";

const features = [
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Precision Extraction",
    description: "Every drop is measured to ensure the perfect TDS for a balanced, clear cup."
  },
  {
    icon: <Thermometer className="w-6 h-6" />,
    title: "Thermal Stability",
    description: "Cold-extracted at exactly 4°C to preserve delicate floral and citrus notes."
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Artisanal Roasting",
    description: "Small-batch roasts tailored to the unique density of high-altitude beans."
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h3 className="text-accent font-bold tracking-[0.3em] text-xs uppercase mb-6">The Ritual</h3>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-8">
            The Art of Slow Extraction
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that time is the most essential ingredient. Our slow-pour method respects the bean's journey, revealing layers of flavor hidden in traditional brewing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white shadow-xl shadow-primary/5 space-y-6 text-left border border-primary/5 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-accent">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-primary">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
