export type UserRole = 'hotel_manager' | 'service_manager' | 'food_manager' | 'facilities_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hotelId?: string;
  category?: 'service' | 'food_quality' | 'facilities' | 'general';
}

export interface Feedback {
  id: string;
  guestId: string;
  hotelId: string;
  rating: number;
  text: string;
  createdAt: string;
  sentiment?: SentimentAnalysis;
  contactInfo?: string;
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  topics?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  managerId: string;
}

export interface Alert {
  id: string;
  hotelId: string;
  type: 'sentiment' | 'volume' | 'topic';
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  read: boolean;
}

export interface FeedbackTrend {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export interface TopicDistribution {
  topic: string;
  count: number;
  percentage: number;
}
