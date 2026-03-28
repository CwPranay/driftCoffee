"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, Coffee } from "lucide-react";
import { generateCoffeeFlavorDescription } from "@/ai/flows/generate-coffee-flavor-description";

export function FlavorGenerator() {
  const [coffeeName, setCoffeeName] = useState("");
  const [flavorProfile, setFlavorProfile] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coffeeName || !flavorProfile) return;

    setLoading(true);
    try {
      const response = await generateCoffeeFlavorDescription({
        coffeeName,
        origin: "Specialty Reserve",
        roastLevel: "Medium",
        flavorProfile,
      });
      setResult(response.description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-headline font-bold text-primary">Sensory Storyteller</h2>
          <p className="text-muted-foreground">Discover the language of your favorite brew with our AI-powered sensory tool.</p>
        </div>

        <Card className="border-none shadow-2xl overflow-hidden glass-morphism">
          <CardHeader className="bg-primary text-primary-foreground p-8">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Craft Your Experience
            </CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Input your coffee's key characteristics to generate an evocative description.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="coffee-name">Coffee Selection Name</Label>
                <Input 
                  id="coffee-name" 
                  placeholder="e.g. Ethiopian Yirgacheffe" 
                  value={coffeeName}
                  onChange={(e) => setCoffeeName(e.target.value)}
                  className="bg-background/50 border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flavor-notes">Key Flavor Notes</Label>
                <Input 
                  id="flavor-notes" 
                  placeholder="e.g. citrus, jasmine, blueberry" 
                  value={flavorProfile}
                  onChange={(e) => setFlavorProfile(e.target.value)}
                  className="bg-background/50 border-primary/20"
                />
              </div>
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  disabled={loading || !coffeeName || !flavorProfile}
                  className="w-full bg-accent hover:bg-accent/90 text-white h-12 rounded-full"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Coffee className="w-4 h-4 mr-2" />
                  )}
                  Generate Sensory Notes
                </Button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-secondary/30 p-8 rounded-2xl border border-primary/10 relative"
                >
                  <div className="absolute top-4 right-4 text-accent/20">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Tasting Notes</h4>
                  <p className="text-lg italic text-primary font-serif leading-relaxed">
                    "{result}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}