import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Clock, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  ChefHat,
  ShoppingCart,
  Lightbulb,
  PieChart,
  Wallet
} from "lucide-react";
import { useState } from "react";

export interface MealRecipe {
  ingredients: string[];
  instructions: string[];
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  recipe: MealRecipe;
}

export interface DayMeals {
  breakfast?: Meal;
  lunch?: Meal;
  snack?: Meal;
  dinner?: Meal;
}

export interface DayPlan {
  dayName: string;
  meals: DayMeals;
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface GroceryList {
  proteins: string[];
  vegetables: string[];
  fruits: string[];
  grains: string[];
  dairy: string[];
  spicesAndCondiments: string[];
  others: string[];
}

export interface WeeklyMacros {
  averageDailyCalories: number;
  averageDailyProtein: number;
  averageDailyCarbs: number;
  averageDailyFats: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export interface BudgetEstimate {
  currency: string;
  amount: number;
  breakdown: {
    proteins: number;
    vegetables: number;
    fruits: number;
    grains: number;
    dairy: number;
    others: number;
  };
}

export interface MealPlanData {
  mealPlan: Record<string, DayPlan>;
  groceryList: GroceryList;
  weeklyMacros: WeeklyMacros;
  tips: string[];
  estimatedWeeklyBudget: BudgetEstimate;
}

interface MealPlanResultProps {
  data: MealPlanData;
  userPreferences: {
    country: string;
    dietaryPreference: string;
    healthGoal: string;
  };
}

const mealTypeColors: Record<string, string> = {
  breakfast: "bg-orange-100 text-orange-700",
  lunch: "bg-green-100 text-green-700",
  snack: "bg-purple-100 text-purple-700",
  dinner: "bg-blue-100 text-blue-700",
};

const mealTypeIcons: Record<string, string> = {
  breakfast: "🍳",
  lunch: "🥗",
  snack: "🍎",
  dinner: "🍽️",
};

export function MealPlanResult({ data, userPreferences }: MealPlanResultProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<{ type: string; meal: Meal } | null>(null);
  const [activeTab, setActiveTab] = useState<"plan" | "grocery" | "macros">("plan");

  const days = Object.keys(data.mealPlan);
  const currentDay = data.mealPlan[days[selectedDayIndex]];

  const meals = currentDay?.meals 
    ? Object.entries(currentDay.meals).filter(([_, meal]) => meal) as [string, Meal][]
    : [];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "plan" 
              ? "bg-card text-foreground shadow-soft" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ChefHat className="w-4 h-4" />
          Meal Plan
        </button>
        <button
          onClick={() => setActiveTab("grocery")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "grocery" 
              ? "bg-card text-foreground shadow-soft" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Grocery List
        </button>
        <button
          onClick={() => setActiveTab("macros")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "macros" 
              ? "bg-card text-foreground shadow-soft" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <PieChart className="w-4 h-4" />
          Nutrition
        </button>
      </div>

      {/* Meal Plan Tab */}
      {activeTab === "plan" && (
        <Card className="p-6">
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-1">Your 7-Day {userPreferences.country} Meal Plan</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {userPreferences.dietaryPreference} • {userPreferences.healthGoal.replace("_", " ")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDayIndex(Math.max(0, selectedDayIndex - 1))}
                  disabled={selectedDayIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDayIndex(Math.min(days.length - 1, selectedDayIndex + 1))}
                  disabled={selectedDayIndex === days.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Day Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDayIndex(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  index === selectedDayIndex
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-mint-200"
                }`}
              >
                {data.mealPlan[day]?.dayName || day}
              </button>
            ))}
          </div>

          {/* Daily Totals */}
          {currentDay?.dailyTotals && (
            <div className="grid grid-cols-4 gap-4 mb-6 p-4 gradient-card-mint rounded-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{currentDay.dailyTotals.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{currentDay.dailyTotals.protein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{currentDay.dailyTotals.carbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{currentDay.dailyTotals.fats}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          )}

          {/* Meals Grid */}
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meals.map(([type, meal]) => (
                <Card 
                  key={type} 
                  variant="soft" 
                  className="p-4 hover:scale-[1.02] cursor-pointer transition-transform"
                  onClick={() => setSelectedMeal({ type, meal })}
                >
                  <div className="flex gap-4">
                    {/* Meal Icon */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{mealTypeIcons[type] || "🍽️"}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Meal Type Badge */}
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mb-1 ${mealTypeColors[type] || "bg-gray-100 text-gray-700"}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>

                      {/* Meal Name */}
                      <h4 className="font-heading font-semibold text-foreground line-clamp-1">
                        {meal.name}
                      </h4>

                      {/* Meal Description */}
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                        {meal.description}
                      </p>

                      {/* Meal Stats */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span>{meal.calories} kcal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{meal.prepTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grocery List Tab */}
      {activeTab === "grocery" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(data.groceryList).map(([category, items]) => (
            items && items.length > 0 && (
              <Card key={category} className="p-4">
                <h3 className="font-heading font-semibold text-foreground capitalize mb-3 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          ))}

          {/* Budget Card */}
          {data.estimatedWeeklyBudget && (
            <Card variant="mint" className="p-4">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                Estimated Weekly Budget
              </h3>
              <p className="text-3xl font-bold text-foreground mb-3">
                {data.estimatedWeeklyBudget.currency} {data.estimatedWeeklyBudget.amount.toLocaleString()}
              </p>
              <div className="space-y-2">
                {Object.entries(data.estimatedWeeklyBudget.breakdown).map(([cat, amt]) => (
                  <div key={cat} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{cat}</span>
                    <span className="text-foreground font-medium">{data.estimatedWeeklyBudget.currency} {amt}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Nutrition Tab */}
      {activeTab === "macros" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Macros */}
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Weekly Nutrition Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-xl text-center">
                  <p className="text-3xl font-bold text-foreground">{data.weeklyMacros.averageDailyCalories}</p>
                  <p className="text-sm text-muted-foreground">Avg Daily Calories</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl text-center">
                  <p className="text-3xl font-bold text-foreground">{data.weeklyMacros.averageDailyProtein}g</p>
                  <p className="text-sm text-muted-foreground">Avg Daily Protein</p>
                </div>
              </div>

              {/* Macro Distribution */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="text-foreground font-medium">{data.weeklyMacros.proteinPercentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${data.weeklyMacros.proteinPercentage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Carbohydrates</span>
                    <span className="text-foreground font-medium">{data.weeklyMacros.carbsPercentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${data.weeklyMacros.carbsPercentage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Fats</span>
                    <span className="text-foreground font-medium">{data.weeklyMacros.fatsPercentage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${data.weeklyMacros.fatsPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          {data.tips && data.tips.length > 0 && (
            <Card className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Nutrition Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {data.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Recipe Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMeal(null)}>
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <CardHeader className="p-0 mb-4">
              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mb-2 w-fit ${mealTypeColors[selectedMeal.type]}`}>
                {selectedMeal.type.charAt(0).toUpperCase() + selectedMeal.type.slice(1)}
              </span>
              <CardTitle className="text-2xl">{selectedMeal.meal.name}</CardTitle>
              <p className="text-muted-foreground">{selectedMeal.meal.description}</p>
            </CardHeader>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6 p-3 bg-secondary rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedMeal.meal.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedMeal.meal.protein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedMeal.meal.carbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{selectedMeal.meal.fats}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                Ingredients
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {selectedMeal.meal.recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-primary" />
                Instructions
              </h4>
              <ol className="space-y-3">
                {selectedMeal.meal.recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Button variant="outline" className="w-full" onClick={() => setSelectedMeal(null)}>
              Close Recipe
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
