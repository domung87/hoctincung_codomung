import React from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  return (
    <div className="w-full bg-gradient-to-r from-[#FF4B72]/15 via-[#FF6E4A]/20 to-[#FFA238]/15 select-none pt-2 pb-1">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        
        {/* Full Sharp 3D Banner Picture Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-pink-orange glow-pink-orange group bg-[#FF6E4A]/10">
          
          {/* Exact Full Uncropped High-Res Banner Graphic */}
          <img
            src="/images/banner_tin6_real.png"
            alt="CÙNG HỌC TIN HỌC VỚI CÔ ĐỖ MỪNG"
            className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.008]"
          />

          {/* Interactive Floating Voice Greeting Button */}
          <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-7 z-20">
            <button
              onClick={playCoDoMungGreeting}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/95 hover:bg-white text-[#FF4B72] font-black text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-300 backdrop-blur-md glow-hover group/btn"
            >
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[#FF4B72] group-hover/btn:scale-110 transition-transform shrink-0 shadow-xs">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Từ Cô Đỗ Mừng 💖</span>
            </button>
          </div>

          {/* Top Right Mini Slogan Tag */}
          <div className="hidden sm:flex absolute top-3 right-4 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-black text-[#FF4B72] shadow-lg border-2 border-pink-200">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Học Vui, Hiểu sâu 🎀 Cùng Học Tin 6</span>
          </div>

        </div>
      </div>
    </div>
  );
};
