
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { mockFeedback } from "@/services/mockData";

interface RecentReviewsProps {
  hotelId?: string;
}

export default function RecentReviews({ hotelId }: RecentReviewsProps) {
  // Get recent feedback for the hotel
  const recentFeedback = mockFeedback
    .filter(feedback => !hotelId || feedback.hotelId === hotelId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Recent Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentFeedback.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No recent reviews</p>
        ) : (
          recentFeedback.map((feedback) => (
            <div key={feedback.id} className="border rounded-lg p-4 space-y-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{feedback.rating}/5</span>
                </div>
                {feedback.sentiment && (
                  <Badge 
                    variant="outline" 
                    className={getSentimentColor(feedback.sentiment.sentiment)}
                  >
                    {feedback.sentiment.sentiment}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-700 line-clamp-2">
                {feedback.text}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{feedback.guestName || 'Anonymous'}</span>
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
              
              {feedback.sentiment?.topics && feedback.sentiment.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {feedback.sentiment.topics.slice(0, 2).map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
