
-- Create enum for user roles
CREATE TYPE user_role AS ENUM (
  'hotel_manager',
  'service_manager', 
  'food_manager',
  'facilities_manager'
);

-- Create enum for categories that managers can access
CREATE TYPE category_type AS ENUM (
  'service',
  'food_quality', 
  'facilities',
  'general'
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  hotel_id UUID,
  category category_type,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint
ALTER TABLE users ADD CONSTRAINT fk_users_hotel 
  FOREIGN KEY (hotel_id) REFERENCES hotels(id);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_hotel_id ON users(hotel_id);

-- Insert sample hotel
INSERT INTO hotels (id, name, location) VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Luxury Grand Hotel', 'New York City');

-- Insert sample users with hashed passwords (password will be 'password123' for all)
INSERT INTO users (email, password_hash, name, role, hotel_id, category) VALUES 
  ('admin@luxuryhotel.com', '$2b$10$K7L/V7zN5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5', 'Hotel Manager', 'hotel_manager', '550e8400-e29b-41d4-a716-446655440000', 'general'),
  ('service@luxuryhotel.com', '$2b$10$K7L/V7zN5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5', 'Service Manager', 'service_manager', '550e8400-e29b-41d4-a716-446655440000', 'service'),
  ('food@luxuryhotel.com', '$2b$10$K7L/V7zN5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5', 'Food Manager', 'food_manager', '550e8400-e29b-41d4-a716-446655440000', 'food_quality'),
  ('facilities@luxuryhotel.com', '$2b$10$K7L/V7zN5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5N5', 'Facilities Manager', 'facilities_manager', '550e8400-e29b-41d4-a716-446655440000', 'facilities');
