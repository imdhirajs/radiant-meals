import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Flame, Droplets, Scale, TrendingUp } from "lucide-react";

interface NutritionStatsProps {
  calories?: number;
  targetCalories?: number;
  water?: number;
  targetWater?: number;
  weight?: number;
  carbs?: number;
  protein?: number;
  fats?: number;
}

export function NutritionStats({
  calories = 1850,
  targetCalories = 2200,
  water = 1.8,
  targetWater = 2.5,
  weight = 72,
  carbs = 245,
  protein = 148,
  fats = 95,
}: NutritionStatsProps) {
  const caloriePercentage = Math.min((calories / targetCalories) * 100, 100);
  const waterPercentage = Math.min((water / targetWater) * 100, 100);
  const waterGlasses = Math.floor((water / targetWater) * 8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Water Intake Card */}
      <Card variant="mint" className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Hydration Status:</p>
            <p className="text-xs text-muted-foreground max-w-32">
              Drinking enough water daily boosts your energy.
            </p>
          </div>
          
          {/* Water Glasses Grid */}
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <Droplets
                key={i}
                className={`w-5 h-5 transition-colors ${
                  i < waterGlasses ? "text-primary" : "text-primary/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
            Well Done 👍
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["D", "W", "M"].map((period, i) => (
              <button
                key={period}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-card/50"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <div className="text-right">
            <p className="text-3xl font-heading font-bold text-foreground">
              {water.toFixed(2)}L
            </p>
            <p className="text-sm text-muted-foreground">/Day</p>
          </div>
        </div>
      </Card>

      {/* Calories Card */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <CardTitle className="text-lg">Calories</CardTitle>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground">{targetCalories.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground ml-1">Kcal</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Daily intake goal</p>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-4xl font-heading font-bold text-foreground mb-2">
            {calories.toLocaleString()}<span className="text-lg font-normal text-muted-foreground">/Kcal</span>
          </p>

          {/* Progress Bar */}
          <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${caloriePercentage}%`,
                background: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 4px, transparent 4px, transparent 8px)",
              }}
            />
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{carbs}</p>
              <p className="text-xs text-muted-foreground">Carbohydrates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{protein}</p>
              <p className="text-xs text-muted-foreground">Proteins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{fats}</p>
              <p className="text-xs text-muted-foreground">Fats</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight Card */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Weight</CardTitle>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground">175</span>
              <span className="text-sm text-muted-foreground ml-1">Cm</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Healthy weight is 65 Kg - 78 Kg</p>
        </CardHeader>

        <CardContent className="p-0">
          {/* Wave Chart Placeholder */}
          <div className="h-20 flex items-center justify-center mb-4">
            <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path
                d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="animate-pulse-soft"
              />
              <path
                d="M0,35 Q25,55 50,35 T100,35 T150,35 T200,35"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="flex items-end justify-between">
            <p className="text-5xl font-heading font-bold text-foreground">
              {weight}<span className="text-xl font-normal text-muted-foreground ml-1">kg</span>
            </p>
            <div className="text-right">
              <div className="flex items-center gap-1 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">On track</span>
              </div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
