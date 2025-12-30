import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Crown, Check, Sparkles, Zap, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export function SubscriptionGate({ children }: SubscriptionGateProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkSubscription = async () => {
    if (!user) return;

    try {
      console.log("Checking subscription for user:", user.id);
      const { data, error } = await supabase.functions.invoke("razorpay", {
        body: { action: "check-subscription" },
      });

      console.log("Subscription check response:", data, error);

      if (error) {
        // Try to get more details from the error
        const errorData = await error.context?.json?.() || {};
        console.error("Function error details:", errorData);
        throw error;
      }
      setIsSubscribed(data?.isSubscribed ?? false);
    } catch (error: any) {
      console.error("Error checking subscription:", error);
      // For now, allow access if there's an error (graceful degradation)
      // In production, you might want to block access instead
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return;
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke("razorpay", {
        body: { action: "create-subscription", userId: user.id },
      });

      if (error) throw error;

      const options = {
        key: data.keyId,
        subscription_id: data.subscription.id,
        name: "Meal Plan Pro",
        description: "Monthly Subscription - ₹1/month",
        image: "/placeholder.svg",
        handler: async function (response: any) {
          // Verify payment
          try {
            const verifyResult = await supabase.functions.invoke("razorpay", {
              body: {
                action: "verify-payment",
                subscriptionId: response.razorpay_subscription_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
            });

            if (verifyResult.error) throw verifyResult.error;

            toast({
              title: "Subscription Activated! 🎉",
              description: "Welcome to Meal Plan Pro! Enjoy your personalized meal plans.",
            });

            setIsSubscribed(true);
          } catch (err) {
            console.error("Verification error:", err);
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if payment was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#84a98c",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Could not create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isSubscribed) {
    return <>{children}</>;
  }

  // Show subscription paywall
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-6">
      <Card className="max-w-lg w-full p-8 rounded-3xl shadow-soft border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Unlock Meal Plan Pro
          </h1>
          <p className="text-muted-foreground">
            Get personalized AI-powered meal plans tailored to your preferences
          </p>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 mb-8 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-foreground">₹1</span>
            <span className="text-muted-foreground text-lg">/month</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Cancel anytime. No hidden charges.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {[
            { icon: Sparkles, text: "AI-powered personalized meal plans" },
            { icon: Zap, text: "Instant recipe recommendations" },
            { icon: Calendar, text: "7-day meal planning with grocery lists" },
            { icon: Check, text: "Nutrition tracking & macro analysis" },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <Button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full h-14 rounded-full text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Subscribe Now
            </span>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Secured by Razorpay. Your payment info is safe.
        </p>
      </Card>
    </div>
  );
}