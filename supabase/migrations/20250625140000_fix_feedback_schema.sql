
-- Drop the existing guest_feedback table if it exists
DROP TABLE IF EXISTS public.guest_feedback;

-- Update the feedback table to ensure it has the correct structure
ALTER TABLE public.feedback 
ADD COLUMN IF NOT EXISTS hotel_id TEXT,
ADD COLUMN IF NOT EXISTS rating INTEGER,
ADD COLUMN IF NOT EXISTS contact_info TEXT;

-- Ensure the feedback table has the right structure
CREATE TABLE IF NOT EXISTS public.feedback (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  hotel_id TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  original_review TEXT,
  cleaned_review TEXT,
  sentiment TEXT,
  category TEXT,
  review_length INTEGER,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback (for guest submissions)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit feedback" 
  ON public.feedback 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow authenticated users to view feedback
DROP POLICY IF EXISTS "Authenticated users can view feedback" ON public.feedback;
CREATE POLICY "Authenticated users can view feedback" 
  ON public.feedback 
  FOR SELECT 
  TO authenticated
  USING (true);
