
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
    icon: <CheckCircle className="h-12 w-12 text-emerald-500" />,
    title: "Collect Feedback",
    description: "Simple, intuitive forms for guests to submit their feedback anytime.",
  },
  {
    icon: <BarChart className="h-12 w-12 text-blue-500" />,
    title: "Analyze Sentiment",
    description: "AI-powered sentiment analysis to understand guest emotion.",
  },
  {
    icon: <BellRing className="h-12 w-12 text-amber-500" />,
    title: "Real-Time Alerts",
    description: "Instant notifications for critical issues needing attention.",
  },
  {
    icon: <Users className="h-12 w-12 text-purple-500" />,
    title: "Role-Based Access",
    description: "Secure access for managers, guests, and admins—with granular controls.",
  },
  {
    icon: <Image className="h-12 w-12 text-indigo-500" />,
    title: "Integrated Sources",
    description: "Pull feedback from Google Reviews and in-room devices effortlessly.",
  },
  {
    icon: <BookOpen className="h-12 w-12 text-rose-500" />,
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Serene <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Insights</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all ml-4"
                >
                  <Link to="/login">Manager Login</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-slate-600 hover:text-blue-600 block px-3 py-2 rounded-lg text-base font-medium transition-all hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg w-full"
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
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Serene Insights for Hotels
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-blue-100">
              Transform guest feedback into <span className="text-amber-300 font-semibold">actionable insights</span>
              — powered by AI, loved by guests.
            </p>
            <div className="flex flex-wrap gap-6 justify-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Link to="/feedback" className="flex items-center">
                  Submit Feedback
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <h3 className="text-lg font-semibold tracking-wide mb-8 text-slate-500 uppercase">Trusted by Rwanda's Leading Luxury Hotels</h3>
          <div className="flex flex-row gap-12 flex-wrap items-center justify-center">
            {hotels.map(hotel => (
              <div key={hotel.name} className="flex flex-col items-center px-6 py-4 group">
                <img 
                  src={hotel.logo} 
                  alt={hotel.name} 
                  className="h-16 md:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110" 
                />
                <span className="text-sm font-medium mt-3 text-slate-600 group-hover:text-slate-800 transition-colors">{hotel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-screen-xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-800">Platform Highlights</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything luxury hotels need to collect, analyze, and act on guest feedback.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map(({step, title, desc}) => (
              <div key={step} className="flex flex-col items-center text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-110">
                    <span className="text-3xl font-bold">{step}</span>
                  </div>
                  {step < 3 && (
                    <div className="hidden md:block absolute top-12 left-24 w-32 h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your hotel's reputation?</h2>
            <p className="text-xl font-medium text-orange-100">
              Contact us or join other hotels using Serene Insights to create remarkable guest experiences.
            </p>
          </div>
          <div className="md:w-1/3 flex flex-col gap-4 w-full md:w-auto">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-lg hover:shadow-xl transition-all">
              <Link to="/contact" className="flex items-center justify-center">
                Contact Us
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold backdrop-blur-sm">
              <Link to="/blog" className="flex items-center justify-center">
                Read Blog
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Serene</span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent ml-1">Insights</span>
          </div>
          <div className="flex gap-8">
            <Link to="/feedback" className="hover:text-amber-400 transition-colors font-medium">Submit Feedback</Link>
            <Link to="/login" className="hover:text-blue-400 transition-colors font-medium">Manager Login</Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors font-medium">Contact Us</Link>
            <Link to="/blog" className="hover:text-purple-400 transition-colors font-medium">Blog</Link>
          </div>
          <div className="text-sm text-slate-400">© 2025 Serene Insights. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
