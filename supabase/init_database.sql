-- ============================================================================
-- 🌸 HỆ THỐNG CƠ SỞ DỮ LIỆU SUPABASE: CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG 💖
-- Sách Giáo Khoa Tin Học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG & ĐĂNG KÝ HỌC SINH / GIÁO VIÊN (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    classroom TEXT, -- Lớp học sinh (VD: 6A1, 6A2...)
    username TEXT UNIQUE, -- Tên đăng nhập của học sinh
    password TEXT, -- Mật khẩu học sinh
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

-- 3. BẢNG BÀI HỌC (LESSONS - 15 BÀI THEO SGK KẾT NỐI TRI THỨC)
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

-- 4. BẢNG NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM (QUESTIONS)
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

-- 5. BẢNG GIAO BÀI TẬP (ASSIGNMENTS)
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

-- 6. BẢNG BÀI NỘP CỦA HỌC SINH (SUBMISSIONS)
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

-- 7. BẢNG ĐÁNH GIÁ & XẾP LOẠI HỌC SINH THEO THÔNG TƯ 22 (STUDENT EVALUATIONS)
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
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Public read evaluations" ON public.student_evaluations FOR SELECT USING (true);

CREATE POLICY "Allow update profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage evaluations" ON public.student_evaluations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage assignments" ON public.assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage lessons" ON public.lessons FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- NẠP DỮ LIỆU BAN ĐẦU (SEED DATA ĐÁNH GIÁ HỌC SINH)
-- ============================================================================

INSERT INTO public.profiles (id, email, full_name, role, classroom, username, password, avatar_url, bio, xp, level, coins, streak_days)
VALUES 
    ('teacher-co-do-mung', 'codomung@gmail.com', 'Cô Đỗ Mừng', 'teacher', 'Khối 6', 'codomung', '123456', '/images/avatar_co_mung.jpg', 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖', 9999, 25, 5000, 90),
    ('student-em-hoc-sinh', 'giabao@hocsinh.tin6.edu.vn', 'Em Nguyễn Gia Bảo', 'student', '6A1', 'giabao6a1', '123456', 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1', 'Học sinh lớp 6A1 - Đam mê học Tin học cùng Cô Đỗ Mừng 🌸', 850, 4, 320, 7)
ON CONFLICT (id) DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    bio = EXCLUDED.bio,
    classroom = EXCLUDED.classroom;

INSERT INTO public.student_evaluations (id, student_id, student_name, student_code, classroom, avatar_url, attendance_score, quiz_avg_score, practice_score, assignment_score, final_score, grade_level, teacher_remarks, badges_earned)
VALUES 
    ('eval-1', 'student-em-hoc-sinh', 'Nguyễn Gia Bảo', 'HS-6A1-01', '6A1', 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1', 10.0, 9.8, 9.5, 10.0, 9.8, 'xuat_sac', 'Học sinh rất thông minh, chăm chỉ, hoàn thành xuất sắc các bài thực hành và tích cực hỗ trợ bạn trong lớp. 🌸', '["🥇 Thủ Khoa Tin 6", "⚡ Thao Tác Siêu Tốc", "🌟 Chuyên Cần 100%"]'::jsonb),
    ('eval-2', 'student-2', 'Trần Minh Ánh', 'HS-6A1-02', '6A1', 'https://api.dicebear.com/7.x/bottts/svg?seed=minhanh', 10.0, 9.5, 9.0, 9.5, 9.4, 'xuat_sac', 'Nắm vững kiến thức phần cứng và mạng máy tính, làm bài trắc nghiệm nhanh và chuẩn xác.', '["🥈 Á Khoa Lớp 6A1", "💡 Tư Duy Logic"]'::jsonb),
    ('eval-3', 'student-3', 'Lê Hoàng Nam', 'HS-6A1-03', '6A1', 'https://api.dicebear.com/7.x/bottts/svg?seed=hoangnam', 9.0, 8.8, 9.0, 8.5, 8.8, 'tot', 'Kỹ năng gõ phím và sử dụng chuột rất tốt, cần chú ý ôn tập thêm phần đơn vị đo dung lượng Byte/Bit.', '["⌨️ Bàn Phím Vàng", "🚀 Tiến Bộ Nhanh"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
