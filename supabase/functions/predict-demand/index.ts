import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mealType, dayOfWeek, menuItems } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a food demand prediction AI for a large institutional mess. Analyze patterns and predict:
1. Expected footfall for the meal (IMPORTANT: Base footfall ranges are 4000-6000 people for weekdays, 3000-4500 for weekends)
2. Optimal quantity to prepare for each menu item (in kg) - Calculate as footfall × per-person consumption
3. Predicted wastage percentage
4. Confidence level (high/medium/low)

Base your predictions on these patterns:
- Weekdays: 4500-6000 footfall
- Weekends: 3000-4500 footfall (25-35% less than weekdays)
- Breakfast: 4000-5000 people, wastage 18-20%
- Lunch: 5000-6000 people, wastage 21-23%
- Dinner: 4500-5500 people, wastage 21-23%
- Hi-Tea: 3500-4000 people, wastage 28%

Per-person consumption guidelines:
- Rice/Main dish: 0.15-0.20 kg per person
- Dal/Curry: 0.12-0.15 kg per person
- Chapati: 0.08-0.10 kg per person (3-4 pieces)
- Vegetables: 0.10-0.12 kg per person
- Accompaniments (Chutney, Pickle): 0.02-0.03 kg per person

Calculate quantities as: (footfall × per-person consumption) + (wastage buffer)
Return realistic large-scale predictions.`;

    const userPrompt = `Predict demand for:
- Day: ${dayOfWeek}
- Meal Type: ${mealType}
- Menu Items: ${menuItems.join(", ")}

Provide realistic predictions based on typical mess patterns.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "predict_demand",
              description: "Predict food demand and wastage",
              parameters: {
                type: "object",
                properties: {
                  predictions: {
                    type: "object",
                    properties: {
                      expectedFootfall: { type: "number" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            recommendedQty: { type: "number" },
                            predictedWastage: { type: "number" },
                          },
                        },
                      },
                      overallWastageRate: { type: "number" },
                      confidence: { type: "string", enum: ["high", "medium", "low"] },
                      insights: { type: "string" },
                    },
                  },
                },
                required: ["predictions"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "predict_demand" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI prediction failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    const predictions = toolCall ? JSON.parse(toolCall.function.arguments).predictions : null;

    return new Response(JSON.stringify({ predictions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in predict-demand function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
