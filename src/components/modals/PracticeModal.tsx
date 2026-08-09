import React, { useState } from 'react';
import { 
  X, 
  Keyboard, 
  MousePointer, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Trophy,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const PracticeModal: React.FC = () => {
  const { isPracticeModalOpen, setIsPracticeModalOpen } = useApp();
  const { addXP, addCoins } = useAuth();

  const [activeTab, setActiveTab] = useState<'hardware' | 'mouse' | 'typing'>('hardware');

  // 1. Hardware Sorting State
  const initialItems = [
    { id: '1', name: 'Bàn phím (Keyboard)', correctCategory: 'input' },
    { id: '2', name: 'Màn hình (Monitor)', correctCategory: 'output' },
    { id: '3', name: 'Chuột máy tính (Mouse)', correctCategory: 'input' },
    { id: '4', name: 'Loa máy tính (Speaker)', correctCategory: 'output' },
    { id: '5', name: 'Bộ xử lý trung tâm (CPU)', correctCategory: 'cpu' },
    { id: '6', name: 'Máy in (Printer)', correctCategory: 'output' }
  ];

  const [hardwareItems, setHardwareItems] = useState(initialItems);
  const [sortedBaskets, setSortedBaskets] = useState<{ input: string[]; output: string[]; cpu: string[] }>({
    input: [], output: [], cpu: []
  });
  const [isHardwareDone, setIsHardwareDone] = useState(false);

  const handleSortItem = (itemId: string, category: 'input' | 'output' | 'cpu') => {
    sound.click();
    const item = hardwareItems.find(i => i.id === itemId);
    if (!item) return;

    if (item.correctCategory === category) {
      sound.correct();
      setSortedBaskets(prev => ({
        ...prev,
        [category]: [...prev[category], item.name]
      }));
      const remaining = hardwareItems.filter(i => i.id !== itemId);
      setHardwareItems(remaining);

      if (remaining.length === 0) {
        setIsHardwareDone(true);
        sound.victory();
        addXP(50, 'Hoàn thành Phân loại phần cứng');
        addCoins(20);
        confetti({ particleCount: 90, spread: 70 });
      }
    } else {
      sound.wrong();
      alert(`Chưa đúng rồi! "${item.name}" không thuộc nhóm này. Em hãy thử lại nhé! 🌸`);
    }
  };

  // 2. Mouse Practice State
  const [mouseScore, setMouseScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 40, y: 40 });

  const handleTargetClick = () => {
    sound.correct();
    setMouseScore(s => s + 1);
    setTargetPos({
      x: Math.floor(Math.random() * 80) + 5,
      y: Math.floor(Math.random() * 70) + 10
    });
  };

  // 3. Typing Practice State
  const sampleText = 'Học Tin học cùng Cô Đỗ Mừng thật là vui và bổ ích!';
  const [typedInput, setTypedInput] = useState('');

  const handleTypingChange = (val: string) => {
    setTypedInput(val);
    if (val === sampleText) {
      sound.victory();
      addXP(40, 'Luyện gõ bàn phím hoàn thành');
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  if (!isPracticeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-3xl rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-100 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            setIsPracticeModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-pink-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-100 dark:border-slate-800 pr-8">
          <div>
            <span className="px-2.5 py-0.5 rounded-lg bg-pinkBrand-50 text-pinkBrand-600 text-[10px] font-extrabold">
              THỰC HÀNH TIN HỌC 6
            </span>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white mt-1">
              Phòng Luyện Tập Kỹ Năng Tương Tác 🖱️⌨️
            </h3>
          </div>

          {/* Sub Tabs */}
          <div className="flex items-center gap-1.5 bg-pink-50/60 dark:bg-slate-800/60 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hardware' ? 'bg-pinkBrand-500 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Phần Cứng
            </button>
            <button
              onClick={() => setActiveTab('mouse')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'mouse' ? 'bg-pinkBrand-500 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Luyện Chuột
            </button>
            <button
              onClick={() => setActiveTab('typing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'typing' ? 'bg-pinkBrand-500 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Luyện Gõ
            </button>
          </div>
        </div>

        {/* 1. HARDWARE SORTING GAME */}
        {activeTab === 'hardware' && (
          <div className="space-y-5">
            <p className="text-xs text-slate-500">
              👉 <strong>Hướng dẫn:</strong> Nhấp vào thiết bị bên dưới và chọn đúng nhóm <strong>Thiết bị vào</strong>, <strong>Thiết bị ra</strong> hoặc <strong>Thân máy (CPU)</strong>.
            </p>

            {!isHardwareDone ? (
              <div className="space-y-4">
                {/* Available Items */}
                <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-wrap gap-2.5 min-h-[60px]">
                  {hardwareItems.map(item => (
                    <div
                      key={item.id}
                      className="px-3 py-1.5 rounded-xl bg-white text-xs font-extrabold text-slate-800 shadow-sm border border-slate-200 flex items-center gap-2"
                    >
                      <span>{item.name}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSortItem(item.id, 'input')}
                          title="Vào nhóm Thiết bị vào"
                          className="px-1.5 py-0.5 rounded bg-pinkBrand-100 text-pinkBrand-700 text-[10px] font-bold"
                        >
                          Vào
                        </button>
                        <button
                          onClick={() => handleSortItem(item.id, 'output')}
                          title="Vào nhóm Thiết bị ra"
                          className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 text-[10px] font-bold"
                        >
                          Ra
                        </button>
                        <button
                          onClick={() => handleSortItem(item.id, 'cpu')}
                          title="Vào nhóm Thân máy (CPU)"
                          className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold"
                        >
                          CPU
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 Baskets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-pink-50 border-2 border-dashed border-pinkBrand-300 min-h-[140px]">
                    <span className="text-xs font-extrabold text-pinkBrand-600 block mb-2">📥 1. Thiết Bị Vào:</span>
                    <div className="space-y-1">
                      {sortedBaskets.input.map((name, i) => (
                        <div key={i} className="text-[11px] font-bold text-slate-700 bg-white p-1.5 rounded-lg">✅ {name}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-50 border-2 border-dashed border-cyan-300 min-h-[140px]">
                    <span className="text-xs font-extrabold text-cyan-700 block mb-2">📤 2. Thiết Bị Ra:</span>
                    <div className="space-y-1">
                      {sortedBaskets.output.map((name, i) => (
                        <div key={i} className="text-[11px] font-bold text-slate-700 bg-white p-1.5 rounded-lg">✅ {name}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 min-h-[140px]">
                    <span className="text-xs font-extrabold text-amber-700 block mb-2">🧠 3. Thân Máy (CPU):</span>
                    <div className="space-y-1">
                      {sortedBaskets.cpu.map((name, i) => (
                        <div key={i} className="text-[11px] font-bold text-slate-700 bg-white p-1.5 rounded-lg">✅ {name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">
                  Em đã phân loại chính xác 100%! 🏆
                </h4>
                <p className="text-xs text-pinkBrand-600 font-bold">
                  +50 XP và +20 Coins đã được cộng vào thành tích học tập!
                </p>
                <button
                  onClick={() => {
                    setHardwareItems(initialItems);
                    setSortedBaskets({ input: [], output: [], cpu: [] });
                    setIsHardwareDone(false);
                  }}
                  className="px-5 py-2 rounded-full bg-pinkBrand-500 text-white font-extrabold text-xs shadow-md"
                >
                  Luyện tập lại
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. MOUSE PRACTICE */}
        {activeTab === 'mouse' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Điểm nháy chuột: <strong className="text-pinkBrand-600 text-base">{mouseScore}</strong></span>
              <span className="text-slate-400">Rèn luyện phản xạ và độ chính xác của chuột</span>
            </div>

            <div className="relative w-full h-64 rounded-3xl bg-pink-50/40 border-2 border-dashed border-pink-200 overflow-hidden select-none">
              <button
                onClick={handleTargetClick}
                style={{ top: `${targetPos.y}%`, left: `${targetPos.x}%` }}
                className="absolute p-3 rounded-full bg-gradient-to-tr from-pinkBrand-500 to-pinkBrand-400 text-white font-extrabold text-xs shadow-lg hover:scale-125 active:scale-90 transition-all"
              >
                🖱️ Click Me!
              </button>
            </div>
          </div>
        )}

        {/* 3. TYPING PRACTICE */}
        {activeTab === 'typing' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Gõ chính xác đoạn văn bản sau để rèn luyện kỹ năng gõ 10 ngón:
            </p>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-sm font-bold text-slate-800">
              {sampleText}
            </div>

            <input
              type="text"
              placeholder="Gõ lại câu trên vào đây..."
              value={typedInput}
              onChange={(e) => handleTypingChange(e.target.value)}
              className="w-full p-3.5 rounded-2xl border-2 border-pink-200 text-sm font-semibold outline-none focus:border-pinkBrand-500"
            />

            {typedInput === sampleText && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tuyệt vời! Em đã gõ chính xác hoàn toàn câu mẫu. (+40 XP)</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
