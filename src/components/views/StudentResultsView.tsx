import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  FileText, 
  Printer, 
  Sparkles, 
  Star, 
  BookOpen, 
  Calendar,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_EVALUATIONS } from '../../lib/mockData';
import { sound } from '../../lib/soundFx';

export const StudentResultsView: React.FC = () => {
  const { topics } = useApp();
  const { currentUser } = useAuth();

  // Find evaluation for current student or fallback to first student
  const currentFullName = currentUser?.full_name || '';
  const currentId = currentUser?.id || '';
  const studentEval = INITIAL_EVALUATIONS.find((e: any) => 
    (currentId && e.student_id === currentId) || 
    (currentFullName && e.student_name && (currentFullName.includes(e.student_name) || e.student_name.includes(currentFullName)))
  ) || INITIAL_EVALUATIONS[0];

  const getGradeBadge = (level: string) => {
    switch (level) {
      case 'xuat_sac':
        return { label: 'HỌC SINH XUẤT SẮC 🏆', bg: 'bg-emerald-500 text-white', border: 'border-emerald-200' };
      case 'tot':
        return { label: 'HỌC SINH TỐT ⭐', bg: 'bg-blue-500 text-white', border: 'border-blue-200' };
      case 'dat':
        return { label: 'HỌC SINH ĐẠT 🌱', bg: 'bg-amber-500 text-white', border: 'border-amber-200' };
      default:
        return { label: 'CẦN CỐ GẮNG 💪', bg: 'bg-rose-500 text-white', border: 'border-rose-200' };
    }
  };

  const badgeInfo = getGradeBadge(studentEval.grade_level);

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Certificate / Report Card Hero */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pinkBrand-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Award className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>KẾT QUẢ HỌC TẬP & ĐÁNH GIÁ TOÀN DIỆN MÔN TIN HỌC 6</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black">
            {currentUser.full_name} ({currentUser.classroom || studentEval.classroom})
          </h2>

          <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed">
            Mã học sinh: <strong>{studentEval.student_code}</strong> • Giáo viên phụ trách: <strong>Cô Đỗ Mừng</strong> • Chương trình: <strong>SGK Kết Nối Tri Thức</strong>
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${badgeInfo.bg}`}>
              {badgeInfo.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold backdrop-blur-md">
              Điểm Tổng Kết (ĐTB): <strong className="text-yellow-300 text-sm">{studentEval.final_score}/10</strong>
            </span>
          </div>
        </div>

        {/* Action Button: In Phiếu Điểm */}
        <div className="z-10 shrink-0">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-white text-blue-600 font-extrabold text-xs shadow-lg hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>In Phiếu Kết Quả Học Tập</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Core Competency Scores Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151828] border border-blue-100 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">1. Chuyên Cần & Điểm Danh</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 flex items-center gap-1.5">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>{studentEval.attendance_score} / 10</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">Chuỗi {currentUser.streak_days} ngày học liên tục</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">2. Trắc Nghiệm Lý Thuyết</span>
          <div className="text-2xl sm:text-3xl font-black text-pinkBrand-600 flex items-center gap-1.5">
            <HelpCircle className="w-6 h-6 text-pinkBrand-500" />
            <span>{studentEval.quiz_avg_score} / 10</span>
          </div>
          <p className="text-[11px] text-slate-400">Nắm vững 6 chủ đề SGK</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#151828] border border-emerald-100 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">3. Kỹ Năng Thực Hành</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 flex items-center gap-1.5">
            <Zap className="w-6 h-6 text-emerald-500" />
            <span>{studentEval.practice_score} / 10</span>
          </div>
          <p className="text-[11px] text-slate-400">Phần cứng, gõ phím & chuột</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">4. Bài Tập Về Nhà & Dự Án</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1.5">
            <FileText className="w-6 h-6 text-amber-500" />
            <span>{studentEval.assignment_score} / 10</span>
          </div>
          <p className="text-[11px] text-slate-400">Nộp bài đầy đủ đúng hạn</p>
        </div>
      </div>

      {/* 3. Lời Phê & Nhận Xét Của Cô Đỗ Mừng */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 dark:bg-slate-800/40 border-2 border-pink-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-pinkBrand-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 overflow-hidden shadow-md">
          <img src="/images/avatar_co_mung.jpg" alt="Cô Đỗ Mừng" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-pinkBrand-600 flex items-center gap-1.5">
              <span>👩‍🏫 Lời Phê & Đánh Giá Của Giáo Viên: Cô Đỗ Mừng</span>
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h4>
            <span className="text-[11px] text-slate-400 font-bold">Cập nhật: Học kỳ 1</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-pink-100 dark:border-slate-800">
            "{studentEval.teacher_remarks}"
          </p>
        </div>
      </div>

      {/* 4. Huy Hiệu & Danh Hiệu Đã Đạt Được */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Huy Hiệu & Danh Hiệu Thành Tích Đã Mở Khóa</span>
        </h4>

        <div className="flex flex-wrap gap-2.5">
          {studentEval.badges_earned.map((b: string, i: number) => (
            <div
              key={i}
              className="px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs font-black text-amber-800 dark:text-amber-300 shadow-xs flex items-center gap-1.5"
            >
              <span>{b}</span>
            </div>
          ))}
          <div className="px-4 py-2 rounded-2xl bg-pink-50 text-pinkBrand-600 border border-pink-200 text-xs font-extrabold">
            🌟 Học Sinh Chăm Ngoan Khối 6
          </div>
        </div>
      </div>

      {/* 5. Bảng Chi Tiết Điểm 6 Chủ Đề & 15 Bài Học */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Chi Tiết Điểm Từng Bài Học (6 Chủ Đề SGK)</span>
          </h4>
          <span className="text-xs font-bold text-slate-400">15 Bài học</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-extrabold pb-2">
                <th className="py-2.5 px-3">STT</th>
                <th className="py-2.5 px-3">Tên Bài Học</th>
                <th className="py-2.5 px-3">Chủ Đề</th>
                <th className="py-2.5 px-3">Trạng Thái</th>
                <th className="py-2.5 px-3 text-right">Điểm Quiz</th>
                <th className="py-2.5 px-3 text-right">Điểm Thực Hành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {topics.flatMap(t => t.lessons).map((l, index) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-400">{index + 1}</td>
                  <td className="py-3 px-3 font-bold text-slate-800 dark:text-white">{l.title}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-extrabold text-[10px]">
                      Chủ đề {l.topicCode}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đã hoàn thành
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-black text-pinkBrand-600">
                    10.0
                  </td>
                  <td className="py-3 px-3 text-right font-black text-emerald-600">
                    9.5
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
