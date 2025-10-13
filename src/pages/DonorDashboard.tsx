import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Package, MapPin, Loader2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Donation {
  id: string;
  food_type: string;
  quantity: number;
  unit: string;
  status: string;
  created_at: string;
}

const DonorDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [donationForm, setDonationForm] = useState({
    foodType: "",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    pickupLocation: "",
    notes: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadDonations(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadDonations = async (userId: string) => {
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error loading donations:", error);
    } else {
      setRecentDonations(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    const { error } = await supabase.from("donations").insert({
      user_id: user.id,
      food_type: donationForm.foodType,
      quantity: parseFloat(donationForm.quantity),
      unit: donationForm.unit,
      expiry_date: donationForm.expiryDate || null,
      pickup_location: donationForm.pickupLocation,
      notes: donationForm.notes,
      status: "available",
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post donation. Please try again.",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your donation has been posted successfully.",
      });
      setDonationForm({
        foodType: "",
        quantity: "",
        unit: "kg",
        expiryDate: "",
        pickupLocation: "",
        notes: "",
      });
      loadDonations(user.id);
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalDonations = recentDonations.length;
  const activeDonations = recentDonations.filter(d => d.status === "available").length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Post New Donation</CardTitle>
                <CardDescription>Share your excess food with those in need</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foodType">Food Type</Label>
                      <Select
                        value={donationForm.foodType}
                        onValueChange={(value) => setDonationForm({ ...donationForm, foodType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cooked">Cooked Meals</SelectItem>
                          <SelectItem value="fresh">Fresh Produce</SelectItem>
                          <SelectItem value="packaged">Packaged Food</SelectItem>
                          <SelectItem value="bakery">Bakery Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <div className="flex gap-2">
                        <Input
                          id="quantity"
                          type="number"
                          step="0.01"
                          placeholder="0"
                          value={donationForm.quantity}
                          onChange={(e) => setDonationForm({ ...donationForm, quantity: e.target.value })}
                          required
                          className="flex-1"
                        />
                        <Select
                          value={donationForm.unit}
                          onValueChange={(value) => setDonationForm({ ...donationForm, unit: value })}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="liters">liters</SelectItem>
                            <SelectItem value="servings">servings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={donationForm.expiryDate}
                        onChange={(e) => setDonationForm({ ...donationForm, expiryDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        placeholder="Enter address"
                        value={donationForm.pickupLocation}
                        onChange={(e) => setDonationForm({ ...donationForm, pickupLocation: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions..."
                      value={donationForm.notes}
                      onChange={(e) => setDonationForm({ ...donationForm, notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Post Donation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDonations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No donations yet</p>
                ) : (
                  recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{donation.food_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {donation.quantity} {donation.unit}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          donation.status === "available"
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary/20 text-secondary"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{totalDonations}</p>
                    <p className="text-sm text-muted-foreground">Total Donations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{activeDonations}</p>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
