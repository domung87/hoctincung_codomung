import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  KeyRound,
  Check,
  ShieldAlert,
  LogIn
} from 'lucide-react';
import { useAuth, AuthMode, TEACHER_OFFICIAL_EMAIL, TEACHER_ALT_EMAIL } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

// Danh sách Avatar Chibi 3D vui nhộn cho học sinh lựa chọn khi đăng ký
const STUDENT_AVATARS = [
  { id: 'boy', name: 'Bé Nam 👦', url: '/images/student_boy.jpg' },
  { id: 'girl', name: 'Bé Mai 👧', url: '/images/student_girl.jpg' },
  { id: 'robot', name: 'Robot AI 🤖', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=robot6' },
  { id: 'cat', name: 'Mèo Tin Học 🐱', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=cattech' },
  { id: 'astro', name: 'Phi Hành Gia 🚀', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=astro' }
];

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    loginWithGoogle,
    registerStudent,
    loginStudent
  } = useAuth();

  // Teacher Google Login State
  const [isGooglePromptOpen, setIsGooglePromptOpen] = useState(false);
  const [teacherGoogleInput, setTeacherGoogleInput] = useState('');
  
  // Student Login state (Username/Password)
  const [studentLoginUser, setStudentLoginUser] = useState('');
  const [studentLoginPass, setStudentLoginPass] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Student Register state
  const [regFullName, setRegFullName] = useState('');
  const [regClassroom, setRegClassroom] = useState('6A1');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(STUDENT_AVATARS[0].url);

  // Feedback status
  const [statusMsg, setStatusMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatusMsg(null);
    setIsGooglePromptOpen(false);
    setTeacherGoogleInput('');
  }, [authModalMode, isAuthModalOpen]);

  // Tự động tạo gợi ý tên đăng nhập không dấu khi học sinh gõ Họ và tên
  const handleFullNameChange = (name: string) => {
    setRegFullName(name);
    if (!regUsername || regUsername === '') {
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]/g, '');
      if (slug) {
        setRegUsername(slug + regClassroom.toLowerCase());
      }
    }
  };

  if (!isAuthModalOpen) return null;

  // 1. Xử lý Giáo Viên Đăng Nhập BẰNG GOOGLE (CHỈ DUY NHẤT TÀI KHOẢN GOOGLE CÔ ĐỖ MỪNG)
  const handleTeacherGoogleLogin = async (googleEmail: string) => {
    setIsLoading(true);
    setStatusMsg(null);

    const cleanEmail = googleEmail.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setIsLoading(false);
      setStatusMsg({ success: false, text: 'Vui lòng nhập địa chỉ Google Gmail hợp lệ.' });
      sound.wrong();
      return;
    }

    if (cleanEmail !== TEACHER_OFFICIAL_EMAIL && cleanEmail !== TEACHER_ALT_EMAIL) {
      setIsLoading(false);
      sound.wrong();
      setStatusMsg({ 
        success: false, 
        text: `Tài khoản Google (${cleanEmail}) không có quyền Giáo viên! Chỉ duy nhất tài khoản Google chính thức của Cô Đỗ Mừng (${TEACHER_OFFICIAL_EMAIL}) mới được phép mở quyền Quản Trị Giáo Viên.` 
      });
      return;
    }

    const res = await loginWithGoogle(cleanEmail);
    setIsLoading(false);

    if (res.success) {
      setStatusMsg({ success: true, text: res.message });
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 1000);
    } else {
      setStatusMsg({ success: false, text: res.message });
    }
  };

  // 2. Xử lý Học Sinh Đăng Nhập (Tên đăng nhập & Mật khẩu - Không cần Google)
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    const res = await loginStudent(studentLoginUser, studentLoginPass);
    setIsLoading(false);

    if (res.success) {
      setStatusMsg({ success: true, text: res.message });
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 1000);
    } else {
      setStatusMsg({ success: false, text: res.message });
    }
  };

  // 3. Xử lý Học Sinh Đăng Ký (Không cần Google)
  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    if (regPassword !== regConfirmPassword) {
      setIsLoading(false);
      setStatusMsg({ success: false, text: 'Mật khẩu xác nhận không khớp! Em vui lòng kiểm tra lại.' });
      sound.wrong();
      return;
    }

    const res = await registerStudent(
      regFullName, 
      regClassroom, 
      regUsername, 
      regPassword,
      selectedAvatarUrl
    );
    setIsLoading(false);

    if (res.success) {
      setStatusMsg({ success: true, text: res.message });
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 1200);
    } else {
      setStatusMsg({ success: false, text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-pink-100 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-pinkBrand-500 to-rose-400 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
            Cùng Học Tin 6 💖
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Học sinh đăng nhập trực tiếp • Giáo viên đăng nhập bằng Google
          </p>
        </div>

        {/* Mode Selector Tabs (3 TABS: Học Sinh Đăng Nhập / Học Sinh Đăng Ký / Giáo Viên Google) */}
        <div className="flex bg-pink-50 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-5 gap-1">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setAuthModalMode('student_login');
            }}
            className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
              authModalMode === 'student_login'
                ? 'bg-pinkBrand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-pinkBrand-600'
            }`}
          >
            <span>🎒 Học Sinh Đăng Nhập</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.click();
              setAuthModalMode('student_register');
            }}
            className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
              authModalMode === 'student_register'
                ? 'bg-pinkBrand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-pinkBrand-600'
            }`}
          >
            <span>📝 Đăng Ký</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.click();
              setAuthModalMode('teacher_login');
            }}
            className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
              authModalMode === 'teacher_login'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <span>👩‍🏫 Giáo Viên (Google)</span>
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`p-3.5 rounded-2xl mb-4 text-xs font-bold flex items-start gap-2.5 ${
            statusMsg.success 
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300' 
              : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-300'
          }`}>
            {statusMsg.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMsg.text}</span>
          </div>
        )}

        {/* =========================================================================
            TAB 1: HỌC SINH ĐĂNG NHẬP (KHÔNG CẦN GOOGLE)
            ========================================================================= */}
        {authModalMode === 'student_login' && (
          <form onSubmit={handleStudentLogin} className="space-y-4 animate-in fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-pinkBrand-500" />
                <span>Tên đăng nhập hoặc Họ tên học sinh:</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: giabao6a1 hoặc Nguyễn Gia Bảo"
                value={studentLoginUser}
                onChange={(e) => setStudentLoginUser(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-pinkBrand-500" />
                  <span>Mật khẩu:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="text-[11px] text-pinkBrand-600 hover:underline flex items-center gap-1"
                >
                  {showLoginPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showLoginPassword ? 'Ẩn' : 'Hiện'} mật khẩu</span>
                </button>
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mật khẩu..."
                  value={studentLoginPass}
                  onChange={(e) => setStudentLoginPass(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Quick Helper Button */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-0.5">
              <span>Mẹo: Tài khoản mẫu: <strong>giabao6a1</strong> / Mật khẩu: <strong>123</strong></span>
              <button
                type="button"
                onClick={() => {
                  setStudentLoginUser('giabao6a1');
                  setStudentLoginPass('123');
                }}
                className="text-pinkBrand-600 hover:underline"
              >
                ⚡ Điền nhanh
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>{isLoading ? 'Đang đăng nhập...' : '🚀 Đăng Nhập Học Sinh Vào Học'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Em chưa có tài khoản học sinh? </span>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAuthModalMode('student_register');
                }}
                className="text-xs font-black text-pinkBrand-600 hover:underline ml-1"
              >
                👉 Đăng ký tài khoản ngay (+100 XP)
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 2: HỌC SINH ĐĂNG KÝ (KHÔNG CẦN GOOGLE)
            ========================================================================= */}
        {authModalMode === 'student_register' && (
          <form onSubmit={handleStudentRegister} className="space-y-3.5 animate-in fade-in">
            {/* 1. Họ và tên */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-pinkBrand-500" />
                <span>Họ và Tên học sinh:</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Gia Bảo"
                value={regFullName}
                onChange={(e) => handleFullNameChange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
              />
            </div>

            {/* 2. Lớp học & Tên đăng nhập */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-pinkBrand-500" />
                  <span>Lớp học:</span>
                </label>
                <select
                  value={regClassroom}
                  onChange={(e) => {
                    setRegClassroom(e.target.value);
                    if (regFullName) {
                      const slug = regFullName
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd')
                        .replace(/[^a-z0-9]/g, '');
                      setRegUsername(slug + e.target.value.toLowerCase());
                    }
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
                >
                  <option value="6A1">Lớp 6A1</option>
                  <option value="6A2">Lớp 6A2</option>
                  <option value="6A3">Lớp 6A3</option>
                  <option value="6A4">Lớp 6A4</option>
                  <option value="6A5">Lớp 6A5</option>
                  <option value="6A6">Lớp 6A6</option>
                  <option value="6A7">Lớp 6A7</option>
                  <option value="6A8">Lớp 6A8</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-pinkBrand-500" />
                  <span>Tên đăng nhập:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="giabao6a1"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* 3. Mật khẩu & Xác nhận mật khẩu */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu:
                </label>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  placeholder="Tối thiểu 4 ký tự..."
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nhập lại mật khẩu:
                </label>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập lại mật khẩu..."
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowRegPassword(!showRegPassword)}
                className="text-[11px] text-pinkBrand-600 hover:underline flex items-center gap-1"
              >
                {showRegPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showRegPassword ? 'Ẩn' : 'Hiện'} mật khẩu</span>
              </button>
            </div>

            {/* 4. Chọn Avatar Chibi 3D vui nhộn */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                🎨 Chọn hình đại diện (Avatar) của em:
              </label>
              <div className="flex items-center justify-between gap-2">
                {STUDENT_AVATARS.map((av) => {
                  const isSelected = selectedAvatarUrl === av.url;
                  return (
                    <div
                      key={av.id}
                      onClick={() => {
                        sound.click();
                        setSelectedAvatarUrl(av.url);
                      }}
                      className={`flex flex-col items-center p-1.5 rounded-2xl cursor-pointer border-2 transition-all ${
                        isSelected 
                          ? 'border-pinkBrand-500 bg-pink-50 dark:bg-pink-950/40 scale-105 shadow-sm' 
                          : 'border-transparent hover:border-pink-200'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-slate-200 relative">
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-pinkBrand-500/20 flex items-center justify-center">
                            <Check className="w-4 h-4 text-pinkBrand-600 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 mt-0.5 truncate max-w-[60px]">
                        {av.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nút Submit Đăng Ký */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Đang khởi tạo tài khoản...' : '🎉 Tạo Tài Khoản & Nhận Ngay +100 XP'}</span>
            </button>

            <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Em đã có tài khoản rồi? </span>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAuthModalMode('student_login');
                }}
                className="text-xs font-black text-pinkBrand-600 hover:underline ml-1"
              >
                👉 Đăng nhập tại đây
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 3: GIÁO VIÊN ĐĂNG NHẬP (BẮT BUỘC MỞ BẰNG TÀI KHOẢN GOOGLE)
            ========================================================================= */}
        {authModalMode === 'teacher_login' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Alert Box Bảo Mật */}
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200 leading-relaxed font-medium flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-black text-blue-900 dark:text-white block text-xs sm:text-sm mb-0.5">
                  🔐 Yêu Cầu Xác Thực Google Dành Cho Giáo Viên:
                </strong>
                Tài khoản Giáo viên bắt buộc phải đăng nhập bằng tài khoản <strong>Google</strong> chính thức của Cô Đỗ Mừng (<strong>{TEACHER_OFFICIAL_EMAIL}</strong>).
              </div>
            </div>

            {/* Nút Lớn Đăng Nhập Giáo Viên Bằng Google */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTeacherGoogleLogin(TEACHER_OFFICIAL_EMAIL)}
              className="w-full py-4 px-4 rounded-2xl border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 hover:bg-blue-50/70 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
            >
              {/* Google 4-Color SVG Logo */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoading ? 'Đang xác thực Google...' : `Tiếp tục với Google (${TEACHER_OFFICIAL_EMAIL})`}</span>
            </button>

            {/* Hoặc Nhập Email Google Khác Để Kiểm Tra Quyền */}
            <div className="pt-2">
              <div className="flex items-center gap-2 my-2 text-slate-400 text-[11px] font-bold">
                <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
                <span>HOẶC XÁC THỰC GOOGLE EMAIL KHÁC</span>
                <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleTeacherGoogleLogin(teacherGoogleInput); }} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Nhập email Google của giáo viên..."
                    value={teacherGoogleInput}
                    onChange={(e) => setTeacherGoogleInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all shrink-0"
                >
                  Xác Thực 🔐
                </button>
              </form>
            </div>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Em là học sinh? </span>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAuthModalMode('student_login');
                }}
                className="text-xs font-black text-blue-600 hover:underline ml-1"
              >
                👉 Quay lại Đăng nhập Học Sinh (Không cần Google)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
