import React from 'react';
import { 
  Check, 
  RotateCw, 
  BookOpen, 
  ListOrdered,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  FileText,
  Workflow
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

  // Color schemes for each of the 6 topics in the sidebar
  const topicSidebarStyles: Record<string, {
    headerBg: string;
    border: string;
    activeCard: string;
    inactiveCard: string;
    text: string;
    activeText: string;
    badgeBg: string;
    icon: any;
  }> = {
    'A': {
      headerBg: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      border: 'border-pink-200 hover:border-pink-400 dark:border-pink-900/50',
      activeCard: 'bg-gradient-to-r from-pink-50 via-rose-50/60 to-white dark:bg-pink-950/40 border-pink-400 shadow-sm shadow-pink-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-pink-100/90 dark:border-slate-800 hover:border-pink-300 text-slate-700 dark:text-slate-200',
      text: 'text-pink-600 dark:text-pink-400',
      activeText: 'text-pink-700 dark:text-pink-300 font-black',
      badgeBg: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
      icon: Cpu
    },
    'B': {
      headerBg: 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white',
      border: 'border-teal-200 hover:border-teal-400 dark:border-teal-900/50',
      activeCard: 'bg-gradient-to-r from-teal-50 via-emerald-50/60 to-white dark:bg-teal-950/40 border-teal-400 shadow-sm shadow-teal-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-teal-100/90 dark:border-slate-800 hover:border-teal-300 text-slate-700 dark:text-slate-200',
      text: 'text-teal-600 dark:text-teal-400',
      activeText: 'text-teal-700 dark:text-teal-300 font-black',
      badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
      icon: Globe
    },
    'C': {
      headerBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      border: 'border-blue-200 hover:border-blue-400 dark:border-blue-900/50',
      activeCard: 'bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white dark:bg-blue-950/40 border-blue-400 shadow-sm shadow-blue-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-blue-100/90 dark:border-slate-800 hover:border-blue-300 text-slate-700 dark:text-slate-200',
      text: 'text-blue-600 dark:text-blue-400',
      activeText: 'text-blue-700 dark:text-blue-300 font-black',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      icon: Search
    },
    'D': {
      headerBg: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white',
      border: 'border-purple-200 hover:border-purple-400 dark:border-purple-900/50',
      activeCard: 'bg-gradient-to-r from-purple-50 via-fuchsia-50/60 to-white dark:bg-purple-950/40 border-purple-400 shadow-sm shadow-purple-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-purple-100/90 dark:border-slate-800 hover:border-purple-300 text-slate-700 dark:text-slate-200',
      text: 'text-purple-600 dark:text-purple-400',
      activeText: 'text-purple-700 dark:text-purple-300 font-black',
      badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      icon: ShieldCheck
    },
    'E': {
      headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950',
      border: 'border-amber-200 hover:border-amber-400 dark:border-amber-900/50',
      activeCard: 'bg-gradient-to-r from-amber-50 via-orange-50/60 to-white dark:bg-amber-950/40 border-amber-400 shadow-sm shadow-amber-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-amber-100/90 dark:border-slate-800 hover:border-amber-300 text-slate-700 dark:text-slate-200',
      text: 'text-amber-600 dark:text-amber-400',
      activeText: 'text-amber-800 dark:text-amber-300 font-black',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      icon: FileText
    },
    'F': {
      headerBg: 'bg-gradient-to-r from-rose-600 to-red-600 text-white',
      border: 'border-rose-200 hover:border-rose-400 dark:border-rose-900/50',
      activeCard: 'bg-gradient-to-r from-rose-50 via-red-50/60 to-white dark:bg-rose-950/40 border-rose-400 shadow-sm shadow-rose-100 dark:shadow-none',
      inactiveCard: 'bg-white dark:bg-[#1A1E33] border-rose-100/90 dark:border-slate-800 hover:border-rose-300 text-slate-700 dark:text-slate-200',
      text: 'text-rose-600 dark:text-rose-400',
      activeText: 'text-rose-700 dark:text-rose-300 font-black',
      badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
      icon: Workflow
    }
  };

  return (
    <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-3 select-none">
      
      {/* 1. Main Header Card */}
      <div className="bg-white dark:bg-[#151828] rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-[#FF5288]" />
            <span>Hệ Thống Các Bài 🌸</span>
          </h3>
          <span className="text-[11px] font-black text-pinkBrand-600 bg-pink-50 dark:bg-pink-950/50 px-2.5 py-0.5 rounded-full border border-pink-200">
            {completedLessons}/{totalLessons} Đã học
          </span>
        </div>

        {/* List of 6 Topics with Distinct Vibrant Colors */}
        <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 no-scrollbar">
          {topics.map(topic => {
            const style = topicSidebarStyles[topic.code] || topicSidebarStyles['A'];
            const TopicIcon = style.icon;

            return (
              <div key={topic.id} className="space-y-1.5">
                
                {/* Topic Header Badge with Vibrant Color */}
                <div className={`p-2 px-3 rounded-xl ${style.headerBg} text-[11px] font-black tracking-wide flex items-center justify-between shadow-xs`}>
                  <div className="flex items-center gap-1.5 truncate">
                    <TopicIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">CHỦ ĐỀ {topic.code}: {topic.title.replace(/^CHỦ ĐỀ [A-F]:\s*/, '')}</span>
                  </div>
                  <span className="text-[10px] opacity-90 shrink-0 font-bold ml-1">{topic.lessons.length} bài</span>
                </div>

                {/* Lessons in Topic */}
                <div className="space-y-2 pt-0.5">
                  {topic.lessons.map(lesson => {
                    const isSelected = lesson.id === selectedLessonId;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson.id)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-2.5 relative ${
                          isSelected
                            ? `${style.activeCard} scale-[1.01]`
                            : style.inactiveCard
                        }`}
                      >
                        {/* Status Circle */}
                        <div className="shrink-0 mt-0.5">
                          {lesson.isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : isSelected ? (
                            <div className={`w-6 h-6 rounded-full ${style.badgeBg} flex items-center justify-center animate-spin shadow-xs`}>
                              <RotateCw className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                              {lesson.lessonNumber}
                            </div>
                          )}
                        </div>

                        {/* Title & Duration */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs leading-snug line-clamp-2 ${
                            isSelected ? style.activeText : 'font-bold text-slate-800 dark:text-white'
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

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
