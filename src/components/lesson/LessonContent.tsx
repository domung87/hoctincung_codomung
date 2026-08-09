import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Mouse, 
  Monitor, 
  MousePointer, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  GraduationCap, 
  Bot, 
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const LessonContent: React.FC = () => {
  const { 
    activeLesson, 
    setIsPracticeModalOpen, 
    setIsQuizModalOpen, 
    toggleCompleteLesson,
    playCoDoMungGreeting
  } = useApp();
  
  const { addXP } = useAuth();
  const [activeComponentIdx, setActiveComponentIdx] = useState(0);

  const getComponentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'HardDrive': return HardDrive;
      case 'Mouse': return Mouse;
      case 'Monitor': return Monitor;
      case 'MousePointer': return MousePointer;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex-1 space-y-6 relative">
      {/* Lesson Top Header (Exact match to Image 3) */}
      <div className="bg-white dark:bg-[#151828] p-6 rounded-3xl border border-pink-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
            <GraduationCap className="w-4 h-4 text-pinkBrand-500" />
            <span>Chủ đề {activeLesson.topicCode}: {activeLesson.title.split(':')[0]}</span>
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white">
            {activeLesson.title}
          </h2>
        </div>

        {/* Top Action Buttons (Exact match to Image 3) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.click();
              setIsPracticeModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-pink-50 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold shadow-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>🖱️ Vào Luyện Tập</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setIsQuizModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pinkBrand-500 to-pinkBrand-600 hover:from-pinkBrand-600 hover:to-pinkBrand-700 text-white text-xs font-extrabold shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Làm Trắc Nghiệm</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Presentation Area (Exact match to Image 3) */}
      <div className="bg-white dark:bg-[#151828] p-8 rounded-3xl border border-pink-100 dark:border-slate-800 shadow-sm space-y-8 relative overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100/40 rounded-full blur-2xl pointer-events-none" />

        {/* Dynamic Component Cards if available in lesson */}
        {activeLesson.components && activeLesson.components.length > 0 ? (
          <div className="space-y-6">
            {/* Center Big Icon Highlight */}
            {(() => {
              const comp = activeLesson.components[activeComponentIdx] || activeLesson.components[0];
              const IconComp = getComponentIcon(comp.icon);

              return (
                <div className="text-center py-6 space-y-4 max-w-xl mx-auto">
                  <div className="w-20 h-20 rounded-3xl bg-pink-50 dark:bg-pink-950/40 border-2 border-pink-200 dark:border-pink-800 text-pinkBrand-500 flex items-center justify-center mx-auto shadow-sm transform hover:scale-110 transition-transform">
                    <IconComp className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-pinkBrand-600 dark:text-pinkBrand-400">
                      {comp.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-slate-800/40 border border-pink-100 dark:border-slate-700 text-xs text-left space-y-1.5">
                    <div className="font-bold text-slate-700 dark:text-slate-200">
                      ⚙️ Chức năng chính: <span className="font-normal text-slate-600 dark:text-slate-300">{comp.functionText}</span>
                    </div>
                    <div className="font-bold text-pinkBrand-600 dark:text-pinkBrand-400">
                      💡 Ví dụ thực tế: <span className="font-normal text-slate-600 dark:text-slate-300">{comp.example}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Component Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-pink-50 dark:border-slate-800">
              {activeLesson.components.map((comp, idx) => {
                const IconComp = getComponentIcon(comp.icon);
                const isSelected = idx === activeComponentIdx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.click();
                      setActiveComponentIdx(idx);
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 text-center transition-all ${
                      isSelected
                        ? 'bg-pinkBrand-500 text-white border-pinkBrand-600 shadow-md transform -translate-y-1'
                        : 'bg-pink-50/50 dark:bg-slate-800/30 border-pink-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-pink-300'
                    }`}
                  >
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-pinkBrand-500'}`} />
                    <span className="text-[11px] font-extrabold line-clamp-1">{comp.title.split('(')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* General Lesson Summary */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-pink-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs leading-relaxed">
              <h4 className="font-bold text-sm text-pinkBrand-600 mb-1">📖 Tóm tắt bài học:</h4>
              <p>{activeLesson.summary}</p>
            </div>
          </div>
        )}

        {/* Key Points Checklist (Kiến thức trọng tâm) */}
        <div className="p-6 rounded-3xl bg-pink-50/40 dark:bg-slate-800/20 border border-pink-100 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-extrabold text-pinkBrand-600 dark:text-pinkBrand-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Kiến thức trọng tâm bài học (Em cần nhớ)</span>
          </h4>

          <div className="space-y-2">
            {activeLesson.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Action */}
        <div className="flex items-center justify-between pt-4 border-t border-pink-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400">
            {activeLesson.isCompleted ? '✅ Đã hoàn thành bài học này' : '⏳ Chưa hoàn thành'}
          </span>

          <button
            onClick={() => {
              toggleCompleteLesson(activeLesson.id);
              if (!activeLesson.isCompleted) addXP(30, 'Hoàn thành bài học');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all shadow-sm ${
              activeLesson.isCompleted
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-pinkBrand-500 hover:bg-pinkBrand-600 text-white'
            }`}
          >
            {activeLesson.isCompleted ? 'Hủy đánh dấu' : 'Đánh dấu đã hiểu bài (+30 XP)'}
          </button>
        </div>
      </div>

      {/* Floating Mascot & Speech Bubble Cô Đỗ Mừng (Exact match to Image 3 bottom right) */}
      <div className="fixed bottom-6 right-6 z-30 flex items-end gap-3 pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Speech Bubble */}
        <div className="bg-white dark:bg-[#1A1E33] px-4 py-2.5 rounded-2xl shadow-xl border-2 border-pink-200 dark:border-pink-900 text-xs font-bold text-slate-800 dark:text-white max-w-xs relative hidden sm:block">
          <p className="leading-relaxed">
            Chào em! Cô Đỗ Mừng chúc em một ngày học tập thật vui! 🌸
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white dark:bg-[#1A1E33] border-b-2 border-r-2 border-pink-200 transform rotate-45" />
        </div>

        {/* Mascot Bot Icon */}
        <button
          onClick={playCoDoMungGreeting}
          title="Nghe lời chào từ Cô Đỗ Mừng"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-white flex items-center justify-center shadow-pink-glow hover:scale-110 active:scale-95 transition-transform border-2 border-white ring-4 ring-cyan-200/50 relative"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white animate-ping" />
        </button>
      </div>
    </div>
  );
};
