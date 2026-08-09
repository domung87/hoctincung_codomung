import React from 'react';
import { 
  Crown, 
  Newspaper, 
  BookOpen, 
  Cpu, 
  ShoppingBag, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const SpecialTabsView: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedLessonId, setIsPracticeModalOpen } = useApp();
  const { currentUser, addCoins, addXP } = useAuth();

  // 1. PHÒNG HỘI ĐỒNG (VIP)
  if (activeTab === 'council') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <Crown className="w-4 h-4 text-yellow-200 fill-yellow-200" />
              <span>KHU VỰC HỘI ĐỒNG SƯ PHẠM (VIP)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Phòng Hội Đồng & Quản Trị Giảng Dạy</h2>
            <p className="text-xs md:text-sm text-amber-100 max-w-xl leading-relaxed">
              Không gian quản lý kế hoạch bài dạy, ngân hàng câu hỏi và thống kê tiến độ học tập của các lớp khối 6 do Cô Đỗ Mừng phụ trách.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('stats')}
            className="px-6 py-3 rounded-full bg-white text-orange-600 font-extrabold text-xs shadow-md hover:bg-amber-50 transition-all hover:scale-105 shrink-0"
          >
            Xem Thống Kê Các Lớp
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              📚
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Giáo Án Điện Tử Tin 6</h4>
            <p className="text-xs text-slate-500">Đầy đủ 15 bài học theo chuẩn Công văn 5512 của Bộ Giáo dục.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              📝
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Ngân Hàng Ma Trận Đề</h4>
            <p className="text-xs text-slate-500">Đề kiểm tra giữa kỳ, cuối kỳ môn Tin học 6 có đáp án chi tiết.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-amber-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              👥
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Sổ Theo Dõi Học Sinh</h4>
            <p className="text-xs text-slate-500">Tổng hợp danh sách học sinh các lớp 6A1, 6A2, 6A3, 6A4.</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. BẢNG TIN
  if (activeTab === 'news') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <span>Bảng Tin Công Nghệ & Giáo Dục Tin Học 6</span>
          </h3>
          <p className="text-xs text-slate-400">Các thông báo mới nhất từ Cô Đỗ Mừng và kiến thức công nghệ thú vị</p>
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

  // 3. THƯ VIỆN TÀI LIỆU
  if (activeTab === 'library') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Thư Viện Tài Liệu SGK Tin Học 6 (Kết Nối Tri Thức)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Tải về SGK PDF, Sơ đồ tư duy tóm tắt và Đề cương ôn tập</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Sách Giáo Khoa Tin Học 6 PDF', type: 'PDF • 45MB', desc: 'Toàn bộ 15 bài học chuẩn theo bản in NXB Giáo Dục' },
            { title: 'Trọn Bộ Sơ Đồ Tư Duy 6 Chủ Đề', type: 'Mindmap • 15MB', desc: 'Tóm tắt bài học ngắn gọn, dễ nhớ bằng hình ảnh' },
            { title: 'Đề Cương Ôn Tập Học Kỳ 1 & 2', type: 'DOCX • 5MB', desc: 'Tổng hợp câu hỏi lý thuyết và bài tập thực hành' },
            { title: 'Bộ Bài Thực Hành Gõ 10 Ngón & Chuột', type: 'Zip • 8MB', desc: 'Phần mềm luyện kỹ năng tin học ứng dụng' },
            { title: 'Slide Bài Giảng PowerPoint Cô Đỗ Mừng', type: 'PPTX • 60MB', desc: 'Bài giảng sinh động có hoạt hình trực quan' },
            { title: 'Ngân Hàng 200 Câu Trắc Nghiệm Có Đáp Án', type: 'PDF • 12MB', desc: 'Phân loại từ mức độ Nhận biết đến Vận dụng cao' }
          ].map((doc, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{doc.type}</span>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{doc.title}</h4>
                <p className="text-xs text-slate-500">{doc.desc}</p>
              </div>
              <button 
                onClick={() => {
                  sound.click();
                  alert(`Đang tải xuống tài liệu: "${doc.title}" 🌸`);
                }}
                className="w-full py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Tài Liệu</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. CHỢ CÔNG NGHỆ (PHẦN CỨNG MÁY TÍNH)
  if (activeTab === 'tech_market') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <span>Chợ Công Nghệ - Khám Phá Phần Cứng Máy Tính</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Tìm hiểu cấu tạo và thông số các linh kiện máy tính thực tế</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: 'Bộ Xử Lý CPU Intel Core i5', cat: 'Thân Máy', desc: 'Bộ não xử lý hàng tỷ phép tính mỗi giây', icon: '🧠' },
            { name: 'Thanh Bộ Nhớ RAM DDR4 8GB', cat: 'Bộ Nhớ Trong', desc: 'Lưu dữ liệu tạm thời khi đang chạy ứng dụng', icon: '⚡' },
            { name: 'Ổ Cứng SSD 512GB Tốc Độ Cao', cat: 'Bộ Nhớ Ngoài', desc: 'Lưu trữ tài liệu và hệ điều hành vĩnh viễn', icon: '💾' },
            { name: 'Màn Hình 24 Inch Full HD', cat: 'Thiết Bị Ra', desc: 'Hiển thị hình ảnh sắc nét và màu sắc chân thực', icon: '🖥️' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="text-4xl">{item.icon}</div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{item.cat}</span>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{item.name}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. HỘI CHỢ / ĐỔI QUÀ (REWARDS)
  if (activeTab === 'market' || activeTab === 'agency') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
              <Gift className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>HỘI CHỢ ĐỔI QUÀ & THƯỞNG HỌC TẬP</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">Ví Xu Học Tập: {currentUser.coins} Coins 💰</h2>
            <p className="text-xs md:text-sm text-pink-100 max-w-xl leading-relaxed">
              Tích lũy Coins khi hoàn thành bài tập, làm đúng trắc nghiệm và điểm danh chuyên cần mỗi ngày để đổi quà tặng thú vị!
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
                      alert(`Em cần thêm ${gift.cost - currentUser.coins} Coins để đổi món quà này. Hãy làm thêm trắc nghiệm nhé! 🌸`);
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
