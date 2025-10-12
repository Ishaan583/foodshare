import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, Loader2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Analysis {
  keyPatterns: string[];
  recommendations: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }>;
  riskItems: Array<{
    item: string;
    reason: string;
  }>;
  summary: string;
}

const WastageAnalysis = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const historicalData = {
        avgWastageRate: 21.3,
        totalPrepared: 18200,
        totalWasted: 3875,
        mealTypes: {
          Breakfast: { wastage: 18.2, footfall: 2500 },
          Lunch: { wastage: 22.7, footfall: 7000 },
          "Hi-Tea": { wastage: 28.4, footfall: 1700 },
          Dinner: { wastage: 20.1, footfall: 6200 },
        },
        topWastedItems: [
          "Chapati (847 kg)",
          "Steamed Rice (623 kg)",
          "Dal Fry (559 kg)",
          "Fried Rice (487 kg)",
        ],
      };

      const { data, error } = await supabase.functions.invoke("analyze-wastage", {
        body: { historicalData },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete!",
        description: "AI has analyzed patterns and generated insights",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to generate analysis",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medium border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            AI Wastage Analysis
          </CardTitle>
          <CardDescription>
            Get intelligent insights and recommendations to reduce food wastage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-accent hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Patterns Identified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.keyPatterns.map((pattern, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{pattern}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-secondary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge className={getImpactColor(rec.impact)}>
                      {rec.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-medium border-2 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                High-Risk Items
              </CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis.riskItems.map((risk, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <div className="font-semibold text-destructive">{risk.item}</div>
                  <div className="text-sm text-muted-foreground mt-1">{risk.reason}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WastageAnalysis;
