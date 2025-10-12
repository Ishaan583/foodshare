import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp, Users, Package } from "lucide-react";
import AIPredictions from "@/components/AIPredictions";
import WastageAnalysis from "@/components/WastageAnalysis";

const Analytics = () => {
  const wastageByMealType = [
    { meal: "Breakfast", wastage: 18.2, color: "bg-primary" },
    { meal: "Lunch", wastage: 22.7, color: "bg-secondary" },
    { meal: "Hi-Tea", wastage: 28.4, color: "bg-accent" },
    { meal: "Dinner", wastage: 20.1, color: "bg-destructive" },
  ];

  const topWastedItems = [
    { item: "Chapati", quantity: "847.93 kg", percentage: 11.6 },
    { item: "Steamed Rice", quantity: "623.45 kg", percentage: 10.2 },
    { item: "Dal Fry", quantity: "559.23 kg", percentage: 9.8 },
    { item: "Fried Rice", quantity: "487.91 kg", percentage: 8.9 },
    { item: "Mixed Veg Curry", quantity: "412.56 kg", percentage: 7.4 },
  ];

  const weeklyTrends = [
    { day: "Mon", wastage: 22, served: 78 },
    { day: "Tue", wastage: 19, served: 81 },
    { day: "Wed", wastage: 24, served: 76 },
    { day: "Thu", wastage: 18, served: 82 },
    { day: "Fri", wastage: 21, served: 79 },
    { day: "Sat", wastage: 25, served: 75 },
    { day: "Sun", wastage: 20, served: 80 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Food Wastage Analytics</h1>
            <p className="text-muted-foreground">
              Insights from Bluedove Mess operations data
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Avg Wastage Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">21.3%</div>
                <p className="text-xs text-muted-foreground mt-1">across all meals</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Total Food Prepared
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">18.2K</div>
                <p className="text-xs text-muted-foreground mt-1">kg this month</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Footfall
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">47.2K</div>
                <p className="text-xs text-muted-foreground mt-1">people served</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Potential Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">3.9K</div>
                <p className="text-xs text-muted-foreground mt-1">kg can be donated</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Wastage by Meal Type */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Wastage by Meal Type</CardTitle>
                <CardDescription>Average wastage percentage across meal times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wastageByMealType.map((meal) => (
                  <div key={meal.meal} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{meal.meal}</span>
                      <span className="text-muted-foreground">{meal.wastage}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${meal.color} transition-all duration-500`}
                        style={{ width: `${meal.wastage * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Weekly Consumption Trends</CardTitle>
                <CardDescription>Food served vs wasted throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyTrends.map((day) => (
                    <div key={day.day} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <div className="flex gap-4 text-xs">
                          <span className="text-primary">Served: {day.served}%</span>
                          <span className="text-destructive">Waste: {day.wastage}%</span>
                        </div>
                      </div>
                      <div className="flex gap-1 h-3">
                        <div
                          className="bg-primary rounded-l-full transition-all duration-500"
                          style={{ width: `${day.served}%` }}
                        />
                        <div
                          className="bg-destructive rounded-r-full transition-all duration-500"
                          style={{ width: `${day.wastage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Wasted Items */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Top Wasted Menu Items</CardTitle>
              <CardDescription>
                Items with highest wastage - potential for donation optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topWastedItems.map((item, index) => (
                  <div
                    key={item.item}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.item}</p>
                      <p className="text-sm text-muted-foreground">{item.quantity} wasted</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-destructive">{item.percentage}%</div>
                      <div className="text-xs text-muted-foreground">of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Predictions Section */}
          <Card className="mt-6 shadow-large">
            <CardHeader>
              <CardTitle className="text-2xl">AI-Powered Intelligence</CardTitle>
              <CardDescription>
                Machine learning predictions and insights to optimize food distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="predictions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="predictions">Demand Predictions</TabsTrigger>
                  <TabsTrigger value="analysis">Wastage Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="predictions" className="mt-6">
                  <AIPredictions />
                </TabsContent>
                <TabsContent value="analysis" className="mt-6">
                  <WastageAnalysis />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
