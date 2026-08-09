import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  return (
    <div className="w-full bg-gradient-to-r from-[#FF4B72]/10 via-[#FF6E4A]/15 to-[#FFA238]/10 select-none py-1.5">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        
        {/* Banner Container chiếm đúng 1/6 chiều cao màn hình (16.67vh) */}
        <div className="relative w-full h-[16.67vh] min-h-[140px] max-h-[195px] rounded-3xl overflow-hidden shadow-xl border-3 border-gradient-pink-orange glow-pink-orange group bg-gradient-to-r from-[#FF4B72] via-[#FF6E4A] to-[#FFA048]">
          
          {/* Ảnh Banner 3D siêu sắc nét, căn giữa hoàn hảo */}
          <img
            src="/images/banner_tin6_real.png"
            alt="CÙNG HỌC TIN HỌC VỚI CÔ ĐỖ MỪNG"
            className="w-full h-full object-cover sm:object-contain object-center block transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Interactive Floating Voice Greeting Button - Tinh gọn trong khung 1/6 */}
          <div className="absolute bottom-2.5 left-3 sm:bottom-3.5 sm:left-5 z-20">
            <button
              onClick={playCoDoMungGreeting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF4B72] font-black text-[11px] sm:text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-300 backdrop-blur-md glow-hover group/btn"
            >
              <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#FF4B72] group-hover/btn:scale-110 transition-transform shrink-0 shadow-xs">
                <Volume2 className="w-3 h-3 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Từ Cô Đỗ Mừng 💖</span>
            </button>
          </div>

          {/* Top Right Mini Slogan Tag */}
          <div className="hidden md:flex absolute top-2.5 right-4 items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-black text-[#FF4B72] shadow-md border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Học Vui, Hiểu sâu 🎀 Cùng Học Tin 6</span>
          </div>

        </div>
      </div>
    </div>
  );
};
