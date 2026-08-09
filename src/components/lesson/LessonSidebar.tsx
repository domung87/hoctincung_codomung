import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered,
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

  // Border styles for each of the 6 topics
  const getTopicStyle = (code: string) => {
    switch (code) {
      case 'A':
        return {
          headerBg: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white',
          borderActive: 'border-[#FF5288] bg-pink-50/90 dark:bg-pink-950/40 shadow-md shadow-pink-200/50',
          borderDefault: 'border-pink-200 hover:border-pink-400'
        };
      case 'B':
        return {
          headerBg: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
          borderActive: 'border-[#0084FF] bg-blue-50/90 dark:bg-blue-950/40 shadow-md shadow-blue-200/50',
          borderDefault: 'border-blue-200 hover:border-blue-400'
        };
      case 'C':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white',
          borderActive: 'border-[#10B981] bg-emerald-50/90 dark:bg-emerald-950/40 shadow-md shadow-emerald-200/50',
          borderDefault: 'border-emerald-200 hover:border-emerald-400'
        };
      case 'D':
        return {
          headerBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white',
          borderActive: 'border-[#F59E0B] bg-amber-50/90 dark:bg-amber-950/40 shadow-md shadow-amber-200/50',
          borderDefault: 'border-amber-200 hover:border-amber-400'
        };
      case 'E':
        return {
          headerBg: 'bg-gradient-to-r from-purple-500 to-indigo-400 text-white',
          borderActive: 'border-[#8B5CF6] bg-purple-50/90 dark:bg-purple-950/40 shadow-md shadow-purple-200/50',
          borderDefault: 'border-purple-200 hover:border-purple-400'
        };
      default:
        return {
          headerBg: 'bg-gradient-to-r from-rose-500 to-orange-400 text-white',
          borderActive: 'border-[#FF6E4A] bg-orange-50/90 dark:bg-orange-950/40 shadow-md shadow-orange-200/50',
          borderDefault: 'border-orange-200 hover:border-orange-400'
        };
    }
  };

  return (
    <div className="w-full lg:w-84 shrink-0 space-y-4">
      {/* Sidebar Header with Pink-Orange Gradient Border */}
      <div className="bg-white dark:bg-[#151828] p-4.5 rounded-3xl border-2 border-gradient-pink-orange shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-[#FF5288]" />
            <span>Hệ Thống 17 Bài Học 🌸</span>
          </h3>
          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF5288] to-[#FF7A59] text-white shadow-xs">
            {completedLessons}/{totalLessons} ({progressPercent}%)
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-semibold">
          6 Chủ đề SGK Tin 6 Kết Nối Tri Thức với viền màu sinh động
        </p>

        {/* Pink-Orange Progress Bar */}
        <div className="w-full h-2.5 bg-pink-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-[#FF5288] via-[#FF7A59] to-[#FFA048] rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 6 Topics with distinct colorful borders */}
      <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1.5 no-scrollbar">
        {topics.map(topic => {
          const style = getTopicStyle(topic.code);

          return (
            <div 
              key={topic.id} 
              className="p-2.5 rounded-3xl bg-white dark:bg-[#151828] border-2 shadow-xs space-y-2"
              style={{ borderColor: topic.code === 'A' ? '#FF5288' : topic.code === 'B' ? '#0084FF' : topic.code === 'C' ? '#10B981' : topic.code === 'D' ? '#F59E0B' : topic.code === 'E' ? '#8B5CF6' : '#FF6E4A' }}
            >
              {/* Topic Header Badge with colorful background */}
              <div className={`px-3 py-1.5 rounded-2xl ${style.headerBg} text-[11px] font-black uppercase tracking-wider flex items-center justify-between shadow-xs`}>
                <span>{topic.title.split(':')[0]}</span>
                <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-extrabold">{topic.lessons.length} bài</span>
              </div>

              {/* Lesson Items */}
              <div className="space-y-2">
                {topic.lessons.map(lesson => {
                  const isSelected = lesson.id === selectedLessonId;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-2.5 card-3d-hover ${
                        isSelected
                          ? style.borderActive
                          : `bg-slate-50/60 dark:bg-slate-800/40 ${style.borderDefault} text-slate-700 dark:text-slate-200`
                      }`}
                    >
                      {/* Status Icon Indicator */}
                      <div className="shrink-0 mt-0.5">
                        {lesson.isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-[#FF5288] text-white flex items-center justify-center animate-spin shadow-xs">
                            <RotateCw className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Title & Duration */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-black leading-snug line-clamp-2 ${
                          isSelected ? 'text-[#FF5288] dark:text-[#FF7A59]' : 'text-slate-800 dark:text-slate-100'
                        }`}>
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-bold mt-0.5 block">
                          Chủ đề {lesson.topicCode} • {lesson.durationMinutes} phút
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
