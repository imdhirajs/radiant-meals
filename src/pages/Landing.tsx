import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Sparkles, ShoppingCart, HeartPulse, ChefHat, Leaf, ArrowRight } from "lucide-react";
import heroMeal from "@/assets/hero-meal.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Plans",
      description: "Smart meal plans tailored to your preferences, goals, and dietary needs.",
    },
    {
      icon: ShoppingCart,
      title: "Grocery Lists",
      description: "Automatic shopping lists organized by category for easy grocery runs.",
    },
    {
      icon: HeartPulse,
      title: "Nutrition Tracking",
      description: "Detailed nutritional breakdown for every meal to help you stay on track.",
    },
    {
      icon: Leaf,
      title: "Dietary Support",
      description: "Support for vegetarian, vegan, keto, and many other dietary preferences.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">MealPlan AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-primary"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <ChefHat className="w-4 h-4" />
                AI-Powered Meal Planning
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Personalized Meal Plans,{" "}
                <span className="text-primary">Made Simple</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Let AI create customized meal plans based on your cuisine preferences, 
                dietary goals, and budget. Get complete grocery lists and nutrition info instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg"
                >
                  Start Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="h-14 px-8 text-lg border-border text-foreground hover:bg-muted"
                >
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Free to try
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img
                src={heroMeal}
                alt="Delicious healthy meal"
                className="relative rounded-3xl shadow-card w-full h-auto object-cover aspect-square"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">Weekly Plan</p>
                    <p className="text-sm text-muted-foreground">21 meals ready</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <HeartPulse className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">1800 kcal</p>
                    <p className="text-sm text-muted-foreground">Daily target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Better Eating
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI considers your preferences, allergies, budget, and health goals 
              to create the perfect meal plan just for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-border/50">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Eating Habits?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already enjoying personalized, 
              healthy meal plans tailored just for them.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Utensils className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">MealPlan AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MealPlan AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
