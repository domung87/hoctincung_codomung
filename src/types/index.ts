export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  classroom?: string; // Ví dụ: 'Lớp 6A1', 'Lớp 6A2'
  username?: string;
  password?: string;
  avatar_url: string;
  bio: string;
  xp: number;
  level: number;
  coins: number;
  streak_days: number;
  created_at: string;
}

export interface Tin6Topic {
  id: string;
  code: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  title: string;
  description: string;
  iconName: string;
  lessons: Tin6Lesson[];
}

export interface ComponentDetail {
  title: string;
  icon: string;
  description: string;
  functionText: string;
  example: string;
}

export interface Tin6Lesson {
  id: string;
  topicCode: string;
  lessonNumber: number;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  summary: string;
  keyPoints: string[];
  components?: ComponentDetail[];
  contentHtml?: string;
  quizQuestionIds?: string[];
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'fill_blank';

export interface Question {
  id: string;
  lesson_id: string;
  question_text: string;
  question_type: QuestionType;
  options: string[];
  correct_answer: string;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tag: string;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  lesson_title: string;
  title: string;
  description: string;
  due_date: string;
  max_score: number;
  rubric: { criteria: string; points: number }[];
}

export interface Submission {
  id: string;
  assignment_id: string;
  assignment_title: string;
  student_id: string;
  student_name: string;
  student_avatar: string;
  content: string;
  score: number | null;
  max_score: number;
  feedback: string | null;
  status: 'submitted' | 'graded';
  submitted_at: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'greeting' | 'quiz' | 'badge' | 'assignment';
  created_at: string;
  is_read: boolean;
}
