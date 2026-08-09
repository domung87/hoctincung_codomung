import React, { useState, useEffect } from 'react';
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
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { sound } from '../../lib/soundFx';

export const BannerHeader: React.FC = () => {
  const { playCoDoMungGreeting } = useApp();

  // 1. State for Full HD Lightbox Zoom Modal
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // 2. State for Day / Night Lighting Mode
  // Default: Auto-detect real-time (6:00 - 18:00 is Day, otherwise Night)
  const [isDayTime, setIsDayTime] = useState<boolean>(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  });

  // 3. State for 3D Mascot Hover waving interaction
  const [isMascotHovered, setIsMascotHovered] = useState<boolean>(false);

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

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 }
    });
    alert('🎉 Đã tải xuống bức ảnh Banner 3D Full HD làm hình nền máy tính phòng Tin học! 🌸');
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
    <div className="w-full bg-[#FF5288]/10 select-none py-1 sm:py-2 relative">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
        
        {/* =========================================================================
            MAIN BANNER CONTAINER (Chuẩn 16:2 Panorama Ratio)
            ========================================================================= */}
        <div 
          onClick={handleOpenZoomModal}
          className={`relative w-full aspect-[16/4] sm:aspect-[16/2.8] md:aspect-[16/2] min-h-[130px] max-h-[210px] rounded-3xl overflow-hidden shadow-xl border-2 cursor-pointer transition-all duration-700 group ${
            isDayTime
              ? 'border-pink-200/90 bg-gradient-to-r from-[#FF5E82] via-[#FF7A57] to-[#FFA53B]'
              : 'border-indigo-400/80 bg-gradient-to-r from-[#2A0845] via-[#6441A5] to-[#FF4E50]'
          }`}
        >
          
          {/* Bức hình Banner 3D mới sắc nét 100% */}
          <img
            src="/images/banner_tin6_real.png"
            alt="HỌC TIN CÙNG CÔ ĐỖ MỪNG"
            className="w-full h-full object-cover sm:object-contain object-center block transition-transform duration-500 group-hover:scale-[1.008]"
            style={{ imageRendering: 'auto' }}
          />

          {/* =======================================================================
              TÍNH NĂNG 1: HIỆU ỨNG TIA SÁNG QUÉT NHẸ (SHIMMER SWEEP MỖI 6 GIÂY)
              ======================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <div className="w-1/3 h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent absolute -top-1/2 left-0 animate-shimmer-sweep pointer-events-none" />
          </div>

          {/* =======================================================================
              TÍNH NĂNG 4: HIỆU ỨNG ÁNH SÁNG NGÀY / ĐÊM (DAY / NIGHT OVERLAY & PARTICLES)
              ======================================================================= */}
          {isDayTime ? (
            // Ban Ngày: Ánh Nắng Ban Mai Ấm Áp & Hạt Bụi Nắng
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-yellow-200/10 to-transparent mix-blend-overlay" />
              {/* Sunbeam particles */}
              <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-yellow-200 blur-[1px] animate-sunbeam-float" />
              <div className="absolute top-6 right-1/3 w-3 h-3 rounded-full bg-amber-300/80 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '1.5s' }} />
              <div className="absolute bottom-4 left-1/2 w-2.5 h-2.5 rounded-full bg-yellow-100 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '2.8s' }} />
            </div>
          ) : (
            // Ban Đêm: Ánh Trăng Sao Huyền Ảo & Sao Lấp Lánh
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-purple-950/15 to-transparent mix-blend-multiply" />
              {/* Twinkling Stars */}
              <div className="absolute top-2.5 left-1/5 text-yellow-200 text-xs animate-star-twinkle">✨</div>
              <div className="absolute top-4 right-1/4 text-amber-200 text-xs animate-star-twinkle" style={{ animationDelay: '0.8s' }}>⭐</div>
              <div className="absolute top-8 left-2/3 text-white text-[10px] animate-star-twinkle" style={{ animationDelay: '1.6s' }}>✨</div>
              <div className="absolute bottom-3 right-1/5 text-yellow-300 text-xs animate-star-twinkle" style={{ animationDelay: '2.1s' }}>⭐</div>
            </div>
          )}

          {/* =======================================================================
              TÍNH NĂNG 5: MASCOT CÔ ĐỖ MỪNG 3D VẪY TAY CHÀO KHI RÊ CHUỘT (BOTTOM-LEFT)
              ======================================================================= */}
          <div 
            onMouseEnter={() => setIsMascotHovered(true)}
            onMouseLeave={() => setIsMascotHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              playCoDoMungGreeting();
            }}
            className="absolute bottom-2 left-2.5 sm:bottom-3 sm:left-5 z-20 flex items-center gap-2 group/mascot cursor-pointer"
          >
            {/* Interactive Sound Button */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-extrabold text-[11px] sm:text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border border-pink-200 backdrop-blur-md">
              <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#FF5288] group-hover/mascot:scale-110 transition-transform shrink-0">
                <Volume2 className="w-3 h-3 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Từ Cô Đỗ Mừng 💖</span>
              {/* Waving hand icon animated on hover */}
              <span className={`text-sm transition-transform ${isMascotHovered ? 'animate-wave-hand' : ''}`}>
                👋
              </span>
            </div>

            {/* Mascot Interactive Hover Speech Bubble */}
            {isMascotHovered && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border-2 border-pink-300 text-[11px] font-black text-slate-800 animate-in fade-in zoom-in-95 duration-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Chào em! Chúc em học thật vui nhé! 🌸</span>
              </div>
            )}
          </div>

          {/* =======================================================================
              TOP RIGHT TOOLBAR: (DAY/NIGHT SWITCH + DOWNLOAD WALLPAPER + ZOOM FULL HD)
              ======================================================================= */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
            
            {/* 4. Nút Chuyển Đổi Ánh Sáng Ngày / Đêm */}
            <button
              onClick={toggleDayNightMode}
              title={isDayTime ? 'Đang bật: Ánh Sáng Ban Mai ☀️ (Bấm đổi sang Ánh Sao Đêm 🌙)' : 'Đang bật: Ánh Sao Đêm 🌙 (Bấm đổi sang Ánh Ban Mai ☀️)'}
              className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              {isDayTime ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                  <span className="hidden md:inline text-amber-600">Ban Mai ☀️</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                  <span className="hidden md:inline text-indigo-700">Trăng Sao 🌙</span>
                </>
              )}
            </button>

            {/* 3. Nút Tải Ảnh Banner Làm Hình Nền Máy Tính */}
            <button
              onClick={handleDownloadWallpaper}
              title="Tải ảnh Banner 3D Full HD làm hình nền máy tính phòng Tin học"
              className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-pinkBrand-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-pinkBrand-500" />
              <span className="hidden md:inline">Tải Hình Nền HD</span>
            </button>

            {/* 2. Nút Phóng To Xem Banner Full HD */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenZoomModal();
              }}
              title="Phóng to ngắm tranh vẽ 3D Full HD sắc nét"
              className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden md:inline">Phóng To</span>
            </button>

          </div>

        </div>
      </div>

      {/* =========================================================================
          TÍNH NĂNG 2: LIGHTBOX MODAL PHÓNG TO XEM BANNER FULL HD SẮC NÉT
          ========================================================================= */}
      {isZoomModalOpen && (
        <div 
          onClick={() => setIsZoomModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#151828] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-300 dark:border-slate-700 flex flex-col relative"
          >
            {/* Modal Header */}
            <div className="p-4 px-6 bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <h3 className="text-sm sm:text-base font-black">
                  BỨC TRANH 3D NGHỆ THUẬT: HỌC TIN CÙNG CÔ ĐỖ MỪNG (FULL HD)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 2.5))}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Phóng to ảnh"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Thu nhỏ ảnh"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Đặt lại kích thước chuẩn"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-white/30 mx-1" />

                {/* Close Button */}
                <button
                  onClick={() => setIsZoomModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Zoom Pan */}
            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src="/images/banner_tin6_real.png"
                alt="HỌC TIN CÙNG CÔ ĐỖ MỪNG FULL HD"
                className="max-w-full h-auto rounded-2xl shadow-2xl transition-transform duration-300 select-none cursor-grab"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </div>

            {/* Modal Footer with Quick Download Button */}
            <div className="p-4 px-6 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Độ phân giải siêu sắc nét • Chuẩn hình nền máy tính phòng Tin học trường THCS
              </span>

              <button
                onClick={handleDownloadWallpaper}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Tải Bức Tranh Này Về Máy (.PNG)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
