import React from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  return (
    <div className="w-full bg-[#FF5288]/10 select-none">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 py-2 sm:py-3">
        {/* Main Banner Container with Exact User Image */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-2 border-pink-200/80 dark:border-pink-900/40 group">
          
          {/* Exact User Uploaded High-Res Banner Graphic */}
          <img
            src="/images/banner_tin6_real.png"
            alt="CÙNG HỌC TIN HỌC VỚI CÔ ĐỖ MỪNG"
            className="w-full h-auto max-h-[320px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500 block"
          />

          {/* Overlay Interactive Button: Lời Chào Từ Cô Đỗ Mừng */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-20">
            <button
              onClick={playCoDoMungGreeting}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-pink-200 backdrop-blur-md group/btn"
            >
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[#FF5288] group-hover/btn:scale-110 transition-transform shrink-0">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Từ Cô Đỗ Mừng 💖</span>
            </button>
          </div>

          {/* Top Right Mini Slogan Tag */}
          <div className="hidden md:flex absolute top-3 right-4 items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[11px] font-extrabold text-pinkBrand-600 shadow-md border border-pink-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Học Vui, Hiểu sâu 🎀 Cùng Học Tin 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
