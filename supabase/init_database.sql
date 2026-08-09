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
-- DỮ LIỆU BAN ĐẦU 6 CHỦ ĐỀ & 17 BÀI HỌC
-- ============================================================================

INSERT INTO public.profiles (id, email, full_name, role, classroom, username, password, avatar_url, bio, xp, level, coins, streak_days)
VALUES 
    ('teacher-co-do-mung', 'codomung@gmail.com', 'Cô Đỗ Mừng', 'teacher', 'Khối 6', 'codomung', '123456', '/images/avatar_co_mung.jpg', 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖', 9999, 25, 5000, 90),
    ('student-em-hoc-sinh', 'giabao@hocsinh.tin6.edu.vn', 'Em Nguyễn Gia Bảo', 'student', '6A1', 'giabao6a1', '123456', 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1', 'Học sinh lớp 6A1 - Đam mê học Tin học cùng Cô Đỗ Mừng 🌸', 850, 4, 320, 7)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, avatar_url = EXCLUDED.avatar_url, bio = EXCLUDED.bio, classroom = EXCLUDED.classroom;

INSERT INTO public.topics (id, code, title, description, icon_name, order_index)
VALUES 
    ('topic-a', 'A', 'Chủ đề A: Máy tính và cộng đồng', 'Tìm hiểu thông tin, dữ liệu, các bước xử lý thông tin và cách máy tính biểu diễn dữ liệu bằng dãy bit.', 'Cpu', 1),
    ('topic-b', 'B', 'Chủ đề B: Mạng máy tính và Internet', 'Cấu trúc mạng máy tính, kết nối Internet toàn cầu, tra cứu thông tin WWW và kỹ năng sử dụng Email.', 'Globe', 2),
    ('topic-c', 'C', 'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', 'Kỹ năng an toàn thông tin số, quản lý cây thư mục và tệp tin khoa học trên máy tính.', 'ShieldAlert', 3),
    ('topic-d', 'D', 'Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số', 'Ứng dụng Sơ đồ tư duy (Mindmap) để hệ thống hóa kiến thức và ghi nhớ bài học sáng tạo.', 'BookOpen', 4),
    ('topic-e', 'E', 'Chủ đề E: Ứng dụng tin học', 'Thành thạo kỹ năng soạn thảo văn bản, định dạng ký tự đoạn văn và trình bày dữ liệu dạng bảng biểu khoa học.', 'FileText', 5),
    ('topic-f', 'F', 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính', 'Tư duy thuật toán, sơ đồ khối, 3 cấu trúc điều khiển lập trình và dự án thực tế Tin học và cuộc sống.', 'Code', 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.lessons (id, topic_id, topic_code, lesson_number, title, duration_minutes, summary)
VALUES 
    ('lesson-1', 'topic-a', 'A', 1, 'Bài 1: Thông tin và dữ liệu', 15, 'Phân biệt thông tin, dữ liệu, vật mang tin và vai trò của thông tin trong đời sống.'),
    ('lesson-2', 'topic-a', 'A', 2, 'Bài 2: Xử lý thông tin', 20, 'Quy trình 4 bước xử lý thông tin của con người và máy tính; 5 thao tác cơ bản với chuột.'),
    ('lesson-3', 'topic-a', 'A', 3, 'Bài 3: Thông tin trong máy tính', 25, 'Dãy bit 0 và 1 - Ngôn ngữ nhị phân; Các đơn vị đo dung lượng Byte, KB, MB, GB, TB.'),
    ('lesson-4', 'topic-b', 'B', 4, 'Bài 4: Mạng máy tính', 20, 'Khái niệm mạng máy tính, các thành phần của mạng và lợi ích chia sẻ tài nguyên.'),
    ('lesson-5', 'topic-b', 'B', 5, 'Bài 5: Internet', 20, 'Mạng Internet là gì, đặc điểm chính và những lợi ích to lớn của Internet đối với học tập.'),
    ('lesson-6', 'topic-b', 'B', 6, 'Bài 6: Mạng thông tin toàn cầu (WWW)', 20, 'World Wide Web (WWW), website, siêu liên kết và trình duyệt web.'),
    ('lesson-7', 'topic-b', 'B', 7, 'Bài 7: Tìm kiếm thông tin trên Internet', 20, 'Cách sử dụng máy tìm kiếm, mẹo chọn từ khóa thông minh để tra cứu tài liệu nhanh.'),
    ('lesson-8', 'topic-b', 'B', 8, 'Bài 8: Thư điện tử (Email)', 25, 'Cấu trúc địa chỉ email, ưu điểm của thư điện tử và cách gửi nhận email an toàn.'),
    ('lesson-9', 'topic-c', 'C', 9, 'Bài 9: An toàn thông tin trên Internet', 20, 'Nhận biết rủi ro trên mạng, bảo vệ thông tin cá nhân và quy tắc ứng xử văn minh số.'),
    ('lesson-10', 'topic-c', 'C', 10, 'Bài 10: Lưu trữ và tìm kiếm tệp tin trên máy tính', 20, 'Cấu trúc cây thư mục, tệp tin, đường dẫn và kỹ năng quản lý tệp tin khoa học.'),
    ('lesson-11', 'topic-d', 'D', 11, 'Bài 11: Sơ đồ tư duy', 25, 'Sơ đồ tư duy Mindmap, các thành phần chính và cách tóm tắt bài học sáng tạo.'),
    ('lesson-12', 'topic-e', 'E', 12, 'Bài 12: Soạn thảo văn bản cơ bản', 20, 'Làm quen phần mềm Word, quy tắc gõ chữ Tiếng Việt có dấu và lưu tệp văn bản.'),
    ('lesson-13', 'topic-e', 'E', 13, 'Bài 13: Định dạng văn bản', 25, 'Định dạng ký tự (Font, Size, Color, Bold/Italic) và định dạng đoạn văn bản (Căn lề, Giãn dòng).'),
    ('lesson-14', 'topic-e', 'E', 14, 'Bài 14: Trình bày thông tin ở dạng bảng', 25, 'Tạo bảng biểu trong văn bản, thêm/xóa cột dòng, gộp ô và định dạng thời khóa biểu.'),
    ('lesson-15', 'topic-f', 'F', 15, 'Bài 15: Thuật toán', 25, 'Khái niệm thuật toán, xác định đầu vào Input, đầu ra Output và 2 cách mô tả thuật toán.'),
    ('lesson-16', 'topic-f', 'F', 16, 'Bài 16: Các cấu trúc điều khiển', 30, '3 cấu trúc điều khiển nền tảng: Tuần tự, Rẽ nhánh (Nếu...Thì...) và Lặp.'),
    ('lesson-17', 'topic-f', 'F', 17, 'Bài 17: Dự án: Sổ tay tin học của em', 35, 'Dự án tổng kết: Vận dụng toàn bộ kiến thức Tin học 6 thiết kế Sổ tay tin học học đường.')
ON CONFLICT (id) DO NOTHING;
