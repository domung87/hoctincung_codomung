import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  MousePointer, 
  Clock, 
  BookOpen, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Award,
  Crown,
  Check,
  Zap,
  Target,
  Video,
  Cpu,
  Globe,
  Search,
  ShieldCheck,
  FileText,
  Workflow,
  GraduationCap,
  Layers,
  ArrowRight,
  FileDown,
  ExternalLink,
  Send,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle as QuestionMark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const LessonContent: React.FC = () => {
  const { 
    topics, 
    activeLesson, 
    selectedLessonId,
    setSelectedLessonId,
    setActiveTab,
    setIsPracticeModalOpen, 
    setIsQuizModalOpen,
    toggleCompleteLesson,
    questions,
    assignments,
    submitAssignment
  } = useApp();
  
  const { addXP, addCoins, currentUser } = useAuth();
  const [selectedCompIndex, setSelectedCompIndex] = useState<number>(0);

  // In-lesson interactive quiz state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Quick homework submission input
  const [homeworkText, setHomeworkText] = useState<string>('');
  const [isHomeworkSubmitted, setIsHomeworkSubmitted] = useState<boolean>(false);

  // Flatten all 17 lessons for navigation
  const allLessons = topics.flatMap(t => t.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Find question matching the active lesson
  const currentQuestion = questions.find(q => q.lesson_id === activeLesson.id) || questions[0];

  // Find assignment matching the active lesson
  const currentAssignment = assignments.find(a => a.lesson_id === activeLesson.id);

  // 6 Distinct Vibrant & Professional Topic Themes
  const topicThemeStyles: Record<string, {
    name: string;
    icon: any;
    headerBadge: string;
    mainBorder: string;
    bgContainer: string;
    centerIconBox: string;
    textColor: string;
    titleColor: string;
    cardBg: string;
    cardBorder: string;
    numBadge: string;
    buttonPrimary: string;
    buttonSecondary: string;
    tabActive: string;
  }> = {
    'A': {
      name: 'Máy tính và cộng đồng',
      icon: Cpu,
      headerBadge: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200',
      mainBorder: 'border-pink-300 dark:border-pink-900/60',
      bgContainer: 'bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-white dark:from-pink-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-pink-100 to-rose-100 text-pink-600 border-pink-300 shadow-pink-100',
      textColor: 'text-pink-600 dark:text-pink-400',
      titleColor: 'text-pink-600 dark:text-pink-400',
      cardBg: 'bg-pink-50/60 dark:bg-pink-950/30',
      cardBorder: 'border-pink-200 dark:border-pink-900/50',
      numBadge: 'bg-pink-500 text-white shadow-pink-200',
      buttonPrimary: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-200',
      buttonSecondary: 'border-pink-300 hover:border-pink-500 text-pink-700 dark:text-pink-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-pink-500 border-pink-600 text-white shadow-md'
    },
    'B': {
      name: 'Mạng máy tính và Internet',
      icon: Globe,
      headerBadge: 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-teal-200',
      mainBorder: 'border-teal-300 dark:border-teal-900/60',
      bgContainer: 'bg-gradient-to-br from-teal-50/50 via-emerald-50/30 to-white dark:from-teal-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-teal-100 to-emerald-100 text-teal-600 border-teal-300 shadow-teal-100',
      textColor: 'text-teal-600 dark:text-teal-400',
      titleColor: 'text-teal-700 dark:text-teal-300',
      cardBg: 'bg-teal-50/60 dark:bg-teal-950/30',
      cardBorder: 'border-teal-200 dark:border-teal-900/50',
      numBadge: 'bg-teal-600 text-white shadow-teal-200',
      buttonPrimary: 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-teal-200',
      buttonSecondary: 'border-teal-300 hover:border-teal-500 text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-teal-600 border-teal-700 text-white shadow-md'
    },
    'C': {
      name: 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
      icon: Search,
      headerBadge: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-200',
      mainBorder: 'border-blue-300 dark:border-blue-900/60',
      bgContainer: 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-600 border-blue-300 shadow-blue-100',
      textColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-700 dark:text-blue-300',
      cardBg: 'bg-blue-50/60 dark:bg-blue-950/30',
      cardBorder: 'border-blue-200 dark:border-blue-900/50',
      numBadge: 'bg-blue-600 text-white shadow-blue-200',
      buttonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200',
      buttonSecondary: 'border-blue-300 hover:border-blue-500 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-blue-600 border-blue-700 text-white shadow-md'
    },
    'D': {
      name: 'Đạo đức, pháp luật và văn hóa trong môi trường số',
      icon: ShieldCheck,
      headerBadge: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-200',
      mainBorder: 'border-purple-300 dark:border-purple-900/60',
      bgContainer: 'bg-gradient-to-br from-purple-50/50 via-fuchsia-50/30 to-white dark:from-purple-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-purple-100 to-fuchsia-100 text-purple-600 border-purple-300 shadow-purple-100',
      textColor: 'text-purple-600 dark:text-purple-400',
      titleColor: 'text-purple-700 dark:text-purple-300',
      cardBg: 'bg-purple-50/60 dark:bg-purple-950/30',
      cardBorder: 'border-purple-200 dark:border-purple-900/50',
      numBadge: 'bg-purple-600 text-white shadow-purple-200',
      buttonPrimary: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-purple-200',
      buttonSecondary: 'border-purple-300 hover:border-purple-500 text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-purple-600 border-purple-700 text-white shadow-md'
    },
    'E': {
      name: 'Ứng dụng tin học',
      icon: FileText,
      headerBadge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-200',
      mainBorder: 'border-amber-300 dark:border-amber-900/60',
      bgContainer: 'bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-amber-100 to-orange-100 text-amber-700 border-amber-300 shadow-amber-100',
      textColor: 'text-amber-600 dark:text-amber-400',
      titleColor: 'text-amber-800 dark:text-amber-300',
      cardBg: 'bg-amber-50/60 dark:bg-amber-950/30',
      cardBorder: 'border-amber-200 dark:border-amber-900/50',
      numBadge: 'bg-amber-500 text-slate-950 font-black shadow-amber-200',
      buttonPrimary: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black shadow-amber-200',
      buttonSecondary: 'border-amber-300 hover:border-amber-500 text-amber-800 dark:text-amber-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-md'
    },
    'F': {
      name: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
      icon: Workflow,
      headerBadge: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-rose-200',
      mainBorder: 'border-rose-300 dark:border-rose-900/60',
      bgContainer: 'bg-gradient-to-br from-rose-50/50 via-red-50/30 to-white dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-900',
      centerIconBox: 'bg-gradient-to-tr from-rose-100 to-red-100 text-rose-600 border-rose-300 shadow-rose-100',
      textColor: 'text-rose-600 dark:text-rose-400',
      titleColor: 'text-rose-700 dark:text-rose-300',
      cardBg: 'bg-rose-50/60 dark:bg-rose-950/30',
      cardBorder: 'border-rose-200 dark:border-rose-900/50',
      numBadge: 'bg-rose-600 text-white shadow-rose-200',
      buttonPrimary: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-rose-200',
      buttonSecondary: 'border-rose-300 hover:border-rose-500 text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-800',
      tabActive: 'bg-rose-600 border-rose-700 text-white shadow-md'
    }
  };

  const currentTheme = topicThemeStyles[activeLesson.topicCode] || topicThemeStyles['A'];
  const CenterIcon = currentTheme.icon;

  // Handle Mark Complete
  const handleConfirmComplete = () => {
    sound.victory();
    toggleCompleteLesson(activeLesson.id);
    addXP(50, `Hoàn thành ${activeLesson.title}`);
    addCoins(20);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    alert(`🎉 Chúc mừng em đã hoàn thành "${activeLesson.title}"! (+50 XP, +20 Coins) 🌸`);
  };

  const handleGoToPractice = () => {
    sound.click();
    setIsPracticeModalOpen(true);
  };

  const handleGoToGame = () => {
    sound.click();
    setIsQuizModalOpen(true);
  };

  const handleGoToVideo = () => {
    sound.click();
    setActiveTab('library');
  };

  const handleNavigate = (lessonId: string) => {
    sound.click();
    setSelectedLessonId(lessonId);
    setSelectedCompIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setHomeworkText('');
    setIsHomeworkSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit in-lesson quiz question
  const handleCheckQuizAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correct_answer) {
      sound.correct();
      addXP(20, 'Trả lời đúng câu hỏi bài học');
      addCoins(10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    } else {
      sound.wrong();
    }
  };

  // Submit quick in-lesson homework
  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkText.trim()) return;

    if (currentAssignment) {
      submitAssignment(
        currentAssignment.id,
        homeworkText,
        currentUser?.id || 'student-1',
        currentUser?.full_name || 'Em Học Sinh',
        currentUser?.avatar_url || '/images/student_boy.jpg'
      );
    }
    setIsHomeworkSubmitted(true);
    addXP(30, 'Nộp bài tập vận dụng');
    addCoins(15);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    alert('🎉 Em đã gửi bài làm thành công tới Cô Đỗ Mừng! Cô sẽ sớm chấm và nhận xét nhé! 💖');
  };

  return (
    <div className="flex-1 w-full space-y-4">
      
      {/* 1. TOP HEADER & ACTION BUTTONS WITH TOPIC COLOR */}
      <div className={`rounded-3xl p-5 sm:p-6 border-2 ${currentTheme.mainBorder} ${currentTheme.bgContainer} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300`}>
        
        {/* Left Side: Topic & Lesson Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5 shadow-xs ${currentTheme.headerBadge}`}>
              <CenterIcon className="w-3.5 h-3.5" />
              <span>CHỦ ĐỀ {activeLesson.topicCode}: {currentTheme.name}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {activeLesson.title}
          </h1>
        </div>

        {/* Right Side: Action Buttons matching the Topic color */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Button 1: Vào Luyện Tập */}
          <button
            onClick={handleGoToPractice}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-xs ${currentTheme.buttonSecondary}`}
          >
            <MousePointer className="w-4 h-4" />
            <span>Vào Luyện Tập</span>
          </button>

          {/* Button 2: Làm Trắc Nghiệm */}
          <button
            onClick={handleGoToGame}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md ${currentTheme.buttonPrimary}`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Làm Trắc Nghiệm</span>
          </button>

          {/* Button 3: Đọc SGK PDF Gốc */}
          <a
            href="https://thanhtri.hanoi.shieldix.app/data/doc/2025/thcslienninh/2025_3/9/sach-giao-khoa-tin-hoc-6-ket-noi-tri-thuc-voi-cuoc-song_93202518.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 sm:py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all border border-emerald-200"
            title="Đọc toàn bộ file PDF Sách Giáo Khoa Tin Học 6 Kết Nối Tri Thức gốc"
          >
            <FileDown className="w-4 h-4 text-emerald-600" />
            <span>Đọc SGK PDF</span>
            <ExternalLink className="w-3 h-3 text-emerald-500" />
          </a>
        </div>

      </div>

      {/* 2. MAIN WIDE CONTENT CARD WITH DYNAMIC THEME */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 ${currentTheme.mainBorder} ${currentTheme.bgContainer} shadow-sm space-y-8 relative overflow-hidden transition-all duration-300`}>
        
        {/* Center Topic Illustration Icon */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl border-2 flex items-center justify-center shadow-md animate-pulse ${currentTheme.centerIconBox}`}>
            <CenterIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1 max-w-2xl">
            <h3 className={`text-base sm:text-lg font-black ${currentTheme.titleColor}`}>
              {activeLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {activeLesson.summary}
            </p>
          </div>
        </div>

        {/* Section 1: Kiến Thức Trọng Tâm SGK Kết Nối Tri Thức */}
        <div className="space-y-4">
          <div className={`flex items-center gap-2 pb-2 border-b ${currentTheme.cardBorder}`}>
            <BookOpen className={`w-4 h-4 ${currentTheme.textColor}`} />
            <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
              1. Kiến Thức Trọng Tâm Cần Ghi Nhớ (SGK Kết Nối Tri Thức)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeLesson.keyPoints.map((point, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all hover:shadow-sm ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
              >
                <div className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${currentTheme.numBadge}`}>
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Khám Phá & Thành Phần Tương Tác */}
        {activeLesson.components && activeLesson.components.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className={`flex items-center gap-2 pb-2 border-b ${currentTheme.cardBorder}`}>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
                2. Khám Phá & Ví Dụ Minh Họa Trực Quan
              </h4>
            </div>

            {/* Interactive Tabs Switcher */}
            <div className="flex flex-wrap gap-2">
              {activeLesson.components.map((comp: any, idx) => {
                const titleStr = comp?.title || comp?.name || `Mục ${idx + 1}`;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.click();
                      setSelectedCompIndex(idx);
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border-2 ${
                      selectedCompIndex === idx
                        ? currentTheme.tabActive
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-current'
                    }`}
                  >
                    {titleStr.split(':')[0]}
                  </button>
                );
              })}
            </div>

            {(() => {
              const activeComp = (activeLesson.components && activeLesson.components[selectedCompIndex]) 
                ? (activeLesson.components[selectedCompIndex] as any)
                : (activeLesson.components && activeLesson.components[0] as any);
              if (!activeComp) return null;

              const titleText = activeComp.title || activeComp.name || 'Khám phá kiến thức';
              const descText = activeComp.description || activeComp.desc || '';
              const funcText = activeComp.functionText || activeComp.function || '';
              const exampleText = activeComp.example || '';

              return (
                <div className={`p-5 rounded-3xl border-2 space-y-2.5 animate-in fade-in ${currentTheme.cardBg} ${currentTheme.cardBorder}`}>
                  <h5 className={`text-sm font-black ${currentTheme.titleColor}`}>
                    {titleText}
                  </h5>
                  {descText && (
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {descText}
                    </p>
                  )}
                  {(funcText || exampleText) && (
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      {funcText && (
                        <div className="font-bold text-slate-800 dark:text-white">
                          ⚙️ <strong>Chức năng:</strong> {funcText}
                        </div>
                      )}
                      {exampleText && (
                        <div className={`font-semibold ${currentTheme.textColor}`}>
                          💡 <strong>Ví dụ thực tế:</strong> {exampleText}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Section 3: CÂU HỎI TRẮC NGHIỆM TƯƠNG TÁC TRỰC TIẾP (IN-LESSON QUIZ) */}
        {currentQuestion && (
          <div className="space-y-4 pt-2">
            <div className={`flex items-center gap-2 pb-2 border-b ${currentTheme.cardBorder}`}>
              <QuestionMark className="w-4 h-4 text-blue-500" />
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
                3. Tự Kiểm Tra Nhanh: Trả Lời Câu Hỏi Cùng Cô Đỗ Mừng 🌸
              </h4>
            </div>

            <div className={`p-5 sm:p-6 rounded-3xl border-2 space-y-4 bg-white dark:bg-slate-900 ${currentTheme.cardBorder}`}>
              <div className="flex items-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-black shrink-0">
                  Câu hỏi kiểm tra
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {currentQuestion.question_text}
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-2 pt-1">
                {(Array.isArray(currentQuestion.options) ? currentQuestion.options : []).map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQuestion.correct_answer;

                  let optionStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400';
                  
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-300 font-bold';
                    }
                  } else if (isSelected) {
                    optionStyle = `${currentTheme.tabActive}`;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (!isAnswerSubmitted) {
                          sound.click();
                          setSelectedOption(option);
                        }
                      }}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xs border border-slate-300 dark:border-slate-600 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action & Feedback */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleCheckQuizAnswer}
                    disabled={!selectedOption}
                    className={`px-6 py-2.5 rounded-full font-black text-xs sm:text-sm transition-all shadow-md ${
                      selectedOption
                        ? `${currentTheme.buttonPrimary} hover:scale-105`
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Kiểm Tra Kết Quả 🎯
                  </button>
                ) : (
                  <div className="space-y-1.5 w-full">
                    <div className={`p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm ${
                      selectedOption === currentQuestion.correct_answer
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300'
                    }`}>
                      <span className="text-base">{selectedOption === currentQuestion.correct_answer ? '🎉' : '💡'}</span>
                      <div>
                        <strong>{selectedOption === currentQuestion.correct_answer ? 'Chính xác 100%! (+20 XP, +10 Coins)' : 'Chưa chính xác!'}</strong>
                        <p className="mt-0.5">{currentQuestion.explanation}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedOption(null);
                        setIsAnswerSubmitted(false);
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      🔄 Thử làm lại câu hỏi này
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Section 4: BÀI TẬP VẬN DỤNG & THỰC HÀNH (PRACTICE HOMEWORK) */}
        {currentAssignment && (
          <div className="space-y-4 pt-2">
            <div className={`flex items-center gap-2 pb-2 border-b ${currentTheme.cardBorder}`}>
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
                4. Bài Tập Vận Dụng & Thực Hành (Nộp Bài Cho Cô Đỗ Mừng)
              </h4>
            </div>

            <div className={`p-5 sm:p-6 rounded-3xl border-2 space-y-4 bg-white dark:bg-slate-900 ${currentTheme.cardBorder}`}>
              <div>
                <h5 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  📝 {currentAssignment.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {currentAssignment.description}
                </p>
              </div>

              {/* Rubric criteria */}
              {currentAssignment.rubric && currentAssignment.rubric.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Thang điểm đánh giá của Cô Đỗ Mừng (Tổng 100 điểm):</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    {currentAssignment.rubric.map((r, i) => (
                      <li key={i}>{r.criteria} ({r.points} điểm)</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Form */}
              {!isHomeworkSubmitted ? (
                <form onSubmit={handleSubmitHomework} className="space-y-2.5 pt-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    ✍️ Nhập câu trả lời hoặc bài làm của em:
                  </label>
                  <textarea
                    value={homeworkText}
                    onChange={(e) => setHomeworkText(e.target.value)}
                    placeholder="Em viết lời giải hoặc nội dung bài tập thực hành vào đây..."
                    rows={3}
                    className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:border-pinkBrand-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!homeworkText.trim()}
                    className={`px-5 py-2.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
                      homeworkText.trim()
                        ? `${currentTheme.buttonPrimary} hover:scale-105`
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Nộp Bài Cho Cô Đỗ Mừng 🌸</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>🎉 Đã nộp bài thành công! Cô Đỗ Mừng sẽ gửi điểm và lời khen cho em sớm nhé! 💖</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. FLOATING MASCOT SPEECH BUBBLE */}
        <div className="flex items-end justify-end gap-3 pt-4">
          {/* Speech Bubble */}
          <div className="relative p-3.5 px-4 rounded-3xl bg-white dark:bg-[#1A1E33] border-2 border-pink-300 dark:border-pink-800 shadow-md max-w-xs sm:max-w-md text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
            <span>Chào em! Cô Đỗ Mừng chúc em một ngày học tập thật vui! 🌸</span>
            {/* Pointer */}
            <div className="absolute right-6 -bottom-2 w-3 h-3 bg-white dark:bg-[#1A1E33] border-r-2 border-b-2 border-pink-300 dark:border-pink-800 transform rotate-45" />
          </div>

          {/* Mascot Avatar with Online Badge */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 p-0.5 shadow-lg shrink-0">
            <img 
              src="/images/avatar_co_mung.jpg" 
              alt="Cô Đỗ Mừng" 
              className="w-full h-full object-cover rounded-full" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=tin6';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
        </div>

        {/* 6. BOTTOM ACTION & NAVIGATION BAR */}
        <div className={`pt-6 border-t ${currentTheme.cardBorder} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          
          {/* Complete Lesson Button */}
          <button
            onClick={handleConfirmComplete}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Xác Nhận Đã Học Xong (+50 XP, +20 Xu)</span>
          </button>

          {/* Navigation Prev / Next */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {prevLesson ? (
              <button
                onClick={() => handleNavigate(prevLesson.id)}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bài trước</span>
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => handleNavigate(nextLesson.id)}
                className={`px-4 py-2 rounded-2xl border font-black text-xs flex items-center gap-1 transition-all hover:scale-105 ${currentTheme.buttonSecondary}`}
              >
                <span>Bài tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
