import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole } from '../types';
import { INITIAL_PROFILES } from '../lib/mockData';
import { updateProfileInSupabase } from '../lib/supabase';
import { sound } from '../lib/soundFx';

export type AuthMode = 'teacher_login' | 'student_login' | 'student_register';

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
  registerStudent: (fullName: string, classroom: string, username: string, password: string) => Promise<{ success: boolean; message: string }>;
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

const STORAGE_KEY_PROFILES = 'tinhoc6_profiles_v2';
const STORAGE_KEY_CURRENT_USER_ID = 'tinhoc6_current_user_id_v2';
const STORAGE_KEY_IS_LOGGED_IN = 'tinhoc6_is_logged_in_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
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

  // 1. Giáo viên đăng nhập bằng Gmail
  const loginTeacherWithGoogle = async (gmail: string): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanEmail = gmail.trim().toLowerCase();
    
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Vui lòng nhập địa chỉ Gmail hợp lệ.' };
    }

    let teacher = profiles.find(p => p.role === 'teacher' && p.email.toLowerCase() === cleanEmail);

    if (!teacher) {
      // Create new Teacher profile
      const newTeacher: UserProfile = {
        id: 'teacher-' + Date.now(),
        email: cleanEmail,
        full_name: cleanEmail.includes('codomung') ? 'Cô Đỗ Mừng' : 'Giáo Viên (' + cleanEmail.split('@')[0] + ')',
        role: 'teacher',
        avatar_url: '/images/avatar_co_mung.jpg',
        bio: 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức 💖',
        xp: 9999,
        level: 25,
        coins: 5000,
        streak_days: 90,
        created_at: new Date().toISOString()
      };
      setProfiles(prev => [newTeacher, ...prev]);
      teacher = newTeacher;
      updateProfileInSupabase(newTeacher);
    }

    setCurrentUserId(teacher.id);
    setIsLoggedIn(true);
    sound.victory();
    confetti({ particleCount: 80, spread: 70 });
    return { success: true, message: `Chào mừng ${teacher.full_name} đã đăng nhập thành công!` };
  };

  // 2. Học sinh Đăng Ký (Tên, Lớp, Tên đăng nhập, Mật khẩu)
  const registerStudent = async (
    fullName: string, 
    classroom: string, 
    username: string, 
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanUser = username.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanClass = classroom.trim();

    if (!cleanName || !cleanClass || !cleanUser || !password) {
      return { success: false, message: 'Vui lòng điền đầy đủ tất cả các trường thông tin.' };
    }

    const exists = profiles.find(p => p.username?.toLowerCase() === cleanUser);
    if (exists) {
      return { success: false, message: `Tên đăng nhập "${username}" đã có người sử dụng. Em hãy chọn tên khác nhé!` };
    }

    const newStudent: UserProfile = {
      id: 'student-' + Date.now(),
      email: `${cleanUser}@hocsinh.tin6.edu.vn`,
      full_name: cleanName,
      classroom: cleanClass,
      username: cleanUser,
      password: password,
      role: 'student',
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUser}`,
      bio: `Học sinh ${cleanClass} - Cùng học Tin 6 với Cô Đỗ Mừng 🌸`,
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
    confetti({ particleCount: 100, spread: 80 });

    // Sync to Supabase in background
    updateProfileInSupabase(newStudent);

    return { success: true, message: `Chúc mừng ${cleanName} (${cleanClass}) đã đăng ký thành công!` };
  };

  // 3. Học sinh Đăng Nhập
  const loginStudent = async (usernameOrName: string, password: string): Promise<{ success: boolean; message: string }> => {
    sound.click();
    const cleanQuery = usernameOrName.trim().toLowerCase();

    const student = profiles.find(p => 
      p.role === 'student' && 
      (p.username?.toLowerCase() === cleanQuery || p.full_name.toLowerCase().includes(cleanQuery) || p.email.toLowerCase() === cleanQuery)
    );

    if (!student) {
      return { success: false, message: 'Không tìm thấy tài khoản học sinh. Em vui lòng kiểm tra lại hoặc Đăng ký tài khoản mới.' };
    }

    if (student.password && student.password !== password) {
      return { success: false, message: 'Mật khẩu chưa chính xác. Em vui lòng nhập lại nhé.' };
    }

    setCurrentUserId(student.id);
    setIsLoggedIn(true);
    sound.victory();
    confetti({ particleCount: 70, spread: 60 });
    return { success: true, message: `Chào mừng ${student.full_name} (${student.classroom || 'Lớp 6'}) đã quay trở lại học tập!` };
  };

  const logout = () => {
    sound.click();
    setIsLoggedIn(false);
  };

  const switchRole = (role: UserRole) => {
    sound.click();
    const target = profiles.find(p => p.role === role);
    if (target) {
      setCurrentUserId(target.id);
      setIsLoggedIn(true);
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
