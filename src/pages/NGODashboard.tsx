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
      donor: "Hotel Rajputana Palace",
      type: "Cooked Rice & Curry",
      quantity: "25 kg",
      expiryHours: 4,
      location: "MI Road, Jaipur",
      distance: "2.3 km",
    },
    {
      id: 2,
      donor: "Fresh Harvest Market",
      type: "Fresh Vegetables",
      quantity: "40 kg",
      expiryHours: 12,
      location: "C-Scheme, Jaipur",
      distance: "5.1 km",
    },
    {
      id: 3,
      donor: "Manipal University Mess",
      type: "Bread & Breakfast Items",
      quantity: "15 kg",
      expiryHours: 6,
      location: "Malviya Nagar, Jaipur",
      distance: "3.7 km",
    },
    {
      id: 4,
      donor: "Event Catering Co.",
      type: "Mixed Food Items",
      quantity: "50 kg",
      expiryHours: 3,
      location: "Vaishali Nagar, Jaipur",
      distance: "4.2 km",
    },
  ];

  const nearbyHotels = [
    {
      id: 1,
      name: "The Oberoi Rajvilas",
      location: "Goner Road, Jaipur",
      distance: "3.5 km",
      rating: 4.8,
      contact: "+91-141-2680101",
    },
    {
      id: 2,
      name: "Fairmont Jaipur",
      location: "2 Riico Kukas, Jaipur",
      distance: "4.2 km",
      rating: 4.7,
      contact: "+91-141-2332200",
    },
    {
      id: 3,
      name: "ITC Rajputana",
      location: "Palace Road, Jaipur",
      distance: "1.8 km",
      rating: 4.6,
      contact: "+91-141-5100100",
    },
    {
      id: 4,
      name: "Trident Jaipur",
      location: "Amber Fort Road, Jaipur",
      distance: "6.1 km",
      rating: 4.5,
      contact: "+91-141-2670101",
    },
    {
      id: 5,
      name: "Rambagh Palace",
      location: "Bhawani Singh Road, Jaipur",
      distance: "2.5 km",
      rating: 4.9,
      contact: "+91-141-2211919",
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

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Available Donations</CardTitle>
                <CardDescription>Request food donations from nearby donors in Jaipur</CardDescription>
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

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Nearby Hotels in Jaipur</CardTitle>
                <CardDescription>Partner hotels for food collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {nearbyHotels.map((hotel) => (
                    <Card key={hotel.id} className="border-border hover:shadow-soft transition-all">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{hotel.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                ⭐ {hotel.rating}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {hotel.location} • {hotel.distance}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                📞 {hotel.contact}
                              </p>
                            </div>
                          </div>
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
    </div>
  );
};

export default NGODashboard;
