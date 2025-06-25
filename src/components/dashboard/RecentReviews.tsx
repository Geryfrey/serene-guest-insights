
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RecentReviewsProps {
  hotelId?: string;
}

interface FeedbackRecord {
  id: number;
  original_review: string;
  sentiment: string;
  category: string;
  created_at: string;
}

export default function RecentReviews({ hotelId }: RecentReviewsProps) {
  const { data: feedbackData, isLoading, error } = useQuery({
    queryKey: ['recent-feedback', hotelId],
    queryFn: async () => {
      console.log('Fetching recent feedback...');
      
      let query = supabase
        .from('feedback')
        .select('id, original_review, sentiment, category, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // If hotelId is provided, filter by it (assuming you have hotel_id field)
      // For now, we'll fetch all feedback since your current schema doesn't have hotel_id
      
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching feedback:', error);
        throw error;
      }

      console.log('Fetched feedback data:', data);
      return data as FeedbackRecord[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateMockRating = () => {
    // Generate a rating based on sentiment if available
    return Math.floor(Math.random() * 2) + 4; // 4-5 stars for demo
  };

  if (isLoading) {
    return (
      <Card className="col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-red-500 py-4">Failed to load reviews</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Recent Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!feedbackData || feedbackData.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No recent reviews</p>
        ) : (
          feedbackData.map((feedback) => {
            const rating = generateMockRating();
            return (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{rating}/5</span>
                  </div>
                  {feedback.sentiment && (
                    <Badge 
                      variant="outline" 
                      className={getSentimentColor(feedback.sentiment)}
                    >
                      {feedback.sentiment}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-2">
                  {feedback.original_review || 'No review text available'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Anonymous Guest</span>
                  <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
                </div>
                
                {feedback.category && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {feedback.category}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
