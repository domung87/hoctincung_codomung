import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const LessonSidebar: React.FC = () => {
  const { topics, selectedLessonId, setSelectedLessonId } = useApp();

  const totalLessons = topics.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedLessons = topics.reduce(
    (acc, t) => acc + t.lessons.filter(l => l.isCompleted).length, 0
  );

  const handleSelectLesson = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
  };

  return (
    <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-3 select-none">
      
      {/* 1. Main Header Card: Hệ Thống Các Bài */}
      <div className="bg-white dark:bg-[#151828] rounded-3xl p-4 sm:p-5 border-2 border-pink-200 dark:border-slate-800 shadow-sm space-y-3">
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-[#FF5288] flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-[#FF5288]" />
            <span>Hệ Thống Các Bài 🌸</span>
          </h3>
          <span className="text-[11px] font-black text-pinkBrand-600 bg-pink-50 dark:bg-pink-950/50 px-2.5 py-0.5 rounded-full border border-pink-200">
            {completedLessons}/{totalLessons} Đã học
          </span>
        </div>

        {/* Compact List of All 17 Lessons */}
        <div className="space-y-2.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 no-scrollbar">
          {topics.map(topic => (
            <div key={topic.id} className="space-y-2">
              
              {/* Mini Topic Header */}
              <div className="pt-2 px-1 text-[10px] font-black text-pinkBrand-500 uppercase tracking-wider flex items-center justify-between border-t border-pink-100/80 dark:border-slate-800">
                <span>CHỦ ĐỀ {topic.code}: {topic.title.replace(/^CHỦ ĐỀ [A-F]:\s*/, '')}</span>
                <span className="text-slate-400">{topic.lessons.length} bài</span>
              </div>

              {/* Lesson Items matching screenshot */}
              {topic.lessons.map(lesson => {
                const isSelected = lesson.id === selectedLessonId;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-pink-50/90 dark:bg-pink-950/40 border-pink-400 text-pink-900 dark:text-pink-100 shadow-xs scale-[1.01]'
                        : 'bg-white dark:bg-[#1A1E33] border-pink-100 dark:border-slate-800 hover:border-pink-300 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {/* Status Circle Icon */}
                    <div className="shrink-0 mt-0.5">
                      {lesson.isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center animate-spin shadow-xs">
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                          {lesson.lessonNumber}
                        </div>
                      )}
                    </div>

                    {/* Lesson Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs leading-snug line-clamp-2 ${
                        isSelected ? 'font-black text-[#FF5288] dark:text-pink-400' : 'font-bold text-slate-800 dark:text-white'
                      }`}>
                        {lesson.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                        Chủ đề {lesson.topicCode} • {lesson.durationMinutes} phút
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
