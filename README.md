# 🌸 CÙNG HỌC TIN 6 VỚI CÔ ĐỖ MỪNG 💖
> **Website Học Tập & Thực Hành Tin Học Lớp 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống**

---

## 📖 Giới Thiệu Dự Án

Trang web học tập trực tuyến môn **Tin Học 6** được thiết kế hiện đại, tươi sáng theo chuẩn chương trình Giáo dục Phổ thông 2018 (Bộ sách Kết Nối Tri Thức Với Cuộc Sống), đồng hành cùng **Cô Đỗ Mừng**.

### ✨ Điểm Nổi Bật:
- 🌸 **Banner Tương Tác & Lời Chào Giọng Nói**: Phát lời chào truyền cảm từ Cô Đỗ Mừng qua Web Speech API.
- 📚 **Hệ thống 6 Chủ Đề & 15 Bài Học Toàn Diện**:
  - **Chủ đề A**: Máy tính và Em (Máy tính và cộng đồng)
  - **Chủ đề B**: Mạng máy tính và Internet
  - **Chủ đề C**: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin
  - **Chủ đề D**: Đạo đức, pháp luật và văn hóa số (Sơ đồ tư duy)
  - **Chủ đề E**: Ứng dụng tin học (Soạn thảo văn bản & Bảng biểu)
  - **Chủ đề F**: Giải quyết vấn đề với sự trợ giúp của máy tính (Thuật toán)
- 🖱️ **Phòng Luyện Tập Kỹ Năng Tương Tác**:
  - Trò chơi phân loại phần cứng máy tính (Input / Output / CPU)
  - Luyện phản xạ và kỹ năng sử dụng chuột
  - Luyện gõ phím 10 ngón
- ❓ **Ngân Hàng Trắc Nghiệm Tự Động Chấm Điểm**: Kèm lời giải thích chi tiết từ Cô Đỗ Mừng.
- 🏆 **Hệ Thống Thống Kê & Bảng Vàng**: Theo dõi tiến độ học tập, tích lũy điểm thưởng XP và chuỗi ngày học liên tục (Streak).
- 🗄️ **Kiến Trúc 4 Tầng & Supabase PostgreSQL**: Hỗ trợ đầy đủ CSDL, Row Level Security (RLS) và phân quyền 3 vai trò (Học sinh, Giáo viên, Admin).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử (Local Dev)

### 1. Yêu cầu hệ thống:
- Đã cài đặt **Node.js** (Phiên bản 18+ hoặc 20+)

### 2. Cài đặt các gói phụ thuộc (Dependencies):
```bash
npm install
```

### 3. Khởi động môi trường phát triển:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại địa chỉ: `http://localhost:3000/`

### 4. Đóng gói bản Production (Build):
```bash
npm run build
```

---

## 🗄️ Cấu Trúc Mã Nguồn (Project Structure)

```text
├── public/
│   ├── images/ (Banner Cô Đỗ Mừng, Avatar Chibi, 3D Assets)
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── layout/ (BannerHeader, Navbar)
│   │   ├── lesson/ (LessonSidebar, LessonContent)
│   │   ├── modals/ (GreetingModal, PracticeModal, QuizModal)
│   │   └── views/  (HomeOverview, StatsView)
│   ├── context/    (AppContext, AuthContext)
│   ├── lib/        (mockData, soundFx, supabase)
│   ├── types/      (TypeScript Interfaces)
│   ├── styles/     (index.css, Tailwind CSS)
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── schema.sql  (PostgreSQL DDL & RLS Policies)
│   └── seed.sql    (Dữ liệu mẫu khởi tạo)
├── .gitignore
├── package.json
└── vite.config.ts
```

---
*Phát triển với tất cả tâm huyết dành cho các em học sinh khối 6 yêu thích môn Tin học! 🎀*
