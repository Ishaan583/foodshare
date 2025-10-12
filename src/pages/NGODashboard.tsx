import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NGODashboard = () => {
  const { toast } = useToast();

  const availableDonations = [
    {
      id: 1,
      donor: "Hotel Paradise",
      type: "Cooked Rice & Curry",
      quantity: "25 kg",
      expiryHours: 4,
      location: "MG Road, Bangalore",
      distance: "2.3 km",
    },
    {
      id: 2,
      donor: "Fresh Harvest Market",
      type: "Fresh Vegetables",
      quantity: "40 kg",
      expiryHours: 12,
      location: "HSR Layout, Bangalore",
      distance: "5.1 km",
    },
    {
      id: 3,
      donor: "College Mess",
      type: "Bread & Breakfast Items",
      quantity: "15 kg",
      expiryHours: 6,
      location: "Koramangala, Bangalore",
      distance: "3.7 km",
    },
    {
      id: 4,
      donor: "Event Catering Co.",
      type: "Mixed Food Items",
      quantity: "50 kg",
      expiryHours: 3,
      location: "Indiranagar, Bangalore",
      distance: "4.2 km",
    },
  ];

  const handleRequest = (donorName: string) => {
    toast({
      title: "Request Sent!",
      description: `Your request for food from ${donorName} has been submitted.`,
    });
  };

  const getUrgencyColor = (hours: number) => {
    if (hours <= 4) return "text-destructive";
    if (hours <= 8) return "text-secondary";
    return "text-primary";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">NGO Dashboard</h1>
            <p className="text-muted-foreground">Browse and request available food donations</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Available Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">247</div>
                <p className="text-xs text-muted-foreground mt-1">donations</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Food
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1.8K</div>
                <p className="text-xs text-muted-foreground mt-1">kg available</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Your Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">12</div>
                <p className="text-xs text-muted-foreground mt-1">this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  People Fed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">3.2K</div>
                <p className="text-xs text-muted-foreground mt-1">this month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Available Donations</CardTitle>
              <CardDescription>Request food donations from nearby donors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {availableDonations.map((donation) => (
                  <Card key={donation.id} className="border-border hover:shadow-soft transition-all">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold">{donation.donor}</h3>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {donation.distance}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{donation.type}</p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className="flex items-center gap-1">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                {donation.quantity}
                              </span>
                              <span className={`flex items-center gap-1 font-medium ${getUrgencyColor(donation.expiryHours)}`}>
                                <Clock className="h-4 w-4" />
                                {donation.expiryHours}h left
                              </span>
                              <span className="text-muted-foreground">
                                {donation.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRequest(donation.donor)}
                          className="bg-gradient-hero hover:opacity-90 whitespace-nowrap"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
