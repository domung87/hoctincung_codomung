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
        origin: { x: 0.5, y: 0.2 },
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
    <div className="w-full select-none relative bg-gradient-to-r from-[#FF5288] via-[#FF7A59] to-[#FFA048] shadow-md border-b-2 border-pink-300/80">
      
      {/* =========================================================================
          MAIN PANORAMIC BANNER CONTAINER (100% TRỌN VẸN KHÔNG BỊ CẮT XÉN)
          ========================================================================= */}
      <div className="w-full max-w-[1280px] mx-auto px-2 sm:px-4 py-2 sm:py-3 space-y-2">
        
        {/* BANNER 3D CHÍNH: TỰ ĐỘNG THU NHỎ CO GIÃN THEO TỶ LỆ 16:9 CHUẨN XÁC 100% */}
        <div 
          onClick={handleOpenZoomModal}
          className="relative cursor-pointer group rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white/80 bg-pink-100/40 backdrop-blur-xs flex items-center justify-center transition-all hover:shadow-xl"
          title="Bấm để xem ảnh phóng to Full HD"
        >
          {/* Ảnh banner 3D: object-contain, w-full h-auto, không bao giờ bị cắt chữ hay mất nét cô giáo */}
          <img
            src="/images/banner_tin6_real.png"
            alt="CÙNG HỌC TIN HỌC 6 VỚI CÔ ĐỖ MỪNG"
            className="w-full h-auto max-h-[220px] sm:max-h-[260px] md:max-h-[290px] object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.008]"
            style={{ imageRendering: 'auto' }}
          />

          {/* Tia sáng quét nhẹ Shimmer Sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <div className="w-1/3 h-[250%] bg-gradient-to-r from-transparent via-white/25 to-transparent absolute -top-1/2 left-0 animate-shimmer-sweep pointer-events-none" />
          </div>

          {/* Hiệu ứng ánh sáng Ngày / Đêm nhẹ nhàng */}
          {isDayTime ? (
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-amber-400/5 via-yellow-200/5 to-transparent mix-blend-overlay" />
          ) : (
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-indigo-950/20 via-purple-950/15 to-transparent mix-blend-multiply" />
          )}

          {/* Nút phóng to nhỏ ở góc trên bên phải */}
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenZoomModal();
              }}
              title="Phóng to xem Full HD"
              className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-[#FF5288] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* THANH ĐIỀU KHIỂN DƯỚI BANNER (KHÔNG CHE MẤT BẤT KỲ CHI TIẾT NÀO TRÊN ẢNH) */}
        <div className="flex items-center justify-between gap-2 px-1 flex-wrap">
          
          {/* Left: Lời Chào & Nhạc */}
          <div className="flex items-center gap-2">
            <button
              onClick={playCoDoMungGreeting}
              className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-black text-xs shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5"
              title="Nghe lời chào từ Cô Đỗ Mừng"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#FF5288] animate-bounce" />
              <span>Lời Chào Cô Mừng 💖</span>
            </button>

            <button
              onClick={handlePlayJingle}
              title="Nhạc chuông chào mừng"
              className="hidden sm:flex px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-600 font-bold text-xs shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 items-center gap-1.5"
            >
              <Music className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Nhạc Chào 🎶</span>
            </button>
          </div>

          {/* Center Slogan */}
          <div className="hidden md:flex items-center gap-1.5 text-white text-xs font-black drop-shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Môn Tin Học 6 • Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 🌸</span>
          </div>

          {/* Right: Like, Ngày/Đêm & Tải ảnh */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeBanner}
              title="Thích banner để bắn pháo hoa mini"
              className={`px-3 py-1.5 rounded-full font-black text-xs shadow-sm border backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5 ${
                hasLiked
                  ? 'bg-pinkBrand-600 text-white border-pink-300'
                  : 'bg-white/90 hover:bg-white text-[#FF5288] border-pink-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'text-[#FF5288]'}`} />
              <span>{likesCount} Thích</span>
            </button>

            <button
              onClick={toggleDayNightMode}
              title={isDayTime ? 'Đang bật Ban Mai ☀️ (Bấm đổi Trăng Sao 🌙)' : 'Đang bật Trăng Sao 🌙 (Bấm đổi Ban Mai ☀️)'}
              className="p-1.5 px-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 font-extrabold text-xs shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              {isDayTime ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
              <span className="hidden sm:inline">{isDayTime ? 'Ban Mai' : 'Đêm Sao'}</span>
            </button>

            <button
              onClick={handleDownloadWallpaper}
              title="Tải ảnh gốc làm hình nền máy tính phòng Tin học"
              className="hidden lg:flex p-1.5 px-2.5 rounded-full bg-white/90 hover:bg-white text-emerald-700 font-extrabold text-xs shadow-sm border border-pink-200 backdrop-blur-md transition-all hover:scale-105 items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tải HD</span>
            </button>
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
                    Bức Tranh 3D: Cùng Học Tin Học 6 Với Cô Đỗ Mừng
                  </h3>
                  <p className="text-[10px] sm:text-xs text-pink-400 font-bold">
                    Bộ sách Kết Nối Tri Thức Với Cuộc Sống • Độ phân giải Full HD (1376x768)
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
