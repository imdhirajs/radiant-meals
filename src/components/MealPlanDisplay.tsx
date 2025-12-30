import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  prepTime: number;
  image?: string;
  description?: string;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

interface MealPlanDisplayProps {
  weekPlan: DayPlan[];
  selectedDay: number;
  onDayChange: (day: number) => void;
}

const mealTypeColors = {
  breakfast: "bg-orange-100 text-orange-700",
  lunch: "bg-green-100 text-green-700",
  dinner: "bg-blue-100 text-blue-700",
  snack: "bg-purple-100 text-purple-700",
};

export function MealPlanDisplay({ weekPlan, selectedDay, onDayChange }: MealPlanDisplayProps) {
  const currentDayPlan = weekPlan[selectedDay];

  if (!currentDayPlan) {
    return null;
  }

  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl mb-1">Your Weekly Meal Plan</CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-generated based on your preferences
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDayChange(Math.max(0, selectedDay - 1))}
              disabled={selectedDay === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDayChange(Math.min(weekPlan.length - 1, selectedDay + 1))}
              disabled={selectedDay === weekPlan.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Day Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekPlan.map((day, index) => (
          <button
            key={day.day}
            onClick={() => onDayChange(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              index === selectedDay
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-mint-200"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentDayPlan.meals.map((meal) => (
            <Card key={meal.id} variant="soft" className="p-4 hover:scale-[1.02] cursor-pointer">
              {/* Meal Image Placeholder */}
              <div className="h-32 rounded-xl bg-gradient-to-br from-mint-100 to-mint-200 mb-3 flex items-center justify-center">
                <span className="text-4xl">
                  {meal.type === "breakfast" ? "🍳" : 
                   meal.type === "lunch" ? "🥗" : 
                   meal.type === "dinner" ? "🍽️" : "🍎"}
                </span>
              </div>

              {/* Meal Type Badge */}
              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mb-2 ${mealTypeColors[meal.type]}`}>
                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
              </span>

              {/* Meal Name */}
              <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                {meal.name}
              </h4>

              {/* Meal Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>{meal.calories} kcal</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{meal.prepTime} min</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
