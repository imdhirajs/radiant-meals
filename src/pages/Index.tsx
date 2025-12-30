import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MealPlanForm } from "@/components/MealPlanForm";
import { MealPlanResult, MealPlanData } from "@/components/MealPlanResult";
import { NutritionStats } from "@/components/NutritionStats";
import { useToast } from "@/hooks/use-toast";

// N8N Workflow webhook URL
const N8N_WEBHOOK_URL = "https://n8n.srv1057145.hstgr.cloud/webhook/meal-plan-generator";

interface MealPlanFormData {
  country: string;
  dietaryPreference: string;
  healthGoal: string;
  budget: string;
  allergies: string[];
  mealsPerDay: number;
  calorieTarget: number;
}

interface MealPlanResponse {
  success: boolean;
  generatedAt: string;
  userPreferences: {
    country: string;
    dietaryPreference: string;
    healthGoal: string;
    budget: string;
    calorieTarget: number;
    allergies: string[];
  };
  data: MealPlanData;
}

const Index = () => {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlanResult, setMealPlanResult] = useState<MealPlanResponse | null>(null);
  const { toast } = useToast();

  const handleGeneratePlan = async (formData: MealPlanFormData) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MealPlanResponse = await response.json();
      
      if (data.success) {
        setMealPlanResult(data);
        toast({
          title: "Meal Plan Generated! 🎉",
          description: `Your personalized ${formData.country} meal plan is ready.`,
        });
      } else {
        throw new Error("Failed to generate meal plan");
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Generation Failed",
        description: "Could not connect to the meal plan generator. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeNavItem} onItemClick={setActiveNavItem} />
      
      <main className="ml-20 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header userName="Chef" />
          
          {!mealPlanResult ? (
            <>
              <MealPlanForm onGenerate={handleGeneratePlan} isLoading={isGenerating} />
              <NutritionStats />
            </>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Your Personalized Meal Plan
                  </h2>
                  <p className="text-muted-foreground">
                    Generated on {new Date(mealPlanResult.generatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setMealPlanResult(null)}
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  ← Generate New Plan
                </button>
              </div>
              
              <MealPlanResult 
                data={mealPlanResult.data}
                userPreferences={mealPlanResult.userPreferences}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
