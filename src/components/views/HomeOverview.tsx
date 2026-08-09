import React from 'react';
import { 
  BookOpen, 
  Cpu, 
  Globe, 
  ShieldAlert, 
  FileText, 
  Code, 
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const HomeOverview: React.FC = () => {
  const { topics, setSelectedLessonId, setActiveTab } = useApp();

  const getTopicIcon = (code: string) => {
    switch (code) {
      case 'A': return Cpu;
      case 'B': return Globe;
      case 'C': return ShieldAlert;
      case 'D': return BookOpen;
      case 'E': return FileText;
      case 'F': return Code;
      default: return Sparkles;
    }
  };

  const handleStartTopic = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
    setActiveTab('lessons');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Intro Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-500 via-pinkBrand-500 to-rose-400 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            <span>MÔN HỌC TIN HỌC LỚP 6</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            6 Chủ Đề Lớn - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống
          </h2>
          <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed">
            Chương trình Tin học lớp 6 trang bị cho các em kiến thức nền tảng về thế giới công nghệ, kỹ năng tin học ứng dụng và phát triển tư duy logic giải quyết vấn đề.
          </p>
        </div>

        <button
          onClick={() => handleStartTopic('lesson-1')}
          className="px-6 py-3 rounded-full bg-white text-pinkBrand-600 hover:bg-pink-50 font-extrabold text-xs shadow-lg flex items-center gap-2 shrink-0 hover:scale-105 transition-all"
        >
          <span>Vào Học Bài 1 Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map(topic => {
          const IconComp = getTopicIcon(topic.code);

          return (
            <div
              key={topic.id}
              onClick={() => handleStartTopic(topic.lessons[0]?.id || 'lesson-1')}
              className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm hover:shadow-md card-pastel-hover cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-slate-800 text-pinkBrand-500 flex items-center justify-center shadow-sm">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t border-pink-50 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-pinkBrand-600 dark:text-pinkBrand-400">
                <span>{topic.lessons.length} Bài học</span>
                <span className="flex items-center gap-1">
                  <span>Học ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
