
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <header className="bg-primary text-primary-foreground py-12 animate-slide-up">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-serif font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">Let's talk about how Serene Insights can help elevate your hospitality business.</p>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="bg-white glass w-full max-w-2xl rounded-lg px-8 py-10 mb-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <form className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-black">Name</label>
              <input type="text" id="name" className="w-full rounded border border-muted px-3 py-2 outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:shadow-md" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-black">Email</label>
              <input type="email" id="email" className="w-full rounded border border-muted px-3 py-2 outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:shadow-md" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-black">Message</label>
              <textarea id="message" rows={4} className="w-full rounded border border-muted px-3 py-2 outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 hover:shadow-md" />
            </div>
            <Button type="submit" className="bg-primary text-gold-400 hover:bg-navy-800 hover:scale-105 transition-all duration-200">
              <Mail className="mr-2 h-5 w-5" /> Send Message
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center space-y-2 text-black animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center hover:scale-105 transition-transform duration-200">
            <MapPin className="h-5 w-5 mr-2" /> Kigali, Rwanda
          </div>
          <div className="flex items-center hover:scale-105 transition-transform duration-200">
            <Mail className="h-5 w-5 mr-2" /> hello@sereneinsights.com
          </div>
          <div className="flex items-center hover:scale-105 transition-transform duration-200">
            <Phone className="h-5 w-5 mr-2" /> +250 123 456 789
          </div>
        </div>
      </main>
    </div>
  );
}
