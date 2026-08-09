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

  const getTopicBorderColor = (code: string) => {
    switch (code) {
      case 'A': return 'border-[#FF5288] bg-pink-50/40 hover:shadow-pink-200/60';
      case 'B': return 'border-[#0084FF] bg-blue-50/40 hover:shadow-blue-200/60';
      case 'C': return 'border-[#10B981] bg-emerald-50/40 hover:shadow-emerald-200/60';
      case 'D': return 'border-[#F59E0B] bg-amber-50/40 hover:shadow-amber-200/60';
      case 'E': return 'border-[#8B5CF6] bg-purple-50/40 hover:shadow-purple-200/60';
      default: return 'border-[#FF6E4A] bg-orange-50/40 hover:shadow-orange-200/60';
    }
  };

  const handleStartTopic = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
    setActiveTab('lessons');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Intro Card with Vibrant Pink-Orange Gradient */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FF5288] via-[#FF6E4A] to-[#FFA048] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-2 border-white/30">
        <div className="space-y-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Heart className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            <span>MÔN HỌC TIN HỌC LỚP 6 🌸</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            6 Chủ Đề Lớn & 17 Bài Học - SGK Kết Nối Tri Thức Với Cuộc Sống
          </h2>
          <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed font-medium">
            Chương trình Tin học lớp 6 trang bị cho các em kiến thức nền tảng về thế giới công nghệ, kỹ năng tin học ứng dụng và rèn luyện tư duy thuật toán giải quyết vấn đề.
          </p>
        </div>

        <button
          onClick={() => handleStartTopic('lesson-1')}
          className="px-6 py-3.5 rounded-full bg-white text-[#FF5288] hover:bg-pink-50 font-black text-xs shadow-2xl flex items-center gap-2 shrink-0 hover:scale-105 transition-all z-10 border-2 border-pink-200"
        >
          <span>Vào Học Bài 1 Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Topics Grid with Colorful Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => {
          const IconComp = getTopicIcon(topic.code);
          const borderStyle = getTopicBorderColor(topic.code);

          return (
            <div
              key={topic.id}
              onClick={() => handleStartTopic(topic.lessons[0]?.id || 'lesson-1')}
              className={`p-6 rounded-3xl bg-white dark:bg-[#151828] border-3 ${borderStyle} shadow-md hover:shadow-2xl card-3d-hover cursor-pointer space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-3.5">
                <div className="w-13 h-13 rounded-2xl bg-white dark:bg-slate-800 p-2 text-[#FF5288] flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <IconComp className="w-7 h-7" />
                </div>

                <h3 className="text-base font-black text-slate-800 dark:text-white leading-snug">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-black text-[#FF5288]">
                <span>{topic.lessons.length} Bài học</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-pink-200 shadow-xs">
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
