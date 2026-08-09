import React, { useState, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  UserCheck, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth, AuthMode } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    loginTeacherWithGoogle,
    registerStudent,
    loginStudent
  } = useAuth();

  // Form states
  const [teacherEmail, setTeacherEmail] = useState('codomung@gmail.com');
  
  // Student Login state
  const [studentLoginUser, setStudentLoginUser] = useState('');
  const [studentLoginPass, setStudentLoginPass] = useState('');

  // Student Register state
  const [regFullName, setRegFullName] = useState('');
  const [regClassroom, setRegClassroom] = useState('6A1');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Feedback status
  const [statusMsg, setStatusMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatusMsg(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    const res = await loginTeacherWithGoogle(teacherEmail);
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

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    const res = await registerStudent(regFullName, regClassroom, regUsername, regPassword);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-100 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-pink-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pinkBrand-500 to-pinkBrand-400 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
            Cùng Học Tin 6 💖
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Chọn vai trò để đăng nhập vào không gian học tập
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-pink-50 dark:bg-slate-800 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setAuthModalMode('teacher_login');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authModalMode === 'teacher_login'
                ? 'bg-pinkBrand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-pinkBrand-600'
            }`}
          >
            👩‍🏫 Giáo Viên (Gmail)
          </button>

          <button
            type="button"
            onClick={() => {
              sound.click();
              setAuthModalMode('student_login');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              authModalMode === 'student_login' || authModalMode === 'student_register'
                ? 'bg-pinkBrand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-pinkBrand-600'
            }`}
          >
            🎒 Học Sinh
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`p-3 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2 ${
            statusMsg.success 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {statusMsg.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* 1. TEACHER LOGIN FORM (GMAIL) */}
        {authModalMode === 'teacher_login' && (
          <form onSubmit={handleTeacherLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pinkBrand-500" />
                <span>Địa chỉ Gmail của Giáo viên:</span>
              </label>
              <input
                type="email"
                required
                placeholder="codomung@gmail.com"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
              />
            </div>

            {/* Quick Login Helper */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTeacherEmail('codomung@gmail.com')}
                className="text-[11px] font-bold text-pinkBrand-600 hover:underline"
              >
                ⚡ Sử dụng Gmail Cô Đỗ Mừng
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Đang xác thực...' : 'Đăng Nhập Với Gmail Giáo Viên'}</span>
            </button>
          </form>
        )}

        {/* 2. STUDENT LOGIN FORM */}
        {authModalMode === 'student_login' && (
          <form onSubmit={handleStudentLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-pinkBrand-500" />
                <span>Tên đăng nhập hoặc Họ tên:</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: giabao hoặc Nguyễn Gia Bảo"
                value={studentLoginUser}
                onChange={(e) => setStudentLoginUser(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-pinkBrand-500" />
                <span>Mật khẩu:</span>
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                value={studentLoginPass}
                onChange={(e) => setStudentLoginPass(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>{isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập Học Sinh'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-slate-400">Chưa có tài khoản học sinh? </span>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAuthModalMode('student_register');
                }}
                className="text-xs font-extrabold text-pinkBrand-600 hover:underline"
              >
                Đăng ký ngay 🌸
              </button>
            </div>
          </form>
        )}

        {/* 3. STUDENT REGISTER FORM (TÊN, LỚP, MẬT KHẨU) */}
        {authModalMode === 'student_register' && (
          <form onSubmit={handleStudentRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Họ và Tên học sinh:
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Gia Bảo"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Lớp học:
                </label>
                <select
                  value={regClassroom}
                  onChange={(e) => setRegClassroom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
                >
                  <option value="6A1">Lớp 6A1</option>
                  <option value="6A2">Lớp 6A2</option>
                  <option value="6A3">Lớp 6A3</option>
                  <option value="6A4">Lớp 6A4</option>
                  <option value="6A5">Lớp 6A5</option>
                  <option value="6A6">Lớp 6A6</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tên đăng nhập:
                </label>
                <input
                  type="text"
                  required
                  placeholder="giabao6a1"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mật khẩu:
              </label>
              <input
                type="password"
                required
                placeholder="Tạo mật khẩu dễ nhớ..."
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-pinkBrand-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản & Vào Học Ngay'}</span>
            </button>

            <div className="text-center pt-1">
              <span className="text-xs text-slate-400">Đã có tài khoản? </span>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAuthModalMode('student_login');
                }}
                className="text-xs font-extrabold text-pinkBrand-600 hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
