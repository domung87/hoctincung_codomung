import React from 'react';
import { Play, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#FF5288] via-[#FF4081] to-[#FF7092] text-white shadow-md border-b-4 border-pink-300">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-2 left-10 text-white/30 text-2xl select-none">✨</div>
      <div className="absolute bottom-3 left-1/4 text-white/30 text-xl select-none">🎀</div>
      <div className="absolute top-4 right-1/3 text-white/30 text-2xl select-none">⭐</div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Left: Cute 3D Laptop with Coding Sign */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono drop-shadow-md">
              &lt;/&gt;
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-[11px] font-bold text-white mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG - KHỐI 6</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg flex items-center gap-2">
              <span>CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG</span>
              <Heart className="w-6 h-6 fill-yellow-300 text-yellow-300 inline animate-bounce" />
            </h1>
            <p className="text-xs md:text-sm text-pink-100 font-medium mt-0.5">
              Khám phá thế giới máy tính, mạng Internet, soạn thảo văn bản và tư duy thuật toán 🌸
            </p>
          </div>
        </div>

        {/* Right: Cô Đỗ Mừng Chibi Portrait & Play Greeting Button */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative group">
            <img
              src="/images/avatar_co_mung.jpg"
              alt="Cô Đỗ Mừng"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-white/60 shadow-xl group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-400 ring-2 ring-white flex items-center justify-center text-[10px]">
              👩‍🏫
            </span>
          </div>

          <button
            onClick={playCoDoMungGreeting}
            className="px-5 py-2.5 rounded-full bg-white text-pinkBrand-600 hover:bg-pinkBrand-50 font-extrabold text-xs md:text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 border-2 border-white/80"
          >
            <Play className="w-4 h-4 fill-pinkBrand-600" />
            <span>Lời Chào Từ Cô Đỗ Mừng 💖</span>
          </button>
        </div>
      </div>
    </div>
  );
};
