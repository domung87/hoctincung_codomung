import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Keyboard, 
  HelpCircle, 
  BarChart3, 
  ChevronDown,
  Laptop,
  Database,
  LogIn,
  LogOut,
  UserPlus,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsPracticeModalOpen, 
    setIsQuizModalOpen,
    setIsSupabaseConfigOpen,
    isLiveSupabase
  } = useApp();
  
  const { 
    currentUser, 
    isLoggedIn, 
    openAuthModal, 
    logout 
  } = useAuth();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    sound.click();
    if (tabId === 'practice') {
      setIsPracticeModalOpen(true);
    } else if (tabId === 'quiz') {
      setIsQuizModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-[#151828] border-b border-pink-100 dark:border-slate-800 shadow-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand & Slogan */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('lessons')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pinkBrand-500 to-pinkBrand-400 text-white flex items-center justify-center shadow-md">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-extrabold text-pinkBrand-600 dark:text-pinkBrand-400 flex items-center gap-1">
              <span>Cùng học Tin học với Cô Đỗ Mừng</span>
              <span>💖</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Học - Hiểu - Ứng Dụng - Sáng Tạo 🎀
            </p>
          </div>
        </div>

        {/* Center: Navigation Menu Tabs */}
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-pinkBrand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Trang Chủ</span>
          </button>

          <button
            onClick={() => handleNavClick('lessons')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              activeTab === 'lessons'
                ? 'bg-pinkBrand-50 text-pinkBrand-600 border-2 border-pinkBrand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-pink-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-pinkBrand-500" />
            <span>Bài Học</span>
          </button>

          <button
            onClick={() => handleNavClick('practice')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Keyboard className="w-4 h-4 text-amber-500" />
            <span>Luyện Tập</span>
          </button>

          <button
            onClick={() => handleNavClick('quiz')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-pinkBrand-500" />
            <span>Trắc Nghiệm</span>
          </button>

          <button
            onClick={() => handleNavClick('stats')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'stats'
                ? 'bg-pinkBrand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            <span>Thống Kê</span>
          </button>

          {/* Supabase Config Button */}
          <button
            onClick={() => {
              sound.click();
              setIsSupabaseConfigOpen(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-extrabold transition-all border ${
              isLiveSupabase 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Supabase DB</span>
            {isLiveSupabase && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Right: Authentication & User Profile on top right */}
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('student_register')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-pinkBrand-600 bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Đăng Ký Học Sinh</span>
              </button>

              <button
                onClick={() => openAuthModal('teacher_login')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-pinkBrand-500 to-rose-500 text-white shadow-md hover:scale-105 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <div 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-2 border-pink-200 dark:border-slate-700 bg-pink-50/70 dark:bg-slate-800/60 cursor-pointer hover:shadow-md transition-all select-none"
              >
                <div className="w-8 h-8 rounded-full bg-pinkBrand-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                  {currentUser.role === 'teacher' ? (
                    <img src={currentUser.avatar_url} alt="DM" className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.full_name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-extrabold text-slate-800 dark:text-white leading-tight">
                    {currentUser.full_name}
                  </div>
                  <div className="text-[10px] font-bold text-pinkBrand-600 dark:text-pinkBrand-400">
                    {currentUser.role === 'teacher' 
                      ? '👩‍🏫 Giáo Viên (Gmail)' 
                      : `🎒 Học Sinh (${currentUser.classroom || 'Lớp 6'})`}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1A1E33] rounded-3xl shadow-2xl border border-pink-100 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 rounded-2xl bg-pink-50/50 dark:bg-slate-800/50 mb-2">
                    <div className="text-xs font-extrabold text-slate-800 dark:text-white">
                      {currentUser.full_name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {currentUser.email}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-pinkBrand-600">
                      <span>Cấp độ: Level {currentUser.level}</span>
                      <span>{currentUser.xp} XP</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        openAuthModal('teacher_login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-pinkBrand-500" />
                      <span>Đăng nhập Gmail Giáo Viên</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        openAuthModal('student_login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>Đăng nhập / Đổi tài khoản Học sinh</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        openAuthModal('student_register');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4 text-emerald-500" />
                      <span>Đăng Ký Học Sinh Mới</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
