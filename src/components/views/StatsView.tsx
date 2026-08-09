import React, { useState } from 'react';
import { 
  Trophy, 
  FileText, 
  Users, 
  Award, 
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { StudentResultsView } from './StudentResultsView';
import { TeacherEvaluationDashboard } from './TeacherEvaluationDashboard';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const StatsView: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Default tab: if teacher -> teacher_dashboard, if student -> my_results
  const [subTab, setSubTab] = useState<'my_results' | 'teacher_dashboard' | 'leaderboard'>(
    currentUser.role === 'teacher' ? 'teacher_dashboard' : 'my_results'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white dark:bg-[#151828] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              sound.click();
              setSubTab('my_results');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              subTab === 'my_results'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Kết Quả Của Em (Phiếu Điểm)</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setSubTab('teacher_dashboard');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              subTab === 'teacher_dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Bảng Theo Dõi & Đánh Giá Xếp Loại (GV)</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setSubTab('leaderboard');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              subTab === 'leaderboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Bảng Vàng Thi Đua</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 text-xs font-bold text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Tin Học 6 • Kết Nối Tri Thức</span>
        </div>
      </div>

      {/* Render Active View */}
      {subTab === 'my_results' && <StudentResultsView />}
      
      {subTab === 'teacher_dashboard' && <TeacherEvaluationDashboard />}

      {subTab === 'leaderboard' && (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400 fill-amber-400" />
                <span>Bảng Vàng Học Sinh Tiêu Biểu Khối 6</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Xếp hạng dựa trên Điểm Tổng Kết (ĐTB) và Điểm Kinh Nghiệm (XP)</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-xs">
              Học Kỳ 1
            </span>
          </div>

          <div className="space-y-3">
            {[
              { rank: 1, name: 'Nguyễn Gia Bảo', class: 'Lớp 6A1', score: '9.8 ĐTB', xp: '980 XP', badge: '🥇 Thủ Khoa Khối 6' },
              { rank: 2, name: 'Đặng Mai Linh', class: 'Lớp 6A2', score: '9.6 ĐTB', xp: '960 XP', badge: '🥈 Á Khoa 1' },
              { rank: 3, name: 'Trần Minh Ánh', class: 'Lớp 6A1', score: '9.4 ĐTB', xp: '940 XP', badge: '🥉 Á Khoa 2' },
              { rank: 4, name: 'Lê Hoàng Nam', class: 'Lớp 6A1', score: '8.8 ĐTB', xp: '890 XP', badge: 'Top 4' },
              { rank: 5, name: 'Phạm Thu Thảo', class: 'Lớp 6A1', score: '8.7 ĐTB', xp: '860 XP', badge: 'Top 5' }
            ].map((st) => (
              <div
                key={st.rank}
                className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-pink-50/50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    st.rank === 1 ? 'bg-amber-400 text-white shadow-md' :
                    st.rank === 2 ? 'bg-slate-300 text-slate-700' :
                    st.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {st.rank}
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-800 dark:text-white text-sm">{st.name}</span>
                    <span className="text-slate-400 text-[11px] block">{st.class}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-blue-600 font-black text-sm">{st.score}</span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-amber-600 font-extrabold text-[11px] shadow-xs border border-slate-100">
                    {st.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
