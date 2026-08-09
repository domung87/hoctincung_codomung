import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered,
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  FileText,
  Workflow,
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
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleSelectLesson = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
  };

  // Color theme mapping for each of the 6 topics (A, B, C, D, E, F)
  const topicThemeMap: Record<string, {
    border: string;
    activeBorder: string;
    bgHeader: string;
    badgeBg: string;
    text: string;
    activeBg: string;
    icon: any;
    glow: string;
  }> = {
    'A': {
      border: 'border-pink-300 dark:border-pink-900/60',
      activeBorder: 'border-pink-500 shadow-pink-200 dark:shadow-pink-950/50',
      bgHeader: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white',
      badgeBg: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
      text: 'text-pink-600 dark:text-pink-400',
      activeBg: 'bg-gradient-to-r from-pink-50 via-rose-50/50 to-white dark:bg-pink-950/30',
      icon: Cpu,
      glow: 'shadow-pink-100'
    },
    'B': {
      border: 'border-emerald-300 dark:border-emerald-900/60',
      activeBorder: 'border-emerald-500 shadow-emerald-200 dark:shadow-emerald-950/50',
      bgHeader: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      text: 'text-emerald-600 dark:text-emerald-400',
      activeBg: 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:bg-emerald-950/30',
      icon: Globe,
      glow: 'shadow-emerald-100'
    },
    'C': {
      border: 'border-blue-300 dark:border-blue-900/60',
      activeBorder: 'border-blue-500 shadow-blue-200 dark:shadow-blue-950/50',
      bgHeader: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      text: 'text-blue-600 dark:text-blue-400',
      activeBg: 'bg-gradient-to-r from-blue-50 via-cyan-50/50 to-white dark:bg-blue-950/30',
      icon: Search,
      glow: 'shadow-blue-100'
    },
    'D': {
      border: 'border-purple-300 dark:border-purple-900/60',
      activeBorder: 'border-purple-500 shadow-purple-200 dark:shadow-purple-950/50',
      bgHeader: 'bg-gradient-to-r from-purple-500 to-indigo-400 text-white',
      badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      text: 'text-purple-600 dark:text-purple-400',
      activeBg: 'bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white dark:bg-purple-950/30',
      icon: ShieldCheck,
      glow: 'shadow-purple-100'
    },
    'E': {
      border: 'border-amber-300 dark:border-amber-900/60',
      activeBorder: 'border-amber-500 shadow-amber-200 dark:shadow-amber-950/50',
      bgHeader: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      text: 'text-amber-600 dark:text-amber-400',
      activeBg: 'bg-gradient-to-r from-amber-50 via-yellow-50/50 to-white dark:bg-amber-950/30',
      icon: FileText,
      glow: 'shadow-amber-100'
    },
    'F': {
      border: 'border-rose-300 dark:border-rose-900/60',
      activeBorder: 'border-rose-500 shadow-rose-200 dark:shadow-rose-950/50',
      bgHeader: 'bg-gradient-to-r from-rose-500 to-red-400 text-white',
      badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
      text: 'text-rose-600 dark:text-rose-400',
      activeBg: 'bg-gradient-to-r from-rose-50 via-red-50/50 to-white dark:bg-rose-950/30',
      icon: Workflow,
      glow: 'shadow-rose-100'
    }
  };

  return (
    <div className="w-full lg:w-84 shrink-0 space-y-4">
      
      {/* 1. Sidebar Header & Overall Progress Bar */}
      <div className="bg-white dark:bg-[#151828] p-5 rounded-3xl border-2 border-pink-300/80 dark:border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-pinkBrand-500" />
            <span>6 Chủ Đề • 17 Bài Học 🌸</span>
          </h3>
          <span className="text-xs font-black text-pinkBrand-600 bg-pink-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-pink-200">
            {completedLessons}/{totalLessons} ({progressPercent}%)
          </span>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Trọn bộ SGK Tin học 6 Kết Nối Tri Thức Với Cuộc Sống
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-pink-100 dark:border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-pinkBrand-500 via-rose-500 to-amber-400 rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. List of 6 Vibrant Topics with Distinct Colored Borders */}
      <div className="space-y-5 max-h-[calc(100vh-260px)] overflow-y-auto pr-1 no-scrollbar">
        {topics.map(topic => {
          const theme = topicThemeMap[topic.code] || topicThemeMap['A'];
          const TopicIcon = theme.icon;

          return (
            <div 
              key={topic.id} 
              className={`rounded-3xl border-2 ${theme.border} bg-white dark:bg-[#151828] shadow-sm overflow-hidden transition-all`}
            >
              {/* Vibrant Topic Header Card */}
              <div className={`p-3.5 ${theme.bgHeader} flex items-center justify-between shadow-xs`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center font-black text-xs shadow-xs">
                    <TopicIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-wider uppercase opacity-90 block">
                      CHỦ ĐỀ {topic.code}
                    </span>
                    <h4 className="text-xs font-black truncate max-w-[170px] sm:max-w-[190px]">
                      {topic.title.replace(/^CHỦ ĐỀ [A-F]:\s*/, '')}
                    </h4>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                  {topic.lessons.length} bài
                </span>
              </div>

              {/* Lessons List in This Topic */}
              <div className="p-2.5 space-y-2">
                {topic.lessons.map(lesson => {
                  const isSelected = lesson.id === selectedLessonId;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
                        isSelected
                          ? `${theme.activeBorder} ${theme.activeBg} shadow-md scale-[1.01]`
                          : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-pink-300 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {/* Left Badge / Status Icon */}
                      <div className="shrink-0 mt-0.5">
                        {lesson.isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isSelected ? (
                          <div className={`w-6 h-6 rounded-full ${theme.badgeBg} flex items-center justify-center animate-spin shadow-xs`}>
                            <RotateCw className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 text-slate-400 flex items-center justify-center font-bold text-[11px] border border-slate-200 dark:border-slate-600">
                            {lesson.lessonNumber}
                          </div>
                        )}
                      </div>

                      {/* Lesson Title & Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isSelected ? `${theme.text} font-black` : 'text-slate-800 dark:text-white'
                        }`}>
                          {lesson.title}
                        </h5>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>Bài {lesson.lessonNumber}</span>
                          <span>•</span>
                          <span>{lesson.durationMinutes} phút</span>
                          {lesson.isCompleted && (
                            <span className="text-emerald-600 font-bold ml-auto">Đã học ✅</span>
                          )}
                        </div>
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
