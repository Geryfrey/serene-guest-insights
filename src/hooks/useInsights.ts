
import { useQuery } from '@tanstack/react-query';

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
  const response = await fetch('http://localhost:5000/api/insights');
  if (!response.ok) {
    throw new Error('Failed to fetch insights data');
  }
  return response.json();
};

export const useInsights = () => {
  return useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
  });
};
