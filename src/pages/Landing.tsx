import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, 
  Sparkles, 
  ShoppingCart, 
  Flame, 
  Leaf, 
  ArrowRight, 
  Play,
  Crown,
  Search,
  ChefHat,
  Apple,
  Salad
} from "lucide-react";
import heroMeal from "@/assets/hero-meal.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
            <Utensils className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Hi, Foodie!</h1>
            <p className="text-sm text-muted-foreground">Let's plan your perfect meals.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-soft border border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search healthy recipes</span>
          </div>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold shadow-card"
          >
            <Crown className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </div>
      </header>

      {/* Main Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        
        {/* Hero Card - Spans 2 columns */}
        <Card className="lg:col-span-2 overflow-hidden bg-card border-0 shadow-card rounded-3xl">
          <div className="relative h-80 md:h-96">
            <img
              src={heroMeal}
              alt="Delicious healthy meal"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-md">
                  Your Healthy<br />Meal Plan<br />Starts Here!
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/80 border-2 border-white flex items-center justify-center text-lg">🧑‍🍳</div>
                    <div className="w-10 h-10 rounded-full bg-secondary/80 border-2 border-white flex items-center justify-center text-lg">👩‍🍳</div>
                    <div className="w-10 h-10 rounded-full bg-accent/80 border-2 border-white flex items-center justify-center text-lg">👨‍🍳</div>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm">Join program with:</p>
                    <p className="text-white font-bold text-lg">5.8k+ <span className="font-normal text-sm">Members</span></p>
                  </div>
                </div>
                
                <Button
                  onClick={() => navigate("/auth")}
                  size="lg"
                  className="bg-card hover:bg-card/90 text-foreground rounded-full px-6 h-14 font-semibold shadow-elevated group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Play button overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-card/90 rounded-full flex items-center justify-center shadow-elevated cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-foreground ml-1" />
              </div>
            </div>
          </div>
        </Card>

        {/* Nutrition Overview Card */}
        <Card className="gradient-hero border-0 shadow-card rounded-3xl overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Daily Nutrition</h3>
                <p className="text-sm text-muted-foreground">Track your healthy eating journey</p>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-lg ${i < 11 ? 'bg-primary/60' : 'bg-card/60'}`}
                />
              ))}
            </div>
            
            <div className="mt-auto">
              <Button className="bg-foreground text-background rounded-full px-5 h-10 text-sm font-medium mb-4">
                Well Done 👍
              </Button>
              
              <div className="flex items-center gap-4 mb-4">
                <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-sm font-semibold">D</button>
                <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">W</button>
                <button className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-sm font-semibold">M</button>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="font-heading text-5xl font-bold text-foreground">2,100</span>
                <span className="text-muted-foreground text-lg mb-2">kcal/Day</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Card 1 - Deep Sleep equivalent: Meal Prep */}
        <Card className="bg-card border-0 shadow-card rounded-3xl">
          <CardContent className="p-6">
            <div className="flex -space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xl">🥗</div>
              <div className="w-10 h-10 rounded-full bg-secondary/40 border-2 border-card flex items-center justify-center text-xl">🍲</div>
              <div className="w-10 h-10 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center text-xl">🥘</div>
            </div>
            
            <h3 className="font-heading text-xl font-bold text-foreground mb-3">
              Experience the Joy<br />of Meal Planning
            </h3>
            
            <Button 
              variant="secondary" 
              className="rounded-full px-4 h-9 text-sm font-medium bg-primary/15 text-primary hover:bg-primary/25 mb-4"
            >
              <ChefHat className="w-4 h-4 mr-2" />
              AI Powered
            </Button>
            
            <p className="text-muted-foreground text-sm mb-4">
              Discover personalized meal plans tailored to your 
              taste, budget, and health goals.
            </p>
            
            <div className="flex items-center justify-between">
              <span className="font-heading text-3xl font-bold text-foreground">2<span className="text-muted-foreground text-lg font-normal">/5</span></span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calories Card */}
        <Card className="bg-card border-0 shadow-card rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-primary" />
                </div>
                <span className="font-heading font-semibold text-foreground">Calories</span>
              </div>
              <span className="font-heading text-xl font-bold">2,350<span className="text-sm font-normal text-muted-foreground">Kcal</span></span>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Balanced nutrition</span>
              <span>Daily goal</span>
            </div>
            
            <div className="font-heading text-4xl font-bold text-foreground mb-4">
              2,040<span className="text-lg font-normal text-muted-foreground">/Kcal</span>
            </div>
            
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded-sm ${i < 24 ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-heading text-lg font-bold text-foreground">269<span className="text-xs font-normal text-muted-foreground"> Gram</span></p>
                <p className="text-xs text-muted-foreground">Carbohydrates</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-foreground">164<span className="text-xs font-normal text-muted-foreground"> Gram</span></p>
                <p className="text-xs text-muted-foreground">Proteins</p>
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-foreground">110<span className="text-xs font-normal text-muted-foreground"> Gram</span></p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Card */}
        <Card className="bg-card border-0 shadow-card rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary/50 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary-foreground" />
                </div>
                <span className="font-heading font-semibold text-foreground">Weekly Goal</span>
              </div>
              <span className="font-heading text-xl font-bold">21<span className="text-sm font-normal text-muted-foreground"> Meals</span></span>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Healthy meals planned</span>
              <span>This week</span>
            </div>
            
            {/* Progress visualization */}
            <div className="relative h-24 mb-4">
              <svg className="w-full h-full" viewBox="0 0 200 80">
                <path
                  d="M 10 60 Q 50 40 80 45 Q 120 50 150 30 Q 180 15 190 25"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="30" r="6" fill="hsl(var(--secondary))" />
              </svg>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="font-heading text-5xl font-bold text-foreground">82<span className="text-xl font-normal text-muted-foreground">%</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Of the weekly</p>
                <p className="text-xs text-muted-foreground">plan completed</p>
                <p className="text-sm font-semibold text-primary mt-1">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Features Row */}
      <div className="max-w-7xl mx-auto mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Leaf, title: "Dietary Plans", desc: "Vegan, Keto & more" },
          { icon: ShoppingCart, title: "Grocery Lists", desc: "Auto-generated" },
          { icon: Apple, title: "Local Cuisine", desc: "Indian, Italian..." },
          { icon: Salad, title: "Fresh Recipes", desc: "Updated weekly" },
        ].map((feature, i) => (
          <Card key={i} className="bg-card border-0 shadow-soft rounded-2xl hover:shadow-card transition-shadow cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-muted-foreground text-sm mb-3">
          Ready to transform your eating habits?
        </p>
        <Button
          onClick={() => navigate("/auth")}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-semibold shadow-card"
        >
          Create Your Free Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Landing;
