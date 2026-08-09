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
  Music,
  GraduationCap,
  Award
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

  // 3. Mascot & Students Hover states
  const [isMascotHovered, setIsMascotHovered] = useState<boolean>(false);
  const [isBoyHovered, setIsBoyHovered] = useState<boolean>(false);
  const [isGirlHovered, setIsGirlHovered] = useState<boolean>(false);

  // 4. Feature: Like Banner with Mini Confetti Fireworks
  const [likesCount, setLikesCount] = useState<number>(() => {
    const saved = localStorage.getItem('tinhoc6_banner_likes');
    return saved ? parseInt(saved, 10) : 635;
  });
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // 5. Easter Egg Secrets (3 điểm bí mật ẩn trên banner)
  const [foundEggs, setFoundEggs] = useState<number[]>([]);
  const [isEasterEggModalOpen, setIsEasterEggModalOpen] = useState<boolean>(false);

  // Play Welcome Jingle
  const handlePlayJingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.welcomeJingle();
  };

  // Handle Like with Mini Fireworks
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

  // Handle Student Interaction Clicks
  const handleStudentBoyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.click();
    confetti({ particleCount: 30, spread: 50, origin: { x: 0.1, y: 0.2 } });
    alert('👦 Bé Nam (Lớp 6A): "Em chào Cô Đỗ Mừng ạ! Em rất thích học lập trình và giải bài tập Tin học 6!" 🌸');
  };

  const handleStudentGirlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.click();
    confetti({ particleCount: 30, spread: 50, origin: { x: 0.9, y: 0.2 } });
    alert('👧 Bé Mai (Lớp 6B): "Học Tin học cùng Cô Đỗ Mừng vui lắm các bạn ơi! Cùng nhau đạt điểm 10 nhé!" 🎀');
  };

  // Handle Easter Egg Secret Clicks
  const handleEggClick = (e: React.MouseEvent, eggIndex: number) => {
    e.stopPropagation();
    if (foundEggs.includes(eggIndex)) return;

    sound.correct();
    const updated = [...foundEggs, eggIndex];
    setFoundEggs(updated);

    if (updated.length === 3) {
      sound.victory();
      addCoins(100);
      addXP(50, 'Mở khóa Trứng Phục Sinh bí mật');
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.4 }
      });
      setIsEasterEggModalOpen(true);
    } else {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      });
      alert(`🔎 Tuyệt vời! Em đã tìm thấy ${updated.length}/3 Bí Mật trên Banner! Hãy tìm nốt những vị trí còn lại nhé! 🌸`);
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
    <div className="w-full select-none relative overflow-hidden bg-gradient-to-r from-[#FF5E82] via-[#FF7A57] to-[#FFA53B] shadow-md border-b-2 border-pink-300/80">
      
      {/* =========================================================================
          MAIN PANORAMIC BANNER CONTAINER (3 KHỐI: BÉ TRAI - CÔ ĐỖ MỪNG - BÉ GÁI)
          ========================================================================= */}
      <div className="w-full max-w-[1520px] mx-auto relative flex items-center justify-between px-2 sm:px-4 lg:px-6">
        
        {/* =======================================================================
            KHỐI 1: BÉ TRAI HỌC SINH CUTE 3D TAY CẦM SÁCH BÚT (BÊN TRÁI GÓC BANNER)
            ======================================================================= */}
        <div 
          onMouseEnter={() => setIsBoyHovered(true)}
          onMouseLeave={() => setIsBoyHovered(false)}
          onClick={handleStudentBoyClick}
          className="hidden xl:flex flex-col items-center justify-center relative z-20 cursor-pointer group/boy w-40 shrink-0 transform hover:scale-105 transition-all duration-300"
          title="Bấm để trò chuyện với bạn Nam (Lớp 6A)"
        >
          {/* Boy Speech Bubble on Hover */}
          {isBoyHovered && (
            <div className="absolute -top-10 left-0 right-0 bg-white/95 text-slate-800 text-[11px] font-black p-2 rounded-2xl shadow-xl border-2 border-blue-300 text-center animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md">
              <span>Em chào Cô Mừng! 👦💻</span>
            </div>
          )}

          {/* 3D Boy Avatar Card with Red Scarf & Book */}
          <div className="w-32 h-44 rounded-3xl overflow-hidden shadow-2xl border-3 border-white/90 bg-white/40 backdrop-blur-md p-1 group-hover/boy:border-blue-300 transition-all flex flex-col items-center justify-center">
            <img 
              src="/images/student_boy.jpg" 
              alt="Học sinh nam Tin học 6" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Student Badge */}
          <div className="mt-1 px-3 py-0.5 rounded-full bg-blue-600/90 text-white text-[10px] font-black shadow-md border border-blue-200 flex items-center gap-1 backdrop-blur-xs">
            <GraduationCap className="w-3 h-3 text-yellow-300" />
            <span>Bạn Nam • 6A</span>
          </div>
        </div>

        {/* =======================================================================
            KHỐI 2: BANNER CHÍNH CÔ GIÁO ĐỖ MỪNG 3D (Ở GIỮA KHÔNG BỊ CẮT XÉN)
            ======================================================================= */}
        <div 
          onClick={handleOpenZoomModal}
          className="flex-1 relative cursor-pointer group flex items-center justify-center max-w-[1080px] mx-auto"
        >
          {/* Bức tranh 3D gốc siêu nét đầy đủ 100% hình ảnh */}
          <div className="relative w-full aspect-[736/380] max-h-[380px] overflow-hidden flex items-center justify-center">
            <img
              src="/images/banner_tin6_real.png"
              alt="HỌC TIN CÙNG CÔ ĐỖ MỪNG"
              className="w-full h-full object-contain object-center block transition-transform duration-500 group-hover:scale-[1.008]"
              style={{ imageRendering: 'auto' }}
            />

            {/* Tia sáng quét nhẹ Shimmer Sweep mỗi 6s */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="w-1/3 h-[250%] bg-gradient-to-r from-transparent via-white/35 to-transparent absolute -top-1/2 left-0 animate-shimmer-sweep pointer-events-none" />
            </div>

            {/* Ánh sáng Ngày / Đêm */}
            {isDayTime ? (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-yellow-200/10 to-transparent mix-blend-overlay" />
                <div className="absolute top-3 left-1/4 w-2.5 h-2.5 rounded-full bg-yellow-200 blur-[1px] animate-sunbeam-float" />
                <div className="absolute top-8 right-1/3 w-3 h-3 rounded-full bg-amber-300/80 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-6 left-1/2 w-2.5 h-2.5 rounded-full bg-yellow-100 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '2.8s' }} />
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-purple-950/15 to-transparent mix-blend-multiply" />
                <div className="absolute top-3 left-1/5 text-yellow-200 text-xs animate-star-twinkle">✨</div>
                <div className="absolute top-6 right-1/4 text-amber-200 text-xs animate-star-twinkle" style={{ animationDelay: '0.8s' }}>⭐</div>
                <div className="absolute top-10 left-2/3 text-white text-[10px] animate-star-twinkle" style={{ animationDelay: '1.6s' }}>✨</div>
                <div className="absolute bottom-5 right-1/5 text-yellow-300 text-xs animate-star-twinkle" style={{ animationDelay: '2.1s' }}>⭐</div>
              </div>
            )}

            {/* 3 Điểm bí mật Easter Egg */}
            <div 
              onClick={(e) => handleEggClick(e, 1)}
              title="Bí mật 1: Chiếc Laptop Coder"
              className="absolute top-[8%] right-[12%] w-12 h-12 rounded-full cursor-pointer z-20 hover:ring-2 hover:ring-yellow-300/80 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-sm bg-black/20 backdrop-blur-xs"
            >
              {foundEggs.includes(1) ? '✅' : '❓'}
            </div>

            <div 
              onClick={(e) => handleEggClick(e, 2)}
              title="Bí mật 2: Sách Tin Học THCS"
              className="absolute bottom-[6%] right-[10%] w-12 h-12 rounded-full cursor-pointer z-20 hover:ring-2 hover:ring-yellow-300/80 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-sm bg-black/20 backdrop-blur-xs"
            >
              {foundEggs.includes(2) ? '✅' : '❓'}
            </div>

            <div 
              onClick={(e) => handleEggClick(e, 3)}
              title="Bí mật 3: Bút Chỉ Bảng Của Cô Đỗ Mừng"
              className="absolute top-[26%] left-[22%] w-10 h-10 rounded-full cursor-pointer z-20 hover:ring-2 hover:ring-yellow-300/80 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-sm bg-black/20 backdrop-blur-xs"
            >
              {foundEggs.includes(3) ? '✅' : '❓'}
            </div>
          </div>

          {/* Bottom Left Toolbar: Lời Chào + Nhạc + Like */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4 z-20 flex items-center gap-2 flex-wrap">
            <div 
              onMouseEnter={() => setIsMascotHovered(true)}
              onMouseLeave={() => setIsMascotHovered(false)}
              onClick={(e) => {
                e.stopPropagation();
                playCoDoMungGreeting();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-extrabold text-[11px] sm:text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border border-pink-200 backdrop-blur-md cursor-pointer group/mascot"
            >
              <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#FF5288] group-hover/mascot:scale-110 transition-transform shrink-0">
                <Volume2 className="w-3 h-3 animate-bounce" />
              </div>
              <span className="drop-shadow-xs">▶ Lời Chào Cô Đỗ Mừng 💖</span>
              <span className={`text-sm transition-transform ${isMascotHovered ? 'animate-wave-hand' : ''}`}>
                👋
              </span>
            </div>

            <button
              onClick={handlePlayJingle}
              title="Nghe nhạc chuông vui tai chào mừng"
              className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              <Music className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">Nhạc Chào Mừng 🎶</span>
            </button>

            <button
              onClick={handleLikeBanner}
              title="Thích banner để bắn pháo hoa mini lấp lánh!"
              className={`px-3 py-1.5 rounded-full font-extrabold text-[11px] shadow-md border backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1 ${
                hasLiked
                  ? 'bg-pinkBrand-500 text-white border-pink-300 shadow-pink-300/50'
                  : 'bg-white/90 hover:bg-white text-[#FF5288] border-pink-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : 'text-[#FF5288]'}`} />
              <span>{likesCount} Thích</span>
            </button>
          </div>

          {/* Top Right Toolbar: Ngày/Đêm + Tải HD + Phóng To */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleDayNightMode}
              title={isDayTime ? 'Đang bật: Ánh Sáng Ban Mai ☀️ (Bấm đổi sang Ánh Sao Đêm 🌙)' : 'Đang bật: Ánh Sao Đêm 🌙 (Bấm đổi sang Ánh Ban Mai ☀️)'}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
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

            <button
              onClick={handleDownloadWallpaper}
              title="Tải ảnh Banner 3D Full HD làm hình nền máy tính phòng Tin học"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-pinkBrand-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-pinkBrand-500" />
              <span className="hidden md:inline">Tải Hình Nền HD</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenZoomModal();
              }}
              title="Phóng to ngắm tranh vẽ 3D Full HD sắc nét"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden md:inline">Phóng To</span>
            </button>
          </div>
        </div>

        {/* =======================================================================
            KHỐI 3: BÉ GÁI HỌC SINH CUTE 3D TAY CẦM SÁCH BÚT (BÊN PHẢI GÓC BANNER)
            ======================================================================= */}
        <div 
          onMouseEnter={() => setIsGirlHovered(true)}
          onMouseLeave={() => setIsGirlHovered(false)}
          onClick={handleStudentGirlClick}
          className="hidden xl:flex flex-col items-center justify-center relative z-20 cursor-pointer group/girl w-40 shrink-0 transform hover:scale-105 transition-all duration-300"
          title="Bấm để trò chuyện với bạn Mai (Lớp 6B)"
        >
          {/* Girl Speech Bubble on Hover */}
          {isGirlHovered && (
            <div className="absolute -top-10 left-0 right-0 bg-white/95 text-slate-800 text-[11px] font-black p-2 rounded-2xl shadow-xl border-2 border-pink-300 text-center animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md">
              <span>Học Tin thật vui! 👧🌸</span>
            </div>
          )}

          {/* 3D Girl Avatar Card with Ribbons & Book */}
          <div className="w-32 h-44 rounded-3xl overflow-hidden shadow-2xl border-3 border-white/90 bg-white/40 backdrop-blur-md p-1 group-hover/girl:border-pink-300 transition-all flex flex-col items-center justify-center">
            <img 
              src="/images/student_girl.jpg" 
              alt="Học sinh nữ Tin học 6" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Student Badge */}
          <div className="mt-1 px-3 py-0.5 rounded-full bg-pinkBrand-600/90 text-white text-[10px] font-black shadow-md border border-pink-200 flex items-center gap-1 backdrop-blur-xs">
            <Award className="w-3 h-3 text-yellow-300" />
            <span>Bạn Mai • 6B</span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          MODAL 1: LIGHTBOX ZOOM FULL HD
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
            <div className="p-4 px-6 bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <h3 className="text-sm sm:text-base font-black">
                  BỨC TRANH 3D NGHỆ THUẬT: HỌC TIN CÙNG CÔ ĐỖ MỪNG (FULL HD)
                </h3>
              </div>

              <div className="flex items-center gap-2">
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
                <button
                  onClick={() => setIsZoomModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src="/images/banner_tin6_real.png"
                alt="HỌC TIN CÙNG CÔ ĐỖ MỪNG FULL HD"
                className="max-w-full h-auto rounded-2xl shadow-2xl transition-transform duration-300 select-none cursor-grab"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </div>

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

      {/* =========================================================================
          MODAL 2: MỞ KHÓA TRỨNG PHỤC SINH BÍ MẬT
          ========================================================================= */}
      {isEasterEggModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151828] w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-yellow-400 text-center space-y-4 relative">
            <button
              onClick={() => setIsEasterEggModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-md animate-bounce">
              🎁
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                MỞ KHÓA BÍ MẬT THÀNH CÔNG!
              </span>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                Trứng Phục Sinh Của Cô Đỗ Mừng 🌸
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Chúc mừng em đã tinh mắt tìm đủ 3 biểu tượng bí mật ẩn giấu trên Banner! Cô Đỗ Mừng tặng thưởng cho em:
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 text-center space-y-1">
              <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1.5">
                <span>🪙 +100 Xu Coins</span>
                <span className="text-xs text-amber-700">& +50 XP</span>
              </div>
              <p className="text-[11px] text-amber-700 font-bold">Mã Quà Tặng: <strong className="font-mono text-xs">CODOMUNG-TIN6-VIP</strong></p>
            </div>

            <button
              onClick={() => setIsEasterEggModalOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 text-white font-black text-xs shadow-md hover:scale-105 transition-all"
            >
              🎉 Nhận Quà & Tiếp Tục Học Tập
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
