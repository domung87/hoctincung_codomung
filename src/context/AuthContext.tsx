import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole } from '../types';
import { INITIAL_PROFILES } from '../lib/mockData';
import { sound } from '../lib/soundFx';

interface AuthContextType {
  currentUser: UserProfile;
  allProfiles: UserProfile[];
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  addXP: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_PROFILES = 'skillset_profiles_v1';
const STORAGE_KEY_CURRENT_USER_ID = 'skillset_current_user_id_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER_ID);
    return saved || '00000000-0000-0000-0000-000000000003'; // Default: Student Irham
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  const currentUser = profiles.find(p => p.id === currentUserId) || profiles[0];

  const switchRole = (role: UserRole) => {
    sound.click();
    const target = profiles.find(p => p.role === role);
    if (target) {
      setCurrentUserId(target.id);
    }
  };

  const switchUser = (userId: string) => {
    sound.click();
    setCurrentUserId(userId);
  };

  const addXP = (amount: number, _reason?: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentUser.id) return p;
      const newXp = p.xp + amount;
      const newLevel = Math.floor(newXp / 250) + 1;
      
      // Check level up
      if (newLevel > p.level) {
        sound.victory();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      
      return {
        ...p,
        xp: newXp,
        level: newLevel
      };
    }));
  };

  const addCoins = (amount: number) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentUser.id) return p;
      return {
        ...p,
        coins: p.coins + amount
      };
    }));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfiles(prev => prev.map(p => p.id === currentUser.id ? { ...p, ...updated } : p));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      allProfiles: profiles,
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
