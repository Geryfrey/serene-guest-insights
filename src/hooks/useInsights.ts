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
  console.log('Fetching insights from new API endpoint...');

  try {
    const response = await fetch('https://final-year-nl4u.onrender.com/api/insights', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Raw data from API:', data);

    // Transform the API response to match our expected format
    return {
      anomalies: data.anomalies || [],
      categories: data.categories || { Cleanliness: 0, Facilities: 0, Service: 0 },
      keyword_frequency: data.keyword_frequency || { labels: [], counts: [] },
      keywords: data.keywords || [],
      review_length_data: data.review_length_data || { bins: [], counts: [] },
      sentiment_by_category: data.sentiment_by_category || { 
        labels: ['Cleanliness', 'Facilities', 'Service'],
        Positive: [0, 0, 0],
        Neutral: [0, 0, 0],
        Negative: [0, 0, 0]
      },
      sentiment_counts: data.sentiment_counts || { Positive: 0, Neutral: 0, Negative: 0 },
      sentiment_trends: data.sentiment_trends || {
        labels: [0, 1, 2, 3, 4, 5, 6],
        Positive: [0, 0, 0, 0, 0, 0, 0],
        Neutral: [0, 0, 0, 0, 0, 0, 0],
        Negative: [0, 0, 0, 0, 0, 0, 0]
      },
      topics: data.topics || []
    };
  } catch (error) {
    console.error('Failed to fetch insights from API:', error);
    throw new Error(`Failed to fetch insights: ${error.message}`);
  }
};

export const useInsights = () => {
  return useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
  });
};
