import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const LessonSidebar: React.FC = () => {
  const { topics, selectedLessonId, setSelectedLessonId } = useApp();

  const totalLessons = topics.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedLessons = topics.reduce(
    (acc, t) => acc + t.lessons.filter(l => l.isCompleted).length, 0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleSelectLesson = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
  };

  return (
    <div className="w-full lg:w-80 shrink-0 space-y-4">
      {/* Sidebar Header & Progress Bar */}
      <div className="bg-white dark:bg-[#151828] p-4 rounded-3xl border border-pink-100 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-pinkBrand-500" />
            <span>Hệ Thống 17 Bài Học 🌸</span>
          </h3>
          <span className="text-xs font-black text-pinkBrand-600">
            {completedLessons}/{totalLessons} ({progressPercent}%)
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          6 Chủ đề chuẩn SGK Tin học 6 Kết Nối Tri Thức
        </p>

        {/* Mini progress bar */}
        <div className="w-full h-2 bg-pink-50 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 6 Topics & 17 Lessons List */}
      <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 no-scrollbar">
        {topics.map(topic => (
          <div key={topic.id} className="space-y-2">
            <div className="px-3 pt-1 text-[11px] font-extrabold text-pinkBrand-600 dark:text-pinkBrand-400 uppercase tracking-wider flex items-center justify-between">
              <span>{topic.title.split(':')[0]}</span>
              <span className="text-[10px] text-slate-400 font-bold">{topic.lessons.length} bài</span>
            </div>

            {topic.lessons.map(lesson => {
              const isSelected = lesson.id === selectedLessonId;

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-pinkBrand-50/90 dark:bg-pinkBrand-950/40 border-pinkBrand-400 text-pinkBrand-800 dark:text-pinkBrand-200 shadow-sm'
                      : 'bg-white dark:bg-[#151828] border-pink-50 dark:border-slate-800/80 hover:border-pink-200 text-slate-700 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  {/* Status Indicator Icon (Checkmark / Sync / Book) */}
                  <div className="shrink-0 mt-0.5">
                    {lesson.isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-spin shadow-xs">
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1">
                    <h4 className="text-xs font-bold leading-snug line-clamp-2">
                      {lesson.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Chủ đề {lesson.topicCode} • {lesson.durationMinutes} phút
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
