import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";

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
    icon: <BarChart className="h-10 w-10 text-navy-500" />,
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
    icon: <Image className="h-10 w-10 text-blue-400" />,
    title: "Integrated Sources",
    description: "Pull feedback from Google Reviews and in-room devices effortlessly.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-purple-500" />,
    title: "Rich Analytics",
    description: "Unlock deeper insights with trends, topics, and anomaly detection.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Guests Share Feedback",
    desc: "Guests submit feedback via web, tablet, or mobile. Seamless and branded forms ensure high response rates.",
    img: "/placeholder.svg",
  },
  {
    step: 2,
    title: "AI Analyzes in Real Time",
    desc: "Our AI models detect sentiment, topics and spot urgent issues instantly.",
    img: "/placeholder.svg",
  },
  {
    step: 3,
    title: "Managers Take Action",
    desc: "Get live dashboards, alerts and download detailed reports for continuous improvement.",
    img: "/placeholder.svg",
  },
];

export default function Landing() {
  const { isAuthenticated, user } = useAuth();

  // If logged in, redirect to dashboard
  if (isAuthenticated && user?.role !== 'guest') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/blog" className="text-primary hover:text-accent transition-colors">Blog</Link>
            <Link to="/contact" className="text-primary hover:text-accent transition-colors">Contact</Link>
            <Button asChild variant="outline" className="border-primary text-primary">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative brand-gradient pb-16 pt-24 md:pt-32 mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-2/3 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-main fade-in">
                Serene Insights for Hotels
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium fade-in">
                Transform guest feedback into <span className="text-gold-500">actionable insights</span>
                &mdash; powered by AI, loved by guests.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-5 fade-in">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-gold-400 hover:bg-navy-900 transition"
                >
                  <Link to="/feedback">Submit Feedback</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Link to="/login">Manager Login</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-primary hover:text-gold-500"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex items-center justify-center fade-in">
              <div className="glass rounded-2xl overflow-hidden shadow-xl border-0">
                <img
                  src="/placeholder.svg"
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover aspect-video"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <section className="py-10 px-2 bg-background">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <h3 className="text-lg font-serif tracking-wide mb-4 text-gray-600">Trusted by Rwanda's Leading Luxury Hotels</h3>
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
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-accent">
        <div className="max-w-screen-xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold">Platform Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything luxury hotels need to collect, analyze, and act on guest feedback.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="glass border-0 shadow-md">
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

      {/* How it Works */}
      <section className="py-20 px-2 bg-white dark:bg-navy-700 border-y border-muted">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map(({step, title, desc, img}) => (
              <div key={step} className="flex flex-col items-center text-center group glass p-6 shadow-lg fade-in">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 mb-4 transition group-hover:scale-105">
                  <span className="text-2xl font-bold text-primary">{step}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-1">{title}</h3>
                <img src={img} alt={title} className="w-32 h-20 mx-auto my-2 object-contain rounded" />
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gold-400/40 dark:bg-navy-700 fade-in">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Ready to transform your hotel's reputation?</h2>
            <p className="text-lg text-primary font-medium">
              Contact us or join other hotels using Serene Insights to create remarkable guest experiences.
            </p>
          </div>
          <div className="md:w-1/3 flex flex-row gap-4 justify-center md:justify-end">
            <Button asChild size="lg" className="bg-gold-500 text-primary hover:bg-gold-400 transition">
              <Link to="/contact" className="flex items-center">
                Contact Us
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary border-primary">
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
          <div className="text-xl font-serif font-semibold">Serene Insights</div>
          <div className="flex gap-6">
            <Link to="/feedback" className="hover:text-gold-400 transition-colors">Submit Feedback</Link>
            <Link to="/login" className="hover:text-gold-400 transition-colors">Manager Login</Link>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link>
            <Link to="/blog" className="hover:text-gold-400 transition-colors">Blog</Link>
          </div>
          <div className="text-sm text-gold-400/80">© 2025 Serene Insights. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
