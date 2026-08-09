-- ============================================================================
-- 🌸 HỆ THỐNG CƠ SỞ DỮ LIỆU SUPABASE: CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG 💖
-- Sách Giáo Khoa Tin Học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống (17 BÀI)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG & ĐĂNG KÝ HỌC SINH / GIÁO VIÊN (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    classroom TEXT,
    username TEXT UNIQUE,
    password TEXT,
    avatar_url TEXT,
    bio TEXT,
    xp INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    coins INTEGER DEFAULT 100 NOT NULL,
    streak_days INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BẢNG CHỦ ĐỀ HỌC TẬP (TOPICS)
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT DEFAULT 'Cpu',
    order_index INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BẢNG BÀI HỌC (LESSONS - ĐỦ 17 BÀI THEO SGK KẾT NỐI TRI THỨC)
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    topic_code TEXT NOT NULL,
    lesson_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 20,
    summary TEXT,
    key_points JSONB DEFAULT '[]'::jsonb,
    components JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BẢNG VIDEO BÀI GIẢNG CỦA GIÁO VIÊN (LESSON VIDEOS)
CREATE TABLE IF NOT EXISTS public.lesson_videos (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    lesson_title TEXT NOT NULL,
    topic_code TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    teacher_name TEXT DEFAULT 'Cô Đỗ Mừng 💖',
    teacher_avatar TEXT DEFAULT '/images/avatar_co_mung.jpg',
    duration TEXT DEFAULT '15:00',
    views_count INTEGER DEFAULT 1,
    description TEXT,
    timestamps JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BẢNG BÌNH LUẬN & HỎI ĐÁP VIDEO BÀI GIẢNG (VIDEO COMMENTS)
CREATE TABLE IF NOT EXISTS public.video_comments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    video_id TEXT REFERENCES public.lesson_videos(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    user_role TEXT DEFAULT 'student',
    comment_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM (QUESTIONS)
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT DEFAULT 'single_choice',
    options JSONB NOT NULL,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 10,
    difficulty TEXT DEFAULT 'medium',
    tag TEXT DEFAULT 'Tin Học 6',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BẢNG GIAO BÀI TẬP (ASSIGNMENTS)
CREATE TABLE IF NOT EXISTS public.assignments (
    id TEXT PRIMARY KEY,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    max_score NUMERIC(5, 2) DEFAULT 100.00,
    rubric JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BẢNG BÀI NỘP CỦA HỌC SINH (SUBMISSIONS)
CREATE TABLE IF NOT EXISTS public.submissions (
    id TEXT PRIMARY KEY,
    assignment_id TEXT REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_avatar TEXT,
    content TEXT,
    score NUMERIC(5, 2),
    max_score NUMERIC(5, 2) DEFAULT 100.00,
    feedback TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded')),
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BẢNG ĐÁNH GIÁ & XẾP LOẠI HỌC SINH THEO THÔNG TƯ 22 (STUDENT EVALUATIONS)
CREATE TABLE IF NOT EXISTS public.student_evaluations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_code TEXT NOT NULL,
    classroom TEXT NOT NULL,
    avatar_url TEXT,
    attendance_score NUMERIC(4, 2) DEFAULT 10.0,
    quiz_avg_score NUMERIC(4, 2) DEFAULT 0.0,
    practice_score NUMERIC(4, 2) DEFAULT 0.0,
    assignment_score NUMERIC(4, 2) DEFAULT 0.0,
    final_score NUMERIC(4, 2) DEFAULT 0.0,
    grade_level TEXT DEFAULT 'dat' CHECK (grade_level IN ('xuat_sac', 'tot', 'dat', 'chua_dat')),
    teacher_remarks TEXT,
    badges_earned JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CẤU HÌNH ROW LEVEL SECURITY (RLS) AN TOÀN CHO WEB
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read videos" ON public.lesson_videos FOR SELECT USING (true);
CREATE POLICY "Public read comments" ON public.video_comments FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Public read evaluations" ON public.student_evaluations FOR SELECT USING (true);

CREATE POLICY "Allow manage videos" ON public.lesson_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert comments" ON public.video_comments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow update profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage evaluations" ON public.student_evaluations FOR ALL USING (true) WITH CHECK (true);
