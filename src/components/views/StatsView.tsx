import React from 'react';
import { 
  BarChart3, 
  Trophy, 
  CheckCircle2, 
  Award, 
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const StatsView: React.FC = () => {
  const { topics, submissions } = useApp();
  const { currentUser } = useAuth();

  const totalLessons = topics.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedLessons = topics.reduce(
    (acc, t) => acc + t.lessons.filter(l => l.isCompleted).length, 0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400">Tiến độ 15 Bài học Tin 6</span>
          <div className="text-2xl font-extrabold text-pinkBrand-600">
            {completedLessons} / {totalLessons} Bài ({progressPercent}%)
          </div>
          <div className="w-full h-2.5 bg-pink-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-pinkBrand-500 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400">Điểm kinh nghiệm (XP) & Cấp độ</span>
          <div className="text-2xl font-extrabold text-amber-500 flex items-center gap-2">
            <Award className="w-6 h-6" />
            <span>Level {currentUser.level} ({currentUser.xp} XP)</span>
          </div>
          <p className="text-[11px] text-slate-400">Càng làm nhiều bài tập và quiz, cấp độ càng cao!</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400">Chuỗi học tập liên tục</span>
          <div className="text-2xl font-extrabold text-pinkBrand-600 flex items-center gap-2">
            <Flame className="w-6 h-6 fill-pinkBrand-500" />
            <span>{currentUser.streak_days} Ngày liên tiếp</span>
          </div>
          <p className="text-[11px] text-emerald-500 font-bold">Duy trì thói quen học tập rất tốt!</p>
        </div>
      </div>

      {/* Classroom Leaderboard */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Bảng Vàng Học Sinh Tiêu Biểu Khối 6</span>
        </h3>

        <div className="space-y-3">
          {[
            { name: 'Nguyễn Gia Bảo (Lớp 6A1)', score: '980 XP', badge: '🥇 Top 1' },
            { name: 'Trần Minh Ánh (Lớp 6A2)', score: '940 XP', badge: '🥈 Top 2' },
            { name: 'Lê Hoàng Nam (Lớp 6A1)', score: '890 XP', badge: '🥉 Top 3' },
            { name: 'Phạm Thu Thảo (Lớp 6A3)', score: '820 XP', badge: 'Top 4' }
          ].map((st, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-pink-50/40 dark:bg-slate-800/40 border border-pink-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-slate-400">{i + 1}</span>
                <span className="text-slate-800 dark:text-white">{st.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-pinkBrand-600">{st.score}</span>
                <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 text-[11px] shadow-sm">{st.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
