export interface Profile {
  id: string
  student_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description?: string
  category: "certificate" | "diploma"
  duration_weeks: number
  price?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  description?: string
  content?: string
  order_index: number
  created_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  enrollment_date: string
  completion_date?: string
  status: "active" | "completed" | "dropped"
  progress: number
}

export interface Assessment {
  id: string
  course_id: string
  title: string
  description?: string
  questions: AssessmentQuestion[]
  passing_score: number
  time_limit_minutes?: number
  created_at: string
}

export interface AssessmentQuestion {
  id: number
  question: string
  type: "multiple_choice" | "essay" | "true_false"
  options?: string[]
  correct_answer?: number
  min_words?: number
}

export interface AssessmentAttempt {
  id: string
  assessment_id: string
  student_id: string
  answers: Record<string, any>
  score?: number
  passed?: boolean
  started_at: string
  completed_at?: string
}
