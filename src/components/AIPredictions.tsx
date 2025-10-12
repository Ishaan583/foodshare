import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingDown, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Prediction {
  expectedFootfall: number;
  items: Array<{
    name: string;
    recommendedQty: number;
    predictedWastage: number;
  }>;
  overallWastageRate: number;
  confidence: "high" | "medium" | "low";
  insights: string;
}

const AIPredictions = () => {
  const { toast } = useToast();
  const [mealType, setMealType] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const handlePredict = async () => {
    if (!mealType || !dayOfWeek) {
      toast({
        title: "Missing Information",
        description: "Please select both meal type and day of week",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const menuItems =
        mealType === "Breakfast"
          ? ["Chhole", "Bhature", "Masala Daliya", "Corn flakes", "Boiled eggs"]
          : mealType === "Lunch"
          ? ["Steamed Rice", "Dal", "Mixed Vegetables", "Chapati", "Salad"]
          : mealType === "Hi-Tea"
          ? ["Samosa", "Tea", "Coffee"]
          : ["Biryani", "Dal Fry", "Chapati", "Raita", "Salad"];

      const { data, error } = await supabase.functions.invoke("predict-demand", {
        body: { mealType, dayOfWeek, menuItems },
      });

      if (error) throw error;

      setPrediction(data.predictions);
      toast({
        title: "Prediction Generated!",
        description: "AI has analyzed the patterns and generated predictions",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "Failed to generate predictions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-primary/10 text-primary";
      case "medium":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medium border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Demand Predictions
          </CardTitle>
          <CardDescription>
            Machine learning predictions for optimal food preparation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meal Type</label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Hi-Tea">Hi-Tea</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Day of Week</label>
              <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-gradient-hero hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Patterns...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate Predictions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <>
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prediction Results</CardTitle>
                <Badge className={getConfidenceColor(prediction.confidence)}>
                  {prediction.confidence.toUpperCase()} CONFIDENCE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Expected Footfall</div>
                  <div className="text-3xl font-bold text-primary">
                    {prediction.expectedFootfall}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">people</div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Predicted Wastage</div>
                  <div className="text-3xl font-bold text-destructive">
                    {prediction.overallWastageRate}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">of total prepared</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Recommended Quantities
                </h4>
                <div className="space-y-2">
                  {prediction.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-bold">{item.recommendedQty} kg</span>
                        <Badge
                          variant="outline"
                          className={
                            item.predictedWastage > 25
                              ? "border-destructive text-destructive"
                              : item.predictedWastage > 15
                              ? "border-secondary text-secondary"
                              : "border-primary text-primary"
                          }
                        >
                          {item.predictedWastage}% waste
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-accent">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary-foreground">
                  <TrendingDown className="h-4 w-4" />
                  AI Insights
                </h4>
                <p className="text-sm text-primary-foreground/90">{prediction.insights}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AIPredictions;
