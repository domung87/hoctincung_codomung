import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Keyboard, 
  HelpCircle, 
  BarChart3, 
  UserCheck, 
  ChevronDown,
  Laptop
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { sound } from '../../lib/soundFx';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsPracticeModalOpen, 
    setIsQuizModalOpen 
  } = useApp();
  
  const { currentUser, switchRole } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    sound.click();
    if (tabId === 'practice') {
      setIsPracticeModalOpen(true);
    } else if (tabId === 'quiz') {
      setIsQuizModalOpen(true);
    } else if (tabId === 'roles') {
      setIsRoleDropdownOpen(!isRoleDropdownOpen);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsRoleDropdownOpen(false);
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

        {/* Center: Navigation Menu Tabs (Exact match to Image 3) */}
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

          {/* Role Switcher Button */}
          <div className="relative">
            <button
              onClick={() => handleNavClick('roles')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-brand-500" />
              <span>Đổi Vai Trò</span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1E33] rounded-2xl shadow-xl border border-pink-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">Chọn vai trò trải nghiệm</div>
                <button
                  onClick={() => handleRoleSelect('teacher')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    currentUser.role === 'teacher' ? 'bg-pinkBrand-50 text-pinkBrand-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>👩‍🏫 Cô Đỗ Mừng (Giáo viên)</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('student')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    currentUser.role === 'student' ? 'bg-pinkBrand-50 text-pinkBrand-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>🎒 Em Học Sinh (Lớp 6A1)</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                    currentUser.role === 'admin' ? 'bg-pinkBrand-50 text-pinkBrand-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>🛡️ Quản Trị Viên (Admin)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: User Profile Indicator (Exact match to Image 3) */}
        <div 
          onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-pink-200 dark:border-slate-700 bg-pink-50/60 dark:bg-slate-800/40 cursor-pointer hover:shadow-sm transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-pinkBrand-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm overflow-hidden">
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
            <div className="text-[10px] font-semibold text-pinkBrand-600 dark:text-pinkBrand-400">
              {currentUser.role === 'teacher' ? '👩‍🏫 Giáo viên: Cô Đỗ Mừng' : currentUser.role === 'admin' ? '🛡️ Quản trị viên' : '🎒 Học sinh'}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </nav>
  );
};
