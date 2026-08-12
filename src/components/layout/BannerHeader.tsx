import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Download, 
  Maximize2, 
  X, 
  Sun, 
  Moon, 
  Heart, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();
  const { addCoins, addXP } = useAuth();

  // 1. Full HD Lightbox Zoom Modal state
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // 2. Day / Night Lighting Mode state
  const [isDayTime, setIsDayTime] = useState<boolean>(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  });

  // 3. Like Banner with Mini Confetti
  const [likesCount, setLikesCount] = useState<number>(() => {
    const saved = localStorage.getItem('tinhoc6_banner_likes');
    return saved ? parseInt(saved, 10) : 642;
  });
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Play Welcome Jingle
  const handlePlayJingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.welcomeJingle();
  };

  // Handle Like Banner
  const handleLikeBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.click();
    if (!hasLiked) {
      const newCount = likesCount + 1;
      setLikesCount(newCount);
      setHasLiked(true);
      localStorage.setItem('tinhoc6_banner_likes', newCount.toString());

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.8, y: 0.1 },
        colors: ['#FF5288', '#FF7A59', '#FFD700', '#FF69B4']
      });
    }
  };

  // Handle Download Wallpaper
  const handleDownloadWallpaper = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.victory();
    const link = document.createElement('a');
    link.href = '/images/banner_tin6_real.png';
    link.download = 'Hoc_Tin_Cung_Co_Do_Mung_Wallpaper_FullHD.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({ particleCount: 40, spread: 60, origin: { y: 0.2 } });
    alert('🎉 Đã tải xuống ảnh Banner 3D Full HD làm hình nền máy tính phòng Tin học! 🌸');
  };

  const toggleDayNightMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.click();
    setIsDayTime(!isDayTime);
  };

  const handleOpenZoomModal = () => {
    sound.click();
    setZoomScale(1);
    setIsZoomModalOpen(true);
  };

  return (
    <div className="w-full select-none relative overflow-hidden bg-gradient-to-r from-[#FF5288] via-[#FF7A59] to-[#FFA048] shadow-md border-b border-pink-300/60 z-30">
      
      {/* Shimmer Sweep Light Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-1/4 h-[300%] bg-gradient-to-r from-transparent via-white/25 to-transparent absolute -top-full left-0 animate-shimmer-sweep pointer-events-none" />
      </div>

      {/* Day / Night Sky Overlay */}
      {isDayTime ? (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-amber-400/10 via-yellow-200/15 to-transparent mix-blend-overlay" />
      ) : (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 mix-blend-multiply" />
      )}

      {/* =========================================================================
          COMPACT SLIM WEB-STANDARD BANNER (Chiều cao chuẩn 76px - 88px)
          ========================================================================= */}
      <div className="max-w-[1440px] mx-auto h-20 sm:h-22 md:h-24 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* LEFT: Cute 3D Boy + Mascot Avatar + Main Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          
          {/* 3D Boy Avatar (Bé Nam) */}
          <div 
            onClick={() => {
              sound.click();
              alert('👦 Bé Nam (Lớp 6A): "Chào Cô Mừng và các bạn! Cùng nhau học Tin học thật giỏi nhé!" 🌸');
            }}
            title="Bé Nam (Lớp 6A)"
            className="hidden lg:flex w-11 h-11 rounded-2xl overflow-hidden shadow-md border-2 border-white/90 bg-white/30 shrink-0 cursor-pointer hover:scale-105 transition-transform"
          >
            <img src="/images/student_boy.jpg" alt="Bé Nam" className="w-full h-full object-cover" />
          </div>

          {/* Cô Đỗ Mừng 3D Circular Avatar with Glow */}
          <div 
            onClick={handleOpenZoomModal}
            className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white p-0.5 shadow-lg shrink-0 cursor-pointer group hover:scale-105 transition-all"
            title="Bấm để xem tranh 3D Cô Đỗ Mừng phóng to Full HD"
          >
            <img 
              src="/images/avatar_co_mung.jpg" 
              alt="Cô Đỗ Mừng" 
              className="w-full h-full object-cover rounded-[14px]"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-pinkBrand-600 text-[9px] font-black text-white border border-white shadow-xs">
              AI
            </span>
          </div>

          {/* Title & Slogan */}
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight drop-shadow-md truncate">
                HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG
              </h1>
              <span className="text-yellow-300 hidden sm:inline">🌸</span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-pink-100/90 truncate drop-shadow-xs">
              Môn Tin học Lớp 6 • Bộ Sách Kết Nối Tri Thức Với Cuộc Sống
            </p>
          </div>
        </div>

        {/* RIGHT: Compact Quick Action Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Lời chào Cô Đỗ Mừng */}
          <button
            onClick={playCoDoMungGreeting}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-black text-[11px] sm:text-xs shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5"
            title="Nghe lời chào từ Cô Đỗ Mừng"
          >
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden md:inline">Lời Chào Cô Mừng</span>
            <span>💖</span>
          </button>

          {/* Nhạc Chào Mừng */}
          <button
            onClick={handlePlayJingle}
            className="hidden sm:flex px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-600 font-bold text-[11px] shadow-sm border border-pink-200 transition-all hover:scale-105 items-center gap-1"
            title="Nhạc chuông chào mừng"
          >
            <Music className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden lg:inline">Nhạc Chào</span>
          </button>

          {/* Like Button */}
          <button
            onClick={handleLikeBanner}
            className={`px-2.5 py-1.5 rounded-full font-black text-[11px] shadow-sm border backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1 ${
              hasLiked
                ? 'bg-pinkBrand-600 text-white border-pink-300'
                : 'bg-white/90 hover:bg-white text-[#FF5288] border-pink-200'
            }`}
            title="Thích banner để bắn pháo hoa mini"
          >
            <Heart className={`w-3 h-3 ${hasLiked ? 'fill-white' : 'text-[#FF5288]'}`} />
            <span>{likesCount}</span>
          </button>

          {/* Ngày / Đêm */}
          <button
            onClick={toggleDayNightMode}
            className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 shadow-sm border border-pink-200 transition-all hover:scale-105"
            title={isDayTime ? 'Đang bật Ban Mai ☀️ (Bấm đổi Trăng Sao 🌙)' : 'Đang bật Trăng Sao 🌙 (Bấm đổi Ban Mai ☀️)'}
          >
            {isDayTime ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Xem Phóng To Full HD */}
          <button
            onClick={handleOpenZoomModal}
            className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#FF5288] shadow-sm border border-pink-200 transition-all hover:scale-105"
            title="Xem tranh 3D Full HD toàn màn hình"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* 3D Girl Avatar (Bé Mai) */}
          <div 
            onClick={() => {
              sound.click();
              alert('👧 Bé Mai (Lớp 6B): "Học Tin học cùng Cô Đỗ Mừng vui lắm các bạn ơi! Chúc cả lớp đạt điểm 10!" 🎀');
            }}
            title="Bé Mai (Lớp 6B)"
            className="hidden xl:flex w-11 h-11 rounded-2xl overflow-hidden shadow-md border-2 border-white/90 bg-white/30 shrink-0 cursor-pointer hover:scale-105 transition-transform ml-1"
          >
            <img src="/images/student_girl.jpg" alt="Bé Mai" className="w-full h-full object-cover" />
          </div>

        </div>

      </div>

      {/* =========================================================================
          FULL HD LIGHTBOX ZOOM MODAL (Xem tranh vẽ 3D trọn vẹn ở độ phân giải cao nhất)
          ========================================================================= */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-950 rounded-3xl border-2 border-pink-500/50 shadow-2xl overflow-hidden flex flex-col items-center p-3 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌸</span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    Bức Tranh 3D: Học Tin Học Cùng Cô Đỗ Mừng
                  </h3>
                  <p className="text-[10px] sm:text-xs text-pink-400 font-bold">
                    Bộ sách Kết Nối Tri Thức Với Cuộc Sống • Độ phân giải Full HD
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 hover:bg-red-500 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display Area with Zoom */}
            <div className="relative w-full max-h-[70vh] overflow-auto flex items-center justify-center rounded-2xl bg-black/60 p-2">
              <img 
                src="/images/banner_tin6_real.png" 
                alt="Banner Tin Học 6 Full HD" 
                className="max-h-[65vh] w-auto object-contain rounded-xl transition-transform duration-300 shadow-2xl"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 2.5))}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Phóng to</span>
                </button>

                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>Thu nhỏ</span>
                </button>

                <button
                  onClick={() => setZoomScale(1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mặc định</span>
                </button>
              </div>

              {/* Download Wallpaper Button */}
              <button
                onClick={handleDownloadWallpaper}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white text-xs font-black shadow-lg transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Tải Hình Nền Full HD</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
