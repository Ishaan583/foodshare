import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DonorDashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    expiryHours: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donation Posted!",
      description: "Your food donation has been listed for NGOs to view.",
    });
    setFormData({
      foodType: "",
      quantity: "",
      expiryHours: "",
      location: "",
      description: "",
    });
  };

  const recentDonations = [
    { id: 1, type: "Cooked Rice", quantity: "15 kg", status: "Picked Up", time: "2 hours ago" },
    { id: 2, type: "Fresh Vegetables", quantity: "8 kg", status: "Available", time: "5 hours ago" },
    { id: 3, type: "Bread & Pastries", quantity: "20 kg", status: "Reserved", time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Donor Dashboard</h1>
            <p className="text-muted-foreground">Post your surplus food and track your donations</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Post Donation Form */}
            <Card className="lg:col-span-2 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Post New Donation
                </CardTitle>
                <CardDescription>
                  Share details about the food you'd like to donate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foodType">Food Type</Label>
                      <Select
                        value={formData.foodType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, foodType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cooked">Cooked Food</SelectItem>
                          <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="bakery">Bakery Items</SelectItem>
                          <SelectItem value="packaged">Packaged Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryHours">Best Before (hours)</Label>
                      <Input
                        id="expiryHours"
                        type="number"
                        placeholder="Hours until expiry"
                        value={formData.expiryHours}
                        onChange={(e) =>
                          setFormData({ ...formData, expiryHours: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter address"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Add any relevant information..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90">
                    Post Donation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Donations Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Your latest food donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{donation.type}</p>
                        <p className="text-xs text-muted-foreground">{donation.quantity}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{donation.time}</span>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          donation.status === "Available"
                            ? "bg-primary/10 text-primary"
                            : donation.status === "Reserved"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-hero text-primary-foreground shadow-medium">
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="opacity-90">Total Donations</span>
                    <span className="font-bold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Food Saved</span>
                    <span className="font-bold">1,856 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">People Fed</span>
                    <span className="font-bold">2,340+</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
