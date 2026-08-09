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
  Target
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

  const handleNavigate = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
    setSelectedCompIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 w-full bg-white dark:bg-[#151828] rounded-3xl p-6 md:p-8 border border-pink-100 dark:border-slate-800 shadow-sm space-y-8 relative">
      
      {/* 1. Lesson Header & Breadcrumbs */}
      <div className="space-y-3 pb-6 border-b border-pink-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-pinkBrand-50 text-pinkBrand-600 text-xs font-black tracking-wide">
            CHỦ ĐỀ {activeLesson.topicCode} • TIN HỌC 6 KẾT NỐI TRI THỨC
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pinkBrand-500" />
              <span>Thời lượng: {activeLesson.durationMinutes} phút</span>
            </span>

            {activeLesson.isCompleted ? (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Đã Hoàn Thành
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                Đang Học
              </span>
            )}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
          {activeLesson.title}
        </h2>
      </div>

      {/* 2. Mục Tiêu Bài Học & Khám Phá */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50/80 via-rose-50/60 to-amber-50/60 dark:bg-slate-800/40 border border-pink-100 dark:border-slate-800 space-y-2">
        <h3 className="text-xs font-black text-pinkBrand-600 dark:text-pinkBrand-400 uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-4 h-4 text-pinkBrand-500" />
          <span>🎯 Mục Tiêu Cần Đạt & Tóm Tắt Bài Học</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activeLesson.keyPoints.map((point, index) => (
            <div 
              key={index}
              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3 hover:border-pinkBrand-300 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-pinkBrand-100 dark:bg-pinkBrand-950/60 text-pinkBrand-600 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Khối Minh Họa Trực Quan / Thành Phần Tương Tác (Nếu có) */}
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
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedCompIndex === idx
                    ? 'bg-pinkBrand-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-50'
                }`}
              >
                {comp.title.split(':')[0]}
              </button>
            ))}
          </div>

          {activeLesson.components[selectedCompIndex] && (
            <div className="p-6 rounded-3xl bg-pink-50/50 dark:bg-slate-800/40 border-2 border-pink-100 dark:border-slate-700 space-y-3 animate-in fade-in">
              <h4 className="text-sm font-black text-pinkBrand-600 dark:text-pinkBrand-400">
                {activeLesson.components[selectedCompIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeLesson.components[selectedCompIndex].description}
              </p>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 text-xs space-y-1">
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
      <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 dark:bg-slate-800/40 border border-pink-200 dark:border-slate-700 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-pinkBrand-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          <img src="/images/avatar_co_mung.jpg" alt="Cô Đỗ Mừng" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="text-xs font-black text-pinkBrand-600 flex items-center gap-1.5">
            <span>👩‍🏫 Lời Dặn Dò Của Cô Đỗ Mừng:</span>
            <Heart className="w-3.5 h-3.5 fill-pinkBrand-500" />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            "Sau khi đọc xong lý thuyết, các em hãy nhấn nút <strong>Xác nhận hoàn thành</strong> bên dưới để tích lũy XP, sau đó chuyển sang <strong>Luyện tập</strong> và <strong>Trò chơi</strong> để rèn luyện kỹ năng nhé!"
          </p>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BAR (Theo đúng yêu cầu của Thầy/Cô) */}
      <div className="pt-6 border-t border-pink-100 dark:border-slate-800 space-y-4">
        
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
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-pink-50 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>◀ Bài Trước: {prevLesson.title.split(':')[0]}</span>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => handleNavigate(nextLesson.id)}
              className="px-4 py-2 rounded-2xl bg-pinkBrand-50 hover:bg-pinkBrand-100 text-pinkBrand-600 text-xs font-extrabold flex items-center gap-1.5 transition-colors ml-auto"
            >
              <span>Bài Tiếp Theo: {nextLesson.title.split(':')[0]} ▶</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Floating Mascot AI Assistant Cô Đỗ Mừng (Góc Dưới Bên Phải) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-none">
        <div className="bg-white dark:bg-[#1A1E33] p-3.5 rounded-2xl shadow-2xl border-2 border-pink-200 dark:border-slate-700 max-w-xs pointer-events-auto animate-bounce duration-1000 hidden md:block">
          <p className="text-xs font-extrabold text-slate-800 dark:text-white leading-relaxed">
            "Chào em! Cô Đỗ Mừng chúc em học tốt bài <strong>{activeLesson.title.split(':')[0]}</strong> nhé! 🌸💖"
          </p>
        </div>

        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pinkBrand-500 to-rose-400 p-0.5 shadow-2xl pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <img src="/images/avatar_co_mung.jpg" alt="Mascot Cô Đỗ Mừng" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

    </div>
  );
};
