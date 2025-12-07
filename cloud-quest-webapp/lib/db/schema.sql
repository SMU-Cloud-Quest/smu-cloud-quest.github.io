-- SMU Cloud Quest Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table - stores additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registrations table - stores competition registration data
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  university TEXT NOT NULL,
  major TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  tshirt_size TEXT NOT NULL,
  age INTEGER NOT NULL,
  dietary_restrictions TEXT,
  resume_path TEXT,
  consent_data_storage BOOLEAN NOT NULL DEFAULT FALSE,
  consent_share_with_employers BOOLEAN DEFAULT FALSE,
  consent_terms BOOLEAN NOT NULL DEFAULT FALSE,
  additional_comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure email uniqueness only for authenticated users
  CONSTRAINT unique_user_registration UNIQUE (user_id) WHERE user_id IS NOT NULL
);

-- Contact messages table (optional - for contact form)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON public.registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
-- Index for guest registrations (where user_id is NULL)
CREATE INDEX IF NOT EXISTS idx_registrations_guest ON public.registrations(email) WHERE user_id IS NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (SECURITY DEFINER bypasses RLS to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Profiles RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Admins can view all profiles (uses SECURITY DEFINER function to avoid recursion)
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.is_admin());

-- Registrations RLS Policies
-- Users can view their own registration (by user_id or by email for guest registrations)
CREATE POLICY "Users can view own registration" 
  ON public.registrations 
  FOR SELECT 
  USING (
    auth.uid() = user_id OR
    (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Anyone can insert a registration (guest or authenticated)
-- For authenticated users, user_id must match their auth.uid()
-- For guests, user_id must be NULL
CREATE POLICY "Anyone can insert registration" 
  ON public.registrations 
  FOR INSERT 
  WITH CHECK (
    (user_id IS NULL) OR 
    (user_id = auth.uid())
  );

-- Users can update their own registration (by user_id or by email for guest registrations)
CREATE POLICY "Users can update own registration" 
  ON public.registrations 
  FOR UPDATE 
  USING (
    auth.uid() = user_id OR
    (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Admins can view all registrations (uses SECURITY DEFINER function to avoid recursion)
CREATE POLICY "Admins can view all registrations" 
  ON public.registrations 
  FOR SELECT 
  USING (public.is_admin());

-- Contact messages - anyone can insert (public contact form)
CREATE POLICY "Anyone can submit contact message" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (TRUE);

-- Only admins can view contact messages (uses SECURITY DEFINER function to avoid recursion)
CREATE POLICY "Admins can view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (public.is_admin());

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_registrations_updated_at ON public.registrations;
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage Bucket for Resumes
-- Note: You need to create this bucket in Supabase Dashboard > Storage
-- or use the Supabase CLI
-- Bucket name: resumes
-- Public: false (private bucket)

-- Storage RLS Policies (run after creating the bucket)
-- Anyone can upload resumes (for guest registrations, we'll use email-based folders)
CREATE POLICY "Anyone can upload resume"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- Users can view their own resumes
CREATE POLICY "Users can view own resume"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'resumes' AND
    (
      (storage.foldername(name))[1] = auth.uid()::text OR
      (storage.foldername(name))[1] LIKE 'guest-%'
    )
  );

-- Users can delete their own resumes
CREATE POLICY "Users can delete own resume"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'resumes' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins can view all resumes (uses SECURITY DEFINER function to avoid recursion)
CREATE POLICY "Admins can view all resumes"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'resumes' AND
    public.is_admin()
  );
