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
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  FileText,
  Workflow,
  GraduationCap,
  HardDrive,
  Monitor,
  Mouse,
  Layers,
  Code
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

  // Flatten all 17 lessons for navigation
  const allLessons = topics.flatMap(t => t.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Icon mapping for lessons
  const getLessonIcon = (topicCode: string) => {
    switch (topicCode) {
      case 'A': return Cpu;
      case 'B': return Globe;
      case 'C': return Search;
      case 'D': return ShieldCheck;
      case 'E': return FileText;
      case 'F': return Workflow;
      default: return Cpu;
    }
  };

  const CenterIcon = getLessonIcon(activeLesson.topicCode);

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
    <div className="flex-1 w-full space-y-4">
      
      {/* 1. TOP HEADER & ACTION BUTTONS (Khung Rộng Trên Cùng) */}
      <div className="bg-white dark:bg-[#151828] rounded-3xl p-5 sm:p-6 border-2 border-pink-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Topic & Lesson Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-300">
            <GraduationCap className="w-4 h-4 text-[#FF5288]" />
            <span>Chủ đề {activeLesson.topicCode}: {
              activeLesson.topicCode === 'A' ? 'Máy tính và cộng đồng' :
              activeLesson.topicCode === 'B' ? 'Mạng máy tính và Internet' :
              activeLesson.topicCode === 'C' ? 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin' :
              activeLesson.topicCode === 'D' ? 'Đạo đức, pháp luật và văn hóa trong môi trường số' :
              activeLesson.topicCode === 'E' ? 'Ứng dụng tin học' : 'Giải quyết vấn đề với sự trợ giúp của máy tính'
            }</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {activeLesson.title}
          </h1>
        </div>

        {/* Right Side: Quick Action Buttons matching reference image */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Button 1: Vào Luyện Tập (White/Pink Pill) */}
          <button
            onClick={handleGoToPractice}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-pink-300 hover:border-pink-500 text-slate-800 dark:text-slate-100 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-xs"
          >
            <MousePointer className="w-4 h-4 text-[#FF5288]" />
            <span>Vào Luyện Tập</span>
          </button>

          {/* Button 2: Làm Trắc Nghiệm (Pink Pill Button) */}
          <button
            onClick={handleGoToGame}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FF5288] to-[#FF7A59] hover:from-[#FF407A] hover:to-[#FF6845] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Làm Trắc Nghiệm</span>
          </button>

          {/* Button 3: Video Bài Giảng */}
          <button
            onClick={handleGoToVideo}
            className="px-3.5 py-2 sm:py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all border border-blue-200"
          >
            <Video className="w-4 h-4" />
            <span>Video Giảng</span>
          </button>
        </div>

      </div>

      {/* 2. MAIN WIDE CONTENT CARD (Khung Rộng Nội Dung Bài Học) */}
      <div className="bg-white dark:bg-[#151828] rounded-3xl p-6 sm:p-8 border-2 border-pink-200 dark:border-slate-800 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Decorative Center Topic Icon Graphic */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-pink-50 dark:bg-pink-950/40 border-2 border-pink-200 dark:border-pink-900/60 flex items-center justify-center text-[#FF5288] shadow-sm animate-pulse">
            <CenterIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1 max-w-2xl">
            <h3 className="text-base sm:text-lg font-black text-[#FF5288]">
              {activeLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {activeLesson.summary}
            </p>
          </div>
        </div>

        {/* Section 1: Kiến Thức Trọng Tâm SGK Kết Nối Tri Thức */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-pink-100 dark:border-slate-800">
            <BookOpen className="w-4 h-4 text-[#FF5288]" />
            <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
              1. Kiến Thức Trọng Tâm Cần Ghi Nhớ
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeLesson.keyPoints.map((point, index) => (
              <div 
                key={index}
                className="p-4 rounded-2xl bg-pink-50/40 dark:bg-slate-800/50 border border-pink-100 dark:border-slate-700 flex items-start gap-3 hover:border-pink-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF5288] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Khám Phá & Thành Phần Tương Tác */}
        {activeLesson.components && activeLesson.components.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-2 border-b border-pink-100 dark:border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
                2. Khám Phá & Ví Dụ Minh Họa Trực Quan
              </h4>
            </div>

            {/* Interactive Tabs Switcher */}
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
                      ? 'bg-[#FF5288] border-[#FF5288] text-white shadow-sm scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-200'
                  }`}
                >
                  {comp.title.split(':')[0]}
                </button>
              ))}
            </div>

            {activeLesson.components[selectedCompIndex] && (
              <div className="p-5 rounded-3xl bg-pink-50/60 dark:bg-slate-800/40 border-2 border-pink-200 dark:border-slate-700 space-y-2.5 animate-in fade-in">
                <h5 className="text-sm font-black text-[#FF5288]">
                  {activeLesson.components[selectedCompIndex].title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeLesson.components[selectedCompIndex].description}
                </p>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-800 dark:text-white">
                    ⚙️ <strong>Chức năng:</strong> {activeLesson.components[selectedCompIndex].functionText}
                  </div>
                  <div className="text-[#FF5288] font-semibold">
                    💡 <strong>Ví dụ thực tế:</strong> {activeLesson.components[selectedCompIndex].example}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. FLOATING MASCOT SPEECH BUBBLE (Cô Đỗ Mừng & Robot AI Chào Học Sinh) */}
        <div className="flex items-end justify-end gap-3 pt-4">
          {/* Speech Bubble */}
          <div className="relative p-3.5 px-4 rounded-3xl bg-white dark:bg-[#1A1E33] border-2 border-pink-300 dark:border-pink-800 shadow-md max-w-xs sm:max-w-md text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
            <span>Chào em! Cô Đỗ Mừng chúc em một ngày học tập thật vui! 🌸</span>
            {/* Triangle pointer */}
            <div className="absolute right-6 -bottom-2 w-3 h-3 bg-white dark:bg-[#1A1E33] border-r-2 border-b-2 border-pink-300 dark:border-pink-800 transform rotate-45" />
          </div>

          {/* Mascot Avatar with Online Badge */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 p-0.5 shadow-lg shrink-0">
            <img 
              src="/images/avatar_co_mung.jpg" 
              alt="Cô Đỗ Mừng" 
              className="w-full h-full object-cover rounded-full" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=tin6';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
        </div>

        {/* 4. BOTTOM ACTION & NAVIGATION BAR */}
        <div className="pt-6 border-t border-pink-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Complete Lesson Button */}
          <button
            onClick={handleConfirmComplete}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Xác Nhận Đã Học Xong (+50 XP, +20 Xu)</span>
          </button>

          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {prevLesson ? (
              <button
                onClick={() => handleNavigate(prevLesson.id)}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-pink-50 border border-pink-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bài trước</span>
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => handleNavigate(nextLesson.id)}
                className="px-4 py-2 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-300 text-[#FF5288] text-xs font-black flex items-center gap-1 transition-colors"
              >
                <span>Bài tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
