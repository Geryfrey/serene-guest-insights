
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import SentimentCard from "@/components/dashboard/SentimentCard";
import TrendChart from "@/components/dashboard/TrendChart";
import TopicsCard from "@/components/dashboard/TopicsCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockAlerts, mockFeedback, mockHotels, mockTopicDistribution, mockTrends } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Feedback } from "@/types";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  
  // Filter feedback for the current manager's hotel
  const hotelId = user?.hotelId || "";
  const hotelName = mockHotels.find(h => h.id === hotelId)?.name || "All Hotels";
  
  // Filter data for this hotel
  const hotelFeedback = user?.role === "admin" 
    ? mockFeedback 
    : mockFeedback.filter(f => f.hotelId === hotelId);
  
  // Calculate sentiment counts
  const totalFeedback = hotelFeedback.length;
  const positiveFeedback = hotelFeedback.filter(f => f.sentiment?.sentiment === "positive").length;
  const neutralFeedback = hotelFeedback.filter(f => f.sentiment?.sentiment === "neutral").length;
  const negativeFeedback = hotelFeedback.filter(f => f.sentiment?.sentiment === "negative").length;
  
  // Recent alerts for this hotel
  const recentAlerts = mockAlerts
    .filter(a => user?.role === "admin" || a.hotelId === hotelId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <>
      <Header />
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-serif">Dashboard</h1>
          <p className="text-muted-foreground">Analytics for {hotelName}</p>
        </div>
        
        {/* Sentiment overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SentimentCard
            title="Positive Sentiment"
            value={positiveFeedback}
            total={totalFeedback}
            trend="up"
            trendValue="5%"
            variant="positive"
          />
          <SentimentCard
            title="Neutral Sentiment"
            value={neutralFeedback}
            total={totalFeedback}
            trend="stable"
            trendValue="0%"
            variant="neutral"
          />
          <SentimentCard
            title="Negative Sentiment"
            value={negativeFeedback}
            total={totalFeedback}
            trend="down"
            trendValue="3%"
            variant="negative"
          />
        </div>
        
        {/* Trend chart and topics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TrendChart title="Sentiment Trend" data={mockTrends} />
          </div>
          <div>
            <TopicsCard title="Top Feedback Topics" topics={mockTopicDistribution} />
          </div>
        </div>
        
        {/* Recent alerts */}
        <div className="mb-6">
          <h2 className="text-xl font-serif mb-3">Recent Alerts</h2>
          <div className="border rounded-lg overflow-hidden">
            {recentAlerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No recent alerts
              </div>
            ) : (
              <div className="divide-y">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 ${
                      alert.read ? "" : "bg-navy-50 dark:bg-navy-900/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                          alert.severity === "high"
                            ? "bg-red-500"
                            : alert.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(alert.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Recent feedback */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-serif">Latest Feedback</h2>
            <Button variant="outline" onClick={() => navigate('/feedback')}>
              View All
            </Button>
          </div>
          
          {hotelFeedback.length === 0 ? (
            <div className="border rounded-lg p-6 text-center">
              <p className="text-muted-foreground">No feedback available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotelFeedback
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 6)
                .map((feedback) => (
                  <div
                    key={feedback.id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-secondary/5"
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={i < feedback.rating ? "text-yellow-500" : "text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground ml-auto">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="line-clamp-3">{feedback.text}</p>
                    {feedback.sentiment && (
                      <div className="mt-2 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                            ${
                              feedback.sentiment.sentiment === "positive"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : feedback.sentiment.sentiment === "negative"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }
                          `}
                        >
                          {feedback.sentiment.sentiment.charAt(0).toUpperCase() +
                            feedback.sentiment.sentiment.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </PageLayout>
      
      <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && setSelectedFeedback(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback && new Date(selectedFeedback.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Rating</h4>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < selectedFeedback.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Feedback</h4>
                <p>{selectedFeedback.text}</p>
              </div>
              
              {selectedFeedback.sentiment && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Sentiment Analysis</h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${
                            selectedFeedback.sentiment.sentiment === "positive"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : selectedFeedback.sentiment.sentiment === "negative"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }
                        `}
                      >
                        {selectedFeedback.sentiment.sentiment.charAt(0).toUpperCase() +
                          selectedFeedback.sentiment.sentiment.slice(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Confidence: {Math.round(selectedFeedback.sentiment.score * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {selectedFeedback.sentiment.topics && selectedFeedback.sentiment.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedFeedback.sentiment.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {selectedFeedback.contactInfo && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                  <p className="text-sm">{selectedFeedback.contactInfo}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
