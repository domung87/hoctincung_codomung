import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  BookOpen, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Heart, 
  Smile, 
  Coffee, 
  Headphones, 
  Radio, 
  Compass, 
  Award, 
  CheckCircle2, 
  Flame,
  Volume1
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

// Interface for Music Track
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  mood: string;
  color: string;
  icon: string;
  frequencies: number[]; // Synthesizer frequencies for background ambient sound
}

// Interface for Story
export interface TechStory {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  moral: string;
  icon: string;
  likes: number;
}

export const EntertainmentHubView: React.FC = () => {
  const { addCoins, addXP } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'music' | 'stories'>('music');

  // Music Player State
  const tracks: MusicTrack[] = [
    {
      id: 'lofi-1',
      title: 'Lo-Fi Học Bài Thư Giãn (Study Chill Beats)',
      artist: 'SkillSet Kids Relaxing',
      genre: 'Lo-Fi Hip Hop',
      duration: '03:45',
      mood: 'Tập trung cao độ 🧠',
      color: 'from-purple-500 to-indigo-600',
      icon: '🎧',
      frequencies: [261.63, 329.63, 392.00, 523.25] // C - E - G - C
    },
    {
      id: 'mozart-1',
      title: 'Khúc Nhạc Mozart Kích Thích Trí Tuệ Logic',
      artist: 'Classic Brainwaves for Kids',
      genre: 'Giao hưởng êm dịu',
      duration: '04:12',
      mood: 'Sáng tạo thuật toán 💡',
      color: 'from-blue-500 to-cyan-600',
      icon: '🎼',
      frequencies: [440.00, 554.37, 659.25, 880.00] // A major
    },
    {
      id: 'rain-1',
      title: 'Âm Thanh Tiếng Mưa Rơi Êm Dịu Bên Cửa Sổ',
      artist: 'Nature Sounds',
      genre: 'Tiếng ồn trắng thiên nhiên',
      duration: '05:00',
      mood: 'Bình yên thư thái 🌧️',
      color: 'from-teal-500 to-emerald-600',
      icon: '🌧️',
      frequencies: [174.61, 220.00, 261.63, 349.23] // F major
    },
    {
      id: 'ocean-1',
      title: 'Tiếng Sóng Biển Hoàng Hôn & Gió Mát',
      artist: 'Peaceful Waves',
      genre: 'Âm thanh đại dương',
      duration: '04:30',
      mood: 'Xua tan mệt mỏi 🌊',
      color: 'from-amber-500 to-orange-600',
      icon: '🌊',
      frequencies: [392.00, 493.88, 587.33, 783.99] // G major
    },
    {
      id: 'kid-1',
      title: 'Bài Ca Chiếc Máy Tính Nhỏ Của Cô Đỗ Mừng',
      artist: 'Cô Đỗ Mừng & Các Học Trò',
      genre: 'Nhạc thiếu nhi vui nhộn',
      duration: '02:50',
      mood: 'Học vui tràn đầy năng lượng 🌸',
      color: 'from-pink-500 to-rose-600',
      icon: '🎀',
      frequencies: [523.25, 659.25, 783.99, 1046.50] // C major chime
    }
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [progress, setProgress] = useState<number>(25);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio Context for Ambient Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Stories State
  const stories: TechStory[] = [
    {
      id: 'story-1',
      title: 'Chiếc Máy Tính Đầu Tiên To Bằng Cả Một Căn Phòng!',
      category: 'Lịch Sử Công Nghệ 🖥️',
      readTime: '3 phút đọc',
      summary: 'Khám phá cỗ máy ENIAC huyền thoại nặng 30 tấn và sự tiến hóa kỳ diệu đến chiếc laptop nhỏ gọn trên bàn học của em hôm nay.',
      content: [
        'Vào năm 1946, chiếc máy tính điện tử đa năng đầu tiên trên thế giới mang tên ENIAC ra đời tại nước Mỹ. Nó không hề nhỏ bé như chiếc máy tính em đang dùng đâu nhé!',
        'ENIAC nặng tới 30 tấn, chiếm diện tích bằng cả một căn phòng học lớn (hơn 160 mét vuông) và chứa gần 18.000 bóng đèn chân không tỏa nhiệt nóng như một lò sưởi khổng lồ.',
        'Mỗi lần ENIAC hoạt động, đèn điện của cả thành phố xung quanh đều bị chớp tắt vì nó tiêu tốn quá nhiều điện năng.',
        'Nhờ sự phát minh ra chip vi xử lý silicon siêu nhỏ, ngày nay một chiếc điện thoại hay máy tính bảng trong lòng bàn tay các em có sức mạnh tính toán gấp hàng triệu lần cỗ máy ENIAC khổng lồ ngày xưa!'
      ],
      moral: '💡 Bài học: Công nghệ luôn phát triển vượt bậc nhờ trí tưởng tượng và sự sáng tạo không ngừng của con người.',
      icon: '🖥️',
      likes: 342
    },
    {
      id: 'story-2',
      title: 'Bí Mật Về Biểu Tượng "Quả Táo Khuyết" Của Hãng Apple',
      category: 'Hồ Sơ Danh Nhân 🍎',
      readTime: '2 phút đọc',
      summary: 'Tại sao quả táo của Steve Jobs lại bị cắn một miếng? Câu chuyện thú vị đằng sau logo nổi tiếng nhất thế giới công nghệ.',
      content: [
        'Nhiều bạn học sinh thường thắc mắc: Tại sao biểu tượng của hãng công nghệ Apple lại là một quả táo bị khuyết một góc mà không phải một quả táo nguyên vẹn?',
        'Nhà thiết kế Rob Janoff - người vẽ nên logo này đã chia sẻ một lý do vô cùng hóm hỉnh: Ông vẽ quả táo có vết cắn để mọi người không bị nhầm lẫn nó với quả cherry (quả anh đào) hay quả cà chua!',
        'Đồng thời, trong tiếng Anh, từ "vết cắn" là "Bite" phát âm hoàn toàn giống với từ "Byte" - đơn vị đo dung lượng thông tin cơ bản trong môn Tin học mà các em đã được Cô Đỗ Mừng giảng dạy!',
        'Một sự trùng hợp ngẫu nhiên nhưng đã tạo nên một biểu tượng công nghệ bất hủ khắp toàn cầu.'
      ],
      moral: '💡 Bài học: Sự đơn giản và khác biệt chính là chìa khóa tạo nên những điều phi thường.',
      icon: '🍎',
      likes: 512
    },
    {
      id: 'story-3',
      title: 'Truyện Ngụ Ngôn 4.0: Chú Rùa Và Thỏ Thi Gõ Phím 10 Ngón',
      category: 'Truyện Vui Học Đường 🐢',
      readTime: '3 phút đọc',
      summary: 'Thỏ cậy ngón tay nhanh nhưng gõ mổ cò 2 ngón, Rùa kiên trì luyện đúng 10 ngón theo lời Cô Đỗ Mừng. Ai sẽ là người chiến thắng?',
      content: [
        'Trong lớp học Tin học rừng xanh, Thỏ khoe khoang rằng mình có đôi tai thính và ngón tay lanh lẹ nhất trường. Thỏ thách đấu Rùa xem ai gõ xong một đoạn văn bản Tin học 6 nhanh hơn.',
        'Khi cuộc thi bắt đầu, Thỏ dùng 2 ngón tay trỏ "mổ cò" lia lịa xuống bàn phím. Tiếng gõ lách cách vang dội, Thỏ vừa gõ vừa phải cúi gập mắt nhìn xuống bàn phím tìm từng chữ.',
        'Trong khi đó, bạn Rùa bình tĩnh đặt đúng 8 ngón tay lên hàng phím cơ sở (A S D F - J K L ;) và dùng 2 ngón cái điều khiển phím Cách (Spacebar). Rùa không cần nhìn bàn phím mà mắt chỉ tập trung nhìn thẳng vào màn hình.',
        'Chỉ sau 2 phút, Thỏ bị mỏi mắt, gõ sai chính tả liên tục và phải bấm phím Backspace xóa lại từ đầu. Còn Rùa với kỹ năng gõ 10 ngón điêu luyện đã hoàn thành bài thi với độ chính xác 100% và tốc độ 50 từ/phút!'
      ],
      moral: '💡 Lời dặn của Cô Đỗ Mừng: "Học đúng phương pháp ngay từ đầu sẽ giúp em đi xa và nhanh hơn gấp nhiều lần việc làm vội vàng."'
      ,
      icon: '🐢',
      likes: 628
    },
    {
      id: 'story-4',
      title: 'Vì Sao Lỗi Phần Mềm Lại Được Gọi Là "Con Bọ" (Bug)?',
      category: 'Chuyện Lạ Tin Học 🪲',
      readTime: '2 phút đọc',
      summary: 'Nguồn gốc thực sự của từ Bug và Debug trong ngành lập trình mà mọi coder trên thế giới đều biết.',
      content: [
        'Khi lập trình gặp lỗi, các kỹ sư thường nói "Chương trình bị dính Bug" và tiến hành "Debug" để sửa lỗi. Vậy từ này bắt nguồn từ đâu?',
        'Vào năm 1947, khi nữ tiến sĩ khoa học máy tính Grace Hopper đang làm việc với cỗ máy tính khổng lồ Mark II tại Đại học Harvard, máy bỗng nhiên ngừng chạy.',
        'Sau hàng giờ tìm kiếm nguyên nhân, nhóm kỹ sư phát hiện một... con bướm đêm thật bị kẹt bên trong rơ-le điện của máy tính. Họ đã gắp con bọ ra và dán vào cuốn sổ nhật ký làm việc với ghi chú: "Trường hợp con bọ (Bug) thực tế đầu tiên được tìm thấy!".',
        'Kể từ ngày hôm đó, từ "Bug" chính thức trở thành thuật ngữ chỉ mọi lỗi trong phần mềm và "Debug" là công việc diệt bọ sửa lỗi của các lập trình viên.'
      ],
      moral: '💡 Bài học: Đừng sợ khi bài tập Tin học của em bị báo lỗi. Hãy kiên nhẫn tìm "con bọ" và sửa lại thật hoàn hảo nhé!',
      icon: '🪲',
      likes: 475
    }
  ];

  const [selectedStoryId, setSelectedStoryId] = useState<string>(stories[0].id);
  const [storyReadRewardGiven, setStoryReadRewardGiven] = useState<string[]>([]);

  const activeStory = stories.find(s => s.id === selectedStoryId) || stories[0];

  // Synthesizer Audio Controller
  const startSynthMusic = (track: MusicTrack) => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      // Stop previous oscillators
      oscillatorRefs.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      oscillatorRefs.current = [];

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : (volume / 100) * 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create gentle chord tones
      track.frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle volume modulation
        oscGain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscillatorRefs.current.push(osc);
      });
    } catch (e) {
      console.log('Synthesizer audio ready');
    }
  };

  const stopSynthMusic = () => {
    oscillatorRefs.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    oscillatorRefs.current = [];
  };

  const togglePlayMusic = () => {
    sound.click();
    if (isPlaying) {
      stopSynthMusic();
      setIsPlaying(false);
    } else {
      startSynthMusic(tracks[currentTrackIndex]);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    sound.click();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      startSynthMusic(tracks[nextIdx]);
    }
  };

  const handlePrevTrack = () => {
    sound.click();
    const prevIdx = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIdx);
    if (isPlaying) {
      startSynthMusic(tracks[prevIdx]);
    }
  };

  // Progress bar auto simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Clean up audio when unmounting
  useEffect(() => {
    return () => {
      stopSynthMusic();
    };
  }, []);

  // Reward coins when finishing reading a story
  const handleClaimStoryReward = (storyId: string) => {
    if (storyReadRewardGiven.includes(storyId)) {
      alert('Em đã nhận thưởng cho câu chuyện này rồi nhé! 🌸');
      return;
    }

    sound.victory();
    addCoins(30);
    addXP(20, `Đọc xong mẩu chuyện ${activeStory.title}`);
    setStoryReadRewardGiven([...storyReadRewardGiven, storyId]);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    alert(`🎉 Chúc mừng em đã hoàn thành bài đọc! (+30 Xu Coins, +20 XP) 💖`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Banner Góc Giải Trí */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-pink-300/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>GÓC GIẢI TRÍ & THƯ GIÃN HỌC ĐƯỜNG 🌸</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Âm Nhạc Thư Giãn & Kho Chuyện Kể Công Nghệ</h2>
          <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed">
            Sau những giờ học tập và làm bài tập Tin học hăng say, hãy cùng Cô Đỗ Mừng lắng nghe những giai điệu êm dịu và khám phá những câu chuyện công nghệ kỳ thú nhé!
          </p>
        </div>

        {/* Quick Tab Switcher Button */}
        <div className="flex items-center gap-2 p-1.5 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shrink-0">
          <button
            onClick={() => {
              sound.click();
              setActiveSubTab('music');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'music'
                ? 'bg-white text-purple-700 shadow-md scale-105'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>📻 Góc Âm Nhạc</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setActiveSubTab('stories');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'stories'
                ? 'bg-white text-purple-700 shadow-md scale-105'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Truyện Cười & Chuyện Kể</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: GÓC ÂM NHẠC THƯ GIÃN & LO-FI STUDY PLAYER
          ========================================================================= */}
      {activeSubTab === 'music' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Music Player Card (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#151828] rounded-3xl p-6 md:p-8 border-2 border-purple-200 dark:border-slate-800 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" />
                <span>Đang phát • {tracks[currentTrackIndex].genre}</span>
              </span>

              <span className="text-xs text-slate-400 font-bold">
                {tracks[currentTrackIndex].mood}
              </span>
            </div>

            {/* Vinyl Record Spinning Graphic */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
              <div className="relative">
                {/* Vinyl Disc with 3D Spin */}
                <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-slate-950 p-2 shadow-2xl border-4 border-slate-800 flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin' : ''
                }`} style={{ animationDuration: '8s' }}>
                  {/* Vinyl grooves */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-slate-700/80 flex items-center justify-center p-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl shadow-inner">
                      {tracks[currentTrackIndex].icon}
                    </div>
                  </div>
                  {/* Center needle dot */}
                  <div className="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-slate-900" />
                </div>

                {/* Tone Arm Icon indicator */}
                <div className="absolute -top-2 -right-2 p-2 rounded-full bg-amber-400 text-slate-950 shadow-md">
                  <Music className="w-4 h-4 animate-bounce" />
                </div>
              </div>

              {/* Track Meta Info */}
              <div className="text-center sm:text-left space-y-1.5 max-w-xs">
                <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white leading-snug">
                  {tracks[currentTrackIndex].title}
                </h3>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {tracks[currentTrackIndex].artist}
                </p>
                <div className="text-[11px] text-slate-400 font-medium pt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>Thời lượng: {tracks[currentTrackIndex].duration}</span>
                  <span>•</span>
                  <span>Âm thanh êm dịu</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                <span>01:15</span>
                <span>{tracks[currentTrackIndex].duration}</span>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="flex items-center justify-between pt-2">
              {/* Volume Mute Toggle */}
              <button
                onClick={() => {
                  sound.click();
                  setIsMuted(!isMuted);
                  if (gainNodeRef.current && audioCtxRef.current) {
                    gainNodeRef.current.gain.setValueAtTime(isMuted ? (volume / 100) * 0.12 : 0, audioCtxRef.current.currentTime);
                  }
                }}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 text-slate-600 dark:text-slate-300 transition-colors"
                title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-purple-600" />}
              </button>

              {/* Main Playback Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevTrack}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 text-slate-700 dark:text-slate-200 transition-all hover:scale-105"
                  title="Bài trước"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlayMusic}
                  className="p-4 sm:p-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                  title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 text-slate-700 dark:text-slate-200 transition-all hover:scale-105"
                  title="Bài tiếp theo"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Slogan */}
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-black text-pink-600 bg-pink-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-pink-200">
                  🌸 Học Vui Hiểu Sâu
                </span>
              </div>
            </div>

          </div>

          {/* Playlist Tracks List (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#151828] rounded-3xl p-6 border-2 border-purple-200 dark:border-slate-800 shadow-lg space-y-4">
            <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-600" />
                <span>Danh Sách 5 Bản Nhạc Thư Giãn</span>
              </span>
              <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                5 Bài
              </span>
            </h4>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
              {tracks.map((track, idx) => {
                const isCurrent = currentTrackIndex === idx;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      sound.click();
                      setCurrentTrackIndex(idx);
                      if (isPlaying) {
                        startSynthMusic(track);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      isCurrent
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-400 shadow-sm scale-[1.02]'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700 hover:border-purple-200'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      isCurrent ? 'bg-purple-600 text-white shadow-md' : 'bg-white dark:bg-slate-700 text-slate-700'
                    }`}>
                      {track.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className={`text-xs font-bold truncate ${isCurrent ? 'text-purple-700 dark:text-purple-300' : 'text-slate-800 dark:text-white'}`}>
                        {track.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {track.artist} • {track.duration}
                      </span>
                    </div>

                    {isCurrent && isPlaying && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:bg-slate-800/40 border border-pink-200 text-center text-xs text-slate-600 dark:text-slate-300">
              💡 <em>"Vừa nghe nhạc êm dịu vừa giải bài tập Tin học giúp não bộ tiếp thu nhanh gấp đôi!"</em>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: KHO CÂU CHUYỆN VUI & TRUYỆN KỂ CÔNG NGHỆ
          ========================================================================= */}
      {activeSubTab === 'stories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Stories List Sidebar (Left 4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#151828] rounded-3xl p-5 border-2 border-pink-200 dark:border-slate-800 shadow-lg space-y-3">
            <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <BookOpen className="w-4 h-4 text-pinkBrand-500" />
              <span>Kho 4 Mẩu Chuyện Kỳ Thú</span>
            </h4>

            <div className="space-y-2.5">
              {stories.map(story => {
                const isSelected = selectedStoryId === story.id;
                const isClaimed = storyReadRewardGiven.includes(story.id);

                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      sound.click();
                      setSelectedStoryId(story.id);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-pinkBrand-50/90 dark:bg-pinkBrand-950/40 border-pinkBrand-400 shadow-md scale-[1.01]'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700 hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{story.icon}</span>
                      <span className="text-[9px] font-black text-pinkBrand-600 bg-pink-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {story.readTime}
                      </span>
                    </div>

                    <h5 className="text-xs font-black text-slate-800 dark:text-white leading-snug line-clamp-2">
                      {story.title}
                    </h5>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{story.category.split(' ')[0]}</span>
                      {isClaimed ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Đã nhận thưởng
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold">+30 Xu 🪙</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Story Reading Detail View (Right 8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#151828] rounded-3xl p-6 md:p-8 border-2 border-pink-200 dark:border-slate-800 shadow-lg space-y-6">
            
            {/* Story Header */}
            <div className="space-y-2 pb-4 border-b border-pink-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pinkBrand-50 text-pinkBrand-600 text-xs font-black border border-pink-200">
                  {activeStory.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  ⏱️ {activeStory.readTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white leading-tight">
                {activeStory.title}
              </h3>
            </div>

            {/* Story Summary Card */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/40 border border-amber-200 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
              📝 <strong>Tóm tắt:</strong> {activeStory.summary}
            </div>

            {/* Story Full Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {activeStory.content.map((p, pIdx) => (
                <p key={pIdx} className="bg-slate-50/50 dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {p}
                </p>
              ))}
            </div>

            {/* Moral Lesson / Cô Đỗ Mừng Lời Khuyên */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:bg-slate-800/50 border-2 border-pink-200 space-y-1">
              <span className="text-xs font-black text-pinkBrand-600 uppercase tracking-wider block">
                🌸 Bài Học & Lời Dặn Từ Cô Đỗ Mừng:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                {activeStory.moral}
              </p>
            </div>

            {/* Claim Reward Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.click();
                    alert('Cảm ơn em đã yêu thích mẩu chuyện này! 🌸');
                  }}
                  className="px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pinkBrand-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-pinkBrand-500" />
                  <span>{activeStory.likes} Thích</span>
                </button>
              </div>

              <button
                onClick={() => handleClaimStoryReward(activeStory.id)}
                disabled={storyReadRewardGiven.includes(activeStory.id)}
                className={`px-6 py-3 rounded-full font-black text-xs shadow-md transition-all flex items-center gap-2 ${
                  storyReadRewardGiven.includes(activeStory.id)
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 hover:scale-105'
                }`}
              >
                {storyReadRewardGiven.includes(activeStory.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã Hoàn Thành Bài Đọc</span>
                  </>
                ) : (
                  <>
                    <span>🎁 Xác Nhận Đã Đọc Xong (+30 Xu)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
