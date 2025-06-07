
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, BarChart, BellRing, CheckCircle, Image, Users, BookOpen, Mail, Menu, X } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

// Dummy logos for hotel partners - use your own in production!
const hotels = [
  {
    name: "Kigali Serena Hotel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Serena_Hotels_Logo.png",
  },
  {
    name: "Radisson Blu Kigali",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Radisson_Blu_logo.png",
  },
  {
    name: "Marriott Kigali",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Marriott_logo.svg",
  },
];

const features = [
  {
    icon: <CheckCircle className="h-10 w-10 text-green-500" />,
    title: "Collect Feedback",
    description: "Simple, intuitive forms for guests to submit their feedback anytime.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Analyze Sentiment",
    description: "AI-powered sentiment analysis to understand guest emotion.",
  },
  {
    icon: <BellRing className="h-10 w-10 text-gold-500" />,
    title: "Real-Time Alerts",
    description: "Instant notifications for critical issues needing attention.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Role-Based Access",
    description: "Secure access for managers, guests, and admins—with granular controls.",
  },
  {
    icon: <Image className="h-10 w-10 text-primary" />,
    title: "Integrated Sources",
    description: "Pull feedback from Google Reviews and in-room devices effortlessly.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Rich Analytics",
    description: "Unlock deeper insights with trends, topics, and anomaly detection.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Guests Share Feedback",
    desc: "Guests submit feedback via web, tablet, or mobile. Seamless and branded forms ensure high response rates.",
  },
  {
    step: 2,
    title: "AI Analyzes in Real Time",
    desc: "Our AI models detect sentiment, topics and spot urgent issues instantly.",
  },
  {
    step: 3,
    title: "Managers Take Action",
    desc: "Get live dashboards, alerts and download detailed reports for continuous improvement.",
  },
];

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Submit Feedback", href: "/feedback" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Landing() {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If logged in, redirect to dashboard
  if (isAuthenticated && user?.role !== 'guest') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary border-b border-gold-500">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-serif font-bold text-primary-foreground">
                Serene <span className="text-gold-500">Insights</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-primary-foreground hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-primary ml-4"
                >
                  <Link to="/login">Manager Login</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary-foreground hover:text-gold-500 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gold-500">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-primary-foreground hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-primary w-full"
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Manager Login</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif font-bold fade-in">
              Serene Insights for Hotels
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto fade-in">
              Transform guest feedback into <span className="text-gold-500">actionable insights</span>
              — powered by AI, loved by guests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8 fade-in">
              <Button
                asChild
                size="lg"
                className="bg-gold-500 text-primary hover:bg-gold-400 transition"
              >
                <Link to="/feedback">Submit Feedback</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <h3 className="text-lg font-serif tracking-wide mb-6 text-muted-foreground">Trusted by Rwanda's Leading Luxury Hotels</h3>
          <div className="flex flex-row gap-8 flex-wrap items-center justify-center">
            {hotels.map(hotel => (
              <div key={hotel.name} className="flex flex-col items-center px-6 py-2">
                <img src={hotel.logo} alt={hotel.name} className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition" />
                <span className="text-xs font-medium mt-2">{hotel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-screen-xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif font-bold">Platform Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything luxury hotels need to collect, analyze, and act on guest feedback.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 border-muted hover:border-gold-500 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-gold-500/10">{feature.icon}</div>
                  <h3 className="text-xl font-serif font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4 bg-background">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map(({step, title, desc}) => (
              <div key={step} className="flex flex-col items-center text-center group border-2 border-muted rounded-lg p-8 hover:border-gold-500 transition-colors">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold-500 text-primary mb-6 transition group-hover:scale-105">
                  <span className="text-2xl font-bold">{step}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gold-500 text-primary">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Ready to transform your hotel's reputation?</h2>
            <p className="text-lg font-medium">
              Contact us or join other hotels using Serene Insights to create remarkable guest experiences.
            </p>
          </div>
          <div className="md:w-1/3 flex flex-row gap-4 justify-center md:justify-end">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition">
              <Link to="/contact" className="flex items-center">
                Contact Us
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/blog" className="flex items-center">
                Read Blog
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-serif font-semibold">
            Serene <span className="text-gold-500">Insights</span>
          </div>
          <div className="flex gap-6">
            <Link to="/feedback" className="hover:text-gold-500 transition-colors">Submit Feedback</Link>
            <Link to="/login" className="hover:text-gold-500 transition-colors">Manager Login</Link>
            <Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link>
            <Link to="/blog" className="hover:text-gold-500 transition-colors">Blog</Link>
          </div>
          <div className="text-sm text-gold-400/80">© 2025 Serene Insights. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
