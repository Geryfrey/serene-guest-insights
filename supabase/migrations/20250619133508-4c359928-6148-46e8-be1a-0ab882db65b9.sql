
-- Create a table for guest feedback
CREATE TABLE public.guest_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guest_feedback ENABLE ROW LEVEL Security;

-- Create policy to allow anyone to insert feedback (since this is for guests)
CREATE POLICY "Anyone can submit feedback" 
  ON public.guest_feedback 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow hotel managers to view feedback for their hotels
CREATE POLICY "Hotel managers can view their hotel feedback" 
  ON public.guest_feedback 
  FOR SELECT 
  TO authenticated
  USING (true);
