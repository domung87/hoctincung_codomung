-- ============================================================================
-- SKILLSET LMS & GAMIFICATION PLATFORM - SUPABASE POSTGRESQL SCHEMA
-- Conforming to Architecture: Profiles/Roles, Materials/Lessons, Questions/Exercises,
-- Educational Games, Assignments/Submissions, Storage & Row Level Security (RLS)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS & CUSTOM TYPES
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('admin', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE question_type_enum AS ENUM ('multiple_choice', 'single_choice', 'true_false', 'fill_blank');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE submission_status_enum AS ENUM ('pending', 'submitted', 'graded', 'late', 'resubmitted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE game_type_enum AS ENUM ('memory_match', 'math_blitz', 'word_scramble', 'speed_trivia');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABLE: PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role_type DEFAULT 'student' NOT NULL,
    avatar_url TEXT,
    bio TEXT DEFAULT 'Học viên đam mê khám phá tri thức trên SkillSet',
    xp INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    coins INTEGER DEFAULT 100 NOT NULL,
    streak_days INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABLE: MATERIALS & LESSONS (COURSES & MODULES)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Công nghệ thông tin' NOT NULL,
    thumbnail_url TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Giảng viên SkillSet',
    duration_minutes INTEGER DEFAULT 45 NOT NULL,
    total_lessons INTEGER DEFAULT 10 NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    rating_count INTEGER DEFAULT 128,
    is_published BOOLEAN DEFAULT true NOT NULL,
    is_popular BOOLEAN DEFAULT false NOT NULL,
    price_coins INTEGER DEFAULT 0 NOT NULL,
    content_html TEXT,
    video_url TEXT,
    attachment_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABLE: QUESTIONS & EXERCISES (QUESTION BANK & QUIZZES)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type question_type_enum DEFAULT 'single_choice' NOT NULL,
    options JSONB NOT NULL, -- Array of strings e.g. ["A. Option 1", "B. Option 2", ...]
    correct_answer TEXT NOT NULL, -- The exact matching string or index
    explanation TEXT,
    points INTEGER DEFAULT 10 NOT NULL,
    difficulty TEXT DEFAULT 'medium', -- 'easy', 'medium', 'hard'
    tag TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABLE: EDUCATIONAL_GAMES
CREATE TABLE IF NOT EXISTS public.educational_games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    game_type game_type_enum NOT NULL,
    thumbnail_url TEXT,
    reward_xp INTEGER DEFAULT 50 NOT NULL,
    reward_coins INTEGER DEFAULT 20 NOT NULL,
    config JSONB DEFAULT '{}'::jsonb NOT NULL,
    high_scores JSONB DEFAULT '[]'::jsonb NOT NULL,
    plays_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. TABLE: ASSIGNMENTS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    max_score NUMERIC(5, 2) DEFAULT 100.00 NOT NULL,
    rubric JSONB DEFAULT '[]'::jsonb, -- Grading criteria
    attachment_urls TEXT[] DEFAULT '{}',
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    attachment_urls TEXT[] DEFAULT '{}',
    score NUMERIC(5, 2),
    max_score NUMERIC(5, 2) DEFAULT 100.00,
    feedback TEXT,
    status submission_status_enum DEFAULT 'submitted' NOT NULL,
    graded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    graded_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. TABLE: GAMIFICATION BADGES & ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    required_xp INTEGER DEFAULT 100 NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile or Admin update all" 
    ON public.profiles FOR UPDATE USING (
        auth.uid() = id OR 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- 2. Materials Policies
CREATE POLICY "Published materials are viewable by everyone" 
    ON public.materials FOR SELECT USING (is_published = true OR auth.uid() = author_id);

CREATE POLICY "Teachers and Admins can insert/update materials" 
    ON public.materials FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

-- 3. Questions Policies
CREATE POLICY "Questions are viewable by enrolled users" 
    ON public.questions FOR SELECT USING (true);

CREATE POLICY "Teachers and Admins can manage questions" 
    ON public.questions FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

-- 4. Educational Games Policies
CREATE POLICY "Games viewable by everyone" 
    ON public.educational_games FOR SELECT USING (true);

CREATE POLICY "Admins manage games" 
    ON public.educational_games FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- 5. Assignments Policies
CREATE POLICY "Assignments viewable by all authenticated users" 
    ON public.assignments FOR SELECT USING (true);

CREATE POLICY "Teachers and Admins manage assignments" 
    ON public.assignments FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

-- 6. Submissions Policies
CREATE POLICY "Students can view own submissions; Teachers/Admins can view all" 
    ON public.submissions FOR SELECT USING (
        auth.uid() = student_id OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

CREATE POLICY "Students can insert own submissions" 
    ON public.submissions FOR INSERT WITH CHECK (
        auth.uid() = student_id
    );

CREATE POLICY "Teachers and Admins can grade submissions" 
    ON public.submissions FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    );

-- ============================================================================
-- SUPABASE STORAGE BUCKETS CONFIGURATION
-- ============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('lesson-materials', 'lesson-materials', true),
    ('assignment-attachments', 'assignment-attachments', true),
    ('student-submissions', 'student-submissions', false),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;
