import React from 'react';
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
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const SpecialTabsView: React.FC = () => {
  const { activeTab, setActiveTab, setIsPracticeModalOpen, setIsQuizModalOpen } = useApp();
  const { currentUser, addCoins, addXP } = useAuth();

  // 1. 📖 THƯ VIỆN TÀI LIỆU SGK TIN HỌC 6
  if (activeTab === 'library') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
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
            { title: 'Sách Giáo Khoa Tin Học 6 PDF (Bản Chuẩn)', type: 'PDF • 45MB', desc: 'Đầy đủ 15 bài học 6 chủ đề chuẩn Bộ Giáo Dục', icon: '📘' },
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
                  alert(`Đang tải xuống tài liệu: "${doc.title}" 🌸`);
                }}
                className="w-full py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Tài Liệu Về Máy</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. 🎓 LUYỆN TẬP
  if (activeTab === 'practice') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <GraduationCap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>KHÔNG GIAN LUYỆN TẬP KỸ NĂNG TIN HỌC 6</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Phòng Luyện Tập Tương Tác 3 Trong 1</h2>
            <p className="text-xs md:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Rèn luyện phản xạ click chuột nhanh, luyện gõ phím 10 ngón Tiếng Việt và phân loại chính xác các linh kiện phần cứng máy tính.
            </p>
          </div>
          <button 
            onClick={() => setIsPracticeModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white text-emerald-700 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-all hover:scale-105 shrink-0"
          >
            Mở Phòng Luyện Tập Ngay
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-emerald-100 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">1. Phân Loại Phần Cứng Máy Tính</h4>
            <p className="text-xs text-slate-500">Kéo thả phân biệt Thiết bị vào, Thiết bị ra và Thân máy CPU.</p>
            <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">Luyện tập ngay →</span>
          </div>

          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-cyan-100 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <MousePointer className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">2. Luyện Chuột Siêu Tốc (Mouse Clicker)</h4>
            <p className="text-xs text-slate-500">Rèn luyện tốc độ nháy chuột, nháy đúp và độ chính xác của tay cầm chuột.</p>
            <span className="text-xs font-bold text-cyan-600 inline-flex items-center gap-1">Luyện tập ngay →</span>
          </div>

          <div 
            onClick={() => setIsPracticeModalOpen(true)}
            className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <Keyboard className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">3. Luyện Gõ Bàn Phím 10 Ngón</h4>
            <p className="text-xs text-slate-500">Tập gõ các câu châm ngôn công nghệ nhanh và chuẩn xác từng ký tự.</p>
            <span className="text-xs font-bold text-amber-600 inline-flex items-center gap-1">Luyện tập ngay →</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. 👑 TRÒ CHƠI LIÊN QUAN ĐẾN BÀI HỌC
  if (activeTab === 'games') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <Crown className="w-4 h-4 text-yellow-200 fill-yellow-200" />
              <span>TRÒ CHƠI GIÁO DỤC TIN HỌC 6 (GAMIFICATION)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Đấu Trường Trò Chơi Trí Tuệ Công Nghệ</h2>
            <p className="text-xs md:text-sm text-amber-100 max-w-xl leading-relaxed">
              Vừa chơi vừa học! Vượt qua các câu hỏi hóc búa, ghép nối thuật toán và leo đỉnh bảng vàng nhận điểm thưởng XP & Coins.
            </p>
          </div>
          <button 
            onClick={() => setIsQuizModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white text-amber-700 font-extrabold text-xs shadow-md hover:bg-amber-50 transition-all hover:scale-105 shrink-0"
          >
            Chơi Thử Đố Vui Tin Học
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              title: '🏆 Ai Là Triệu Phú Tin Học 6',
              desc: 'Vượt qua 15 câu hỏi chinh phục giải thưởng 9999 XP cùng Cô Đỗ Mừng!',
              tag: 'Game Trí Tuệ',
              coins: '+100 Coins',
              icon: '👑'
            },
            {
              title: '🧩 Ghép Nối Khối Lệnh Thuật Toán',
              desc: 'Kéo thả các khối Tuần tự, Rẽ nhánh (Nếu...Thì) để đưa nhân vật về đích.',
              tag: 'Tư Duy Logic',
              coins: '+80 Coins',
              icon: '🧩'
            },
            {
              title: '🔍 Đuổi Hình Bắt Chữ Phần Cứng',
              desc: 'Nhìn hình ảnh linh kiện đoán đúng tên gọi và chức năng trong máy tính.',
              tag: 'Khám Phá',
              coins: '+60 Coins',
              icon: '🖥️'
            }
          ].map((game, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{game.icon}</span>
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg">{game.tag}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{game.title}</h4>
                <p className="text-xs text-slate-500">{game.desc}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-extrabold text-amber-500">{game.coins}</span>
                <button
                  onClick={() => setIsQuizModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition-all"
                >
                  Vào Chơi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. 📰 BẢNG TIN
  if (activeTab === 'news') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <span>Bảng Tin Công Nghệ & Giáo Dục Tin Học 6</span>
          </h3>
          <p className="text-xs text-slate-400">Các thông báo mới nhất từ Cô Đỗ Mừng và kiến thức công nghệ AI thú vị</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: '🌸 Lịch kiểm tra thực hành Tin học 6 giữa kỳ 1',
              date: '09/08/2026',
              desc: 'Các em học sinh ôn tập kỹ Chủ đề A (Phần cứng) và Chủ đề B (Mạng máy tính) để làm bài thực hành tốt nhé.',
              tag: 'Thông Báo Lớp'
            },
            {
              title: '🤖 Khám phá Trí tuệ nhân tạo AI trong đời sống',
              date: '08/08/2026',
              desc: 'Tìm hiểu cách máy tính học hỏi dữ liệu và hỗ trợ con người trong học tập, y tế và giao thông thông minh.',
              tag: 'Kiến Thức Mới'
            },
            {
              title: '🏆 Vinh danh Top 5 học sinh đạt điểm tuyệt đối bài Quiz 1',
              date: '07/08/2026',
              desc: 'Chúc mừng các em Nguyễn Gia Bảo, Trần Minh Ánh đã xuất sắc hoàn thành trắc nghiệm 10/10 điểm.',
              tag: 'Vinh Danh'
            },
            {
              title: '🛡️ Cẩm nang an toàn trên Internet dành cho học sinh lớp 6',
              date: '05/08/2026',
              desc: 'Bí quyết bảo vệ mật khẩu, phòng tránh lừa đảo trực tuyến và quy tắc ứng xử văn minh trên mạng xã hội.',
              tag: 'Kỹ Năng Số'
            }
          ].map((news, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-100 dark:border-slate-800 shadow-sm space-y-2 hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[10px]">{news.tag}</span>
                <span className="text-slate-400 text-[11px]">{news.date}</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug">{news.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{news.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. 🎁 QUÀ TẶNG ĐIỂM DANH CHUYÊN CẦN MỖI NGÀY
  if (activeTab === 'gifts') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <Gift className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>QUÀ TẶNG ĐIỂM DANH CHUYÊN CẦN MỖI NGÀY 🎁</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Ví Xu Học Tập: {currentUser.coins} Coins 💰</h2>
            <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed">
              Mỗi ngày đăng nhập vào học cùng Cô Đỗ Mừng, em sẽ nhận ngay +50 Coins thưởng và duy trì chuỗi học tập liên tục ({currentUser.streak_days} ngày)!
            </p>
          </div>

          <button 
            onClick={() => {
              sound.victory();
              addCoins(50);
              addXP(20, 'Điểm danh chuyên cần hàng ngày');
              alert('🎉 Điểm danh chuyên cần thành công! Em nhận được +50 Coins và +20 XP!');
            }}
            className="px-6 py-3 rounded-full bg-white text-pinkBrand-600 font-extrabold text-xs shadow-md hover:bg-pink-50 transition-all hover:scale-105 shrink-0"
          >
            🎁 Nhận Quà Điểm Danh Hôm Nay (+50 Coins)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { name: 'Huy Hiệu "Thần Đồng Tin Học"', cost: 100, icon: '🌟', desc: 'Hiển thị huy hiệu lấp lánh trên hồ sơ cá nhân' },
            { name: 'Avatar Robot 3D Phiên Bản Đặc Biệt', cost: 150, icon: '🤖', desc: 'Mở khóa mẫu ảnh đại diện robot công nghệ cao' },
            { name: 'Khung Avatar "Học Sinh Chăm Ngoan"', cost: 200, icon: '🎀', desc: 'Viền hoa văn hồng pastel xung quanh ảnh đại diện' }
          ].map((gift, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="text-4xl">{gift.icon}</div>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{gift.name}</h4>
              <p className="text-xs text-slate-500">{gift.desc}</p>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    sound.click();
                    if (currentUser.coins >= gift.cost) {
                      sound.victory();
                      addCoins(-gift.cost);
                      alert(`🎉 Chúc mừng em đã đổi thành công "${gift.name}"!`);
                    } else {
                      sound.wrong();
                      alert(`Em cần thêm ${gift.cost - currentUser.coins} Coins để đổi món quà này. Hãy làm thêm bài tập và quiz nhé! 🌸`);
                    }
                  }}
                  className="px-5 py-2 rounded-full bg-pinkBrand-500 hover:bg-pinkBrand-600 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  Đổi Bằng {gift.cost} Coins
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
