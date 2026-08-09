import React, { useState } from 'react';
import { 
  Home, 
  Gamepad2, 
  Crown, 
  GraduationCap, 
  Newspaper, 
  BookOpen, 
  Cpu, 
  ShoppingBag, 
  Gift, 
  Trophy, 
  Bell, 
  LogIn, 
  LogOut, 
  UserPlus, 
  ChevronDown,
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
    isLiveSupabase,
    notifications
  } = useApp();
  
  const { 
    currentUser, 
    isLoggedIn, 
    openAuthModal, 
    logout 
  } = useAuth();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  // Menu items list matching the exact layout of the user's reference image
  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, isVip: false },
    { id: 'playground', label: 'Sân trường', icon: Gamepad2, isVip: false },
    { id: 'council', label: 'Phòng hội đồng', icon: Crown, isVip: true },
    { id: 'lessons', label: 'Phòng đào tạo', icon: GraduationCap, isVip: false },
    { id: 'news', label: 'Bảng tin', icon: Newspaper, isVip: false },
    { id: 'library', label: 'Thư viện', icon: BookOpen, isVip: false },
    { id: 'tech_market', label: 'Chợ công nghệ', icon: Cpu, isVip: false },
    { id: 'market', label: 'Hội chợ', icon: ShoppingBag, isVip: false },
    { id: 'agency', label: 'Đại lý', icon: Gift, isVip: false },
    { id: 'stats', label: 'Vinh danh', icon: Trophy, isVip: false },
  ];

  const handleItemClick = (id: string) => {
    sound.click();
    if (id === 'playground') {
      setIsPracticeModalOpen(true);
      setActiveTab('lessons');
    } else {
      setActiveTab(id);
    }
  };

  // Get first 2 letters of full name for avatar display
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
    <header className="w-full bg-white dark:bg-[#151828] border-b border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-0 z-40 transition-colors select-none">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 h-[74px] flex items-center justify-between gap-2 lg:gap-4">
        
        {/* 1. LEFT: Brand Mascot Logo (Matching image mascot) */}
        <div 
          onClick={() => {
            sound.click();
            setActiveTab('home');
          }}
          className="flex items-center gap-2 cursor-pointer shrink-0 pl-1 group"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pinkBrand-500 to-blue-600 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/avatar_co_mung.jpg" 
                  alt="ETA Mascot" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                  ETA
                </span>
              </div>
            </div>
            {/* Mascot mini badge */}
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-blue-600 text-[8px] font-black text-white shadow-sm">
              TIN 6
            </span>
          </div>

          <div className="hidden xl:block">
            <div className="flex items-center gap-1">
              <span className="text-base font-black tracking-tight text-blue-600 dark:text-blue-400 font-sans">
                ETA
              </span>
              <span className="text-[11px] font-extrabold text-amber-500 uppercase tracking-wider">
                CHIA SẺ ĐAM MÊ
              </span>
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
              KIẾN THỨC AI GIÁO DỤC 🎀
            </div>
          </div>
        </div>

        {/* 2. CENTER: Main Navigation Menu (Exact vertical Icon + Text layout matching image) */}
        <div className="flex-1 flex items-center justify-center overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'lessons' && activeTab === 'lessons');

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px] md:min-w-[72px] h-[64px] px-2 rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {/* VIP Yellow Badge */}
                  {item.isVip && (
                    <span className="absolute top-1 right-2 px-1 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-[8px] font-black text-white shadow-xs leading-none">
                      VIP
                    </span>
                  )}

                  {/* Icon */}
                  <div className="relative mb-1">
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-blue-600 dark:text-blue-400 stroke-[2.4]' : 'stroke-[1.8]'
                    }`} />
                  </div>

                  {/* Text Label */}
                  <span className={`text-[11px] leading-tight tracking-tight whitespace-nowrap transition-colors ${
                    isActive ? 'font-extrabold text-blue-600 dark:text-blue-400' : 'font-semibold'
                  }`}>
                    {item.label}
                  </span>

                  {/* Active bottom blue line highlight (Exact match to image) */}
                  {isActive && (
                    <span className="absolute bottom-0 w-8 h-[3px] bg-blue-600 dark:bg-blue-400 rounded-full animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RIGHT: Notification Bell & User Login / Profile Pill (Exact match to image) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pr-1">
          
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                sound.click();
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {/* Notification Badge */}
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notification Dropdown */}
            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1A1E33] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white">Thông Báo Mới 🔔</h4>
                  <span className="text-[10px] text-blue-600 font-bold">Đánh dấu đã đọc</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/40 text-xs">
                    <p className="font-bold text-slate-800 dark:text-white">🌸 Chào mừng em đến với Cùng Học Tin 6!</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Cô Đỗ Mừng chúc em có những giờ học thật vui và bổ ích.</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                    <p className="font-bold text-slate-800 dark:text-white">🏆 Bảng vàng tuần này đã được cập nhật!</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Hãy vào mục Vinh danh để xem thứ hạng của lớp mình nhé.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill OR Login Button */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('student_register')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Đăng Ký</span>
              </button>

              <button
                onClick={() => openAuthModal('teacher_login')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Profile Pill matching exact style: (Circle Avatar Initials) + (Full Name) */}
              <div 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-[#1A1E33] hover:shadow-md cursor-pointer transition-all select-none group"
              >
                {/* Circle Avatar with Initials (Exact blue circle with "Hà" as shown in user photo) */}
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

                {/* User Short Name (Matching "Hà Khánh" in reference image) */}
                <div className="text-left">
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 leading-none">
                    {getShortName(currentUser.full_name)}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 leading-none">
                    {currentUser.role === 'teacher' ? 'Giáo viên' : (currentUser.classroom || 'Học sinh')}
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors ml-0.5" />
              </div>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1A1E33] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 mb-2">
                    <div className="text-xs font-extrabold text-slate-800 dark:text-white">
                      {currentUser.full_name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {currentUser.email}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-blue-600">
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
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Đăng nhập Gmail Giáo Viên</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        openAuthModal('student_login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>Đăng nhập / Đổi tài khoản Học sinh</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        openAuthModal('student_register');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
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
    </header>
  );
};
