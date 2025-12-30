import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Globe, 
  Leaf, 
  Target, 
  Wallet,
  AlertTriangle,
  Utensils,
  Flame
} from "lucide-react";
import heroMeal from "@/assets/hero-meal.jpg";

interface MealPlanFormData {
  country: string;
  dietaryPreference: string;
  healthGoal: string;
  budget: string;
  allergies: string[];
  mealsPerDay: number;
  calorieTarget: number;
}

interface MealPlanFormProps {
  onGenerate: (data: MealPlanFormData) => void;
  isLoading?: boolean;
}

const countries = [
  "India", "USA", "UK", "Mexico", "Italy", "Japan", "China", "Thailand",
  "France", "Germany", "Spain", "Brazil", "Australia", "Canada", 
  "South Korea", "Vietnam", "Greece", "Turkey", "Indonesia", "Pakistan"
];

const dietaryPreferences = [
  { value: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { value: "vegan", label: "Vegan", icon: "🌱" },
  { value: "non-vegetarian", label: "Non-Vegetarian", icon: "🍗" },
  { value: "pescatarian", label: "Pescatarian", icon: "🐟" },
  { value: "keto", label: "Keto", icon: "🥑" },
  { value: "paleo", label: "Paleo", icon: "🥩" },
];

const healthGoals = [
  { value: "weight_loss", label: "Weight Loss", description: "Calorie deficit, high protein" },
  { value: "muscle_gain", label: "Muscle Gain", description: "High protein, calorie surplus" },
  { value: "maintenance", label: "Maintenance", description: "Balanced macros" },
  { value: "energy_boost", label: "Energy Boost", description: "Complex carbs, B-vitamins" },
  { value: "heart_health", label: "Heart Health", description: "Low sodium, omega-3 rich" },
  { value: "diabetes_friendly", label: "Diabetes Friendly", description: "Low glycemic index" },
];

const budgetOptions = [
  { value: "low", label: "Budget Friendly", icon: "💰" },
  { value: "medium", label: "Moderate", icon: "💰💰" },
  { value: "high", label: "Premium", icon: "💰💰💰" },
];

const commonAllergies = [
  "Nuts", "Dairy", "Gluten", "Eggs", "Soy", "Shellfish", "Fish", "Sesame"
];

export function MealPlanForm({ onGenerate, isLoading = false }: MealPlanFormProps) {
  const [formData, setFormData] = useState<MealPlanFormData>({
    country: "India",
    dietaryPreference: "vegetarian",
    healthGoal: "maintenance",
    budget: "medium",
    allergies: [],
    mealsPerDay: 4,
    calorieTarget: 2000,
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const toggleAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  return (
    <Card variant="gradient" className="relative overflow-hidden p-0 mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Form Content */}
        <div className="flex-1 p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Meal Planning</span>
          </div>

          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
            Your Perfect Meal Plan
            <br />
            <span className="text-primary">Starts Here!</span>
          </h2>

          <p className="text-muted-foreground mb-6">
            Personalized 7-day meal plans with recipes, grocery lists & macro tracking.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Country & Diet */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                {/* Country Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Select Your Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Leaf className="w-4 h-4 text-primary" />
                    Dietary Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {dietaryPreferences.map(pref => (
                      <button
                        key={pref.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, dietaryPreference: pref.value }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.dietaryPreference === pref.value
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/30 text-muted-foreground"
                        }`}
                      >
                        <span className="text-xl mb-1 block">{pref.icon}</span>
                        <span className="text-xs font-medium">{pref.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="button" variant="accent" size="lg" onClick={() => setStep(2)} className="w-full">
                  Next: Goals & Budget
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Goals & Budget */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                {/* Health Goal */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Target className="w-4 h-4 text-primary" />
                    Health Goal
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {healthGoals.map(goal => (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, healthGoal: goal.value }))}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          formData.healthGoal === goal.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <p className="text-sm font-semibold text-foreground">{goal.label}</p>
                        <p className="text-xs text-muted-foreground">{goal.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    Budget Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {budgetOptions.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, budget: opt.value }))}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.budget === opt.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <span className="text-lg mb-1 block">{opt.icon}</span>
                        <span className="text-xs font-medium text-foreground">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="button" variant="accent" size="lg" onClick={() => setStep(3)} className="flex-1">
                    Next: Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Details & Allergies */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                {/* Calories & Meals */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      Daily Calories
                    </label>
                    <input
                      type="number"
                      value={formData.calorieTarget}
                      onChange={(e) => setFormData(prev => ({ ...prev, calorieTarget: parseInt(e.target.value) || 2000 }))}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      min={1200}
                      max={4000}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Utensils className="w-4 h-4 text-primary" />
                      Meals/Day
                    </label>
                    <select
                      value={formData.mealsPerDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, mealsPerDay: parseInt(e.target.value) }))}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    >
                      {[3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} meals</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Allergies / Restrictions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonAllergies.map(allergy => (
                      <button
                        key={allergy}
                        type="button"
                        onClick={() => toggleAllergy(allergy)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.allergies.includes(allergy)
                            ? "bg-destructive/20 text-destructive border-2 border-destructive/30"
                            : "bg-secondary text-secondary-foreground hover:bg-mint-200"
                        }`}
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="accent" 
                    size="lg" 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate My Plan
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/50" : "w-4 bg-border"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">Step {step} of 3</span>
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:w-96 h-64 lg:h-auto hidden lg:block">
          <img
            src={heroMeal}
            alt="Healthy meal bowl"
            className="w-full h-full object-cover lg:rounded-r-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent lg:rounded-r-2xl" />
          
          {/* Floating Stats */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Smart AI Nutrition</p>
                <p className="text-xs text-muted-foreground">Balanced macros & recipes</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 flex-1 text-center">
                <p className="text-lg font-bold text-foreground">20+</p>
                <p className="text-xs text-muted-foreground">Cuisines</p>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 flex-1 text-center">
                <p className="text-lg font-bold text-foreground">7</p>
                <p className="text-xs text-muted-foreground">Day Plans</p>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 flex-1 text-center">
                <p className="text-lg font-bold text-foreground">∞</p>
                <p className="text-xs text-muted-foreground">Recipes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
