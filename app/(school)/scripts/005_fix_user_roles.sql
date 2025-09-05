-- Fix existing users who don't have role set
-- This script updates all existing profiles to have the correct role

-- Update all profiles that don't have a role set to 'student'
UPDATE public.profiles 
SET role = 'student' 
WHERE role IS NULL;

-- Verify the update
SELECT 
  id,
  first_name,
  last_name,
  email,
  role,
  created_at
FROM public.profiles 
ORDER BY created_at DESC;

-- Show count by role
SELECT 
  role,
  COUNT(*) as count
FROM public.profiles 
GROUP BY role;
