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
    const { historicalData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a food wastage analyst AI. Analyze mess data and provide:
1. Key wastage patterns and trends
2. Top recommendations to reduce wastage
3. Optimal preparation quantities
4. Risk items that consistently have high wastage
5. Best practices based on the data

Be specific and actionable in your recommendations.`;

    const userPrompt = `Analyze this mess data summary:
${JSON.stringify(historicalData, null, 2)}

Provide detailed insights and actionable recommendations to reduce food wastage.`;

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
              name: "analyze_wastage",
              description: "Analyze food wastage patterns",
              parameters: {
                type: "object",
                properties: {
                  analysis: {
                    type: "object",
                    properties: {
                      keyPatterns: {
                        type: "array",
                        items: { type: "string" },
                      },
                      recommendations: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            description: { type: "string" },
                            impact: { type: "string", enum: ["high", "medium", "low"] },
                          },
                        },
                      },
                      riskItems: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            item: { type: "string" },
                            reason: { type: "string" },
                          },
                        },
                      },
                      summary: { type: "string" },
                    },
                  },
                },
                required: ["analysis"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_wastage" } },
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
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    const analysis = toolCall ? JSON.parse(toolCall.function.arguments).analysis : null;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-wastage function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
