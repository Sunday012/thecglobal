-- Update the handle_new_user function to include role field
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    student_id, 
    first_name, 
    last_name, 
    email,
    role
  )
  VALUES (
    new.id,
    generate_student_id(),
    COALESCE(new.raw_user_meta_data ->> 'first_name', 'Student'),
    COALESCE(new.raw_user_meta_data ->> 'last_name', 'User'),
    new.email,
    'student'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;
