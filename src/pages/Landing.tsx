
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, BarChart, BellRing, CheckCircle, Shield, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function Landing() {
  const { isAuthenticated, user } = useAuth();
  
  // If logged in, redirect to dashboard
  if (isAuthenticated && user?.role !== 'guest') {
    return <Navigate to="/dashboard" replace />;
  }
  
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-green-500" />,
      title: "Collect Feedback",
      description: "Simple and intuitive forms for guests to submit their feedback from any device.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      title: "Analyze Sentiment",
      description: "AI-powered sentiment analysis to understand the emotion behind feedback.",
    },
    {
      icon: <BellRing className="h-10 w-10 text-yellow-500" />,
      title: "Real-Time Alerts",
      description: "Instant notifications for critical issues that require immediate attention.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Role-Based Access",
      description: "Secure access with different permission levels for managers and admins.",
    },
    {
      icon: <Shield className="h-10 w-10 text-red-500" />,
      title: "Data Security",
      description: "GDPR-compliant data handling with secure storage and access controls.",
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-navy-700 to-navy-800 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">
                Transform Guest Feedback into <span className="text-gold-400">Actionable Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-md">
                AI-powered analytics to help luxury hotels understand and act on guest feedback in real-time.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 text-navy-900"
                >
                  <Link to="/feedback">Submit Feedback</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  <Link to="/login">Manager Login</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative shadow-2xl rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-navy-900/50 flex items-center justify-center">
                  <p className="text-white text-lg font-medium">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything luxury hotels need to collect, analyze, and act on guest feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">{feature.icon}</div>
                  <h3 className="text-xl font-serif font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-50 dark:bg-navy-900">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-serif font-bold">Ready to elevate your guest experience?</h2>
            <p className="text-lg text-muted-foreground">
              Join leading luxury hotels worldwide using Serene Insights to transform guest feedback into exceptional experiences.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <Button asChild size="lg" className="bg-navy-700 hover:bg-navy-800">
              <Link to="/login" className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-navy-800 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-serif font-semibold">
              Serene Insights
            </div>
            <div className="flex gap-8">
              <Link to="/feedback" className="hover:text-gold-400 transition-colors">
                Submit Feedback
              </Link>
              <Link to="/login" className="hover:text-gold-400 transition-colors">
                Manager Login
              </Link>
              <a href="#" className="hover:text-gold-400 transition-colors">
                Contact Us
              </a>
            </div>
            <div className="text-sm text-gray-400">
              © 2023 Serene Insights. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
