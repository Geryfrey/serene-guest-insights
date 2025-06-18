import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import SentimentCard from "@/components/dashboard/SentimentCard";
import TrendChart from "@/components/dashboard/TrendChart";
import TopicsCard from "@/components/dashboard/TopicsCard";
import AnomalyChart from "@/components/dashboard/AnomalyChart";
import KeywordInsights from "@/components/dashboard/KeywordInsights";
import RecentReviews from "@/components/dashboard/RecentReviews";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useInsights } from "@/hooks/useInsights";
import { useNavigate } from "react-router-dom";
import { AlertCircle, TrendingUp, BarChart3, Sparkles, Activity, Target } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: insights, isLoading, error } = useInsights();
  
  if (isLoading) {
    return (
      <>
        <Header />
        <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 animate-pulse"></div>
              </div>
              <p className="text-slate-600 text-lg font-medium">Loading insights...</p>
              <p className="text-slate-400 text-sm mt-2">Analyzing your data</p>
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
        <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-6" />
              <p className="text-slate-700 font-semibold text-lg mb-2">Failed to load insights data</p>
              <p className="text-slate-500 text-sm">Please ensure your data is available in Supabase</p>
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
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
              <p className="text-slate-600">Real-time insights from sentiment analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-slate-600">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Sentiment overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SentimentCard
            title="Positive Sentiment"
            value={insights.sentiment_counts.Positive}
            total={totalReviews}
            trend="up"
            trendValue="5%"
            variant="positive"
            icon={<TrendingUp className="h-5 w-5" />}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          />
          <SentimentCard
            title="Neutral Sentiment"
            value={insights.sentiment_counts.Neutral}
            total={totalReviews}
            trend="stable"
            trendValue="0%"
            variant="neutral"
            icon={<BarChart3 className="h-5 w-5" />}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          />
          <SentimentCard
            title="Negative Sentiment"
            value={insights.sentiment_counts.Negative}
            total={totalReviews}
            trend="down"
            trendValue="3%"
            variant="negative"
            icon={<AlertCircle className="h-5 w-5" />}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          />
          <SentimentCard
            title="Anomalies Detected"
            value={anomaliesCount}
            total={insights.anomalies.length}
            trend={anomaliesCount > 10 ? "up" : "stable"}
            trendValue={insights.anomalies.length > 0 ? `${Math.round((anomaliesCount / insights.anomalies.length) * 100)}%` : "0%"}
            variant={anomaliesCount > 10 ? "negative" : "neutral"}
            icon={<Target className="h-5 w-5" />}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          />
        </div>
        
        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <TrendChart title="Sentiment Trends Over Time" data={trendData} />
          </div>
          <RecentReviews hotelId={user?.hotelId} />
        </div>

        {/* Second charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <AnomalyChart data={insights.anomalies} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <KeywordInsights data={insights.keyword_frequency} />
          </div>
        </div>

        {/* Third charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
            <TopicsCard title="Topic Distribution" topics={topicsData} />
          </div>
        </div>

        {/* Category insights */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Category Analysis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(insights.categories).map(([category, count]) => (
              <div key={category} className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800 text-lg">{category}</h3>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{count}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((count / Math.max(...Object.values(insights.categories))) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-600">Reviews mentioning {category.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top keywords */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Key Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="font-semibold mb-4 text-slate-800 text-lg">Top Performing Keywords</h3>
              <div className="space-y-3">
                {insights.keywords.slice(0, 5).map((keyword, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">{keyword.Keyword}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                          style={{ width: `${keyword.Score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600 min-w-[3rem]">
                        {(keyword.Score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="font-semibold mb-4 text-slate-800 text-lg">Topic Insights</h3>
              <div className="space-y-4">
                {insights.topics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="border-l-4 border-gradient-to-b from-blue-500 to-indigo-600 pl-4 py-2 bg-slate-50 rounded-r-lg">
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">{topic.Topic}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {topic.Terms.split(', ').slice(0, 5).join(', ')}...
                    </p>
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      Weight: {topic.Weight?.toFixed(2)}
                    </div>
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
