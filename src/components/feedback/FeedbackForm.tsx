
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
      // Insert into the existing feedback table with null sentiment initially
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          original_review: text.trim(),
          cleaned_review: text.trim(),
          review_length: text.trim().length,
          category: null, // Will be updated by ML analysis
          sentiment: null // Will be updated by ML analysis
        })
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Feedback inserted successfully:', data);

      // Now trigger ML analysis - this is critical for the system to work
      try {
        console.log('Triggering ML analysis for feedback ID:', data.id);
        const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-feedback', {
          body: {
            feedbackId: data.id,
            text: text.trim()
          }
        });

        if (analysisError) {
          console.error('Analysis error:', analysisError);
          throw new Error('Failed to analyze feedback: ' + analysisError.message);
        } else {
          console.log('Feedback analysis completed successfully:', analysisData);
        }
      } catch (analysisError) {
        console.error('Failed to trigger analysis:', analysisError);
        // Since ML analysis is required, we should show an error
        toast({
          title: "Warning",
          description: "Feedback saved but analysis failed. Please contact support.",
          variant: "destructive",
        });
      }
      
      toast({
        title: "Success",
        description: "Your feedback has been submitted and analyzed successfully!",
      });
      
      onSubmit({
        rating,
        text: text.trim(),
        contactInfo: contactInfo.trim() || undefined
      });

      // Reset form
      setRating(null);
      setText("");
      setContactInfo("");
      
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
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50">
      <form onSubmit={handleSubmit}>
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Share Your Experience
          </CardTitle>
          <CardDescription className="text-slate-600 text-lg">
            We value your feedback. Please let us know about your stay with us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-8">
          <div className="space-y-4">
            <Label htmlFor="rating" className="text-lg font-semibold text-slate-700">
              How would you rate your stay?
            </Label>
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={rating === value ? "default" : "outline"}
                  className={`h-14 w-14 rounded-full text-lg font-bold transition-all duration-300 ${
                    rating === value
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg scale-110"
                      : "hover:bg-slate-100 hover:border-blue-300 hover:scale-105"
                  }`}
                  onClick={() => setRating(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="feedback" className="text-lg font-semibold text-slate-700">
              Your feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Please share your thoughts about your stay..."
              className="min-h-36 resize-none border-2 focus:border-blue-400 rounded-xl text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="contactInfo" className="text-lg font-semibold text-slate-700">
              Contact information (optional)
            </Label>
            <Input
              id="contactInfo"
              placeholder="Email or phone number"
              className="border-2 focus:border-blue-400 rounded-xl text-base h-12"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            <p className="text-sm text-slate-500">
              We'll only use this to follow up on your feedback if needed.
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-8 pb-8">
          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
            disabled={isSubmitting || rating === null || !text.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Analyzing feedback...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
