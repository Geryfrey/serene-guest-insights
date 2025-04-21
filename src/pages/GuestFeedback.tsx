
import FeedbackForm from "@/components/feedback/FeedbackForm";
import ThankYouScreen from "@/components/feedback/ThankYouScreen";
import PageLayout from "@/components/layout/PageLayout";
import { analyzeSentiment } from "@/services/mockData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GuestFeedback() {
  const { hotelId = "1" } = useParams<{ hotelId: string }>();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmitFeedback = async (feedbackData: { 
    rating: number; 
    text: string; 
    contactInfo?: string;
  }) => {
    // Perform sentiment analysis on the feedback
    const sentiment = analyzeSentiment(feedbackData.text);
    
    // In a real app, we would send this to an API endpoint
    console.log("Submitting feedback:", {
      ...feedbackData,
      hotelId,
      sentiment,
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
