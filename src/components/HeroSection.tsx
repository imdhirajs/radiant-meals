import { useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import heroMeal from "@/assets/hero-meal.jpg";

interface HeroSectionProps {
  onGenerate: (preferences: string) => void;
  isLoading?: boolean;
}

export function HeroSection({ onGenerate, isLoading = false }: HeroSectionProps) {
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferences.trim()) {
      onGenerate(preferences);
    }
  };

  return (
    <Card variant="gradient" className="relative overflow-hidden p-0 mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Content */}
        <div className="flex-1 p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>

          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Your Perfect Meal Plan
            <br />
            <span className="text-primary">Starts Here!</span>
          </h2>

          <p className="text-muted-foreground mb-6 max-w-md">
            Tell us your dietary preferences, goals, and restrictions. Our AI will create a personalized weekly meal plan just for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="E.g., I'm vegetarian, trying to lose weight, allergic to nuts, and I love Mediterranean food..."
              className="w-full h-24 p-4 rounded-xl border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
            />
            
            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                variant="accent" 
                size="xl"
                disabled={isLoading || !preferences.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate My Plan
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-mint-200 border-2 border-card flex items-center justify-center text-xs font-medium text-primary"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">12.5k+</strong> plans created
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Image */}
        <div className="relative lg:w-96 h-64 lg:h-auto">
          <img
            src={heroMeal}
            alt="Healthy meal bowl"
            className="w-full h-full object-cover lg:rounded-r-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent lg:rounded-r-2xl" />
          
          {/* Floating Badge */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Smart Nutrition</p>
                <p className="text-xs text-muted-foreground">Balanced macros included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
