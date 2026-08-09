import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const QuizModal: React.FC = () => {
  const { isQuizModalOpen, setIsQuizModalOpen, questions } = useApp();
  const { addXP, addCoins } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isQuizModalOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentQ.correct_answer) {
      sound.correct();
      setScore(s => s + 10);
    } else {
      sound.wrong();
    }
  };

  const handleNext = () => {
    sound.click();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      sound.victory();
      addXP(score * 5 + 50, 'Hoàn thành Trắc nghiệm Tin 6');
      addCoins(25);
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const handleRestart = () => {
    sound.click();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-100 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            setIsQuizModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-pink-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-pink-100 dark:border-slate-800 pr-8">
              <div>
                <span className="px-2.5 py-0.5 rounded-lg bg-pinkBrand-50 text-pinkBrand-600 text-[10px] font-extrabold">
                  NGÂN HÀNG CÂU HỎI TIN 6 KẾT NỐI TRI THỨC
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-white mt-1">
                  Câu hỏi {currentIndex + 1} / {questions.length}
                </h3>
              </div>

              <div className="text-xs font-bold text-pinkBrand-600">
                Điểm: {score}đ
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h4 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-white leading-snug">
                {currentQ.question_text}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 text-slate-700 dark:text-slate-200 hover:bg-pink-50 hover:border-pinkBrand-300';

                if (isAnswered) {
                  if (opt === currentQ.correct_answer) {
                    btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold';
                  } else if (opt === selectedOption) {
                    btnStyle = 'bg-red-50 text-red-800 border-red-500 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-2xl border-2 text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === currentQ.correct_answer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && opt === selectedOption && opt !== currentQ.correct_answer && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            {isAnswered && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-slate-800/40 border border-pink-100 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-pinkBrand-600 block mb-1">👩‍🏫 Lời giảng từ Cô Đỗ Mừng:</strong>
                  {currentQ.explanation}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-pinkBrand-500 hover:bg-pinkBrand-600 text-white font-extrabold text-xs shadow-md"
                  >
                    {currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <div className="text-center py-6 space-y-4">
            <Award className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
              Em đã hoàn thành bài thi trắc nghiệm! 🎉
            </h3>
            <p className="text-sm font-bold text-pinkBrand-600">
              Tổng điểm: {score} / {questions.length * 10} Điểm
            </p>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-pinkBrand-500 text-white text-xs font-bold"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
