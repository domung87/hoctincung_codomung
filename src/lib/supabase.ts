import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Tin6Topic, Question, Submission, UserProfile } from '../types';
import { TIN6_TOPICS, INITIAL_QUESTIONS, INITIAL_SUBMISSIONS, INITIAL_PROFILES } from './mockData';

// User's Live Supabase Project Credentials
export const DEFAULT_SUPABASE_URL = 'https://ypyeodvomjcvccltkucf.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweWVvZHZvbWpjdmNjbHRrdWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjI4NzAsImV4cCI6MjEwMTgzODg3MH0.YFJuvXxho9r42J-FRILr9rDjnalV3lOR4u56bmU3YJA';

// Get active configuration (Priority: localStorage > import.meta.env > DEFAULT)
export const getSupabaseConfig = () => {
  const localUrl = localStorage.getItem('skillset_supabase_url');
  const localKey = localStorage.getItem('skillset_supabase_anon_key');

  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const url = localUrl || envUrl || DEFAULT_SUPABASE_URL;
  const anonKey = localKey || envKey || DEFAULT_SUPABASE_ANON_KEY;

  const isLive = Boolean(url && anonKey && url.startsWith('https://'));

  return { url, anonKey, isLive };
};

export const saveSupabaseConfig = (url: string, anonKey: string) => {
  localStorage.setItem('skillset_supabase_url', url.trim());
  localStorage.setItem('skillset_supabase_anon_key', anonKey.trim());
  supabaseClient = null; // Reset client instance
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem('skillset_supabase_url');
  localStorage.removeItem('skillset_supabase_anon_key');
  supabaseClient = null;
};

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (e) {
      console.warn('Lỗi khởi tạo Supabase Client:', e);
      return null;
    }
  }
  return supabaseClient;
};

// Test Connection Helper
export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
  const client = getSupabase();
  if (!client) {
    return { success: false, message: 'Chưa cấu hình Supabase URL hoặc Anon Key hợp lệ.' };
  }

  const startTime = performance.now();
  try {
    const { data, error } = await client.from('profiles').select('id, full_name').limit(1);
    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
        return { 
          success: true, 
          message: `Kết nối thành công tới Supabase! (Lưu ý: Thầy/Cô cần chạy file init_database.sql trong SQL Editor để tạo bảng).`,
          latencyMs 
        };
      }
      return { success: false, message: `Lỗi từ Supabase: ${error.message}` };
    }

    return { 
      success: true, 
      message: `Kết nối thành công! Đã truy vấn bảng profiles trong ${latencyMs}ms.`,
      latencyMs 
    };
  } catch (err: any) {
    return { success: false, message: `Không thể kết nối tới Supabase: ${err?.message || err}` };
  }
};

// ============================================================================
// DATA ACCESS FUNCTIONS (HỖ TRỢ ĐỒNG BỘ TRỰC TIẾP DB SUPABASE)
// ============================================================================

// 1. Fetch Topics & Lessons
export const fetchTopicsFromSupabase = async (): Promise<Tin6Topic[]> => {
  const client = getSupabase();
  if (!client) return TIN6_TOPICS;

  try {
    const { data: topicsData, error: topicsErr } = await client
      .from('topics')
      .select('*')
      .order('order_index', { ascending: true });

    if (topicsErr || !topicsData || topicsData.length === 0) {
      return TIN6_TOPICS;
    }

    const { data: lessonsData, error: lessonsErr } = await client
      .from('lessons')
      .select('*')
      .order('lesson_number', { ascending: true });

    if (lessonsErr || !lessonsData || lessonsData.length === 0) {
      return TIN6_TOPICS;
    }

    // Map lessons into topics
    return topicsData.map(topic => ({
      id: topic.id,
      code: topic.code,
      title: topic.title,
      description: topic.description || '',
      iconName: topic.icon_name || 'Cpu',
      lessons: lessonsData
        .filter(l => l.topic_id === topic.id || l.topic_code === topic.code)
        .map(l => ({
          id: l.id,
          topicCode: l.topic_code,
          lessonNumber: l.lesson_number,
          title: l.title,
          durationMinutes: l.duration_minutes || 20,
          isCompleted: false,
          summary: l.summary || '',
          keyPoints: Array.isArray(l.key_points) ? l.key_points : [],
          components: Array.isArray(l.components) ? l.components : []
        }))
    }));
  } catch (err) {
    console.warn('Sử dụng dữ liệu mẫu do chưa khởi tạo bảng trên Supabase:', err);
    return TIN6_TOPICS;
  }
};

// 2. Fetch Questions
export const fetchQuestionsFromSupabase = async (): Promise<Question[]> => {
  const client = getSupabase();
  if (!client) return INITIAL_QUESTIONS;

  try {
    const { data, error } = await client.from('questions').select('*');
    if (error || !data || data.length === 0) return INITIAL_QUESTIONS;

    return data.map(q => ({
      id: q.id,
      lesson_id: q.lesson_id,
      question_text: q.question_text,
      question_type: q.question_type || 'single_choice',
      options: Array.isArray(q.options) ? q.options : [],
      correct_answer: q.correct_answer,
      explanation: q.explanation || '',
      points: q.points || 10,
      difficulty: q.difficulty || 'medium',
      tag: q.tag || 'Tin Học 6'
    }));
  } catch (err) {
    return INITIAL_QUESTIONS;
  }
};

// 3. Save Submission to Supabase
export const saveSubmissionToSupabase = async (sub: Submission): Promise<boolean> => {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('submissions').upsert({
      id: sub.id,
      assignment_id: sub.assignment_id,
      student_id: sub.student_id,
      student_name: sub.student_name,
      student_avatar: sub.student_avatar,
      content: sub.content,
      score: sub.score,
      max_score: sub.max_score,
      feedback: sub.feedback,
      status: sub.status,
      submitted_at: sub.submitted_at
    });
    return !error;
  } catch (err) {
    console.error('Lỗi lưu bài nộp lên Supabase:', err);
    return false;
  }
};

// 4. Save Quiz Attempt to Supabase
export const saveQuizResultToSupabase = async (
  studentId: string, 
  lessonId: string, 
  score: number, 
  totalQuestions: number,
  xpEarned: number
): Promise<boolean> => {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('quiz_results').insert({
      id: 'quiz-' + Date.now(),
      student_id: studentId,
      lesson_id: lessonId,
      score,
      total_questions: totalQuestions,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    return false;
  }
};

// 5. Update Profile in Supabase
export const updateProfileInSupabase = async (profile: UserProfile): Promise<boolean> => {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('profiles').upsert({
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role,
      avatar_url: profile.avatar_url,
      bio: profile.bio,
      xp: profile.xp,
      level: profile.level,
      coins: profile.coins,
      streak_days: profile.streak_days,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch (err) {
    return false;
  }
};
