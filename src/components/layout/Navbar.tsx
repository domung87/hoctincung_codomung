import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Crown, 
  Newspaper, 
  Gift, 
  Trophy, 
  Bell, 
  LogIn, 
  LogOut, 
  UserPlus, 
  ChevronDown,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsPracticeModalOpen, 
    setIsQuizModalOpen
  } = useApp();
  
  const { 
    currentUser, 
    isLoggedIn, 
    openAuthModal, 
    logout 
  } = useAuth();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  // 8 Exact Categories matching user's layout
  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, isVip: false, color: 'text-pinkBrand-600' },
    { id: 'library', label: 'Thư viện', icon: BookOpen, isVip: false, color: 'text-blue-600' },
    { id: 'lessons', label: 'Bài Học', icon: Gamepad2, isVip: false, color: 'text-emerald-600' },
    { id: 'practice', label: 'Luyện tập', icon: GraduationCap, isVip: false, color: 'text-teal-600' },
    { id: 'games', label: 'Trò chơi', icon: Crown, isVip: true, color: 'text-amber-500' },
    { id: 'news', label: 'Bảng tin', icon: Newspaper, isVip: false, color: 'text-indigo-600' },
    { id: 'gifts', label: 'Quà tặng', icon: Gift, isVip: false, color: 'text-rose-500' },
    { id: 'stats', label: 'Vinh danh', icon: Trophy, isVip: false, color: 'text-yellow-500' },
  ];

  const handleItemClick = (id: string) => {
    sound.click();
    if (id === 'practice') {
      setIsPracticeModalOpen(true);
      setActiveTab('practice');
    } else {
      setActiveTab(id);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[parts.length - 2][0] + parts[parts.length - 1][0];
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getShortName = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[parts.length - 2] + ' ' + parts[parts.length - 1];
    }
    return name;
  };

  return (
    <header className="w-full bg-white dark:bg-[#151828] border-b-2 border-pink-200/80 dark:border-slate-800 shadow-sm sticky top-0 z-40 transition-colors select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-[76px] flex items-center justify-between gap-3 lg:gap-6">
        
        {/* 1. LEFT: Brand Mascot Logo with Pink-Orange Glow */}
        <div 
          onClick={() => {
            sound.click();
            setActiveTab('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5288] via-[#FF7A59] to-[#FFA048] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
              <img 
                src="/images/avatar_co_mung.jpg" 
                alt="Cô Đỗ Mừng" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-sm font-black text-pinkBrand-600">TIN 6</span>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="flex items-center gap-1">
              <span className="text-base font-black tracking-tight bg-gradient-to-r from-[#FF5288] to-[#FF7A59] bg-clip-text text-transparent">
                CÙNG HỌC TIN 6
              </span>
              <span className="text-xs">💖</span>
            </div>
            <div className="text-[10px] font-extrabold text-amber-500">
              Cô Đỗ Mừng 🌸
            </div>
          </div>
        </div>

        {/* 2. CENTER: 8 Categories with Colorful Accents and Pink-Orange Active State */}
        <div className="flex-1 flex items-center justify-center overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative flex flex-col items-center justify-center min-w-[62px] sm:min-w-[70px] md:min-w-[78px] h-[66px] px-2 rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-b from-pink-50 to-orange-50 dark:from-pink-950/40 dark:to-orange-950/40 text-[#FF5288] border-2 border-pink-300 font-extrabold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#FF5288] dark:hover:text-[#FF5288] hover:bg-pink-50/50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {/* VIP Yellow Badge for Trò chơi */}
                  {item.isVip && (
                    <span className="absolute top-1 right-2.5 px-1 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-[8px] font-black text-white shadow-xs leading-none animate-pulse">
                      VIP
                    </span>
                  )}

                  {/* Icon on Top */}
                  <div className="relative mb-1">
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-[#FF5288] stroke-[2.5]' : 'stroke-[1.8]'
                    }`} />
                  </div>

                  {/* Text Label on Bottom */}
                  <span className={`text-[11px] sm:text-xs leading-tight tracking-tight whitespace-nowrap transition-colors ${
                    isActive ? 'font-black text-[#FF5288]' : 'font-semibold'
                  }`}>
                    {item.label}
                  </span>

                  {/* Active bottom line indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 w-8 h-[3px] bg-gradient-to-r from-[#FF5288] to-[#FF7A59] rounded-full animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RIGHT: Notification Bell & User Login / Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pr-1">
          
          {/* 🔔 Notification Bell with Red Dot */}
          <div className="relative">
            <button
              onClick={() => {
                sound.click();
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
              }}
              title="Thông báo từ Cô Đỗ Mừng"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-[#FF5288] hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors relative border border-slate-200 dark:border-slate-700"
            >
              <Bell className="w-5 h-5" />
              {/* Red dot alert badge */}
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </button>

            {/* Notification Dropdown */}
            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1A1E33] rounded-3xl shadow-2xl border-2 border-pink-100 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-slate-800 mb-3">
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-red-500" />
                    <span>Thông Báo Từ Cô Đỗ Mừng 🌸</span>
                  </h4>
                  <span className="text-[10px] text-[#FF5288] font-bold">Đã đọc</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-2xl bg-pink-50/70 dark:bg-slate-800/40 text-xs border border-pink-100">
                    <p className="font-bold text-slate-800 dark:text-white">🌸 Chào mừng em đến với Cùng Học Tin 6!</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Cô Đỗ Mừng chúc em có những giờ học thật vui và bổ ích.</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-orange-50/70 dark:bg-slate-800/40 text-xs border border-orange-100">
                    <p className="font-bold text-slate-800 dark:text-white">🏆 Bảng vàng tuần này đã được cập nhật!</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Hãy vào mục Vinh danh để xem thứ hạng của lớp mình nhé.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill OR Login Button with Pink-Orange Accents */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('student_register')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#FF5288] bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>📝 Đăng Ký</span>
              </button>

              <button
                onClick={() => openAuthModal('teacher_login')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF5288] to-[#FF7A59] hover:from-[#FF4081] hover:to-[#FF6B4A] text-white font-black text-xs shadow-md transition-all hover:scale-105 glow-hover"
              >
                <LogIn className="w-4 h-4" />
                <span>🔐 Đăng Nhập</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* User Profile Pill with colorful border */}
              <div 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border-2 border-pink-200 dark:border-slate-700 bg-white dark:bg-[#1A1E33] hover:shadow-md cursor-pointer transition-all select-none group"
              >
                {/* Circle Avatar with Initials */}
                <div className="w-8 h-8 rounded-full bg-[#0066CC] text-white font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                  {currentUser.role === 'teacher' ? (
                    <img 
                      src={currentUser.avatar_url} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span>{getInitials(currentUser.full_name)}</span>
                  )}
                </div>

                {/* User Short Name */}
                <div className="text-left">
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 leading-none">
                    {getShortName(currentUser.full_name)}
                  </div>
                  <div className="text-[9px] font-bold text-pinkBrand-600 dark:text-pinkBrand-400 mt-0.5 leading-none">
                    {currentUser.role === 'teacher' ? 'Giáo viên' : (currentUser.classroom || 'Học sinh')}
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5288] transition-colors ml-0.5" />
              </div>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1A1E33] rounded-3xl shadow-2xl border-2 border-pink-100 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 dark:bg-slate-800/50 mb-2 border border-pink-100">
                    <div className="text-xs font-black text-slate-800 dark:text-white">
                      {currentUser.full_name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {currentUser.email}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-black text-[#FF5288]">
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
                      <ShieldCheck className="w-4 h-4 text-[#FF5288]" />
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

                    <div className="border-t border-pink-100 dark:border-slate-800 my-1" />

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
    </header>
  );
};
