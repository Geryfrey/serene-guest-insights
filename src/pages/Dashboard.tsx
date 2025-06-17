
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import SentimentCard from "@/components/dashboard/SentimentCard";
import TrendChart from "@/components/dashboard/TrendChart";
import TopicsCard from "@/components/dashboard/TopicsCard";
import AnomalyChart from "@/components/dashboard/AnomalyChart";
import KeywordInsights from "@/components/dashboard/KeywordInsights";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useInsights } from "@/hooks/useInsights";
import { useNavigate } from "react-router-dom";
import { AlertCircle, TrendingUp, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: insights, isLoading, error } = useInsights();
  
  if (isLoading) {
    return (
      <>
        <Header />
        <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading insights...</p>
            </div>
          </div>
        </PageLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Failed to load insights data</p>
              <p className="text-sm text-muted-foreground mt-2">Please ensure your data is available in Supabase</p>
            </div>
          </div>
        </PageLayout>
      </>
    );
  }

  if (!insights) return null;

  // Calculate sentiment metrics
  const totalReviews = insights.sentiment_counts.Positive + insights.sentiment_counts.Neutral + insights.sentiment_counts.Negative;
  const positivePercentage = totalReviews > 0 ? Math.round((insights.sentiment_counts.Positive / totalReviews) * 100) : 0;
  const neutralPercentage = totalReviews > 0 ? Math.round((insights.sentiment_counts.Neutral / totalReviews) * 100) : 0;
  const negativePercentage = totalReviews > 0 ? Math.round((insights.sentiment_counts.Negative / totalReviews) * 100) : 0;

  // Transform sentiment trends data for the chart
  const trendData = insights.sentiment_trends.labels.map((label, index) => ({
    date: `Day ${label}`,
    positive: insights.sentiment_trends.Positive[index],
    neutral: insights.sentiment_trends.Neutral[index],
    negative: insights.sentiment_trends.Negative[index],
    total: insights.sentiment_trends.Positive[index] + insights.sentiment_trends.Neutral[index] + insights.sentiment_trends.Negative[index],
  }));

  // Transform topics data - Use topic terms instead of topic names
  const totalTopicsWeight = insights.topics.reduce((sum, t) => sum + (t.Weight || 0), 0);
  const topicsData = insights.topics.map((topic) => ({
    topic: topic.Terms || 'Unknown Terms', // Use the topic terms from database
    count: Math.round(topic.Weight || 0),
    percentage: totalTopicsWeight > 0 ? Math.round(((topic.Weight || 0) / totalTopicsWeight) * 100) : 0,
  }));

  // Get anomalies count
  const anomaliesCount = insights.anomalies.filter(item => Math.abs(item.Z_Score) > 2).length;

  return (
    <>
      <Header />
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-serif">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights from sentiment analysis</p>
        </div>
        
        {/* Sentiment overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SentimentCard
            title="Positive Sentiment"
            value={insights.sentiment_counts.Positive}
            total={totalReviews}
            trend="up"
            trendValue="5%"
            variant="positive"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <SentimentCard
            title="Neutral Sentiment"
            value={insights.sentiment_counts.Neutral}
            total={totalReviews}
            trend="stable"
            trendValue="0%"
            variant="neutral"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <SentimentCard
            title="Negative Sentiment"
            value={insights.sentiment_counts.Negative}
            total={totalReviews}
            trend="down"
            trendValue="3%"
            variant="negative"
            icon={<AlertCircle className="h-4 w-4" />}
          />
          <SentimentCard
            title="Anomalies Detected"
            value={anomaliesCount}
            total={insights.anomalies.length}
            trend={anomaliesCount > 10 ? "up" : "stable"}
            trendValue={insights.anomalies.length > 0 ? `${Math.round((anomaliesCount / insights.anomalies.length) * 100)}%` : "0%"}
            variant={anomaliesCount > 10 ? "negative" : "neutral"}
            icon={<AlertCircle className="h-4 w-4" />}
          />
        </div>
        
        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TrendChart title="Sentiment Trends Over Time" data={trendData} />
          <AnomalyChart data={insights.anomalies} />
        </div>

        {/* Second charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <KeywordInsights data={insights.keyword_frequency} />
          <TopicsCard title="Topic Distribution" topics={topicsData} />
        </div>

        {/* Category insights */}
        <div className="mb-6">
          <h2 className="text-xl font-serif mb-3">Category Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(insights.categories).map(([category, count]) => (
              <div key={category} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{category}</h3>
                  <span className="text-2xl font-semibold text-primary">{count}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Reviews mentioning {category.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top keywords */}
        <div className="mb-6">
          <h2 className="text-xl font-serif mb-3">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Top Performing Keywords</h3>
              <div className="space-y-2">
                {insights.keywords.slice(0, 5).map((keyword, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{keyword.Keyword}</span>
                    <span className="text-sm font-medium text-primary">
                      {(keyword.Score * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Topic Insights</h3>
              <div className="space-y-2">
                {insights.topics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="border-l-4 border-primary pl-3">
                    <h4 className="text-sm font-medium">{topic.Topic}</h4>
                    <p className="text-xs text-muted-foreground">
                      {topic.Terms.split(', ').slice(0, 5).join(', ')}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
