-- Create custom types
-- (Safe to run even if type exists, usually)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'channel_partner', 'dealer', 'distributor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'dealer',
  email TEXT,
  code TEXT, -- Unique code for verification
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Turn on RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create storage bucket for price lists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('price_lists', 'price_lists', false)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES (Critical for Upload)
DROP POLICY IF EXISTS "Admins can do everything on price_lists bucket" ON storage.objects;
CREATE POLICY "Admins can do everything on price_lists bucket" ON storage.objects
  FOR ALL USING (
    bucket_id = 'price_lists' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Users can download price lists" ON storage.objects;
CREATE POLICY "Users can download price lists" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'price_lists' AND
    auth.role() = 'authenticated'
  );

-- Create documents table (metadata for PDFs)
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Turn on RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policies for documents
DROP POLICY IF EXISTS "Admins can do everything on documents" ON documents;
CREATE POLICY "Admins can do everything on documents" ON documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Users can view assigned documents" ON documents;
CREATE POLICY "Users can view assigned documents" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM document_assignments da
      WHERE da.document_id = documents.id
      AND (
        -- Match by User ID directly
        da.user_id = auth.uid()
        OR
        -- Match by Role (using a direct subquery that is performant)
        da.role = (SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1)
      )
    )
  );

-- Create document assignments table
CREATE TABLE IF NOT EXISTS document_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Nullable now
  role user_role, -- New column for Role based assignment
  assigned_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- UNIQUE CONSTRAINT to prevent duplicate role assignments
ALTER TABLE document_assignments 
DROP CONSTRAINT IF EXISTS unique_document_role_assignment;

ALTER TABLE document_assignments 
ADD CONSTRAINT unique_document_role_assignment UNIQUE (document_id, role);


-- Turn on RLS
ALTER TABLE document_assignments ENABLE ROW LEVEL SECURITY;

-- Policies for assignments
DROP POLICY IF EXISTS "Admins can do everything on document_assignments" ON document_assignments;
CREATE POLICY "Admins can do everything on document_assignments" ON document_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Users can view their assignments" ON document_assignments;
CREATE POLICY "Users can view their assignments" ON document_assignments
  FOR SELECT USING (
    user_id = auth.uid()
    OR
    role = (SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1)
  );

-- Trigger to handle new user creation relies on SERVER ACTION now. 
-- We explicitly DROP the trigger to avoid conflicts.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- AUTO-FIX: Backfill missing profiles (Safe to run multiple times)
INSERT INTO public.profiles (id, full_name, role, email)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', 'Backfilled User'),
  COALESCE((raw_user_meta_data->>'role')::user_role, 'dealer'::user_role),
  email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
