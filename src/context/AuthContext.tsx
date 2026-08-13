import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole } from '../types';
import { INITIAL_PROFILES } from '../lib/mockData';
import { updateProfileInSupabase } from '../lib/supabase';
import { sound } from '../lib/soundFx';

export type AuthMode = 'teacher_login' | 'student_login' | 'student_register';

// EMAIL DUY NHẤT ĐƯỢC PHÉP TRUY CẬP VAI TRÒ GIÁO VIÊN CÔ ĐỖ MỪNG
export const TEACHER_OFFICIAL_EMAIL = 'dothimung87@gmail.com';

interface AuthContextType {
  currentUser: UserProfile;
  isLoggedIn: boolean;
  allProfiles: UserProfile[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: AuthMode;
  setAuthModalMode: (mode: AuthMode) => void;
  openAuthModal: (mode?: AuthMode) => void;
  
  // Auth actions
  loginTeacherWithGoogle: (gmail: string) => Promise<{ success: boolean; message: string }>;
  registerStudent: (
    fullName: string, 
    classroom: string, 
    username: string, 
    password: string,
    avatarUrl?: string
  ) => Promise<{ success: boolean; message: string }>;
  loginStudent: (usernameOrName: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  
  // Stats & Level actions
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  addXP: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_PROFILES = 'tinhoc6_profiles_v3';
const STORAGE_KEY_CURRENT_USER_ID = 'tinhoc6_current_user_id_v3';
const STORAGE_KEY_IS_LOGGED_IN = 'tinhoc6_is_logged_in_v3';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure teacher email is updated to dothimung87@gmail.com
        return parsed.map((p: UserProfile) => 
          p.role === 'teacher' ? { ...p, email: TEACHER_OFFICIAL_EMAIL, full_name: 'Cô Đỗ Thị Mừng' } : p
        );
      } catch (e) {
        return INITIAL_PROFILES;
      }
    }
    return INITIAL_PROFILES;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER_ID);
    return saved || 'teacher-co-do-mung';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_IS_LOGGED_IN);
    return saved !== null ? saved === 'true' : true;
  });

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('student_login');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_IS_LOGGED_IN, String(isLoggedIn));
  }, [isLoggedIn]);

  const currentUser = profiles.find(p => p.id === currentUserId) || profiles[0];

  const openAuthModal = (mode: AuthMode = 'student_login') => {
    sound.click();
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // 1. GIÁO VIÊN ĐĂNG NHẬP: CHỈ CHO PHÉP DUY NHẤT TÀI KHOẢN dothimung87@gmail.com
  const loginTeacherWithGoogle = async (gmail: string): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanEmail = gmail.trim().toLowerCase();
    
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Vui lòng nhập địa chỉ Gmail hợp lệ.' };
    }

    // KIỂM TRA BẢO MẬT: CHỈ DUY NHẤT dothimung87@gmail.com MỚI ĐƯỢC MỞ
    if (cleanEmail !== TEACHER_OFFICIAL_EMAIL) {
      sound.wrong();
      return { 
        success: false, 
        message: `Quyền truy cập bị từ chối! Chỉ tài khoản Gmail chính thức của Cô Đỗ Mừng (${TEACHER_OFFICIAL_EMAIL}) mới có quyền mở giao diện Giáo viên quản trị!` 
      };
    }

    let teacher = profiles.find(p => p.role === 'teacher' && p.email.toLowerCase() === TEACHER_OFFICIAL_EMAIL);

    if (!teacher) {
      // Khởi tạo tài khoản Giáo viên chuẩn
      const newTeacher: UserProfile = {
        id: 'teacher-co-do-mung',
        email: TEACHER_OFFICIAL_EMAIL,
        full_name: 'Cô Đỗ Thị Mừng',
        role: 'teacher',
        classroom: 'Khối 6',
        username: 'dothimung87',
        password: '123',
        avatar_url: '/images/avatar_co_mung.jpg',
        bio: 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖',
        xp: 9999,
        level: 25,
        coins: 5000,
        streak_days: 90,
        created_at: new Date().toISOString()
      };
      setProfiles(prev => [newTeacher, ...prev.filter(p => p.id !== newTeacher.id)]);
      teacher = newTeacher;
      updateProfileInSupabase(newTeacher);
    }

    setCurrentUserId(teacher.id);
    setIsLoggedIn(true);
    sound.victory();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.4 } });
    return { 
      success: true, 
      message: `Chào mừng Cô Đỗ Thị Mừng (${TEACHER_OFFICIAL_EMAIL}) đã đăng nhập thành công vào Hệ thống Quản Trị Giáo Viên!` 
    };
  };

  // 2. HỌC SINH ĐĂNG KÝ (HỌ TÊN, LỚP, TÊN ĐĂNG NHẬP, MẬT KHẨU, AVATAR)
  const registerStudent = async (
    fullName: string, 
    classroom: string, 
    username: string, 
    password: string,
    avatarUrl?: string
  ): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanUser = username.trim().toLowerCase().replace(/\s+/g, '');
    const cleanName = fullName.trim();
    const cleanClass = classroom.trim();

    if (!cleanName || !cleanClass || !cleanUser || !password) {
      return { success: false, message: 'Vui lòng điền đầy đủ tất cả các trường thông tin.' };
    }

    if (cleanUser.length < 3) {
      return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự viết liền không dấu.' };
    }

    if (password.length < 4) {
      return { success: false, message: 'Mật khẩu phải có ít nhất 4 ký tự.' };
    }

    const exists = profiles.find(p => p.username?.toLowerCase() === cleanUser);
    if (exists) {
      return { success: false, message: `Tên đăng nhập "${cleanUser}" đã có bạn sử dụng rồi. Em hãy chọn tên đăng nhập khác nhé!` };
    }

    const finalAvatar = avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUser}`;

    const newStudent: UserProfile = {
      id: 'student-' + Date.now(),
      email: `${cleanUser}@hocsinh.tin6.edu.vn`,
      full_name: cleanName,
      classroom: cleanClass,
      username: cleanUser,
      password: password,
      role: 'student',
      avatar_url: finalAvatar,
      bio: `Học sinh lớp ${cleanClass} - Cùng học Tin 6 với Cô Đỗ Mừng 🌸`,
      xp: 100,
      level: 1,
      coins: 50,
      streak_days: 1,
      created_at: new Date().toISOString()
    };

    setProfiles(prev => [newStudent, ...prev]);
    setCurrentUserId(newStudent.id);
    setIsLoggedIn(true);
    sound.victory();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

    // Sync to Supabase in background
    updateProfileInSupabase(newStudent);

    return { 
      success: true, 
      message: `🎉 Chúc mừng em ${cleanName} (${cleanClass}) đã đăng ký thành công! Em được tặng ngay 100 XP và 50 Xu Coins để bắt đầu học tập!` 
    };
  };

  // 3. HỌC SINH ĐĂNG NHẬP (TÊN ĐĂNG NHẬP HOẶC HỌ TÊN VÀ MẬT KHẨU)
  const loginStudent = async (usernameOrName: string, password: string): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanQuery = usernameOrName.trim().toLowerCase();

    if (!cleanQuery) {
      return { success: false, message: 'Vui lòng nhập Tên đăng nhập hoặc Họ tên học sinh.' };
    }

    const student = profiles.find(p => 
      p.role === 'student' && 
      (
        p.username?.toLowerCase() === cleanQuery || 
        p.full_name.toLowerCase() === cleanQuery ||
        p.full_name.toLowerCase().includes(cleanQuery) || 
        p.email.toLowerCase() === cleanQuery
      )
    );

    if (!student) {
      sound.wrong();
      return { 
        success: false, 
        message: 'Không tìm thấy tài khoản học sinh phù hợp. Em vui lòng kiểm tra lại Tên đăng nhập hoặc bấm Đăng Ký Tài Khoản Mới nhé!' 
      };
    }

    if (student.password && student.password !== password) {
      sound.wrong();
      return { success: false, message: 'Mật khẩu chưa chính xác. Em vui lòng kiểm tra lại mật khẩu nhé!' };
    }

    setCurrentUserId(student.id);
    setIsLoggedIn(true);
    sound.victory();
    confetti({ particleCount: 80, spread: 70 });
    return { 
      success: true, 
      message: `🌸 Chào mừng ${student.full_name} (${student.classroom || 'Lớp 6'}) đã quay trở lại lớp học Tin học 6 cùng Cô Đỗ Mừng!` 
    };
  };

  const logout = () => {
    sound.click();
    setIsLoggedIn(false);
  };

  const switchRole = (role: UserRole) => {
    sound.click();
    if (role === 'teacher') {
      // Chỉ cho phép chuyển sang giáo viên nếu có tài khoản dothimung87@gmail.com
      const teacher = profiles.find(p => p.role === 'teacher' && p.email.toLowerCase() === TEACHER_OFFICIAL_EMAIL);
      if (teacher) {
        setCurrentUserId(teacher.id);
        setIsLoggedIn(true);
      } else {
        openAuthModal('teacher_login');
      }
    } else {
      const target = profiles.find(p => p.role === role);
      if (target) {
        setCurrentUserId(target.id);
        setIsLoggedIn(true);
      }
    }
  };

  const switchUser = (userId: string) => {
    sound.click();
    setCurrentUserId(userId);
    setIsLoggedIn(true);
  };

  const addXP = (amount: number, _reason?: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentUser.id) return p;
      const newXp = p.xp + amount;
      const newLevel = Math.floor(newXp / 250) + 1;
      
      if (newLevel > p.level) {
        sound.victory();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      
      const updated = {
        ...p,
        xp: newXp,
        level: newLevel
      };

      // Sync to Supabase
      updateProfileInSupabase(updated);
      return updated;
    }));
  };

  const addCoins = (amount: number) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentUser.id) return p;
      const updated = {
        ...p,
        coins: p.coins + amount
      };
      updateProfileInSupabase(updated);
      return updated;
    }));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === currentUser.id) {
        const up = { ...p, ...updated };
        updateProfileInSupabase(up);
        return up;
      }
      return p;
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn,
      allProfiles: profiles,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuthModal,
      loginTeacherWithGoogle,
      registerStudent,
      loginStudent,
      logout,
      switchRole,
      switchUser,
      addXP,
      addCoins,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
