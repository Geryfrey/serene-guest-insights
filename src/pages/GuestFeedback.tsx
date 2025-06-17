
import FeedbackForm from "@/components/feedback/FeedbackForm";
import ThankYouScreen from "@/components/feedback/ThankYouScreen";
import PageLayout from "@/components/layout/PageLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function GuestFeedback() {
  const { hotelId = "1" } = useParams<{ hotelId: string }>();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmitFeedback = async (feedbackData: { 
    rating: number; 
    text: string; 
    contactInfo?: string;
  }) => {
    console.log("Feedback submitted:", {
      ...feedbackData,
      hotelId,
      createdAt: new Date().toISOString()
    });
    
    // Show thank you screen
    setSubmitted(true);
  };
  
  return (
    <PageLayout className="py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-3xl font-serif text-gradient mb-2">
          Your Feedback Matters
        </h1>
        <p className="text-muted-foreground">
          Help us improve your experience by sharing your thoughts
        </p>
      </div>
      
      {submitted ? (
        <ThankYouScreen />
      ) : (
        <FeedbackForm hotelId={hotelId} onSubmit={handleSubmitFeedback} />
      )}
    </PageLayout>
  );
}
