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
  Laptop,
  BookOpen,
  Code2,
  Cpu,
  Wifi,
  Lightbulb,
  Zap,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export type SeasonType = 'school' | 'tet' | 'summer' | 'autumn';

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

  // 3. 3D Mascot Hover waving interaction
  const [isMascotHovered, setIsMascotHovered] = useState<boolean>(false);

  // 4. Feature: Like Banner with Mini Confetti Fireworks
  const [likesCount, setLikesCount] = useState<number>(() => {
    const saved = localStorage.getItem('tinhoc6_banner_likes');
    return saved ? parseInt(saved, 10) : 620;
  });
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // 5. Feature: Daily Quote / Wishes Ticker
  const dailyQuotes = [
    { day: 'Thứ Hai', icon: '🌸', text: 'Khởi đầu tuần mới tràn đầy năng lượng, cùng Cô Đỗ Mừng chinh phục kiến thức Tin học 6!' },
    { day: 'Thứ Ba', icon: '💻', text: 'Học đi đôi với hành - Mỗi thao tác chuột, mỗi phím gõ đều mở ra chân trời tri thức mới!' },
    { day: 'Thứ Tư', icon: '🧠', text: 'Sáng tạo không giới hạn với sơ đồ tư duy Mindmap và tư duy thuật toán logic!' },
    { day: 'Thứ Năm', icon: '🛡️', text: 'Internet là kho tàng tri thức vô tận, hãy luôn là người sử dụng thông thái và an toàn số!' },
    { day: 'Thứ Sáu', icon: '🏆', text: 'Chăm chỉ hôm nay, thành tài mai sau - Chúc các em đạt điểm 10 trắc nghiệm môn Tin học!' },
    { day: 'Thứ Bảy', icon: '🎮', text: 'Cuối tuần thư giãn: Vừa chơi game đố vui vừa tích lũy điểm Xu Coins cùng bạn bè!' },
    { day: 'Chủ Nhật', icon: '🎀', text: 'Nghỉ ngơi nạp lại năng lượng để chuẩn bị cho những bài học thú vị trong tuần tới nhé!' }
  ];
  
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const [quoteIndex, setQuoteIndex] = useState<number>(currentDayIndex);

  // 6. Feature: Season Switcher (Mùa tựu trường, Tết, Mùa hè, Mùa thu)
  const [currentSeason, setCurrentSeason] = useState<SeasonType>(() => {
    const month = new Date().getMonth() + 1;
    if (month >= 12 || month <= 2) return 'tet';
    if (month >= 5 && month <= 7) return 'summer';
    return 'school';
  });

  // 7. Feature: Mini Easter Egg "Tìm 3 Trứng Phục Sinh Bí Mật"
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
        origin: { x: 0.15, y: 0.15 },
        colors: ['#FF5288', '#FF7A59', '#FFD700', '#FF69B4']
      });
    }
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
    link.download = 'Hoc_Tin_Hoc_Cung_Co_Do_Mung_Wallpaper_FullHD.png';
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
    <div className="w-full select-none relative overflow-hidden bg-gradient-to-r from-[#FF5E82] via-[#FF7A57] to-[#FFA53B]">
      
      {/* =========================================================================
          MAIN BANNER CONTAINER (Kéo dài vừa khít tràn viền 100% chuẩn 16:2)
          ========================================================================= */}
      <div 
        onClick={handleOpenZoomModal}
        className={`relative w-full aspect-[16/4.5] sm:aspect-[16/3] md:aspect-[16/2] min-h-[145px] max-h-[225px] overflow-hidden cursor-pointer transition-all duration-700 group border-b-2 ${
          isDayTime
            ? 'border-pink-200/90 bg-gradient-to-r from-[#FF5E82] via-[#FF7A57] to-[#FFA53B]'
            : 'border-indigo-400/80 bg-gradient-to-r from-[#2A0845] via-[#6441A5] to-[#FF4E50]'
        }`}
      >
        
        {/* LỚP 1: Bức hình nền 3D nghệ thuật sắc nét */}
        <img
          src="/images/banner_tin6_real.png"
          alt="HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG"
          className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-[1.006]"
          style={{ imageRendering: 'auto' }}
        />

        {/* LỚP 2: KHỐI TYPOGRAPHY 3D SIÊU NÉT Ở GIỮA & CÁC ICON CÔNG NGHỆ BỔ TRỢ */}
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-10 lg:px-16 pointer-events-none z-10">
          
          {/* Cụm Bên Trái: Cô Giáo Cute AI & Bút Thần Kỳ */}
          <div className="flex items-center gap-3 opacity-90 hidden sm:flex">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg animate-pulse-dot">
              <span className="text-xl sm:text-2xl">👩‍🏫</span>
            </div>
            <div className="hidden lg:block text-left text-white drop-shadow-md">
              <div className="text-[11px] font-black tracking-wider uppercase opacity-90">Cô Giáo AI 3D</div>
              <div className="text-xs font-black text-yellow-200">Cô Đỗ Mừng 💖</div>
            </div>
          </div>

          {/* Cụm Ở Giữa: DÒNG CHỮ CHÍNH "HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG" 3D SIÊU RÕ NÉT */}
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-1 sm:space-y-1.5 px-2">
            
            {/* Top Ribbon Badge: Thương hiệu & Khẩu hiệu */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 sm:py-1 rounded-full bg-white/95 text-[#FF5288] text-[10px] sm:text-xs font-black shadow-lg border border-pink-200 backdrop-blur-md transform -translate-y-0.5">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>HỌC VUI • HIỂU NHANH • LÀM GIỎI</span>
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            </div>

            {/* Dòng Chữ 3D Lớn: HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] flex items-center justify-center gap-2">
              <span className="bg-gradient-to-b from-white via-pink-100 to-amber-200 bg-clip-text text-transparent filter drop-shadow-md">
                HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG
              </span>
            </h1>

            {/* Bottom Sub-tag Sách Kết Nối Tri Thức */}
            <div className="hidden sm:flex items-center gap-2 text-white/95 text-[11px] sm:text-xs font-extrabold drop-shadow-md">
              <span className="px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-xs border border-white/30 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-yellow-300" />
                <span>Tin Học 6 • Kết Nối Tri Thức Với Cuộc Sống</span>
              </span>
            </div>

          </div>

          {/* Cụm Bên Phải: Các Icon Sách Vở & Công Nghệ 3D Sắc Nét */}
          <div className="flex items-center gap-2.5 opacity-90 hidden sm:flex">
            <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-1.5 text-white">
              <Laptop className="w-4 h-4 text-cyan-200" />
              <Code2 className="w-4 h-4 text-yellow-200" />
              <Cpu className="w-4 h-4 text-emerald-200" />
            </div>
            <div className="hidden lg:block text-right text-white drop-shadow-md">
              <div className="text-[11px] font-black tracking-wider uppercase opacity-90">Công Nghệ & AI</div>
              <div className="text-xs font-black text-cyan-200">Python • THCS 💻</div>
            </div>
          </div>

        </div>

        {/* =======================================================================
            1. HIỆU ỨNG TIA SÁNG QUÉT NHẸ (SHIMMER SWEEP MỖI 6 GIÂY)
            ======================================================================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <div className="w-1/3 h-[250%] bg-gradient-to-r from-transparent via-white/40 to-transparent absolute -top-1/2 left-0 animate-shimmer-sweep pointer-events-none" />
        </div>

        {/* =======================================================================
            4. HIỆU ỨNG ÁNH SÁNG NGÀY / ĐÊM (DAY / NIGHT OVERLAY & PARTICLES)
            ======================================================================= */}
        {isDayTime ? (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-yellow-200/10 to-transparent mix-blend-overlay" />
            <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-yellow-200 blur-[1px] animate-sunbeam-float" />
            <div className="absolute top-6 right-1/3 w-3 h-3 rounded-full bg-amber-300/80 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-4 left-1/2 w-2.5 h-2.5 rounded-full bg-yellow-100 blur-[1px] animate-sunbeam-float" style={{ animationDelay: '2.8s' }} />
          </div>
        ) : (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-purple-950/15 to-transparent mix-blend-multiply" />
            <div className="absolute top-2.5 left-1/5 text-yellow-200 text-xs animate-star-twinkle">✨</div>
            <div className="absolute top-4 right-1/4 text-amber-200 text-xs animate-star-twinkle" style={{ animationDelay: '0.8s' }}>⭐</div>
            <div className="absolute top-8 left-2/3 text-white text-[10px] animate-star-twinkle" style={{ animationDelay: '1.6s' }}>✨</div>
            <div className="absolute bottom-3 right-1/5 text-yellow-300 text-xs animate-star-twinkle" style={{ animationDelay: '2.1s' }}>⭐</div>
          </div>
        )}

        {/* =======================================================================
            5. EASTER EGG SECRET TARGETS (3 ĐIỂM BÍ MẬT ẨN TRÊN BANNER)
            ======================================================================= */}
        <div 
          onClick={(e) => handleEggClick(e, 1)}
          title="Bí mật 1: Chiếc Laptop Coder"
          className="absolute top-3 right-[18%] w-8 h-8 rounded-full cursor-pointer z-30 hover:ring-2 hover:ring-yellow-300/60 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-xs bg-black/20 backdrop-blur-xs"
        >
          {foundEggs.includes(1) ? '✅' : '❓'}
        </div>

        <div 
          onClick={(e) => handleEggClick(e, 2)}
          title="Bí mật 2: Sách Tin Học THCS"
          className="absolute bottom-4 right-[12%] w-8 h-8 rounded-full cursor-pointer z-30 hover:ring-2 hover:ring-yellow-300/60 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-xs bg-black/20 backdrop-blur-xs"
        >
          {foundEggs.includes(2) ? '✅' : '❓'}
        </div>

        <div 
          onClick={(e) => handleEggClick(e, 3)}
          title="Bí mật 3: Cây Bút Chỉ Bảng Thần Kỳ"
          className="absolute top-[28%] left-[22%] w-8 h-8 rounded-full cursor-pointer z-30 hover:ring-2 hover:ring-yellow-300/60 transition-all opacity-0 hover:opacity-100 flex items-center justify-center text-xs bg-black/20 backdrop-blur-xs"
        >
          {foundEggs.includes(3) ? '✅' : '❓'}
        </div>

        {/* =======================================================================
            BOTTOM-LEFT TOOLBAR: MASCOT VẪY TAY + NHẠC CHÀO MỪNG + NÚT THÍCH
            ======================================================================= */}
        <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-8 z-30 flex items-center gap-2 flex-wrap">
          
          {/* 3D Mascot Interactive Voice Greeting Button */}
          <div 
            onMouseEnter={() => setIsMascotHovered(true)}
            onMouseLeave={() => setIsMascotHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              playCoDoMungGreeting();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#FF5288] font-extrabold text-[11px] sm:text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border border-pink-200 backdrop-blur-md cursor-pointer group/mascot"
          >
            <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#FF5288] group-hover/mascot:scale-110 transition-transform shrink-0">
              <Volume2 className="w-3 h-3 animate-bounce" />
            </div>
            <span className="drop-shadow-xs">▶ Lời Chào Cô Đỗ Mừng 💖</span>
            <span className={`text-sm transition-transform ${isMascotHovered ? 'animate-wave-hand' : ''}`}>
              👋
            </span>
          </div>

          {/* Nút Phát Nhạc Chuông Chào Mừng (Welcome Jingle) */}
          <button
            onClick={handlePlayJingle}
            title="Nghe nhạc chuông vui tai chào mừng"
            className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-blue-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
          >
            <Music className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Nhạc Chào Mừng 🎶</span>
          </button>

          {/* Nút Thích (Like) Banner kèm Pháo Hoa Mini */}
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

          {/* Mascot Speech Bubble on Hover */}
          {isMascotHovered && (
            <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border-2 border-pink-300 text-[11px] font-black text-slate-800 animate-in fade-in zoom-in-95 duration-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Chào em! Chúc em học thật vui nhé! 🌸</span>
            </div>
          )}
        </div>

        {/* =======================================================================
            TOP-LEFT TICKER: LỜI CHÚC & CHÂM NGÔN HỌC TẬP MỖI NGÀY
            ======================================================================= */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            sound.click();
            setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length);
          }}
          title="Bấm để xem câu châm ngôn học tập tiếp theo"
          className="hidden md:flex absolute top-3 left-4 sm:top-4 sm:left-8 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md shadow-md border border-pink-200 text-[11px] font-bold cursor-pointer transition-all hover:scale-102"
        >
          <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pinkBrand-600 font-black text-[10px]">
            {dailyQuotes[quoteIndex].day} {dailyQuotes[quoteIndex].icon}
          </span>
          <span className="text-slate-700 font-medium truncate max-w-xs lg:max-w-sm">
            "{dailyQuotes[quoteIndex].text}"
          </span>
          <span className="text-[10px] text-pinkBrand-500 font-bold ml-1">🎲 Đổi câu</span>
        </div>

        {/* =======================================================================
            TOP RIGHT TOOLBAR: (MÙA LỄ HỘI + NGÀY/ĐÊM + DOWNLOAD HD + ZOOM FULL HD)
            ======================================================================= */}
        <div className="absolute top-3 right-4 sm:top-4 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2">
          
          {/* Bộ Chọn Mùa Lễ Hội (Mùa Tựu Trường / Tết / Hè / Thu) */}
          <select
            onClick={(e) => e.stopPropagation()}
            value={currentSeason}
            onChange={(e) => {
              sound.click();
              setCurrentSeason(e.target.value as SeasonType);
              confetti({ particleCount: 30, spread: 50 });
            }}
            className="px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md outline-none cursor-pointer"
            title="Đổi chủ đề trang phục & mùa lễ hội của nhân vật AI"
          >
            <option value="school">🎒 Mùa Tựu Trường</option>
            <option value="tet">🧧 Tết & Mùa Xuân</option>
            <option value="summer">🪷 Mùa Hè Sôi Động</option>
            <option value="autumn">🍁 Mùa Thu Khai Giảng</option>
          </select>

          {/* Nút Chuyển Đổi Ánh Sáng Ngày / Đêm */}
          <button
            onClick={toggleDayNightMode}
            title={isDayTime ? 'Đang bật: Ánh Sáng Ban Mai ☀️ (Bấm đổi sang Ánh Sao Đêm 🌙)' : 'Đang bật: Ánh Sao Đêm 🌙 (Bấm đổi sang Ánh Ban Mai ☀️)'}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-500 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
          >
            {isDayTime ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="hidden xl:inline text-amber-600">Ban Mai ☀️</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                <span className="hidden xl:inline text-indigo-700">Trăng Sao 🌙</span>
              </>
            )}
          </button>

          {/* Nút Tải Ảnh Banner Làm Hình Nền Máy Tính */}
          <button
            onClick={handleDownloadWallpaper}
            title="Tải ảnh Banner 3D Full HD làm hình nền máy tính phòng Tin học"
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-pinkBrand-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5 text-pinkBrand-500" />
            <span className="hidden xl:inline">Tải Hình Nền HD</span>
          </button>

          {/* Nút Phóng To Xem Banner Full HD */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenZoomModal();
            }}
            title="Phóng to ngắm tranh vẽ 3D Full HD sắc nét"
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 font-extrabold text-[11px] shadow-md border border-pink-200 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden xl:inline">Phóng To</span>
          </button>

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
                  BỨC TRANH 3D NGHỆ THUẬT: HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG (FULL HD)
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
                alt="HỌC TIN HỌC CÙNG CÔ ĐỖ MỪNG FULL HD"
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
          MODAL 2: MỞ KHÓA TRỨNG PHỤC SINH BÍ MẬT (EASTER EGG REWARD MODAL)
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
