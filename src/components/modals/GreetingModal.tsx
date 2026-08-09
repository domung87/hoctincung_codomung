import React from 'react';
import { X, Volume2, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const GreetingModal: React.FC = () => {
  const { isGreetingModalOpen, setIsGreetingModalOpen } = useApp();

  if (!isGreetingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-pink-200 dark:border-pink-900 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            setIsGreetingModalOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-pink-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-24 h-24 rounded-full bg-pink-100 p-1 mx-auto mb-4 shadow-pink-glow ring-4 ring-pink-300">
          <img
            src="/images/avatar_co_mung.jpg"
            alt="Cô Đỗ Mừng"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pinkBrand-50 text-pinkBrand-600 text-xs font-extrabold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LỜI CHÀO TỪ CÔ ĐỖ MỪNG 💖</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
          Chào các em học sinh thân yêu! 🌸
        </h3>

        <div className="mt-4 p-4 rounded-2xl bg-pink-50/70 dark:bg-slate-800/50 border border-pink-100 text-xs leading-relaxed text-slate-700 dark:text-slate-200 font-medium text-left">
          <p className="mb-2">
            "Chào mừng các em đến với không gian học tập trực tuyến môn <strong>Tin Học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống</strong>!"
          </p>
          <p>
            Cô hy vọng qua từng bài học, các em sẽ hiểu sâu về máy tính, rèn luyện kỹ năng thực hành gõ phím, thao tác chuột, khám phá thế giới mạng Internet an toàn và phát triển tư duy thuật toán sáng tạo! 🎀
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              sound.click();
              setIsGreetingModalOpen(false);
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pinkBrand-500 to-pinkBrand-600 hover:from-pinkBrand-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Bắt đầu học cùng Cô Mừng ngay!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
