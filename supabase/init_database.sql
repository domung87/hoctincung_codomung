-- ============================================================================
-- 🌸 HỆ THỐNG CƠ SỞ DỮ LIỆU SUPABASE: CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG 💖
-- Sách Giáo Khoa Tin Học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống
-- ============================================================================

-- Bật extension tạo UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG (PROFILES & PHÂN QUYỀN)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
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
    code TEXT NOT NULL, -- A, B, C, D, E, F
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

-- 4. BẢNG NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM (QUESTIONS & EXERCISES)
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

-- 7. BẢNG LỊCH SỬ LÀM QUIZ (QUIZ ATTEMPTS)
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER DEFAULT 5,
    xp_earned INTEGER DEFAULT 50,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CẤU HÌNH ROW LEVEL SECURITY (RLS) AN TOÀN CHO SUPABASE
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc công khai danh sách chủ đề, bài học và câu hỏi trắc nghiệm
CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Public read quiz_results" ON public.quiz_results FOR SELECT USING (true);

-- Cho phép thêm và cập nhật dữ liệu (hỗ trợ cả Anon Key và Authenticated)
CREATE POLICY "Allow update profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert quiz_results" ON public.quiz_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage assignments" ON public.assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow manage lessons" ON public.lessons FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- DỮ LIỆU MẪU KHỞI TẠO (SEED DATA)
-- ============================================================================

-- 1. Thêm Profiles
INSERT INTO public.profiles (id, email, full_name, role, avatar_url, bio, xp, level, coins, streak_days)
VALUES 
    ('teacher-co-do-mung', 'codomung@tinhoc6.edu.vn', 'Cô Đỗ Mừng', 'teacher', '/images/avatar_co_mung.jpg', 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖', 9999, 25, 5000, 90),
    ('student-em-hoc-sinh', 'hocsinh.tin6@school.edu.vn', 'Em Nguyễn Gia Bảo (Lớp 6A1)', 'student', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Học sinh lớp 6A1 - Đam mê học Tin học cùng Cô Đỗ Mừng 🌸', 850, 4, 320, 7),
    ('admin-quan-tri', 'admin@tinhoc6.edu.vn', 'Quản Trị Viên Hệ Thống', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Quản trị viên Hệ thống Cùng Học Tin 6', 5000, 15, 2000, 45)
ON CONFLICT (id) DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    bio = EXCLUDED.bio;

-- 2. Thêm 6 Chủ Đề Lớn
INSERT INTO public.topics (id, code, title, description, icon_name, order_index)
VALUES 
    ('topic-a', 'A', 'Chủ đề A: Máy tính và Em (Máy tính và cộng đồng)', 'Tìm hiểu thông tin, dữ liệu, các thành phần phần cứng và biểu diễn thông tin trong máy tính.', 'Cpu', 1),
    ('topic-b', 'B', 'Chủ đề B: Mạng máy tính và Internet', 'Kết nối mạng máy tính, mạng toàn cầu Internet, tìm kiếm thông tin và gửi thư điện tử Email.', 'Globe', 2),
    ('topic-c', 'C', 'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', 'An toàn thông tin cá nhân và bảo vệ bản quyền trên môi trường mạng số.', 'ShieldAlert', 3),
    ('topic-d', 'D', 'Chủ đề D: Đạo đức, pháp luật và văn hóa số', 'Sử dụng sơ đồ tư duy để tóm tắt và ghi nhớ kiến thức học tập khoa học.', 'BookOpen', 4),
    ('topic-e', 'E', 'Chủ đề E: Ứng dụng tin học (Soạn thảo văn bản)', 'Định dạng văn bản đẹp mắt và trình bày thông tin khoa học ở dạng bảng biểu.', 'FileText', 5),
    ('topic-f', 'F', 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính', 'Tư duy thuật toán, các cấu trúc điều khiển và dự án thực tế Tin học và cuộc sống.', 'Code', 6)
ON CONFLICT (id) DO NOTHING;

-- 3. Thêm Bài Học Tiêu Biểu
INSERT INTO public.lessons (id, topic_id, topic_code, lesson_number, title, duration_minutes, summary, key_points, components)
VALUES 
    (
        'lesson-1', 'topic-a', 'A', 1, 
        'Bài 1: Thông tin và dữ liệu (Máy tính & các thành phần cơ bản)', 
        15, 
        'Hiểu rõ khái niệm thông tin, dữ liệu, vật mang tin và 4 thành phần cơ bản của hệ thống máy tính.',
        '["Thông tin là những hiểu biết của con người về thế giới xung quanh.", "Dữ liệu là thông tin dưới dạng văn bản, số, hình ảnh, âm thanh.", "Vật mang tin là phương tiện lưu giữ thông tin.", "Máy tính gồm: Thân máy (CPU), Thiết bị vào, Thiết bị ra, Bộ nhớ ngoài."]'::jsonb,
        '[
            {"title": "1. Thân máy tính (CPU - Bộ não xử lý)", "icon": "Cpu", "description": "Chứa các linh kiện xử lý dữ liệu và điều khiển mọi hoạt động của máy tính.", "functionText": "Thực hiện tính toán và điều khiển.", "example": "Chip Intel Core, AMD Ryzen"},
            {"title": "2. Bộ nhớ trong (RAM & ROM)", "icon": "HardDrive", "description": "Lưu trữ chương trình và dữ liệu đang chạy để CPU xử lý tức thì.", "functionText": "RAM mất dữ liệu khi tắt máy; ROM lưu chương trình khởi động.", "example": "Thanh RAM 8GB, 16GB"},
            {"title": "3. Thiết bị vào (Input)", "icon": "Mouse", "description": "Giúp con người đưa thông tin và mệnh lệnh vào máy tính.", "functionText": "Thu nhận dữ liệu từ bên ngoài chuyển thành dạng số.", "example": "Bàn phím, Chuột, Micro, Camera"},
            {"title": "4. Thiết bị ra (Output)", "icon": "Monitor", "description": "Giúp máy tính đưa kết quả xử lý ra cho con người hiểu được.", "functionText": "Chuyển dữ liệu trong máy tính thành văn bản, hình ảnh, âm thanh.", "example": "Màn hình, Loa, Máy in, Máy chiếu"}
        ]'::jsonb
    ),
    (
        'lesson-2', 'topic-a', 'A', 2, 
        'Bài 2: Xử lý thông tin & Rèn luyện kỹ năng sử dụng chuột', 
        20, 
        'Quy trình xử lý thông tin 4 bước và 5 thao tác cơ bản với chuột máy tính.',
        '["Quy trình 4 bước: Thu nhận -> Lưu trữ -> Xử lý -> Truyền thông tin.", "5 thao tác chuột: Di chuyển, Nháy chuột (Click), Nháy đúp, Nháy phải, Kéo thả."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-3', 'topic-a', 'A', 3, 
        'Bài 3: Máy tính trong hoạt động thông tin & Soạn thảo cơ bản', 
        25, 
        'Máy tính hỗ trợ con người trong thu nhận, lưu trữ, xử lý và truyền đạt thông tin.',
        '["Máy tính tính toán nhanh, chính xác và lưu trữ khổng lồ.", "Máy tính chưa thể có cảm xúc và trực giác như con người."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-4', 'topic-a', 'A', 4, 
        'Bài 4: Biểu diễn văn bản, hình ảnh, âm thanh trong máy tính', 
        25, 
        'Dãy bit 0 và 1 - Ngôn ngữ nhị phân; Các đơn vị đo dung lượng Byte, KB, MB, GB.',
        '["Mọi thông tin trong máy tính đều biểu diễn bằng dãy bit (0 và 1).", "1 Byte (B) = 8 bit. 1 KB = 1024 B. 1 MB = 1024 KB. 1 GB = 1024 MB."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-5', 'topic-b', 'B', 5, 
        'Bài 5: Mạng máy tính', 
        20, 
        'Khái niệm mạng máy tính, thành phần mạng và lợi ích chia sẻ tài nguyên.',
        '["Mạng máy tính giúp trao đổi thông tin và chia sẻ tài nguyên.", "Thành phần gồm: Thiết bị đầu cuối, Thiết bị kết nối, Phần mềm mạng."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-6', 'topic-b', 'B', 6, 
        'Bài 6: Mạng thông tin toàn cầu (Internet & WWW)', 
        20, 
        'World Wide Web (WWW), website, trình duyệt web và siêu liên kết.',
        '["Internet là mạng liên kết toàn cầu.", "WWW là mạng thông tin gồm các trang web liên kết bằng siêu văn bản."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-10', 'topic-d', 'D', 10, 
        'Bài 10: Sơ đồ tư duy (Mindmap)', 
        20, 
        'Phương pháp tóm tắt kiến thức bằng từ khóa, hình ảnh và các nhánh nối liên kết.',
        '["Chủ đề chính ở trung tâm, ý chính là nhánh lớn, ý phụ là nhánh nhỏ.", "Giúp ghi nhớ bài học nhanh và có hệ thống."]'::jsonb,
        '[]'::jsonb
    ),
    (
        'lesson-13', 'topic-f', 'F', 13, 
        'Bài 13: Thuật toán và các cách mô tả thuật toán', 
        25, 
        'Thuật toán là dãy các chỉ dẫn từng bước rõ ràng để giải quyết bài toán.',
        '["Mô tả bằng lời văn tự nhiên và Vẽ sơ đồ khối (Flowchart).", "Đầu vào (Input) -> Các bước xử lý -> Đầu ra (Output)."]'::jsonb,
        '[]'::jsonb
    )
ON CONFLICT (id) DO NOTHING;

-- 4. Thêm Câu Hỏi Trắc Nghiệm
INSERT INTO public.questions (id, lesson_id, question_text, options, correct_answer, explanation, points, tag)
VALUES 
    (
        'q-tin6-1', 'lesson-1', 
        'Thành phần nào được xem là "Bộ não" của máy tính, có nhiệm vụ xử lý thông tin và tính toán?',
        '["Bộ xử lý trung tâm (CPU - Thân máy)", "Bàn phím (Keyboard)", "Màn hình máy tính (Monitor)", "Chuột máy tính (Mouse)"]'::jsonb,
        'Bộ xử lý trung tâm (CPU - Thân máy)',
        'Thân máy chứa CPU đóng vai trò như bộ não, thực hiện mọi phép tính toán và điều khiển hoạt động của máy tính.',
        10, 'Chủ đề A - Tin 6'
    ),
    (
        'q-tin6-2', 'lesson-1', 
        'Trong các thiết bị sau, thiết bị nào thuộc nhóm "Thiết bị vào" (Input Device)?',
        '["Bàn phím và Chuột máy tính", "Màn hình và Loa", "Máy in và Máy chiếu", "Tai nghe và Ổ đĩa mềm"]'::jsonb,
        'Bàn phím và Chuột máy tính',
        'Bàn phím và chuột giúp người dùng đưa dữ liệu và lệnh từ bên ngoài vào máy tính nên gọi là Thiết bị vào.',
        10, 'Chủ đề A - Tin 6'
    ),
    (
        'q-tin6-3', 'lesson-1', 
        '1 Byte (B) bằng bao nhiêu bit trong hệ thống biểu diễn thông tin nhị phân?',
        '["8 bit", "10 bit", "1024 bit", "16 bit"]'::jsonb,
        '8 bit',
        '1 Byte gồm 8 bit nhị phân (gồm các chữ số 0 và 1).',
        10, 'Chủ đề A - Tin 6'
    ),
    (
        'q-tin6-4', 'lesson-5', 
        'Mạng máy tính mang lại lợi ích lớn nhất nào cho người sử dụng?',
        '["Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng", "Làm cho máy tính không bao giờ bị hỏng", "Tự động làm bài tập thay cho học sinh", "Tiết kiệm điện năng 100%"]'::jsonb,
        'Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng',
        'Mạng máy tính giúp các máy tính có thể gửi nhận tệp tin, dùng chung máy in và truyền tin tức tức thì.',
        10, 'Chủ đề B - Tin 6'
    ),
    (
        'q-tin6-5', 'lesson-13', 
        'Thuật toán trong Tin học được hiểu là gì?',
        '["Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc", "Một loại virus máy tính", "Tên gọi của chiếc máy tính đầu tiên", "Một bài văn tả cảnh thiên nhiên"]'::jsonb,
        'Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc',
        'Thuật toán là các bước cụ thể, tuần tự từ dữ liệu đầu vào (Input) để tạo ra kết quả mong muốn (Output).',
        10, 'Chủ đề F - Tin 6'
    )
ON CONFLICT (id) DO NOTHING;

-- 5. Thêm Bài Tập Giao
INSERT INTO public.assignments (id, lesson_id, title, description, due_date, max_score, rubric)
VALUES 
    (
        'assign-tin6-1', 'lesson-1',
        'Bài tập: Phân loại các thiết bị phần cứng máy tính quanh em',
        'Em hãy kể tên 3 thiết bị vào, 3 thiết bị ra và 2 thiết bị lưu trữ thông tin mà em thường thấy ở phòng thực hành Tin học hoặc tại nhà.',
        NOW() + INTERVAL '14 days',
        100,
        '[{"criteria": "Kể đúng 3 thiết bị vào", "points": 40}, {"criteria": "Kể đúng 3 thiết bị ra", "points": 40}, {"criteria": "Kể đúng 2 thiết bị lưu trữ", "points": 20}]'::jsonb
    )
ON CONFLICT (id) DO NOTHING;
