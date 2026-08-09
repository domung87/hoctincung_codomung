import React from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  return (
    <div className="w-full bg-[#FF5288]/10 select-none py-1 sm:py-2">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        
        {/* Banner Container đúng chuẩn tỉ lệ 16:2 (Wide Panorama Ratio) siêu sắc nét */}
        <div className="relative w-full aspect-[16/4] sm:aspect-[16/2.8] md:aspect-[16/2] min-h-[130px] max-h-[210px] rounded-3xl overflow-hidden shadow-xl border-2 border-pink-200/90 dark:border-pink-900/40 bg-gradient-to-r from-[#FF5E82] via-[#FF7A57] to-[#FFA53B] group">
          
          {/* Bức hình Banner 3D mới sắc nét 100% của Cô Đỗ Mừng */}
          <img
            src="/images/banner_tin6_real.png"
            alt="HỌC TIN CÙNG CÔ ĐỖ MỪNG"
            className="w-full h-full object-cover sm:object-contain object-center block transition-transform duration-500 group-hover:scale-[1.008]"
            style={{ imageRendering: 'auto' }}
          />

          {/* Nút bấm âm thanh tương tác: Lời Chào Từ Cô Đỗ Mừng */}
          <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-5 z-20">
            <button
              onClick={playCoDoMungGreeting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-extrabold text-[11px] sm:text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border border-pink-200 backdrop-blur-md group/btn"
            >
              <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#FF5288] group-hover/btn:scale-110 transition-transform shrink-0">
                <Volume2 className="w-3 h-3 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Từ Cô Đỗ Mừng 💖</span>
            </button>
          </div>

          {/* Top Right Mini Slogan Tag */}
          <div className="hidden lg:flex absolute top-2.5 right-4 items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-black text-pinkBrand-600 shadow-md border border-pink-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Học vui • Hiểu nhanh • Làm giỏi 🌸</span>
          </div>

        </div>
      </div>
    </div>
  );
};
