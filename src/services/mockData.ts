
import { Alert, Feedback, FeedbackTrend, Hotel, SentimentAnalysis, TopicDistribution, User } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Hotel Manager",
    email: "admin@sereneguest.com",
    role: "hotel_manager"
  },
  {
    id: "2",
    name: "John Manager",
    email: "john@luxuryhotel.com",
    role: "hotel_manager",
    hotelId: "1"
  },
  {
    id: "3",
    name: "Emma Manager",
    email: "emma@grandhotel.com",
    role: "hotel_manager",
    hotelId: "2"
  }
];

// Mock hotels
export const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Luxury Resort & Spa",
    location: "Miami, FL",
    managerId: "2"
  },
  {
    id: "2",
    name: "Grand Hotel Palace",
    location: "New York, NY",
    managerId: "3"
  }
];

// Helper function to generate random sentiments
const generateSentiment = (rating: number): SentimentAnalysis => {
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let score = 0.5;
  let topics: string[] = [];
  
  if (rating >= 4) {
    sentiment = 'positive';
    score = 0.7 + Math.random() * 0.3;
    topics = ['Room Quality', 'Staff Service', 'Amenities'].slice(0, 1 + Math.floor(Math.random() * 3));
  } else if (rating <= 2) {
    sentiment = 'negative';
    score = Math.random() * 0.3;
    topics = ['Cleanliness', 'Noise', 'Value for Money'].slice(0, 1 + Math.floor(Math.random() * 3));
  } else {
    sentiment = 'neutral';
    score = 0.4 + Math.random() * 0.2;
    topics = ['Location', 'Breakfast', 'Room Service'].slice(0, 1 + Math.floor(Math.random() * 3));
  }
  
  return { sentiment, score, topics };
};

// Generate a random date within the last 30 days
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
};

// Sample feedback texts
const positiveFeedbackTexts = [
  "Excellent service! The staff was attentive and our room was immaculate.",
  "One of the best hotel experiences I've had. The amenities were top-notch.",
  "We loved every moment of our stay. Will definitely return!",
  "The restaurant exceeded our expectations. Compliments to the chef.",
  "Very impressed with the spa services and treatments."
];

const neutralFeedbackTexts = [
  "The stay was okay. Nothing exceptional but no major issues either.",
  "Room was clean but smaller than expected for the price point.",
  "Breakfast was good but limited in variety. Overall decent experience.",
  "Check-in process was a bit slow, but staff was friendly.",
  "The location is convenient, but the hotel could use some updates."
];

const negativeFeedbackTexts = [
  "Disappointed with the cleanliness of our room. Not what I expect from a 5-star hotel.",
  "The noise from the street made it difficult to sleep. Poor insulation.",
  "Service was slow and staff seemed disinterested in helping.",
  "Far too expensive for what you get. Definitely not worth the price.",
  "Had to wait over an hour for check-in despite arriving at the designated time."
];

// Generate mock feedback
export const generateMockFeedback = (count: number = 50): Feedback[] => {
  const feedback: Feedback[] = [];
  
  for (let i = 0; i < count; i++) {
    const rating = 1 + Math.floor(Math.random() * 5);
    const hotelId = Math.random() > 0.5 ? "1" : "2";
    
    let text = "";
    if (rating >= 4) {
      text = positiveFeedbackTexts[Math.floor(Math.random() * positiveFeedbackTexts.length)];
    } else if (rating <= 2) {
      text = negativeFeedbackTexts[Math.floor(Math.random() * negativeFeedbackTexts.length)];
    } else {
      text = neutralFeedbackTexts[Math.floor(Math.random() * neutralFeedbackTexts.length)];
    }
    
    feedback.push({
      id: (i + 1).toString(),
      guestId: `guest-${i + 100}`,
      hotelId,
      rating,
      text,
      createdAt: getRandomRecentDate(),
      sentiment: generateSentiment(rating),
      contactInfo: Math.random() > 0.7 ? `guest${i}@example.com` : undefined
    });
  }
  
  return feedback;
};

// Mock feedback data
export const mockFeedback: Feedback[] = generateMockFeedback(50);

// Generate alerts
export const mockAlerts: Alert[] = [
  {
    id: "1",
    hotelId: "1",
    type: "sentiment",
    message: "Negative sentiment spike detected in last 24 hours",
    severity: "high",
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    read: false
  },
  {
    id: "2",
    hotelId: "1",
    type: "topic",
    message: "Unusual increase in 'Cleanliness' related feedback",
    severity: "medium",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    read: true
  },
  {
    id: "3",
    hotelId: "2",
    type: "volume",
    message: "Feedback volume is 30% higher than usual",
    severity: "low",
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    read: false
  }
];

// Generate trend data for the last 30 days
export const generateTrendData = (): FeedbackTrend[] => {
  const trends: FeedbackTrend[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const total = 5 + Math.floor(Math.random() * 10);
    const positivePercent = 0.5 + Math.random() * 0.3;
    const negativePercent = Math.random() * 0.3;
    const neutralPercent = 1 - positivePercent - negativePercent;
    
    trends.push({
      date: date.toISOString().split('T')[0],
      positive: Math.floor(total * positivePercent),
      neutral: Math.floor(total * neutralPercent),
      negative: Math.floor(total * negativePercent),
      total
    });
  }
  
  return trends;
};

// Mock trend data
export const mockTrends: FeedbackTrend[] = generateTrendData();

// Generate topic distribution
export const mockTopicDistribution: TopicDistribution[] = [
  { topic: "Room Cleanliness", count: 42, percentage: 28 },
  { topic: "Staff Service", count: 38, percentage: 25.3 },
  { topic: "Food Quality", count: 27, percentage: 18 },
  { topic: "Amenities", count: 18, percentage: 12 },
  { topic: "Value for Money", count: 15, percentage: 10 },
  { topic: "Location", count: 10, percentage: 6.7 }
];

// Simulate sentiment analysis
export const analyzeSentiment = (text: string): SentimentAnalysis => {
  // This is a simplified mock of sentiment analysis
  // In a real app, this would call a proper NLP model
  
  const positiveWords = ["excellent", "amazing", "wonderful", "great", "good", "love", "enjoy", "clean", "comfortable", "friendly"];
  const negativeWords = ["bad", "poor", "dirty", "awful", "terrible", "disappointing", "uncomfortable", "rude", "slow", "overpriced"];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let score = 0.5;
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    score = 0.5 + (positiveCount / (positiveCount + negativeCount)) * 0.5;
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    score = 0.5 - (negativeCount / (positiveCount + negativeCount)) * 0.5;
  }
  
  // Mock topic detection
  const topics: string[] = [];
  
  if (lowerText.includes("room") || lowerText.includes("bed") || lowerText.includes("clean")) {
    topics.push("Room Cleanliness");
  }
  
  if (lowerText.includes("staff") || lowerText.includes("service") || lowerText.includes("helpful")) {
    topics.push("Staff Service");
  }
  
  if (lowerText.includes("food") || lowerText.includes("breakfast") || lowerText.includes("restaurant")) {
    topics.push("Food Quality");
  }
  
  if (lowerText.includes("pool") || lowerText.includes("gym") || lowerText.includes("spa")) {
    topics.push("Amenities");
  }
  
  if (lowerText.includes("price") || lowerText.includes("expensive") || lowerText.includes("value")) {
    topics.push("Value for Money");
  }
  
  if (lowerText.includes("location") || lowerText.includes("area") || lowerText.includes("neighborhood")) {
    topics.push("Location");
  }
  
  return { sentiment, score, topics: topics.length > 0 ? topics : undefined };
};
