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

  // 3. Like Banner with Mini Confetti Fireworks
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
        particleCount: 45,
        spread: 60,
        origin: { x: 0.85, y: 0.15 },
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

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.2 } });
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
    <div className="w-full select-none relative overflow-hidden bg-gradient-to-r from-[#FF5288] via-[#FF7A59] to-[#FFA048] shadow-md border-b-2 border-pink-300/80">
      
      {/* =========================================================================
          PANORAMIC BANNER CONTAINER (CÂN XỨNG & FULL KÍN KHUNG)
          ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* KHỐI TRÁI: BÉ TRAI 3D CUTE (GẬT ĐẦU & CHỚP MẮT THEO NHỊP) */}
        <div 
          onClick={() => {
            sound.click();
            confetti({ particleCount: 30, spread: 50, origin: { x: 0.08, y: 0.15 } });
            alert('👦 Bé Nam (Lớp 6A): "Em chào Cô Đỗ Mừng ạ! Em rất thích học Tin học 6!" 🌸');
          }}
          className="hidden lg:flex flex-col items-center justify-center relative z-20 cursor-pointer shrink-0 animate-student-boy group/boy"
          title="Bé Nam (Lớp 6A) - Bấm để trò chuyện"
        >
          <div className="w-20 h-24 xl:w-24 xl:h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 bg-white/40 backdrop-blur-md p-0.5 group-hover/boy:scale-105 group-hover/boy:border-blue-300 transition-all flex items-center justify-center relative">
            <img 
              src="/images/student_boy.jpg" 
              alt="Học sinh nam Tin học 6" 
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Eyelid Blink Overlay */}
            <div className="absolute inset-0 bg-amber-950 pointer-events-none rounded-xl animate-eye-blink" />
          </div>
          <span className="text-[10px] font-black text-white bg-black/30 px-2 py-0.5 rounded-full mt-1 backdrop-blur-xs border border-white/20">
            Bé Nam 👦
          </span>
        </div>

        {/* KHỐI GIỮA: BANNER CHÍNH CÔ GIÁO ĐỖ MỪNG CÂN XỨNG FULL KÍN KHUNG */}
        <div 
          onClick={handleOpenZoomModal}
          className="flex-1 relative cursor-pointer group flex items-center justify-center max-w-[1020px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-md border-2 border-white/60 bg-white/10 backdrop-blur-xs"
        >
          {/* Banner Image Display: Full kín cân xứng */}
          <div className="relative w-full max-h-[140px] sm:max-h-[170px] md:max-h-[195px] flex items-center justify-center overflow-hidden">
            <img
              src="/images/banner_tin6_real.png"
              alt="CÙNG HỌC TIN HỌC VỚI CÔ ĐỖ MỪNG"
              className="w-full h-full object-cover sm:object-contain object-center block transition-transform duration-500 group-hover:scale-[1.01]"
              style={{ imageRendering: 'auto' }}
            />

            {/* Shimmer Sweep Light Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="w-1/3 h-[250%] bg-gradient-to-r from-transparent via-white/30 to-transparent absolute -top-1/2 left-0 animate-shimmer-sweep pointer-events-none" />
            </div>

            {/* Day / Night Overlay Lights */}
            {isDayTime ? (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-yellow-200/10 to-transparent mix-blend-overlay" />
                <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-yellow-200 blur-[1px] animate-sunbeam-float" />
                <div className="absolute top-4 right-1/3 w-2.5 h-2.5 rounded-full bg-amber-300/80 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '1.5s' }} />
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-purple-950/20 to-transparent mix-blend-multiply" />
                <div className="absolute top-2 left-1/5 text-yellow-200 text-[10px] animate-star-twinkle">✨</div>
                <div className="absolute top-4 right-1/4 text-amber-200 text-xs animate-star-twinkle" style={{ animationDelay: '0.8s' }}>⭐</div>
                <div className="absolute bottom-3 right-1/5 text-yellow-300 text-[10px] animate-star-twinkle" style={{ animationDelay: '2.1s' }}>✨</div>
              </div>
            )}
          </div>

          {/* Quick Floating Controls (Bottom Left) */}
          <div className="absolute bottom-1.5 left-2 sm:bottom-2.5 sm:left-3 z-20 flex items-center gap-1.5 flex-wrap">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playCoDoMungGreeting();
              }}
              className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-black text-[10px] sm:text-xs shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
              title="Nghe lời chào từ Cô Đỗ Mừng"
            >
              <Volume2 className="w-3 h-3 text-[#FF5288] animate-bounce" />
              <span className="hidden sm:inline">Lời Chào Cô Mừng</span>
              <span>💖</span>
            </button>

            <button
              onClick={handlePlayJingle}
              title="Nhạc chuông chào mừng"
              className="hidden md:flex px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-blue-600 font-bold text-[10px] shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 items-center gap-1"
            >
              <Music className="w-3 h-3 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Nhạc Chào 🎶</span>
            </button>

            <button
              onClick={handleLikeBanner}
              title="Thích banner để bắn pháo hoa mini"
              className={`px-2.5 py-1 rounded-full font-black text-[10px] shadow-sm border backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1 ${
                hasLiked
                  ? 'bg-pinkBrand-600 text-white border-pink-300'
                  : 'bg-white/90 hover:bg-white text-[#FF5288] border-pink-200'
              }`}
            >
              <Heart className={`w-3 h-3 ${hasLiked ? 'fill-white' : 'text-[#FF5288]'}`} />
              <span>{likesCount} Thích</span>
            </button>
          </div>

          {/* Quick Floating Controls (Top Right) */}
          <div className="absolute top-1.5 right-2 sm:top-2.5 sm:right-3 z-20 flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={toggleDayNightMode}
              title={isDayTime ? 'Đang bật: Ánh Sáng Ban Mai ☀️ (Bấm đổi sang Ánh Sao Đêm 🌙)' : 'Đang bật: Ánh Sao Đêm 🌙 (Bấm đổi sang Ánh Ban Mai ☀️)'}
              className="p-1 sm:px-2.5 sm:py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 font-extrabold text-[10px] shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              {isDayTime ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-indigo-400" />}
              <span className="hidden sm:inline">{isDayTime ? 'Ban Mai' : 'Đêm Sao'}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenZoomModal();
              }}
              title="Xem ảnh phóng to Full HD"
              className="p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#FF5288] shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* KHỐI PHẢI: BÉ GÁI 3D CUTE (GẬT ĐẦU & CHỚP MẮT THEO NHỊP) */}
        <div 
          onClick={() => {
            sound.click();
            confetti({ particleCount: 30, spread: 50, origin: { x: 0.92, y: 0.15 } });
            alert('👧 Bé Mai (Lớp 6B): "Học Tin học cùng Cô Đỗ Mừng vui lắm các bạn ơi! Chúc cả lớp đạt điểm 10!" 🎀');
          }}
          className="hidden lg:flex flex-col items-center justify-center relative z-20 cursor-pointer shrink-0 animate-student-girl group/girl"
          title="Bé Mai (Lớp 6B) - Bấm để trò chuyện"
        >
          <div className="w-20 h-24 xl:w-24 xl:h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 bg-white/40 backdrop-blur-md p-0.5 group-girl:scale-105 group-hover/girl:border-pink-300 transition-all flex items-center justify-center relative">
            <img 
              src="/images/student_girl.jpg" 
              alt="Học sinh nữ Tin học 6" 
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Eyelid Blink Overlay */}
            <div className="absolute inset-0 bg-amber-950 pointer-events-none rounded-xl animate-eye-blink" />
          </div>
          <span className="text-[10px] font-black text-white bg-black/30 px-2 py-0.5 rounded-full mt-1 backdrop-blur-xs border border-white/20">
            Bé Mai 👧
          </span>
        </div>

      </div>

      {/* =========================================================================
          FULL HD LIGHTBOX ZOOM MODAL
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
                    Bức Tranh 3D: Cùng Học Tin Học Với Cô Đỗ Mừng
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
