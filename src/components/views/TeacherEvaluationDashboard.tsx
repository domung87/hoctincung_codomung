import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Edit3, 
  Award, 
  CheckCircle2, 
  Save, 
  X, 
  Gift, 
  Flame, 
  FileSpreadsheet,
  Star,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentEvaluation, GradeLevel } from '../../types';
import { INITIAL_EVALUATIONS } from '../../lib/mockData';
import { sound } from '../../lib/soundFx';

export const TeacherEvaluationDashboard: React.FC = () => {
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>(() => {
    const saved = localStorage.getItem('tinhoc6_evaluations');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATIONS;
  });

  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal Edit Student Evaluation state
  const [editingStudent, setEditingStudent] = useState<StudentEvaluation | null>(null);

  const saveEvaluations = (updated: StudentEvaluation[]) => {
    setEvaluations(updated);
    localStorage.setItem('tinhoc6_evaluations', JSON.stringify(updated));
  };

  // Filter students by class and search
  const filteredStudents = evaluations.filter(st => {
    const matchClass = selectedClass === 'all' || st.classroom === selectedClass;
    const matchSearch = st.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        st.student_code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });

  // Calculate statistics
  const totalCount = filteredStudents.length;
  const countXuatSac = filteredStudents.filter(s => s.grade_level === 'xuat_sac').length;
  const countTot = filteredStudents.filter(s => s.grade_level === 'tot').length;
  const countDat = filteredStudents.filter(s => s.grade_level === 'dat').length;
  const countChuaDat = filteredStudents.filter(s => s.grade_level === 'chua_dat').length;

  const avgClassScore = totalCount > 0 
    ? (filteredStudents.reduce((sum, s) => sum + s.final_score, 0) / totalCount).toFixed(1)
    : '0.0';

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    sound.correct();

    // Recalculate ĐTB
    const finalScore = parseFloat((
      (editingStudent.attendance_score * 0.1) +
      (editingStudent.quiz_avg_score * 0.3) +
      (editingStudent.practice_score * 0.3) +
      (editingStudent.assignment_score * 0.3)
    ).toFixed(1));

    let gradeLevel: GradeLevel = 'dat';
    if (finalScore >= 9.0) gradeLevel = 'xuat_sac';
    else if (finalScore >= 8.0) gradeLevel = 'tot';
    else if (finalScore >= 5.0) gradeLevel = 'dat';
    else gradeLevel = 'chua_dat';

    const updated = evaluations.map(st => st.id === editingStudent.id ? {
      ...editingStudent,
      final_score: finalScore,
      grade_level: gradeLevel,
      updated_at: new Date().toISOString()
    } : st);

    saveEvaluations(updated);
    setEditingStudent(null);
    confetti({ particleCount: 60, spread: 60 });
    alert(`Đã lưu kết quả đánh giá cho học sinh "${editingStudent.student_name}"! 🌸`);
  };

  const handleExportCSV = () => {
    sound.click();
    const headers = ['STT', 'Mã HS', 'Họ và Tên', 'Lớp', 'Điểm Chuyên Cần', 'Điểm Quiz', 'Điểm Thực Hành', 'Điểm Bài Tập', 'ĐTB', 'Xếp Loại', 'Lời Nhận Xét'];
    const rows = filteredStudents.map((st, i) => [
      i + 1,
      st.student_code,
      `"${st.student_name}"`,
      st.classroom,
      st.attendance_score,
      st.quiz_avg_score,
      st.practice_score,
      st.assignment_score,
      st.final_score,
      st.grade_level === 'xuat_sac' ? 'Xuất Sắc' : st.grade_level === 'tot' ? 'Tốt' : st.grade_level === 'dat' ? 'Đạt' : 'Chưa Đạt',
      `"${st.teacher_remarks}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bang_Danh_Gia_Xep_Loai_Tin6_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGradeBadge = (level: GradeLevel) => {
    switch (level) {
      case 'xuat_sac':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">Xuất Sắc 🏆</span>;
      case 'tot':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[10px]">Tốt ⭐</span>;
      case 'dat':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">Đạt 🌱</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[10px]">Chưa Đạt</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Hero for Teacher Evaluation Board */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Award className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>DÀNH RIÊNG CHO GIÁO VIÊN: CÔ ĐỖ MỪNG 💖</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Bảng Điều Khiển Theo Dõi & Đánh Giá Xếp Loại Học Sinh</h2>
          <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed">
            Hệ thống quản lý điểm số, đánh giá năng lực theo chuẩn Thông tư 22/TT-BGDĐT và nhận xét quá trình học tập môn Tin học khối 6.
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 rounded-full bg-white text-blue-700 font-extrabold text-xs shadow-md hover:bg-blue-50 transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất File Excel (.csv)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-full bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* 2. Statistical KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400">Tổng Số Học Sinh</span>
          <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">{totalCount} Em</div>
        </div>

        <div className="p-4 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">🏆 Loại Xuất Sắc</span>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
            {countXuatSac} ({totalCount > 0 ? Math.round((countXuatSac / totalCount) * 100) : 0}%)
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800 shadow-sm">
          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">⭐ Loại Tốt</span>
          <div className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1">
            {countTot} ({totalCount > 0 ? Math.round((countTot / totalCount) * 100) : 0}%)
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800 shadow-sm">
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">🌱 Loại Đạt</span>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
            {countDat} ({totalCount > 0 ? Math.round((countDat / totalCount) * 100) : 0}%)
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400">Điểm Trung Bình (ĐTB)</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{avgClassScore} / 10</div>
        </div>
      </div>

      {/* 3. Class Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Class Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          <span className="text-xs font-extrabold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Lớp:
          </span>
          {['all', '6A1', '6A2', '6A3', '6A4'].map(cls => (
            <button
              key={cls}
              onClick={() => {
                sound.click();
                setSelectedClass(cls);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                selectedClass === cls
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50'
              }`}
            >
              {cls === 'all' ? 'Tất cả các lớp' : `Lớp ${cls}`}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên hoặc mã học sinh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Main Students Evaluation Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Danh Sách Học Sinh & Kết Quả Đánh Giá ({filteredStudents.length} học sinh)</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">Chuẩn Thông tư 22/2021/TT-BGDĐT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-black">
                <th className="py-3 px-3">STT</th>
                <th className="py-3 px-3">Mã HS</th>
                <th className="py-3 px-3">Họ và Tên</th>
                <th className="py-3 px-3">Lớp</th>
                <th className="py-3 px-3 text-center">Chuyên Cần</th>
                <th className="py-3 px-3 text-center">Quiz TB</th>
                <th className="py-3 px-3 text-center">Thực Hành</th>
                <th className="py-3 px-3 text-center">Bài Tập</th>
                <th className="py-3 px-3 text-center">ĐTB</th>
                <th className="py-3 px-3 text-center">Xếp Loại</th>
                <th className="py-3 px-3">Lời Nhận Xét</th>
                <th className="py-3 px-3 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {filteredStudents.map((st, i) => (
                <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-400">{i + 1}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-500">{st.student_code}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={st.avatar_url} alt="" className="w-7 h-7 rounded-full bg-slate-100 shrink-0" />
                      <span className="font-extrabold text-slate-800 dark:text-white">{st.student_name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                      {st.classroom}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700 dark:text-slate-300">{st.attendance_score}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700 dark:text-slate-300">{st.quiz_avg_score}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700 dark:text-slate-300">{st.practice_score}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700 dark:text-slate-300">{st.assignment_score}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-black text-blue-600 text-sm">{st.final_score}</span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {getGradeBadge(st.grade_level)}
                  </td>
                  <td className="py-3.5 px-3 max-w-[200px] truncate text-slate-500 dark:text-slate-400 text-[11px]" title={st.teacher_remarks}>
                    {st.teacher_remarks}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => {
                        sound.click();
                        setEditingStudent(st);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-extrabold text-[11px] inline-flex items-center gap-1 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Đánh giá</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL EDIT EVALUATION & TEACHER REMARKS */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151828] w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-blue-100 dark:border-slate-800 relative">
            <button
              onClick={() => setEditingStudent(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg">
                ĐÁNH GIÁ HỌC SINH MÔN TIN HỌC 6
              </span>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white mt-1">
                {editingStudent.student_name} ({editingStudent.classroom})
              </h3>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Điểm Chuyên cần (Hệ số 1):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={editingStudent.attendance_score}
                    onChange={(e) => setEditingStudent({ ...editingStudent, attendance_score: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Điểm Trắc nghiệm (Hệ số 3):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={editingStudent.quiz_avg_score}
                    onChange={(e) => setEditingStudent({ ...editingStudent, quiz_avg_score: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Điểm Thực hành (Hệ số 3):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={editingStudent.practice_score}
                    onChange={(e) => setEditingStudent({ ...editingStudent, practice_score: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Điểm Bài tập về nhà (Hệ số 3):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={editingStudent.assignment_score}
                    onChange={(e) => setEditingStudent({ ...editingStudent, assignment_score: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  👩‍🏫 Lời nhận xét & đánh giá của Cô Đỗ Mừng:
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingStudent.teacher_remarks}
                  onChange={(e) => setEditingStudent({ ...editingStudent, teacher_remarks: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Đánh Giá</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
