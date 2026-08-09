import React, { useState } from 'react';
import { 
  BookOpen, 
  Crown, 
  Newspaper, 
  Gift, 
  Gamepad2, 
  GraduationCap, 
  Sparkles, 
  Download, 
  Play, 
  Award, 
  CheckCircle2, 
  Flame, 
  MousePointer, 
  Keyboard, 
  Cpu,
  Video,
  FileText,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';
import { LessonVideoPlayerView } from './LessonVideoPlayerView';
import { EntertainmentHubView } from './EntertainmentHubView';

export const SpecialTabsView: React.FC = () => {
  const { activeTab, setActiveTab, setIsPracticeModalOpen, setIsQuizModalOpen } = useApp();
  const { currentUser, addCoins, addXP } = useAuth();

  const [librarySubTab, setLibrarySubTab] = useState<'videos' | 'docs'>('videos');

  // 1. 📻 GÓC GIẢI TRÍ & ÂM NHẠC, TRUYỆN KỂ
  if (activeTab === 'entertainment') {
    return <EntertainmentHubView />;
  }

  // 2. 📖 THƯ VIỆN TÀI LIỆU & VIDEO BÀI GIẢNG SGK TIN HỌC 6
  if (activeTab === 'library') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Sub-tab switcher inside Library */}
        <div className="flex items-center gap-2 p-2 bg-white dark:bg-[#151828] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => {
              sound.click();
              setLibrarySubTab('videos');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
              librarySubTab === 'videos'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>🎬 Video Bài Giảng Của Cô Đỗ Mừng</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              setLibrarySubTab('docs');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
              librarySubTab === 'docs'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📚 Kho Tài Liệu SGK PDF & Slide PPT</span>
          </button>
        </div>

        {/* View 1: Video Player */}
        {librarySubTab === 'videos' && <LessonVideoPlayerView />}

        {/* View 2: Documents Download */}
        {librarySubTab === 'docs' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
                  <BookOpen className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span>KHO HỌC LIỆU SỐ TIN HỌC 6</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Thư Viện Tài Liệu SGK Kết Nối Tri Thức</h2>
                <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed">
                  Tải về trọn bộ Sách giáo khoa PDF, Sơ đồ tư duy 6 chủ đề, slide bài giảng của Cô Đỗ Mừng và đề cương ôn tập có đáp án chi tiết.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('lessons')}
                className="px-6 py-3 rounded-full bg-white text-blue-600 font-extrabold text-xs shadow-md hover:bg-blue-50 transition-all hover:scale-105 shrink-0"
              >
                Vào Học Các Bài Giảng
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Sách Giáo Khoa Tin Học 6 PDF (Bản Chuẩn)', type: 'PDF • 45MB', desc: 'Đầy đủ 17 bài học 6 chủ đề chuẩn Bộ Giáo Dục', icon: '📘' },
                { title: 'Trọn Bộ Sơ Đồ Tư Duy Mindmap 6 Chủ Đề', type: 'Mindmap • 15MB', desc: 'Tóm tắt bài học trực quan bằng hình ảnh màu sắc', icon: '🗺️' },
                { title: 'Đề Cương Ôn Tập Học Kỳ 1 & 2 Có Lời Giải', type: 'DOCX • 5MB', desc: 'Tổng hợp câu hỏi lý thuyết và bài tập trắc nghiệm', icon: '📝' },
                { title: 'Phần Mềm Luyện Gõ 10 Ngón & Chuột Máy Tính', type: 'Zip • 8MB', desc: 'Rèn luyện kỹ năng thao tác máy tính cơ bản', icon: '⌨️' },
                { title: 'Slide Bài Giảng PowerPoint Động Cô Đỗ Mừng', type: 'PPTX • 60MB', desc: 'Hoạt hình minh họa các khối phần cứng và thuật toán', icon: '📊' },
                { title: 'Ngân Hàng 200 Câu Trắc Nghiệm Tin 6 Có Đáp Án', type: 'PDF • 12MB', desc: 'Phân hóa từ mức độ Nhận biết đến Vận dụng cao', icon: '❓' }
              ].map((doc, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{doc.icon}</span>
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg">{doc.type}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug">{doc.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.desc}</p>
                  </div>

                  <button 
                    onClick={() => {
                      sound.click();
                      alert(`Đang chuẩn bị tải xuống: ${doc.title}`);
                    }}
                    className="w-full py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Về Máy</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. 🎓 LUYỆN TẬP
  if (activeTab === 'practice') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <GraduationCap className="w-4 h-4 text-yellow-300" />
              <span>PHÒNG THỰC HÀNH 3 TRONG 1</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Luyện Tập Kỹ Năng Máy Tính Chuẩn SGK</h2>
            <p className="text-xs md:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Trang bị các bài tập tương tác: Phân loại linh kiện phần cứng, Luyện phản xạ chuột và Game rèn gõ 10 ngón siêu tốc.
            </p>
          </div>
          <button
            onClick={() => setIsPracticeModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white text-emerald-700 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-all hover:scale-105 shrink-0"
          >
            Mở Phòng Thực Hành Ngay
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">1. Kéo Thả Phân Loại Thiết Bị</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Thực hành phân loại đúng 4 nhóm thiết bị: Thiết bị vào, Thiết bị ra, Thân máy CPU và Bộ nhớ lưu trữ.</p>
            <span className="text-xs font-bold text-emerald-600 inline-block">Chơi ngay ➔</span>
          </div>

          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MousePointer className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">2. Thử Thách Phản Xạ Chuột</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Rèn luyện tốc độ nháy chuột, nháy đúp và kéo thả đối tượng chính xác trong 30 giây.</p>
            <span className="text-xs font-bold text-blue-600 inline-block">Chơi ngay ➔</span>
          </div>

          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Keyboard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">3. Đua Tốc Độ Gõ Phím 10 Ngón</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Gõ đúng các từ khóa Tin học lớp 6 chuẩn quy tắc tiếng Việt Telex, đo tốc độ WPM.</p>
            <span className="text-xs font-bold text-amber-600 inline-block">Chơi ngay ➔</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. 👑 TRÒ CHƠI (VIP)
  if (activeTab === 'games') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 backdrop-blur-md text-xs font-black">
              <Crown className="w-4 h-4 text-white fill-white" />
              <span>KHU VỰC TRÒ CHƠI VIP & ĐỐ VUI TIN HỌC</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Vừa Chơi Vừa Học Cùng Cô Đỗ Mừng</h2>
            <p className="text-xs md:text-sm text-slate-900 max-w-xl leading-relaxed font-semibold">
              Hệ thống mini-game trí tuệ: Ai là triệu phú Tin học 6, Đuổi hình bắt chữ công nghệ và Ghép nối thuật toán logic.
            </p>
          </div>
          <button
            onClick={() => setIsQuizModalOpen(true)}
            className="px-6 py-3 rounded-full bg-slate-950 text-white font-extrabold text-xs shadow-md hover:bg-slate-900 transition-all hover:scale-105 shrink-0"
          >
            Vào Chơi Game Đố Vui
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Ai Là Triệu Phú Tin Học 6', desc: '15 Câu hỏi trắc nghiệm thử thách độ hiểu biết với 3 quyền trợ giúp', badge: 'HOT 🏆', color: 'from-amber-500 to-orange-500' },
            { title: 'Đuổi Hình Bắt Chữ Công Nghệ', desc: 'Nhìn hình đoán thuật ngữ phần cứng, phần mềm và mạng Internet', badge: 'MỚI 🌟', color: 'from-blue-500 to-indigo-500' },
            { title: 'Ghép Nối Thuật Toán Robot', desc: 'Xếp các khối lệnh tuần tự, rẽ nhánh giúp chú robot về đích an toàn', badge: 'TRÍ TUỆ 🧠', color: 'from-purple-500 to-pink-500' }
          ].map((game, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">{game.badge}</span>
                  <Crown className="w-5 h-5 text-amber-500" />
                </div>
                <h4 className="text-base font-extrabold text-slate-800 dark:text-white">{game.title}</h4>
                <p className="text-xs text-slate-500">{game.desc}</p>
              </div>

              <button 
                onClick={() => setIsQuizModalOpen(true)}
                className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Bắt Đầu Chơi (+30 Coins)</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. 📰 BẢNG TIN
  if (activeTab === 'news') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Newspaper className="w-4 h-4 text-yellow-300" />
            <span>BẢNG TIN CÔNG NGHỆ & THÔNG BÁO HỌC TẬP</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Tin Tức Công Nghệ Mới & Lời Nhắn Từ Cô Đỗ Mừng</h2>
          <p className="text-xs md:text-sm text-indigo-100 max-w-xl leading-relaxed">
            Cập nhật những xu hướng công nghệ mới nhất, ứng dụng AI trong học tập và lịch kiểm tra định kỳ của khối 6.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: '🌸 Thông báo: Lịch kiểm tra giữa học kỳ 1 môn Tin Học 6',
              date: '09/08/2026 • Cô Đỗ Mừng',
              content: 'Các em học sinh khối 6 lưu ý ôn tập kỹ Chủ đề A (Máy tính và em) và Chủ đề B (Mạng máy tính và Internet). Đề kiểm tra gồm 20 câu trắc nghiệm và 1 bài tập vẽ sơ đồ tư duy thực hành.'
            },
            {
              title: '🤖 Trí tuệ nhân tạo AI đang thay đổi trường học như thế nào?',
              date: '08/08/2026 • Ban biên tập Tin học',
              content: 'Khám phá cách các bạn học sinh ứng dụng AI để tra cứu thông tin nhanh, học tiếng Anh và tạo bài thuyết trình trực quan sinh động.'
            },
            {
              title: '🛡️ 5 Quy tắc vàng giúp học sinh an toàn khi sử dụng mạng xã hội',
              date: '05/08/2026 • Chuyên đề An toàn số',
              content: 'Bảo vệ mật khẩu cá nhân, không chia sẻ thông tin nhạy cảm và cách ứng xử văn minh khi tham gia các nhóm học tập trên Zalo/Facebook.'
            },
            {
              title: '🏆 Vinh danh 10 bạn đạt điểm tuyệt đối bài kiểm tra thực hành gõ phím',
              date: '01/08/2026 • Ban thi đua',
              content: 'Chúc mừng các bạn Nguyễn Gia Bảo (6A1), Đặng Mai Linh (6A2), Trần Minh Ánh (6A1)... đã đạt tốc độ gõ trên 45 từ/phút.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 hover:shadow-md transition-all">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{item.date}</span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white leading-snug">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. 🎁 QUÀ TẶNG
  if (activeTab === 'gifts') {
    const handleDailyCheckin = () => {
      sound.victory();
      addCoins(50);
      addXP(30, 'Điểm danh chuyên cần mỗi ngày');
      alert('🎉 Chúc mừng em đã điểm danh thành công hôm nay! (+50 Coins, +30 XP) 💖');
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <Gift className="w-4 h-4 text-yellow-300" />
              <span>QUÀ TẶNG & ĐIỂM DANH CHUYÊN CẦN MỖI NGÀY</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Ví Xu Thưởng & Đổi Quà Cùng Cô Đỗ Mừng</h2>
            <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed">
              Tích lũy Xu Coins qua việc điểm danh đều đặn mỗi ngày, đạt điểm cao trong các bài kiểm tra để đổi lấy những phần quà học tập hấp dẫn!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center shrink-0 space-y-1">
            <span className="text-xs font-bold text-pink-100">Ví Xu Của Em:</span>
            <div className="text-3xl font-black text-yellow-300 flex items-center justify-center gap-1.5">
              <span>🪙 {currentUser.coins}</span>
              <span className="text-xs text-white">Xu</span>
            </div>
          </div>
        </div>

        {/* Checkin card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pinkBrand-500 flex items-center justify-center shrink-0 text-2xl">
              📅
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Điểm Danh Chuyên Cần Hôm Nay</h4>
              <p className="text-xs text-slate-500">Nhận ngay +50 Xu Coins & +30 XP khi duy trì chuỗi học tập đều đặn.</p>
            </div>
          </div>

          <button
            onClick={handleDailyCheckin}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-black text-xs shadow-md transition-all hover:scale-105 shrink-0"
          >
            🎁 Nhận Quà Điểm Danh Ngay
          </button>
        </div>

        {/* Gift Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Khung Avatar Trợ Lý AI Cute', cost: '150 Xu', icon: '🤖' },
            { title: 'Huy Hiệu "Bàn Phím Vàng 2026"', cost: '300 Xu', icon: '⌨️' },
            { title: 'Quyền Mở Khóa Đề Thi Học Sinh Giỏi', cost: '500 Xu', icon: '📜' },
            { title: 'Phiếu Khen Thưởng Cô Đỗ Mừng', cost: '800 Xu', icon: '🎀' }
          ].map((gift, i) => (
            <div key={i} className="p-5 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-center flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-3xl block">{gift.icon}</span>
                <h5 className="text-xs font-black text-slate-800 dark:text-white">{gift.title}</h5>
                <span className="text-[11px] font-extrabold text-amber-500">{gift.cost}</span>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  alert(`Đã đổi thành công: ${gift.title}! 🌸`);
                }}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-pink-50 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
              >
                Đổi Quà
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
