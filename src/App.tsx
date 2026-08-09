import React from 'react';
import { BannerHeader } from './components/layout/BannerHeader';
import { Navbar } from './components/layout/Navbar';
import { LessonSidebar } from './components/lesson/LessonSidebar';
import { LessonContent } from './components/lesson/LessonContent';
import { HomeOverview } from './components/views/HomeOverview';
import { StatsView } from './components/views/StatsView';

// Modals
import { GreetingModal } from './components/modals/GreetingModal';
import { PracticeModal } from './components/modals/PracticeModal';
import { QuizModal } from './components/modals/QuizModal';
import { SupabaseConfigModal } from './components/modals/SupabaseConfigModal';

import { useApp } from './context/AppContext';

export const App: React.FC = () => {
  const { 
    activeTab, 
    isSupabaseConfigOpen, 
    setIsSupabaseConfigOpen, 
    refreshDataFromSupabase 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F7] dark:bg-[#0B0D17] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Top Colorful Banner with "CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG" */}
      <BannerHeader />

      {/* 2. Navigation Bar */}
      <Navbar />

      {/* 3. Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'home' && <HomeOverview />}

        {activeTab === 'lessons' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Lesson Navigation Sidebar */}
            <LessonSidebar />

            {/* Main Interactive Lesson Content */}
            <LessonContent />
          </div>
        )}

        {activeTab === 'stats' && <StatsView />}
      </main>

      {/* Interactive Modals */}
      <GreetingModal />
      <PracticeModal />
      <QuizModal />
      <SupabaseConfigModal
        isOpen={isSupabaseConfigOpen}
        onClose={() => setIsSupabaseConfigOpen(false)}
        onConfigSaved={refreshDataFromSupabase}
      />
    </div>
  );
};
