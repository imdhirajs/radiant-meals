import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { MealPlanForm } from "@/components/MealPlanForm";
import { MealPlanResult, MealPlanData } from "@/components/MealPlanResult";
import { NutritionStats } from "@/components/NutritionStats";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlanResult, setMealPlanResult] = useState<MealPlanResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "See you next time!",
    });
    navigate("/");
  };

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

      const data = await response.json();
      console.log("N8N Response:", data);
      
      if (data.success && data.data) {
        setMealPlanResult(data as MealPlanResponse);
        toast({
          title: "Meal Plan Generated! 🎉",
          description: `Your personalized ${formData.country} meal plan is ready.`,
        });
      } else if (data.error) {
        console.error("N8N error:", data.error, data.details);
        toast({
          title: "Generation Issue",
          description: data.details || data.error || "The AI response was incomplete. Please try again.",
          variant: "destructive",
        });
      } else {
        throw new Error("Unexpected response format");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Chef";

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Header userName={userName} />
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          
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

export default Dashboard;
