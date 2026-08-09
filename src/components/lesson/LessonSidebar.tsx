import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const LessonSidebar: React.FC = () => {
  const { topics, selectedLessonId, setSelectedLessonId } = useApp();

  const handleSelectLesson = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
  };

  return (
    <div className="w-full lg:w-80 shrink-0 space-y-4">
      {/* Sidebar Header matching Image 3 */}
      <div className="bg-white dark:bg-[#151828] p-4 rounded-3xl border border-pink-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-1">
          <ListOrdered className="w-4 h-4 text-pinkBrand-500" />
          <span>Hệ Thống Các Bài 🌸</span>
        </h3>
        <p className="text-[11px] text-slate-400">
          Toàn bộ 15 bài học chuẩn SGK Kết Nối Tri Thức
        </p>
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        {topics.map(topic => (
          <div key={topic.id} className="space-y-2">
            <div className="px-3 pt-2 text-[11px] font-bold text-pinkBrand-600 dark:text-pinkBrand-400 uppercase tracking-wider">
              {topic.title.split(':')[0]}
            </div>

            {topic.lessons.map(lesson => {
              const isSelected = lesson.id === selectedLessonId;

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-pinkBrand-50/80 dark:bg-pinkBrand-950/40 border-pinkBrand-400 text-pinkBrand-800 dark:text-pinkBrand-200 shadow-sm'
                      : 'bg-white dark:bg-[#151828] border-pink-50 dark:border-slate-800/80 hover:border-pink-200 text-slate-700 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  {/* Status Indicator Icon (Checkmark / Sync / Book) */}
                  <div className="shrink-0 mt-0.5">
                    {lesson.isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-spin">
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
