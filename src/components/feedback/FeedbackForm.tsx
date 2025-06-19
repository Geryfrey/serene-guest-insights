
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackFormProps {
  hotelId: string;
  onSubmit: (feedback: { rating: number; text: string; contactInfo?: string }) => void;
}

export default function FeedbackForm({ hotelId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === null) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!text.trim()) {
      toast({
        title: "Error", 
        description: "Please provide your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('guest_feedback')
        .insert({
          hotel_id: hotelId,
          rating,
          review: text.trim(),
          contact_info: contactInfo.trim() || null
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully!",
      });
      
      onSubmit({
        rating,
        text: text.trim(),
        contactInfo: contactInfo.trim() || undefined
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Share Your Experience</CardTitle>
          <CardDescription>
            We value your feedback. Please let us know about your stay with us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-base">How would you rate your stay?</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={rating === value ? "default" : "outline"}
                  className={`h-12 w-12 rounded-full ${
                    rating === value
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500"
                      : ""
                  }`}
                  onClick={() => setRating(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-base">Your feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Please share your thoughts about your stay..."
              className="min-h-32 resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="text-base">Contact information (optional)</Label>
            <Input
              id="contactInfo"
              placeholder="Email or phone number"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              We'll only use this to follow up on your feedback if needed.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-navy-700 to-navy-600 hover:from-navy-800 hover:to-navy-700"
            disabled={isSubmitting || rating === null || !text.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
