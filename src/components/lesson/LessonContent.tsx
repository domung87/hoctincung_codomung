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
      particleCount: 130,
      spread: 85,
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
    <div className="flex-1 w-full bg-white dark:bg-[#151828] rounded-3xl p-6 md:p-8 border-4 border-pink-200/90 dark:border-slate-800 shadow-xl space-y-8 relative">
      
      {/* 1. Lesson Header with Pink-Orange Badge */}
      <div className="space-y-3 pb-6 border-b-2 border-pink-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF5288] to-[#FF7A59] text-white text-xs font-black tracking-wide shadow-md">
            CHỦ ĐỀ {activeLesson.topicCode} • TIN HỌC 6 KẾT NỐI TRI THỨC
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-extrabold flex items-center gap-1.5 bg-orange-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-orange-200">
              <Clock className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span>Thời lượng: {activeLesson.durationMinutes} phút</span>
            </span>

            {activeLesson.isCompleted ? (
              <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center gap-1 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Đã Hoàn Thành
              </span>
            ) : (
              <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow-xs">
                🔄 Đang Học
              </span>
            )}
          </div>
        </div>

        {/* Big Colorful Lesson Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#FF5288] via-[#FF6E4A] to-[#FFA048] bg-clip-text text-transparent leading-tight pt-1">
          {activeLesson.title}
        </h2>
      </div>

      {/* 2. Mục Tiêu Bài Học (Viền Cam Đào Nổi Bật) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50/90 via-orange-50/80 to-amber-50/70 dark:bg-slate-800/50 border-2 border-orange-300 dark:border-orange-900/60 shadow-sm space-y-2">
        <h3 className="text-xs font-black text-[#FF6E4A] dark:text-orange-400 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-[#FF5288]" />
          <span>🎯 Mục Tiêu Cần Đạt & Tóm Tắt Bài Học</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
          {activeLesson.summary}
        </p>
      </div>

      {/* 3. Kiến Thức Trọng Tâm (Thẻ Viền Màu Sắc Sinh Động) */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0084FF]" />
          <span>📚 Kiến Thức Trọng Tâm Cần Ghi Nhớ</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLesson.keyPoints.map((point, index) => {
            const borderColors = [
              'border-[#FF5288] bg-pink-50/60',
              'border-[#0084FF] bg-blue-50/60',
              'border-[#10B981] bg-emerald-50/60',
              'border-[#F59E0B] bg-amber-50/60'
            ];
            const activeColorClass = borderColors[index % borderColors.length];

            return (
              <div 
                key={index}
                className={`p-4.5 rounded-3xl border-2 ${activeColorClass} dark:bg-slate-800/60 dark:border-slate-700 flex items-start gap-3.5 shadow-sm card-3d-hover`}
              >
                <div className="w-7 h-7 rounded-2xl bg-gradient-to-tr from-[#FF5288] to-[#FF7A59] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                  {point}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Khối Minh Họa Trực Quan / Thành Phần Tương Tác (Nếu có) */}
      {activeLesson.components && activeLesson.components.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>🧩 Chi Tiết Thành Phần & Ví Dụ Trực Quan</span>
          </h3>

          <div className="flex flex-wrap gap-2.5">
            {activeLesson.components.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  setSelectedCompIndex(idx);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border-2 ${
                  selectedCompIndex === idx
                    ? 'bg-gradient-to-r from-[#FF5288] to-[#FF7A59] text-white border-pink-300 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800 border-pink-200 text-slate-700 dark:text-slate-300 hover:bg-pink-50'
                }`}
              >
                {comp.title.split(':')[0]}
              </button>
            ))}
          </div>

          {activeLesson.components[selectedCompIndex] && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/60 border-3 border-[#FF5288] shadow-md space-y-3 animate-in fade-in">
              <h4 className="text-sm sm:text-base font-black text-[#FF5288] dark:text-pink-400">
                {activeLesson.components[selectedCompIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {activeLesson.components[selectedCompIndex].description}
              </p>
              <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-slate-900 border border-orange-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-white">
                  ⚙️ <strong>Chức năng:</strong> {activeLesson.components[selectedCompIndex].functionText}
                </div>
                <div className="text-[#FF6E4A] font-extrabold">
                  💡 <strong>Ví dụ thực tế:</strong> {activeLesson.components[selectedCompIndex].example}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Khung Lời Dặn Dò Của Cô Đỗ Mừng (Viền Hồng Cam Dễ Thương) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50 dark:bg-slate-800/50 border-3 border-pink-300 dark:border-slate-700 flex items-start gap-4 shadow-sm">
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#FF5288] to-[#FF7A59] p-0.5 shrink-0 overflow-hidden shadow-md">
          <img src="/images/avatar_co_mung.jpg" alt="Cô Đỗ Mừng" className="w-full h-full object-cover rounded-[14px]" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="text-xs font-black text-[#FF5288] flex items-center gap-1.5">
            <span>👩‍🏫 Lời Dặn Dò Của Cô Đỗ Mừng:</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF5288]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
            "Sau khi đọc kỹ kiến thức, các em hãy nhấn nút <strong>Xác nhận hoàn thành</strong> bên dưới để nhận phần thưởng +50 XP và +20 Coins, sau đó cùng chuyển sang <strong>Luyện tập</strong> và <strong>Trò chơi</strong> nhé! 🌸"
          </p>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BAR: 3 NÚT NỔI BẬT RỰC RỠ */}
      <div className="pt-6 border-t-2 border-pink-100 dark:border-slate-800 space-y-5">
        
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3.5">
          
          {/* Nút 1: Xác Nhận Hoàn Thành (+50 XP, +20 Coins) */}
          <button
            onClick={handleConfirmComplete}
            className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-emerald-300"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>✅ Xác Nhận Hoàn Thành Bài (+50 XP)</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
            {/* Nút 2: Chuyển Qua Luyện Tập */}
            <button
              onClick={handleGoToPractice}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border-2 border-yellow-300"
            >
              <MousePointer className="w-4 h-4" />
              <span>🖱️ Chuyển Qua Luyện Tập</span>
            </button>

            {/* Nút 3: Chuyển Qua Trò Chơi / Quiz */}
            <button
              onClick={handleGoToGame}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF5288] via-[#FF6E4A] to-[#FFA048] hover:from-[#FF4081] hover:to-[#FF5722] text-white font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border-2 border-pink-300 glow-hover"
            >
              <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>👑 Chuyển Qua Trò Chơi</span>
            </button>
          </div>
        </div>

        {/* Previous & Next Navigation with colorful pills */}
        <div className="flex items-center justify-between pt-2">
          {prevLesson ? (
            <button
              onClick={() => handleNavigate(prevLesson.id)}
              className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-pink-50 text-slate-700 dark:text-slate-300 text-xs font-black flex items-center gap-1.5 transition-all border-2 border-slate-200 hover:border-pink-300 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>◀ {prevLesson.title.split(':')[0]}</span>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => handleNavigate(nextLesson.id)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 text-[#FF5288] text-xs font-black flex items-center gap-1.5 transition-all border-2 border-pink-300 shadow-xs ml-auto"
            >
              <span>{nextLesson.title.split(':')[0]} ▶</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
