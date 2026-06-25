-- Seed data for RV Resume

-- Profile
INSERT INTO profiles (id, name, degree, college, bio, hero_image_url) 
VALUES (
  '00000000-0000-0000-0000-000000000000', -- This will need to be updated with the actual admin user ID later
  'M. Rupan Vijay',
  'B.Tech Mechanical Engineering',
  'VIT Chennai',
  'A unique intersection of mechanical engineering foundations and software development capabilities.',
  '/placeholder.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Skills
INSERT INTO skills (skill_name, category, proficiency_level, order_index) VALUES
  ('Python', 'Programming', 90, 1),
  ('Java', 'Programming', 85, 2),
  ('C', 'Programming', 80, 3),
  ('SolidWorks', 'Engineering & Design', 95, 4),
  ('AutoCAD', 'Engineering & Design', 90, 5),
  ('ANSYS', 'Engineering & Design', 80, 6),
  ('MATLAB', 'Engineering & Design', 85, 7),
  ('React', 'Web & Tools', 90, 8),
  ('Next.js', 'Web & Tools', 85, 9),
  ('VS Code', 'Web & Tools', 95, 10),
  ('GitHub', 'Web & Tools', 90, 11),
  ('Vercel', 'Web & Tools', 85, 12),
  ('Stitch', 'Web & Tools', 95, 13);

-- Projects
INSERT INTO projects (title, description, technologies, image_url, github_link, demo_link, order_index) VALUES
  ('RV Resume', 'Personal portfolio showcasing a unique intersection of mechanical engineering and software development.', ARRAY['React', 'Next.js', 'Tailwind CSS', 'Supabase'], '/placeholder.jpg', '#', '#', 1),
  ('Low-Budget F1 Car', 'Engineering design for a cost-effective F1 car model focusing on aerodynamics and material efficiency.', ARRAY['SolidWorks', 'ANSYS', 'AutoCAD'], '/placeholder.jpg', '#', '#', 2);

-- Timeline
INSERT INTO timeline (date_string, event_title, description, type, order_index) VALUES
  ('2021', 'CS Academy, Erode', 'Completed higher secondary education with a focus on science and mathematics.', 'education', 1),
  ('2022', 'Enrolled at VIT Chennai', 'Started B.Tech in Mechanical Engineering, building foundations in core engineering concepts.', 'education', 2),
  ('2023', 'E-Cell IIT Bombay Campus Ambassador', 'Served in the Web and Tech domain, bridging entrepreneurial initiatives with technical implementation.', 'experience', 3);

-- Certifications
INSERT INTO certifications (issuer, name, date_issued, verification_link, order_index) VALUES
  ('SIP Academy', 'SIP Abacus Grandmaster', '2015', '#', 1),
  ('TechFest', 'Hackathon Finalist', '2023', '#', 2);
