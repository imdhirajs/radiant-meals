import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NutritionStats } from "@/components/NutritionStats";
import { MealPlanDisplay, DayPlan } from "@/components/MealPlanDisplay";
import { useToast } from "@/hooks/use-toast";

// Sample meal plan data
const sampleWeekPlan: DayPlan[] = [
  {
    day: "Monday",
    meals: [
      { id: "1", name: "Greek Yogurt Parfait with Berries", type: "breakfast", calories: 320, prepTime: 10 },
      { id: "2", name: "Grilled Chicken Quinoa Bowl", type: "lunch", calories: 520, prepTime: 25 },
      { id: "3", name: "Baked Salmon with Roasted Vegetables", type: "dinner", calories: 580, prepTime: 35 },
      { id: "4", name: "Mixed Nuts & Apple Slices", type: "snack", calories: 180, prepTime: 5 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { id: "5", name: "Avocado Toast with Poached Eggs", type: "breakfast", calories: 380, prepTime: 15 },
      { id: "6", name: "Mediterranean Salad with Feta", type: "lunch", calories: 450, prepTime: 20 },
      { id: "7", name: "Turkey Stir-Fry with Brown Rice", type: "dinner", calories: 540, prepTime: 30 },
      { id: "8", name: "Protein Smoothie", type: "snack", calories: 200, prepTime: 5 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { id: "9", name: "Overnight Oats with Chia Seeds", type: "breakfast", calories: 350, prepTime: 5 },
      { id: "10", name: "Tuna Wrap with Greens", type: "lunch", calories: 480, prepTime: 15 },
      { id: "11", name: "Grilled Shrimp Pasta", type: "dinner", calories: 620, prepTime: 40 },
      { id: "12", name: "Hummus with Veggie Sticks", type: "snack", calories: 150, prepTime: 5 },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { id: "13", name: "Spinach Mushroom Omelette", type: "breakfast", calories: 340, prepTime: 15 },
      { id: "14", name: "Asian Chicken Salad", type: "lunch", calories: 490, prepTime: 20 },
      { id: "15", name: "Beef Tacos with Fresh Salsa", type: "dinner", calories: 580, prepTime: 35 },
      { id: "16", name: "Greek Yogurt with Honey", type: "snack", calories: 160, prepTime: 3 },
    ],
  },
  {
    day: "Friday",
    meals: [
      { id: "17", name: "Banana Protein Pancakes", type: "breakfast", calories: 420, prepTime: 20 },
      { id: "18", name: "Buddha Bowl with Tahini", type: "lunch", calories: 510, prepTime: 25 },
      { id: "19", name: "Herb-Crusted Cod with Quinoa", type: "dinner", calories: 490, prepTime: 30 },
      { id: "20", name: "Trail Mix", type: "snack", calories: 190, prepTime: 2 },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { id: "21", name: "Acai Bowl with Granola", type: "breakfast", calories: 380, prepTime: 10 },
      { id: "22", name: "Grilled Veggie Sandwich", type: "lunch", calories: 440, prepTime: 20 },
      { id: "23", name: "Lemon Herb Chicken with Sweet Potato", type: "dinner", calories: 560, prepTime: 40 },
      { id: "24", name: "Cottage Cheese with Berries", type: "snack", calories: 140, prepTime: 5 },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { id: "25", name: "Eggs Benedict with Hollandaise", type: "breakfast", calories: 480, prepTime: 30 },
      { id: "26", name: "Caprese Salad with Fresh Mozzarella", type: "lunch", calories: 390, prepTime: 15 },
      { id: "27", name: "Roast Chicken with Vegetables", type: "dinner", calories: 620, prepTime: 60 },
      { id: "28", name: "Dark Chocolate & Almonds", type: "snack", calories: 170, prepTime: 2 },
    ],
  },
];

const Index = () => {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async (preferences: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For now, use sample data. In production, this would call an AI API
    setWeekPlan(sampleWeekPlan);
    setSelectedDay(0);
    setIsGenerating(false);
    
    toast({
      title: "Meal Plan Generated! 🎉",
      description: "Your personalized 7-day meal plan is ready.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeNavItem} onItemClick={setActiveNavItem} />
      
      <main className="ml-20 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header userName="Chef" />
          
          <HeroSection onGenerate={handleGeneratePlan} isLoading={isGenerating} />
          
          <NutritionStats />
          
          {weekPlan.length > 0 && (
            <MealPlanDisplay 
              weekPlan={weekPlan} 
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
