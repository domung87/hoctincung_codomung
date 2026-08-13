-- ============================================================================
-- 🌸 TOÀN BỘ CƠ SỞ DỮ LIỆU & DỮ LIỆU MẪU (ALL-IN-ONE SETUP SCRIPT)
-- HỆ THỐNG: CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG 💖
-- Sách Giáo Khoa Tin Học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống (17 Bài)
-- 
-- 💡 CÁCH DÙNG:
-- 1. Vào Supabase Dashboard -> Bấm SQL Editor -> Bấm "New query"
-- 2. Dán TOÀN BỘ file này vào rồi bấm "RUN" (hoặc Ctrl + Enter).
-- 3. File này được thiết kế an toàn tuyệt đối (Chạy bao nhiêu lần cũng KHÔNG bị lỗi trùng lặp!).
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PHẦN 1: KHỞI TẠO 9 BẢNG CƠ SỞ DỮ LIỆU
-- ============================================================================

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    classroom TEXT,
    username TEXT,
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

-- 3. BẢNG BÀI HỌC (LESSONS)
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

-- 4. BẢNG VIDEO BÀI GIẢNG (LESSON VIDEOS)
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

-- 5. BẢNG BÌNH LUẬN VIDEO (VIDEO COMMENTS)
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

-- 6. BẢNG CÂU HỎI TRẮC NGHIỆM (QUESTIONS)
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

-- 7. BẢNG BÀI TẬP (ASSIGNMENTS)
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

-- 8. BẢNG BÀI NỘP HỌC SINH (SUBMISSIONS)
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

-- 9. BẢNG ĐÁNH GIÁ XẾP LOẠI HỌC SINH THEO THÔNG TƯ 22 (STUDENT EVALUATIONS)
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
-- PHẦN 2: CẤU HÌNH BẢO MẬT ROW LEVEL SECURITY (RLS) AN TOÀN
-- (DÙNG DROP POLICY IF EXISTS TRƯỚC KHI TẠO ĐỂ TRÁNH LỖI ĐÃ TỒN TẠI)
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

-- Xóa policy cũ nếu có để tránh lỗi "already exists"
DROP POLICY IF EXISTS "Public read topics" ON public.topics;
DROP POLICY IF EXISTS "Public read lessons" ON public.lessons;
DROP POLICY IF EXISTS "Public read videos" ON public.lesson_videos;
DROP POLICY IF EXISTS "Public read comments" ON public.video_comments;
DROP POLICY IF EXISTS "Public read questions" ON public.questions;
DROP POLICY IF EXISTS "Public read assignments" ON public.assignments;
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public read submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public read evaluations" ON public.student_evaluations;

DROP POLICY IF EXISTS "Allow manage videos" ON public.lesson_videos;
DROP POLICY IF EXISTS "Allow insert comments" ON public.video_comments;
DROP POLICY IF EXISTS "Allow update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Allow manage evaluations" ON public.student_evaluations;

-- Tạo các policy cho phép ứng dụng đọc và ghi dữ liệu mượt mà
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

-- ============================================================================
-- PHẦN 3: NẠP DỮ LIỆU MẪU ĐẦY ĐỦ (SEED DATA)
-- ============================================================================

-- 1. NẠP HỒ SƠ GIÁO VIÊN & HỌC SINH
INSERT INTO public.profiles (id, email, full_name, role, classroom, username, password, avatar_url, bio, xp, level, coins, streak_days)
VALUES
  (
    'teacher-co-do-mung',
    'dothimung87@gmail.com',
    'Cô Đỗ Thị Mừng',
    'teacher',
    'Khối 6',
    'dothimung87',
    '123',
    '/images/avatar_co_mung.jpg',
    'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖',
    9999,
    25,
    5000,
    90
  ),
  (
    'student-giabao-6a1',
    'giabao.student@gmail.com',
    'Nguyễn Gia Bảo',
    'student',
    '6A1',
    'giabao6a1',
    '123',
    '/images/student_boy.jpg',
    'Học sinh lớp 6A1 - Đam mê lập trình và lắp ráp máy tính 🚀',
    980,
    5,
    450,
    14
  ),
  (
    'student-mailinh-6a2',
    'mailinh.student@gmail.com',
    'Đặng Mai Linh',
    'student',
    '6A2',
    'mailinh6a2',
    '123',
    '/images/student_girl.jpg',
    'Học sinh lớp 6A2 - Thích vẽ sơ đồ tư duy và soạn thảo văn bản 🌸',
    960,
    5,
    420,
    12
  ),
  (
    'student-minhanh-6a1',
    'minhanh.student@gmail.com',
    'Trần Minh Ánh',
    'student',
    '6A1',
    'minhanh6a1',
    '123',
    'https://api.dicebear.com/7.x/bottts/svg?seed=minhanh',
    'Học sinh lớp 6A1 - Thích khám phá mạng Internet và thuật toán 💡',
    940,
    4,
    390,
    10
  ),
  (
    'student-hoangnam-6a3',
    'hoangnam.student@gmail.com',
    'Lê Hoàng Nam',
    'student',
    '6A3',
    'hoangnam6a3',
    '123',
    'https://api.dicebear.com/7.x/bottts/svg?seed=hoangnam',
    'Học sinh lớp 6A3 - Chăm ngoan, tích cực tham gia các cuộc thi Tin học 🌟',
    890,
    4,
    350,
    8
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  xp = EXCLUDED.xp,
  coins = EXCLUDED.coins;

-- 2. NẠP 6 CHỦ ĐỀ HỌC TẬP
INSERT INTO public.topics (id, code, title, description, icon_name, order_index)
VALUES
  ('topic-a', 'Chủ đề A', 'Máy tính và cộng đồng', 'Khái niệm thông tin, dữ liệu, biểu diễn thông tin trong máy tính và cấu tạo máy tính cơ bản.', 'Cpu', 1),
  ('topic-b', 'Chủ đề B', 'Mạng máy tính và Internet', 'Khái niệm mạng, các thành phần của mạng, Internet và các dịch vụ World Wide Web.', 'Globe', 2),
  ('topic-c', 'Chủ đề C', 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', 'Thư điện tử (Email), công cụ tìm kiếm thông tin và tổ chức thông tin trên mạng.', 'Search', 3),
  ('topic-d', 'Chủ đề D', 'Đạo đức, pháp luật và văn hóa trong môi trường số', 'An toàn thông tin, bảo mật mật khẩu, bản quyền và ứng xử văn minh trên không gian mạng.', 'ShieldCheck', 4),
  ('topic-e', 'Chủ đề E', 'Ứng dụng tin học', 'Sơ đồ tư duy, soạn thảo văn bản Word, chèn hình ảnh và dự án cuốn Sổ tay Tin học.', 'FileText', 5),
  ('topic-f', 'Chủ đề F', 'Giải quyết vấn đề với sự trợ giúp của máy tính', 'Khái niệm thuật toán, mô tả thuật toán bằng sơ đồ khối và 3 cấu trúc điều khiển cơ bản.', 'Code2', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 3. NẠP CÁC BÀI HỌC TIÊU BIỂU
INSERT INTO public.lessons (id, topic_id, topic_code, lesson_number, title, duration_minutes, summary, key_points, components)
VALUES
  (
    'lesson-1',
    'topic-a',
    'Chủ đề A',
    1,
    'Bài 1: Thông tin và dữ liệu',
    20,
    'Hiểu rõ sự khác biệt giữa thông tin, dữ liệu và tầm quan trọng của thông tin trong đời sống con người.',
    '[
      "Thông tin là những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.",
      "Dữ liệu là thông tin dưới dạng được chứa trong máy tính (chữ viết, con số, hình ảnh, âm thanh).",
      "Vật mang tin là vật thể chứa hoặc truyền tải dữ liệu (sách, USB, thẻ nhớ, đĩa cứng)."
    ]'::jsonb,
    '[
      {"name": "Dữ liệu (Data)", "desc": "Các con số, văn bản, hình ảnh, âm thanh thô được ghi lại.", "example": "Con số 38°C ghi trên nhiệt kế."},
      {"name": "Thông tin (Information)", "desc": "Ý nghĩa rút ra sau khi xử lý dữ liệu.", "example": "Biết bạn học sinh đang bị sốt để chăm sóc y tế kịp thời."},
      {"name": "Vật mang tin (Medium)", "desc": "Phương tiện dùng để lưu trữ và truyền tải dữ liệu.", "example": "Trang sách giáo khoa, thẻ nhớ MicroSD, ổ cứng SSD."}
    ]'::jsonb
  ),
  (
    'lesson-2',
    'topic-a',
    'Chủ đề A',
    2,
    'Bài 2: Xử lý thông tin',
    25,
    'Khám phá quy trình xử lý thông tin 4 bước của con người và máy tính: Thu nhận -> Xử lý -> Lưu trữ -> Xuất kết quả.',
    '[
      "Bộ não con người là bộ phận xử lý thông tin tinh vi nhất.",
      "Máy tính mô phỏng quá trình xử lý thông tin của con người thông qua phần cứng và phần mềm.",
      "Bốn bước cơ bản: Thu nhận -> Lưu trữ -> Xử lý -> Truyền đạt (Xuất)."
    ]'::jsonb,
    '[
      {"name": "1. Thu nhận thông tin", "desc": "Các giác quan của người hoặc thiết bị nhập của máy tính (bàn phím, chuột, camera).", "example": "Tai nghe thấy tiếng trống trường báo hiệu giờ vào lớp."},
      {"name": "2. Lưu trữ thông tin", "desc": "Ghi nhớ vào bộ não hoặc ghi vào bộ nhớ máy tính (RAM, SSD).", "example": "Ghi nhớ công thức tính diện tích hình chữ nhật."},
      {"name": "3. Xử lý thông tin", "desc": "Phân tích, suy luận, tính toán để đưa ra kết luận hoặc quyết định.", "example": "Tính toán tiền thừa khi đi mua đồ dùng học tập."},
      {"name": "4. Truyền đạt thông tin", "desc": "Nói, viết, vẽ hoặc xuất ra màn hình, máy in, loa.", "example": "Giơ tay phát biểu câu trả lời trước lớp."}
    ]'::jsonb
  ),
  (
    'lesson-4',
    'topic-b',
    'Chủ đề B',
    4,
    'Bài 4: Mạng máy tính',
    25,
    'Khái niệm mạng máy tính, lợi ích kết nối và các thành phần chính tạo nên một mạng máy tính hoàn chỉnh.',
    '[
      "Mạng máy tính là tập hợp các máy tính được kết nối với nhau để chia sẻ dữ liệu và thiết bị.",
      "Lợi ích: Chia sẻ máy in, gửi tài liệu nhanh chóng, gọi video học trực tuyến.",
      "Các thành phần: Thiết bị đầu cuối, Thiết bị kết nối, Phần mềm mạng."
    ]'::jsonb,
    '[
      {"name": "Thiết bị đầu cuối (End Devices)", "desc": "Các thiết bị gửi hoặc nhận dữ liệu trong mạng.", "example": "Máy tính để bàn, Laptop, Điện thoại thông minh, Máy in mạng."},
      {"name": "Thiết bị kết nối (Network Devices)", "desc": "Các thiết bị trung gian định tuyến và truyền dẫn tín hiệu.", "example": "Bộ định tuyến Router Wi-Fi, Cáp mạng LAN, Bộ chia mạng Switch."},
      {"name": "Phần mềm mạng (Network Software)", "desc": "Hệ điều hành và ứng dụng điều khiển truyền nhận dữ liệu.", "example": "Trình duyệt web Google Chrome, Ứng dụng Zoom, Zalo."}
    ]'::jsonb
  ),
  (
    'lesson-9',
    'topic-d',
    'Chủ đề D',
    9,
    'Bài 9: An toàn thông tin trên Internet',
    25,
    'Các nguyên tắc vàng bảo vệ thông tin cá nhân, phòng tránh virus và ứng xử văn minh, tôn trọng bản quyền trên mạng.',
    '[
      "Không chia sẻ mật khẩu, địa chỉ nhà, số CCCD cho người lạ trên mạng.",
      "Đặt mật khẩu mạnh gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.",
      "Tôn trọng quyền tác giả, không sao chép tác phẩm của người khác khi chưa được phép."
    ]'::jsonb,
    '[
      {"name": "Bảo vệ mật khẩu", "desc": "Đặt mật khẩu tối thiểu 8 ký tự, không dùng ngày sinh hay số điện thoại dễ đoán.", "example": "Mật khẩu an toàn: CoDoMung@2026#"},
      {"name": "Phòng chống lừa đảo", "desc": "Không bấm vào các đường link lạ trúng thưởng, tặng quà không rõ nguồn gốc.", "example": "Cảnh giác với tin nhắn mời nhận quà 500k qua link lạ."},
      {"name": "Văn hóa mạng", "desc": "Ứng xử lịch sự, không nói tục chửi bậy, không bạo lực mạng.", "example": "Luôn bình luận tôn trọng và động viên bạn bè."}
    ]'::jsonb
  ),
  (
    'lesson-14',
    'topic-f',
    'Chủ đề F',
    14,
    'Bài 14: Khái niệm thuật toán',
    30,
    'Khái niệm thuật toán, cách mô tả các bước giải quyết bài toán mạch lạc, chính xác từ dữ liệu đầu vào đến đầu ra.',
    '[
      "Thuật toán là dãy các chỉ dẫn rõ ràng, tuần tự từng bước để giải quyết một công việc cụ thể.",
      "Đầu vào (Input): Thông tin hoặc dữ liệu đã cho trước.",
      "Đầu ra (Output): Kết quả nhận được sau khi thực hiện xong thuật toán."
    ]'::jsonb,
    '[
      {"name": "Tính xác định", "desc": "Mỗi bước phải rõ ràng, không thể hiểu theo nhiều cách khác nhau.", "example": "Bước 1: Lấy 200ml nước ấm vào cốc."},
      {"name": "Tính dừng", "desc": "Thuật toán phải kết thúc sau một số bước hữu hạn.", "example": "Khuấy đều 10 vòng cho đường tan hết rồi dừng lại."},
      {"name": "Tính đúng đắn", "desc": "Khi hoàn thành phải cho ra kết quả đúng theo yêu cầu đặt ra.", "example": "Có được cốc nước chanh thơm ngon đúng vị."}
    ]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  key_points = EXCLUDED.key_points,
  components = EXCLUDED.components;

-- 4. NẠP VIDEO BÀI GIẢNG CỦA CÔ ĐỖ MỪNG
INSERT INTO public.lesson_videos (id, lesson_id, lesson_title, topic_code, video_url, thumbnail_url, teacher_name, duration, views_count, description, timestamps)
VALUES
  (
    'video-1',
    'lesson-1',
    'Bài 1: Thông tin và dữ liệu',
    'Chủ đề A',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/images/banner_tin6_real.png',
    'Cô Đỗ Mừng 💖',
    '12:45',
    156,
    'Cô Đỗ Mừng hướng dẫn các em phân biệt Thông tin và Dữ liệu, kèm các ví dụ trực quan sinh động quanh lớp học.',
    '[
      {"time": "00:00", "label": "Lời chào & Giới thiệu bài 1"},
      {"time": "02:15", "label": "Khái niệm Thông tin là gì?"},
      {"time": "05:30", "label": "Khái niệm Dữ liệu & Vật mang tin"},
      {"time": "09:40", "label": "Bài tập trắc nghiệm củng cố"}
    ]'::jsonb
  ),
  (
    'video-4',
    'lesson-4',
    'Bài 4: Mạng máy tính',
    'Chủ đề B',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '/images/banner_tin6_real.png',
    'Cô Đỗ Mừng 💖',
    '15:20',
    210,
    'Khám phá thế giới mạng máy tính, các thiết bị Router, Switch, Cáp mạng LAN và cách chia sẻ dữ liệu.',
    '[
      {"time": "00:00", "label": "Mở đầu: Vì sao cần nối mạng?"},
      {"time": "03:10", "label": "3 Thành phần của mạng máy tính"},
      {"time": "08:45", "label": "Lợi ích khi dùng mạng"},
      {"time": "12:30", "label": "Tổng kết bài học"}
    ]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  views_count = EXCLUDED.views_count;

-- 5. NẠP BÌNH LUẬN BÀI GIẢNG
INSERT INTO public.video_comments (id, video_id, user_id, user_name, user_avatar, user_role, comment_text)
VALUES
  (
    'comment-1',
    'video-1',
    'student-giabao-6a1',
    'Nguyễn Gia Bảo (6A1)',
    '/images/student_boy.jpg',
    'student',
    'Thưa cô, cuốn sách giáo khoa Tin học 6 là Vật mang tin đúng không ạ?'
  ),
  (
    'comment-2',
    'video-1',
    'teacher-co-do-mung',
    'Cô Đỗ Mừng 💖 (Giáo viên)',
    '/images/avatar_co_mung.jpg',
    'teacher',
    'Chính xác rồi em Gia Bảo nhé! Cuốn sách chứa chữ viết và hình ảnh, đóng vai trò là vật mang tin rất quan trọng.'
  ),
  (
    'comment-3',
    'video-4',
    'student-mailinh-6a2',
    'Đặng Mai Linh (6A2)',
    '/images/student_girl.jpg',
    'student',
    'Bài giảng của cô giảng về Router Wi-Fi rất dễ hiểu ạ! Em cảm ơn cô nhiều ạ 🌸'
  )
ON CONFLICT (id) DO NOTHING;

-- 6. NẠP CÂU HỎI TRẮC NGHIỆM TƯƠNG TÁC
INSERT INTO public.questions (id, lesson_id, question_text, options, correct_answer, explanation, points, difficulty)
VALUES
  (
    'q-1',
    'lesson-1',
    'Em nhìn thấy biển báo cấm đi ngược chiều trên đường phố. Biển báo đó đóng vai trò là gì?',
    '["Thông tin", "Dữ liệu", "Vật mang tin", "Máy tính"]'::jsonb,
    'Vật mang tin',
    'Biển báo là vật thể cụ thể chứa hình ảnh và biểu tượng cấm đi ngược chiều, nên nó chính là Vật mang tin.',
    10,
    'easy'
  ),
  (
    'q-2',
    'lesson-2',
    'Khi làm bài kiểm tra toán, bộ phận nào của cơ thể em thực hiện nhiệm vụ "Xử lý thông tin"?',
    '["Đôi mắt", "Đôi tay", "Bộ não", "Đôi tai"]'::jsonb,
    'Bộ não',
    'Đôi mắt thu nhận đề bài, còn bộ não suy nghĩ, tính toán và suy luận ra kết quả, đó là quá trình Xử lý thông tin.',
    10,
    'easy'
  ),
  (
    'q-4',
    'lesson-4',
    'Thiết bị nào sau đây KHÔNG PHẢI là thiết bị đầu cuối trong mạng máy tính?',
    '["Máy tính xách tay (Laptop)", "Điện thoại thông minh (Smartphone)", "Bộ định tuyến (Router Wi-Fi)", "Máy in mạng"]'::jsonb,
    'Bộ định tuyến (Router Wi-Fi)',
    'Router Wi-Fi là thiết bị kết nối trung gian dùng để truyền dẫn và định tuyến tín hiệu, không phải là thiết bị đầu cuối.',
    10,
    'medium'
  ),
  (
    'q-9',
    'lesson-9',
    'Mật khẩu nào sau đây có độ an toàn và bảo mật cao nhất?',
    '["12345678", "nguyenvana", "TinHoc6@DoMung#2026", "0988888888"]'::jsonb,
    'TinHoc6@DoMung#2026',
    'Mật khẩu mạnh phải dài từ 8 ký tự trở lên, kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt (@, #).',
    10,
    'easy'
  ),
  (
    'q-14',
    'lesson-14',
    'Đặc điểm nào sau đây KHÔNG PHẢI là đặc tính cơ bản của một thuật toán?',
    '["Tính xác định", "Tính dừng", "Tính phức tạp vô hạn", "Tính đúng đắn"]'::jsonb,
    'Tính phức tạp vô hạn',
    'Thuật toán bắt buộc phải có tính dừng (kết thúc sau số bước hữu hạn), không được phép phức tạp vô hạn.',
    10,
    'medium'
  )
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation;

-- 7. NẠP BÀI TẬP VẬN DỤNG & THỰC HÀNH
INSERT INTO public.assignments (id, lesson_id, title, description, due_date, max_score, rubric)
VALUES
  (
    'hw-1',
    'lesson-1',
    'Bài tập 1: Phân biệt Thông tin và Vật mang tin trong lớp học',
    'Em hãy tìm 3 ví dụ về Vật mang tin trong phòng học Tin học và nêu rõ thông tin mà vật đó chứa đựng.',
    NOW() + INTERVAL '7 days',
    100.0,
    '[
      {"criteria": "Nêu đúng 3 ví dụ về vật mang tin trong phòng máy", "points": 40},
      {"criteria": "Giải thích rõ ràng thông tin chứa trong từng vật", "points": 40},
      {"criteria": "Trình bày đẹp mắt, câu văn mạch lạc", "points": 20}
    ]'::jsonb
  ),
  (
    'hw-4',
    'lesson-4',
    'Bài tập 4: Lập sơ đồ kết nối mạng máy tính gia đình',
    'Em hãy liệt kê các thiết bị đầu cuối và thiết bị kết nối đang sử dụng mạng Internet tại gia đình em.',
    NOW() + INTERVAL '7 days',
    100.0,
    '[
      {"criteria": "Liệt kê đầy đủ các thiết bị đầu cuối (Điện thoại, Tivi, Laptop)", "points": 50},
      {"criteria": "Nêu đúng tên thiết bị kết nối (Router Wi-Fi của nhà mạng)", "points": 30},
      {"criteria": "Nộp bài đúng hạn", "points": 20}
    ]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 8. NẠP BÀI NỘP CỦA HỌC SINH MẪU
INSERT INTO public.submissions (id, assignment_id, student_id, student_name, student_avatar, content, score, feedback, status)
VALUES
  (
    'sub-1',
    'hw-1',
    'student-giabao-6a1',
    'Nguyễn Gia Bảo',
    '/images/student_boy.jpg',
    'Em thưa cô, 3 ví dụ của em là: 1. Bảng nội quy phòng tin học (Chứa quy định tắt máy, không mang đồ ăn). 2. Cuốn SGK Tin 6 (Chứa kiến thức bài 1). 3. Ổ cứng SSD của máy tính số 05 (Chứa hệ điều hành Windows và phần mềm học tập).',
    100.0,
    'Bài làm rất xuất sắc! Em lấy ví dụ cực kỳ chính xác và gắn liền với phòng thực hành. Cô cộng cho em 100 điểm nhé! 🌸',
    'graded'
  ),
  (
    'sub-2',
    'hw-1',
    'student-mailinh-6a2',
    'Đặng Mai Linh',
    '/images/student_girl.jpg',
    'Thưa cô: 1. Thẻ nhớ của máy chiếu; 2. Sách bài tập tin học; 3. Tờ thời khóa biểu dán ở cửa lớp.',
    95.0,
    'Rất tốt! Em hiểu bài nhanh và trình bày câu chữ rất lễ phép.',
    'graded'
  )
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  feedback = EXCLUDED.feedback,
  status = EXCLUDED.status;

-- 9. NẠP SỔ ĐÁNH GIÁ & XẾP LOẠI HỌC SINH - THÔNG TƯ 22
INSERT INTO public.student_evaluations (
  id, student_id, student_name, student_code, classroom, avatar_url,
  attendance_score, quiz_avg_score, practice_score, assignment_score, final_score,
  grade_level, teacher_remarks, badges_earned
)
VALUES
  (
    'eval-1',
    'student-giabao-6a1',
    'Nguyễn Gia Bảo',
    'HS6-001',
    '6A1',
    '/images/student_boy.jpg',
    10.0,
    9.8,
    9.5,
    10.0,
    9.8,
    'xuat_sac',
    'Em Gia Bảo học tập rất chăm chỉ, tiếp thu bài nhanh, kỹ năng thực hành máy tính xuất sắc và luôn tích cực giúp đỡ các bạn trong lớp. Xứng đáng là Thủ khoa Khối 6 💖',
    '["🥇 Thủ Khoa Khối 6", "⚡ Phản Xạ Nhanh", "🛡️ Chuyên Gia An Toàn Mạng", "💎 Bàn Tay Vàng Word"]'::jsonb
  ),
  (
    'eval-2',
    'student-mailinh-6a2',
    'Đặng Mai Linh',
    'HS6-002',
    '6A2',
    '/images/student_girl.jpg',
    10.0,
    9.6,
    9.5,
    9.5,
    9.6,
    'xuat_sac',
    'Em Mai Linh có tư duy thẩm mỹ cao, vẽ sơ đồ tư duy rất đẹp và khoa học. Soạn thảo văn bản chuẩn mẫu, nộp bài đầy đủ đúng hạn.',
    '["🥈 Á Khoa Khối 6", "🎨 Họa Sĩ Sơ Đồ Tư Duy", "🌟 Ngôi Sao Chăm Chỉ"]'::jsonb
  ),
  (
    'eval-3',
    'student-minhanh-6a1',
    'Trần Minh Ánh',
    'HS6-003',
    '6A1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=minhanh',
    10.0,
    9.4,
    9.5,
    9.0,
    9.4,
    'xuat_sac',
    'Em Minh Ánh nắm rất chắc kiến thức về Mạng máy tính và Thuật toán. Rất nhiệt tình phát biểu xây dựng bài trong các tiết học.',
    '["🥉 Á Khoa 2", "💻 Siêu Trí Tuệ Thuật Toán"]'::jsonb
  ),
  (
    'eval-4',
    'student-hoangnam-6a3',
    'Lê Hoàng Nam',
    'HS6-004',
    '6A3',
    'https://api.dicebear.com/7.x/bottts/svg?seed=hoangnam',
    9.5,
    8.8,
    8.5,
    9.0,
    8.8,
    'tot',
    'Em Nam có nhiều tiến bộ vượt bậc trong kỹ năng gõ bàn phím và sử dụng chuột. Cần tiếp tục phát huy ở học kỳ 2 nhé em!',
    '["🌱 Tiến Bộ Vượt Bậc", "⌨️ Hiệp Sĩ Gõ Phím"]'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  final_score = EXCLUDED.final_score,
  grade_level = EXCLUDED.grade_level,
  teacher_remarks = EXCLUDED.teacher_remarks;

-- ============================================================================
-- KẾT QUẢ HOÀN THÀNH
-- ============================================================================
SELECT '🌸 Chúc mừng Thầy/Cô! Đã cài đặt và nạp thành công 100% Cơ sở dữ liệu cho website Cùng Học Tin 6! 🎉' AS thong_bao;
