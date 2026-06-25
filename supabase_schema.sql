-- Profile Table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  name text,
  degree text,
  college text,
  bio text,
  hero_image_url text,
  updated_at timestamp with time zone
);

-- Skills Table
CREATE TABLE skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_name text NOT NULL,
  category text NOT NULL, -- e.g., 'Programming', 'Engineering & Design', 'Web & Tools'
  proficiency_level integer, -- 1 to 100
  order_index integer DEFAULT 0
);

-- Projects Table
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  technologies text[], -- Array of strings
  image_url text,
  github_link text,
  demo_link text,
  order_index integer DEFAULT 0
);

-- Timeline (Journey) Table
CREATE TABLE timeline (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date_string text NOT NULL,
  event_title text NOT NULL,
  description text,
  type text, -- e.g., 'education', 'experience', 'achievement'
  order_index integer DEFAULT 0
);

-- Certifications Table
CREATE TABLE certifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  issuer text NOT NULL,
  name text NOT NULL,
  date_issued text,
  verification_link text,
  order_index integer DEFAULT 0
);

-- Set up Row Level Security (RLS)
-- Allow public read access to all these tables, but only authenticated users (admin) can modify.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone." ON skills FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public timeline is viewable by everyone." ON timeline FOR SELECT USING (true);
CREATE POLICY "Public certifications are viewable by everyone." ON certifications FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- For other tables, assume any authenticated user (you) can edit.
CREATE POLICY "Authenticated users can insert skills." ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update skills." ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete skills." ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert projects." ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update projects." ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete projects." ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert timeline." ON timeline FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update timeline." ON timeline FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete timeline." ON timeline FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert certifications." ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update certifications." ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete certifications." ON certifications FOR DELETE USING (auth.role() = 'authenticated');
