import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, TrendingDown, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-food-sharing.jpg";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Connect Donors",
      description: "Restaurants, hostels, and events can easily donate surplus food to those in need.",
    },
    {
      icon: Users,
      title: "Support NGOs",
      description: "NGOs and shelters can browse and request food donations in real-time.",
    },
    {
      icon: TrendingDown,
      title: "Reduce Waste",
      description: "AI-powered predictions help optimize food distribution and minimize wastage.",
    },
    {
      icon: BarChart3,
      title: "Track Impact",
      description: "Comprehensive analytics show the positive impact of your contributions.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Meals Saved" },
    { value: "200+", label: "Active Donors" },
    { value: "75+", label: "Partner NGOs" },
    { value: "85%", label: "Waste Reduced" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Turn Food Waste Into{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Food Security
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect surplus food with those who need it most. Join our platform to reduce
                wastage and make a real difference in your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-hero hover:opacity-90 shadow-medium">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button size="lg" variant="outline">
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Food sharing community"
                className="relative rounded-2xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes food donation simple, efficient, and impactful for everyone involved.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of donors and NGOs working together to eliminate food waste and fight hunger.
          </p>
          <Link to="/analytics">
            <Button size="lg" variant="secondary" className="shadow-medium">
              View Impact Analytics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 FoodShare. Making a difference, one meal at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
