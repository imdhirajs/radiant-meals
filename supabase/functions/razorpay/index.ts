import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create admin client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Verify the user's JWT token
    const jwtHeader = req.headers.get("Authorization");
    if (!jwtHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = jwtHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    const { action, subscriptionId, paymentId, signature } = await req.json();
    
    // Use the verified user's ID instead of trusting client-provided userId
    const userId = user.id;

    // Razorpay Basic Auth header
    const razorpayAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    if (action === "create-plan") {
      // Create a plan for ₹1/month
      const planResponse = await fetch("https://api.razorpay.com/v1/plans", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${razorpayAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period: "monthly",
          interval: 1,
          item: {
            name: "Meal Plan Pro",
            amount: 100, // Amount in paise (₹1 = 100 paise)
            currency: "INR",
            description: "Access to personalized AI meal plans",
          },
        }),
      });

      const planData = await planResponse.json();
      
      if (!planResponse.ok) {
        throw new Error(planData.error?.description || "Failed to create plan");
      }

      return new Response(JSON.stringify({ success: true, plan: planData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create-subscription") {
      // First, get or create existing plan
      const plansResponse = await fetch("https://api.razorpay.com/v1/plans", {
        method: "GET",
        headers: {
          "Authorization": `Basic ${razorpayAuth}`,
        },
      });

      const plansData = await plansResponse.json();
      let planId = null;

      // Find existing meal plan or create new one
      const existingPlan = plansData.items?.find((p: any) => 
        p.item.name === "Meal Plan Pro" && p.item.amount === 100
      );

      if (existingPlan) {
        planId = existingPlan.id;
      } else {
        // Create the plan
        const createPlanResponse = await fetch("https://api.razorpay.com/v1/plans", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${razorpayAuth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            period: "monthly",
            interval: 1,
            item: {
              name: "Meal Plan Pro",
              amount: 100,
              currency: "INR",
              description: "Access to personalized AI meal plans",
            },
          }),
        });

        const newPlan = await createPlanResponse.json();
        if (!createPlanResponse.ok) {
          throw new Error(newPlan.error?.description || "Failed to create plan");
        }
        planId = newPlan.id;
      }

      // Create subscription
      const subResponse = await fetch("https://api.razorpay.com/v1/subscriptions", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${razorpayAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          total_count: 12, // 12 months
          customer_notify: 1,
          notes: {
            user_id: userId,
          },
        }),
      });

      const subData = await subResponse.json();

      if (!subResponse.ok) {
        throw new Error(subData.error?.description || "Failed to create subscription");
      }

      // Create or update subscription record in database
      const { error: dbError } = await supabaseAdmin
        .from("subscriptions")
        .upsert({
          user_id: userId,
          razorpay_subscription_id: subData.id,
          razorpay_plan_id: planId,
          status: "pending",
        }, { onConflict: "user_id" });

      if (dbError) {
        console.error("Database error:", dbError);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        subscription: subData,
        keyId: razorpayKeyId 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify-payment") {
      // Verify the payment signature
      const crypto = await import("https://deno.land/std@0.168.0/crypto/mod.ts");
      
      const body = paymentId + "|" + subscriptionId;
      const key = new TextEncoder().encode(razorpayKeySecret);
      const message = new TextEncoder().encode(body);
      
      const cryptoKey = await crypto.crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      
      const signatureBuffer = await crypto.crypto.subtle.sign("HMAC", cryptoKey, message);
      const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      if (expectedSignature !== signature) {
        throw new Error("Invalid payment signature");
      }

      // Update subscription status to active
      const { error: dbError } = await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq("razorpay_subscription_id", subscriptionId);

      if (dbError) {
        throw new Error("Failed to update subscription status");
      }

      return new Response(JSON.stringify({ success: true, verified: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "check-subscription") {
      const { data, error } = await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      const isActive = data?.status === "active";
      
      return new Response(JSON.stringify({ 
        success: true, 
        isSubscribed: isActive,
        subscription: data 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});