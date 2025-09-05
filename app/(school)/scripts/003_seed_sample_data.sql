-- Insert sample courses
INSERT INTO public.courses (title, description, category, duration_weeks, price) VALUES
('Biblical Foundations', 'A comprehensive introduction to biblical studies covering Old and New Testament foundations, hermeneutics, and theological principles.', 'certificate', 12, 299.00),
('Christian Leadership Principles', 'Develop essential leadership skills rooted in biblical principles for ministry and organizational leadership.', 'certificate', 8, 199.00),
('Discipleship and Mentoring', 'Learn effective discipleship strategies and mentoring techniques for spiritual growth and community building.', 'certificate', 10, 249.00),
('Advanced Biblical Studies Diploma', 'An intensive program covering advanced biblical interpretation, theology, church history, and practical ministry applications.', 'diploma', 24, 599.00),
('Ministry Leadership Diploma', 'Comprehensive training in pastoral care, church administration, preaching, and spiritual leadership for ministry professionals.', 'diploma', 20, 549.00);

-- Insert sample course modules for Biblical Foundations
INSERT INTO public.course_modules (course_id, title, description, content, order_index)
SELECT 
  c.id,
  module_data.title,
  module_data.description,
  module_data.content,
  module_data.order_index
FROM public.courses c,
(VALUES
  ('Introduction to Biblical Studies', 'Overview of biblical studies methodology and approach', 'This module introduces students to the fundamental principles of biblical studies...', 1),
  ('Old Testament Survey', 'Comprehensive overview of Old Testament books and themes', 'A systematic study of the Old Testament from Genesis to Malachi...', 2),
  ('New Testament Survey', 'Comprehensive overview of New Testament books and themes', 'A systematic study of the New Testament from Matthew to Revelation...', 3),
  ('Biblical Hermeneutics', 'Principles of biblical interpretation', 'Learn the essential principles for properly interpreting Scripture...', 4),
  ('Practical Application', 'Applying biblical principles to daily life', 'How to apply biblical truths in contemporary contexts...', 5)
) AS module_data(title, description, content, order_index)
WHERE c.title = 'Biblical Foundations';

-- Insert sample assessments
INSERT INTO public.assessments (course_id, title, description, questions, passing_score, time_limit_minutes)
SELECT 
  c.id,
  'Final Assessment - Biblical Foundations',
  'Comprehensive assessment covering all modules of the Biblical Foundations course',
  '[
    {
      "id": 1,
      "question": "What is the primary purpose of biblical hermeneutics?",
      "type": "multiple_choice",
      "options": [
        "To make the Bible easier to read",
        "To properly interpret and understand Scripture",
        "To translate ancient languages",
        "To write biblical commentaries"
      ],
      "correct_answer": 1
    },
    {
      "id": 2,
      "question": "Which book is considered the first book of the New Testament?",
      "type": "multiple_choice",
      "options": ["Mark", "Luke", "Matthew", "John"],
      "correct_answer": 2
    },
    {
      "id": 3,
      "question": "Explain the importance of understanding historical context when studying Scripture.",
      "type": "essay",
      "min_words": 100
    }
  ]'::jsonb,
  75,
  90
FROM public.courses c
WHERE c.title = 'Biblical Foundations';
