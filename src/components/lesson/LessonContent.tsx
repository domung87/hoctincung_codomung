import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  MousePointer, 
  Clock, 
  BookOpen, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Award,
  Crown,
  Check,
  Zap,
  Target,
  Video,
  Layers,
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  FileText,
  Workflow
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const LessonContent: React.FC = () => {
  const { 
    topics, 
    activeLesson, 
    selectedLessonId,
    setSelectedLessonId,
    setActiveTab,
    setIsPracticeModalOpen, 
    setIsQuizModalOpen,
    toggleCompleteLesson 
  } = useApp();
  
  const { addXP, addCoins } = useAuth();
  const [selectedCompIndex, setSelectedCompIndex] = useState<number>(0);

  // Flatten all 17 lessons to find previous and next lessons
  const allLessons = topics.flatMap(t => t.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Topic Color Schemes
  const topicColorStyles: Record<string, {
    border: string;
    badgeBg: string;
    gradient: string;
    text: string;
    icon: any;
  }> = {
    'A': { border: 'border-pink-300 dark:border-pink-800', badgeBg: 'bg-pink-100 text-pink-700', gradient: 'from-pink-500 to-rose-400', text: 'text-pink-600', icon: Cpu },
    'B': { border: 'border-emerald-300 dark:border-emerald-800', badgeBg: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-500 to-teal-400', text: 'text-emerald-600', icon: Globe },
    'C': { border: 'border-blue-300 dark:border-blue-800', badgeBg: 'bg-blue-100 text-blue-700', gradient: 'from-blue-500 to-cyan-400', text: 'text-blue-600', icon: Search },
    'D': { border: 'border-purple-300 dark:border-purple-800', badgeBg: 'bg-purple-100 text-purple-700', gradient: 'from-purple-500 to-indigo-400', text: 'text-purple-600', icon: ShieldCheck },
    'E': { border: 'border-amber-300 dark:border-amber-800', badgeBg: 'bg-amber-100 text-amber-800', gradient: 'from-amber-500 to-yellow-400', text: 'text-amber-600', icon: FileText },
    'F': { border: 'border-rose-300 dark:border-rose-800', badgeBg: 'bg-rose-100 text-rose-700', gradient: 'from-rose-500 to-red-400', text: 'text-rose-600', icon: Workflow },
  };

  const currentTheme = topicColorStyles[activeLesson.topicCode] || topicColorStyles['A'];
  const TopicIcon = currentTheme.icon;

  // Handle Mark Complete
  const handleConfirmComplete = () => {
    sound.victory();
    toggleCompleteLesson(activeLesson.id);
    addXP(50, `Hoàn thành ${activeLesson.title}`);
    addCoins(20);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    alert(`🎉 Chúc mừng em đã hoàn thành "${activeLesson.title}"! (+50 XP, +20 Coins) 🌸`);
  };

  const handleGoToPractice = () => {
    sound.click();
    setIsPracticeModalOpen(true);
  };

  const handleGoToGame = () => {
    sound.click();
    setIsQuizModalOpen(true);
  };

  const handleGoToVideo = () => {
    sound.click();
    setActiveTab('library');
  };

  const handleNavigate = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
    setSelectedCompIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex-1 w-full bg-white dark:bg-[#151828] rounded-3xl p-6 md:p-8 border-3 ${currentTheme.border} shadow-lg space-y-8 relative`}>
      
      {/* 1. Lesson Header & Breadcrumbs with Vibrant Topic Badge */}
      <div className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-4 py-1.5 rounded-full ${currentTheme.badgeBg} text-xs font-black tracking-wide flex items-center gap-1.5 shadow-xs border border-current/20`}>
              <TopicIcon className="w-3.5 h-3.5" />
              <span>CHỦ ĐỀ {activeLesson.topicCode} • TIN HỌC 6 KẾT NỐI TRI THỨC</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Watch Video Button */}
            <button
              onClick={handleGoToVideo}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-black flex items-center gap-1.5 transition-all shadow-xs border border-blue-200"
            >
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>🎬 Xem Video Bài Giảng</span>
            </button>

            <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-pinkBrand-500" />
              <span>{activeLesson.durationMinutes} phút</span>
            </span>

            {activeLesson.isCompleted ? (
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center gap-1 shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Đã Hoàn Thành
              </span>
            ) : (
              <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black border border-amber-300">
                Đang Học 📖
              </span>
            )}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
          {activeLesson.title}
        </h2>
      </div>

      {/* 2. Mục Tiêu Bài Học & Khám Phá với Khung Viền Nổi Bật */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50/90 via-rose-50/70 to-amber-50/70 dark:bg-slate-800/60 border-2 border-pink-200 dark:border-slate-700 shadow-sm space-y-2.5">
        <h3 className="text-xs font-black text-pinkBrand-600 dark:text-pinkBrand-400 uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-4 h-4 text-pinkBrand-500" />
          <span>🎯 Mục Tiêu Cần Đạt & Tóm Tắt Trọng Tâm</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
          {activeLesson.summary}
        </p>
      </div>

      {/* 3. Kiến Thức Trọng Tâm (Key Points) */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>📚 Kiến Thức Trọng Tâm Cần Ghi Nhớ</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLesson.keyPoints.map((point, index) => (
            <div 
              key={index}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/70 border-2 border-slate-200/90 dark:border-slate-700 flex items-start gap-3 hover:border-pinkBrand-400 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-pinkBrand-500 to-rose-400 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Khối Minh Họa Trực Quan / Thành Phần Tương Tác */}
      {activeLesson.components && activeLesson.components.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>🧩 Chi Tiết Thành Phần & Ví Dụ Trực Quan</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {activeLesson.components.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  setSelectedCompIndex(idx);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border-2 ${
                  selectedCompIndex === idx
                    ? 'bg-pinkBrand-500 border-pinkBrand-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-300'
                }`}
              >
                {comp.title.split(':')[0]}
              </button>
            ))}
          </div>

          {activeLesson.components[selectedCompIndex] && (
            <div className="p-6 rounded-3xl bg-pink-50/60 dark:bg-slate-800/40 border-2 border-pink-200 dark:border-slate-700 space-y-3 animate-in fade-in shadow-xs">
              <h4 className="text-sm font-black text-pinkBrand-600 dark:text-pinkBrand-400">
                {activeLesson.components[selectedCompIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeLesson.components[selectedCompIndex].description}
              </p>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-pink-100 dark:border-slate-800 text-xs space-y-1.5 shadow-xs">
                <div className="font-bold text-slate-800 dark:text-white">
                  ⚙️ <strong>Chức năng:</strong> {activeLesson.components[selectedCompIndex].functionText}
                </div>
                <div className="text-pinkBrand-600 dark:text-pinkBrand-400 font-semibold">
                  💡 <strong>Ví dụ thực tế:</strong> {activeLesson.components[selectedCompIndex].example}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Khung Lời Dặn Dò Của Cô Đỗ Mừng */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 dark:bg-slate-800/60 border-2 border-pink-300 dark:border-slate-700 flex items-start gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-pinkBrand-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 overflow-hidden shadow-md">
          <img src="/images/avatar_co_mung.jpg" alt="Cô Đỗ Mừng" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="text-xs font-black text-pinkBrand-600 flex items-center gap-1.5">
            <span>👩‍🏫 Lời Dặn Dò Của Cô Đỗ Mừng:</span>
            <Heart className="w-3.5 h-3.5 fill-pinkBrand-500" />
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            "Sau khi đọc xong lý thuyết, các em hãy nhấn nút <strong>Xem video bài giảng</strong> hoặc nhấn <strong>Xác nhận hoàn thành</strong> bên dưới để tích lũy XP, sau đó chuyển sang <strong>Luyện tập</strong> và <strong>Trò chơi</strong> nhé!"
          </p>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BAR */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        
        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
          {/* Nút 1: Xác Nhận Hoàn Thành */}
          <button
            onClick={handleConfirmComplete}
            className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>✅ Xác Nhận Hoàn Thành Bài Học (+50 XP)</span>
          </button>

          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            {/* Nút Video Bài Giảng */}
            <button
              onClick={handleGoToVideo}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5"
            >
              <Video className="w-4 h-4" />
              <span>🎬 Xem Video Bài Giảng</span>
            </button>

            {/* Nút 2: Chuyển Qua Luyện Tập */}
            <button
              onClick={handleGoToPractice}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5"
            >
              <MousePointer className="w-4 h-4" />
              <span>🖱️ Chuyển Qua Luyện Tập</span>
            </button>

            {/* Nút 3: Chuyển Qua Trò Chơi / Quiz */}
            <button
              onClick={handleGoToGame}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>👑 Chuyển Qua Trò Chơi</span>
            </button>
          </div>
        </div>

        {/* Previous & Next Navigation */}
        <div className="flex items-center justify-between pt-2">
          {prevLesson ? (
            <button
              onClick={() => handleNavigate(prevLesson.id)}
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-pink-50 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>◀ Bài Trước: {prevLesson.title.split(':')[0]}</span>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => handleNavigate(nextLesson.id)}
              className="px-4 py-2 rounded-2xl bg-pinkBrand-50 hover:bg-pinkBrand-100 text-pinkBrand-600 text-xs font-extrabold flex items-center gap-1.5 transition-colors ml-auto border border-pinkBrand-200"
            >
              <span>Bài Tiếp Theo: {nextLesson.title.split(':')[0]} ▶</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
