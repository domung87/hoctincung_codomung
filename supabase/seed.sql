-- ============================================================================
-- SKILLSET LMS & GAMIFICATION PLATFORM - SEED DATA SCRIPT
-- ============================================================================

-- 1. SEED PROFILES & ROLES
INSERT INTO public.profiles (id, email, full_name, role, avatar_url, bio, xp, level, coins, streak_days)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'admin@skillset.edu', 'Nguyễn Quản Trị (Admin)', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Hệ thống Quản trị viên Tối cao SkillSet', 4500, 15, 2500, 45),
    ('00000000-0000-0000-0000-000000000002', 'teacher.lan@skillset.edu', 'Cô Mai Phương Lan (Giáo viên)', 'teacher', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'Chuyên gia Giảng dạy Lập trình & Khoa học Dữ liệu', 3200, 10, 1800, 28),
    ('00000000-0000-0000-0000-000000000003', 'student.shidiq@skillset.edu', 'Irham Muhammad Shidiq (Học viên)', 'student', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', 'Sinh viên năm 3 - Đam mê Công nghệ & Trí tuệ Nhân tạo', 1250, 5, 620, 12),
    ('00000000-0000-0000-0000-000000000004', 'student.minhanh@skillset.edu', 'Trần Minh Ánh', 'student', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Học viên chăm chỉ khóa Fullstack Web', 980, 4, 450, 9),
    ('00000000-0000-0000-0000-000000000005', 'student.hoangnam@skillset.edu', 'Lê Hoàng Nam', 'student', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', 'Người đạt top 1 cuộc thi Toán & Logic tuần trước', 1840, 7, 920, 19)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED MATERIALS & LESSONS
INSERT INTO public.materials (id, title, description, category, thumbnail_url, duration_minutes, total_lessons, rating, rating_count, is_published, is_popular, price_coins)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'Lập Trình Web Hiện Đại với React & Supabase', 'Xây dựng ứng dụng web hiện đại từ giao diện Glassmorphic đến Backend Serverless Edge Functions và Realtime DB.', 'Lập trình Web', '/images/book_red.jpg', 60, 12, 4.9, 142, true, true, 0),
    ('10000000-0000-0000-0000-000000000002', 'Cấu Trúc Dữ Liệu & Thuật Toán Trực Quan 3D', 'Khám phá cây nhị phân, thuật toán đồ thị và quy hoạch động với hình ảnh trực quan sinh động.', 'Khoa học máy tính', '/images/book_blue.jpg', 45, 8, 4.8, 98, true, true, 50),
    ('10000000-0000-0000-0000-000000000003', 'Thiết Kế UI/UX Chuyên Nghiệp với Figma & 3D Clay', 'Nắm vững quy tắc phối màu Pastel, thiết kế Design System và hiệu ứng Micro-Interactions cho Web App.', 'Thiết kế đồ họa', '/images/coffee_book.jpg', 50, 15, 5.0, 215, true, true, 100),
    ('10000000-0000-0000-0000-000000000004', 'Toán Rời Rạc & Tư Duy Logic Cho Lập Trình Viên', 'Phát triển năng lực giải quyết bài toán phức tạp và thuật toán tối ưu hóa.', 'Toán học & Logic', '/images/game_trophy.jpg', 40, 10, 4.7, 85, true, true, 0)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED QUESTIONS & EXERCISES
INSERT INTO public.questions (id, material_id, question_text, question_type, options, correct_answer, explanation, points, difficulty, tag)
VALUES 
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Trong kiến trúc Supabase, cơ chế nào dùng để phân quyền dữ liệu trực tiếp tại tầng cơ sở dữ liệu PostgreSQL?', 'single_choice', '["Row Level Security (RLS)", "JSON Web Token (JWT)", "Vite Bundler", "PostgREST Gateway"]'::jsonb, 'Row Level Security (RLS)', 'Row Level Security (RLS) cho phép kiểm soát quyền SELECT, INSERT, UPDATE, DELETE từng dòng dữ liệu dựa trên vai trò auth.uid().', 10, 'medium', 'Supabase'),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Hook nào trong React được sử dụng để quản lý các tác vụ phụ thuộc (Side Effects) như gọi API hoặc đồng bộ Realtime?', 'single_choice', '["useEffect", "useState", "useMemo", "useCallback"]'::jsonb, 'useEffect', 'useEffect được gọi sau khi component render để thực hiện các side effects như đăng ký Supabase Realtime channel hoặc fetch data.', 10, 'easy', 'React'),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'Độ phức tạp thuật toán thời gian trung bình của Quick Sort là bao nhiêu?', 'single_choice', '["O(n log n)", "O(n^2)", "O(log n)", "O(n)"]'::jsonb, 'O(n log n)', 'Quick Sort có độ phức tạp trung bình là O(n log n) và trường hợp xấu nhất là O(n^2).', 15, 'medium', 'Algorithms')
ON CONFLICT (id) DO NOTHING;

-- 4. SEED EDUCATIONAL GAMES
INSERT INTO public.educational_games (id, title, description, game_type, thumbnail_url, reward_xp, reward_coins, config, plays_count)
VALUES 
    ('30000000-0000-0000-0000-000000000001', 'Thử Thách Ghép Thẻ Trí Nhớ (Memory Match)', 'Ghép các cặp khái niệm kiến thức Web, Database và Công nghệ tương ứng trong thời gian nhanh nhất!', 'memory_match', '/images/book_red.jpg', 60, 30, '{"grid_size": 12, "time_limit_sec": 60}'::jsonb, 342),
    ('30000000-0000-0000-0000-000000000002', 'Đua Tốc Độ Toán & Logic (Math Blitz)', 'Giải nhanh các phép tính nhẩm và suy luận logic trong vòng 30 giây để tích lũy combo điểm số!', 'math_blitz', '/images/game_trophy.jpg', 80, 40, '{"round_count": 10, "time_per_q": 5}'::jsonb, 518),
    ('30000000-0000-0000-0000-000000000003', 'Gỡ Rối Từ Khóa Lập Trình (Word Scramble)', 'Sắp xếp các ký tự bị xáo trộn để giải mã từ khóa công nghệ chính xác!', 'word_scramble', '/images/coffee_book.jpg', 50, 25, '{"words": ["DATABASE", "SUPABASE", "REACTJS", "TAILWIND", "REALTIME"]}'::jsonb, 289)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED ASSIGNMENTS & SUBMISSIONS
INSERT INTO public.assignments (id, material_id, title, description, due_date, max_score, rubric)
VALUES 
    ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Bài tập lớn: Thiết kế Database & Giao diện Dashboard', 'Hãy viết file SQL tạo bảng và thiết kế giao diện React hiển thị danh sách bài học có phân quyền RLS.', NOW() + INTERVAL '7 days', 100, '[{"criteria": "Cấu trúc SQL & RLS", "points": 40}, {"criteria": "Giao diện UI/UX thẩm mỹ", "points": 40}, {"criteria": "Báo cáo & tài liệu", "points": 20}]'::jsonb),
    ('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Thực hành: Cài đặt Cây Nhị Phân Tìm Kiếm (BST)', 'Viết mã nguồn TypeScript cài đặt thao tác Insert, Delete, Search trên Binary Search Tree.', NOW() + INTERVAL '3 days', 100, '[{"criteria": "Tính đúng đắn của thuật toán", "points": 60}, {"criteria": "Clean Code & Tests", "points": 40}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.submissions (id, assignment_id, student_id, content, score, feedback, status, graded_at)
VALUES 
    ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Em đã hoàn thành schema PostgreSQL gồm 6 bảng có RLS và giao diện React Vite phong cách 3D Glassmorphism Pastel.', 95.0, 'Bài làm rất xuất sắc, giao diện chuẩn màu sắc và code SQL tối ưu!', 'graded', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;
