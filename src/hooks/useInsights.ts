
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Anomaly {
  Batch: number;
  Negative_Count: number;
  Z_Score: number;
}

interface Categories {
  Cleanliness: number;
  Facilities: number;
  Service: number;
}

interface KeywordFrequency {
  counts: number[];
  labels: string[];
}

interface Keyword {
  Keyword: string;
  Score: number;
}

interface ReviewLengthData {
  bins: number[];
  counts: number[];
}

interface SentimentByCategory {
  Negative: number[];
  Neutral: number[];
  Positive: number[];
  labels: string[];
}

interface SentimentCounts {
  Negative: number;
  Neutral: number;
  Positive: number;
}

interface SentimentTrends {
  Negative: number[];
  Neutral: number[];
  Positive: number[];
  labels: number[];
}

interface Topic {
  Terms: string;
  Topic: string;
  Weight: number;
}

export interface InsightsData {
  anomalies: Anomaly[];
  categories: Categories;
  keyword_frequency: KeywordFrequency;
  keywords: Keyword[];
  review_length_data: ReviewLengthData;
  sentiment_by_category: SentimentByCategory;
  sentiment_counts: SentimentCounts;
  sentiment_trends: SentimentTrends;
  topics: Topic[];
}

const fetchInsights = async (): Promise<InsightsData> => {
  console.log('Fetching insights from Supabase...');

  // Fetch all data in parallel
  const [
    { data: anomaliesData, error: anomaliesError },
    { data: feedbackData, error: feedbackError },
    { data: topicsData, error: topicsError },
    { data: keywordsData, error: keywordsError }
  ] = await Promise.all([
    supabase.from('anomalies').select('*'),
    supabase.from('feedback').select('*'),
    supabase.from('topics').select('*'),
    supabase.from('keywords').select('*')
  ]);

  if (anomaliesError) throw new Error(`Failed to fetch anomalies: ${anomaliesError.message}`);
  if (feedbackError) throw new Error(`Failed to fetch feedback: ${feedbackError.message}`);
  if (topicsError) throw new Error(`Failed to fetch topics: ${topicsError.message}`);
  if (keywordsError) throw new Error(`Failed to fetch keywords: ${keywordsError.message}`);

  console.log('Raw data from Supabase:', { anomaliesData, feedbackData, topicsData, keywordsData });

  // Transform anomalies data to match Python backend format
  const anomalies: Anomaly[] = (anomaliesData || []).map(item => ({
    Batch: parseInt(String(item.batch || '0')),
    Negative_Count: 0, // This would need to be calculated from feedback data if needed
    Z_Score: item.z_score || 0
  }));

  // Calculate sentiment counts (matching Python's sentiment_counts logic)
  const feedbackArray = feedbackData || [];
  const sentimentCounts = {
    Positive: feedbackArray.filter(item => item.sentiment === 'Positive').length,
    Neutral: feedbackArray.filter(item => item.sentiment === 'Neutral').length,
    Negative: feedbackArray.filter(item => item.sentiment === 'Negative').length
  };

  // Calculate categories (matching Python's categories logic)
  const categories = {
    Cleanliness: feedbackArray.filter(item => item.category === 'Cleanliness').length,
    Facilities: feedbackArray.filter(item => item.category === 'Facilities').length,
    Service: feedbackArray.filter(item => item.category === 'Service').length
  };

  // Transform keywords data to match the expected format using correct property names
  const keywords: Keyword[] = (keywordsData || []).map(item => ({
    Keyword: item.keyword || '',
    Score: (item.score || 0) / 100 // Convert score to percentage if needed
  }));

  // Create keyword frequency data (top 10 keywords by score)
  const sortedKeywords = (keywordsData || [])
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 10);
  
  const keyword_frequency = {
    labels: sortedKeywords.map(item => item.keyword || ''),
    counts: sortedKeywords.map(item => Math.round(item.score || 0))
  };

  // Transform topics data to match expected format using correct property names
  const topics: Topic[] = (topicsData || []).map(item => ({
    Topic: item.topic || `Topic ${item.id}`,
    Terms: item.terms || `${item.topic || 'topic'}, analysis, insight, data`, // Use terms field
    Weight: item.weight || 0
  }));

  // Generate review length data from feedback
  const reviewLengths = feedbackArray.map(item => item.review_length || 0).filter(length => length > 0);
  let review_length_data = {
    bins: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    counts: [1, 2, 3, 2, 1, 0, 1, 0, 0, 0] // Default mock data
  };

  // If we have actual review length data, calculate histogram
  if (reviewLengths.length > 0) {
    const minLength = Math.min(...reviewLengths);
    const maxLength = Math.max(...reviewLengths);
    const binCount = 10;
    const binSize = Math.max(1, Math.ceil((maxLength - minLength) / binCount));
    
    const bins = [];
    const counts = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = minLength + (i * binSize);
      const binEnd = binStart + binSize;
      bins.push(binStart);
      
      const count = reviewLengths.filter(length => length >= binStart && length < binEnd).length;
      counts.push(count);
    }
    
    review_length_data = { bins, counts };
  }

  // Calculate sentiment by category (matching Python pivot logic)
  const categoryList = ['Cleanliness', 'Facilities', 'Service'];
  const sentiment_by_category = {
    labels: categoryList,
    Positive: categoryList.map(cat => 
      feedbackArray.filter(item => item.category === cat && item.sentiment === 'Positive').length
    ),
    Neutral: categoryList.map(cat => 
      feedbackArray.filter(item => item.category === cat && item.sentiment === 'Neutral').length
    ),
    Negative: categoryList.map(cat => 
      feedbackArray.filter(item => item.category === cat && item.sentiment === 'Negative').length
    )
  };

  // Calculate sentiment trends (cumulative sentiment over time/index)
  const sentiment_trends = {
    labels: feedbackArray.map((_, index) => index),
    Positive: [],
    Neutral: [],
    Negative: []
  };

  // Calculate cumulative counts for each sentiment
  let posCount = 0, neuCount = 0, negCount = 0;
  for (let i = 0; i < feedbackArray.length; i++) {
    if (feedbackArray[i].sentiment === 'Positive') posCount++;
    if (feedbackArray[i].sentiment === 'Neutral') neuCount++;
    if (feedbackArray[i].sentiment === 'Negative') negCount++;
    
    sentiment_trends.Positive.push(posCount);
    sentiment_trends.Neutral.push(neuCount);
    sentiment_trends.Negative.push(negCount);
  }

  // If no feedback data, provide some default trend data
  if (feedbackArray.length === 0) {
    sentiment_trends.labels = [0, 1, 2, 3, 4, 5, 6];
    sentiment_trends.Positive = [1, 1, 3, 3, 3, 6, 10];
    sentiment_trends.Neutral = [0, 1, 1, 1, 3, 3, 3];
    sentiment_trends.Negative = [0, 0, 0, 1, 1, 1, 1];
  }

  return {
    anomalies,
    categories,
    keyword_frequency,
    keywords,
    review_length_data,
    sentiment_by_category,
    sentiment_counts: sentimentCounts,
    sentiment_trends,
    topics
  };
};

export const useInsights = () => {
  return useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
  });
};
