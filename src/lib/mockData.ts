import { 
  UserProfile, 
  Tin6Topic, 
  Question, 
  Assignment, 
  Submission, 
  SystemNotification,
  StudentEvaluation
} from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'teacher-co-do-mung',
    email: 'codomung@gmail.com',
    full_name: 'Cô Đỗ Mừng',
    role: 'teacher',
    classroom: 'Khối 6',
    username: 'codomung',
    password: '123',
    avatar_url: '/images/avatar_co_mung.jpg',
    bio: 'Giáo viên Giảng dạy Tin học 6 - Bộ Sách Kết Nối Tri Thức Với Cuộc Sống 💖',
    xp: 9999,
    level: 25,
    coins: 5000,
    streak_days: 90,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'student-em-hoc-sinh',
    email: 'giabao@hocsinh.tin6.edu.vn',
    full_name: 'Em Nguyễn Gia Bảo',
    role: 'student',
    classroom: '6A1',
    username: 'giabao6a1',
    password: '123',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1',
    bio: 'Học sinh lớp 6A1 - Đam mê học Tin học cùng Cô Đỗ Mừng 🌸',
    xp: 850,
    level: 4,
    coins: 320,
    streak_days: 7,
    created_at: '2026-02-01T00:00:00Z'
  },
  {
    id: 'admin-quan-tri',
    email: 'admin@tinhoc6.edu.vn',
    full_name: 'Quản Trị Viên Hệ Thống',
    role: 'admin',
    classroom: 'Ban Giám Hiệu',
    username: 'admin',
    password: '123',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Quản trị viên Hệ thống Cùng Học Tin 6',
    xp: 5000,
    level: 15,
    coins: 2000,
    streak_days: 45,
    created_at: '2025-09-01T00:00:00Z'
  }
];

// ============================================================================
// ĐẦY ĐỦ 6 CHỦ ĐỀ & 17 BÀI HỌC SGK TIN HỌC 6 - BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// ============================================================================
export const TIN6_TOPICS: Tin6Topic[] = [
  // --------------------------------------------------------------------------
  // CHỦ ĐỀ A: MÁY TÍNH VÀ CỘNG ĐỒNG (BÀI 1 -> BÀI 3)
  // --------------------------------------------------------------------------
  {
    id: 'topic-a',
    code: 'A',
    title: 'Chủ đề A: Máy tính và cộng đồng',
    description: 'Khám phá thông tin, dữ liệu, các bước xử lý thông tin và cách máy tính biểu diễn dữ liệu bằng dãy bit.',
    iconName: 'Cpu',
    lessons: [
      {
        id: 'lesson-1',
        topicCode: 'A',
        lessonNumber: 1,
        title: 'Bài 1: Thông tin và dữ liệu',
        durationMinutes: 15,
        isCompleted: true,
        summary: 'Phân biệt thông tin, dữ liệu, vật mang tin và vai trò của thông tin trong đời sống.',
        keyPoints: [
          'Thông tin (Information): Là tất cả những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.',
          'Dữ liệu (Data): Là thông tin được ghi lại trên vật mang tin dưới các dạng khác nhau như chữ viết, con số, hình ảnh, âm thanh.',
          'Vật mang tin: Là phương tiện dùng để lưu giữ và truyền đạt thông tin (ví dụ: trang sách, thẻ nhớ, USB, đĩa CD).',
          'Tầm quan trọng: Thông tin đem lại sự hiểu biết, giúp con người đưa ra những quyết định đúng đắn trong cuộc sống.'
        ],
        components: [
          {
            title: '1. Thông tin trong đời sống',
            icon: 'Sparkles',
            description: 'Tiếng chuông báo thức cho em biết đã đến giờ dậy đi học; biển báo giao thông cho biết đoạn đường đang sửa chữa.',
            functionText: 'Giúp con người nhận biết sự việc và hành động phù hợp.',
            example: 'Ví dụ: Đèn tín hiệu giao thông màu đỏ báo hiệu phải dừng lại.'
          },
          {
            title: '2. Dữ liệu trong máy tính',
            icon: 'FileText',
            description: 'Các văn bản, bài hát MP3, bức ảnh chụp được lưu trữ dưới dạng các tệp tin trong máy tính.',
            functionText: 'Lưu trữ thông tin để máy tính có thể đọc, ghi và xử lý.',
            example: 'Ví dụ: Tệp văn bản BaiTap.docx, tệp ảnh AnhLop6A1.jpg.'
          },
          {
            title: '3. Vật mang tin',
            icon: 'HardDrive',
            description: 'Những đồ vật chứa dữ liệu giúp chúng ta lưu trữ lâu dài và mang đi nhiều nơi.',
            functionText: 'Bảo quản và truyền tải dữ liệu an toàn.',
            example: 'Ví dụ: Ổ cứng máy tính, Thẻ nhớ MicroSD, Giấy ghi chú.'
          }
        ]
      },
      {
        id: 'lesson-2',
        topicCode: 'A',
        lessonNumber: 2,
        title: 'Bài 2: Xử lý thông tin',
        durationMinutes: 20,
        isCompleted: true,
        summary: 'Quy trình 4 bước xử lý thông tin của con người và máy tính; 5 thao tác cơ bản với chuột.',
        keyPoints: [
          'Quy trình 4 bước xử lý thông tin: Thu nhận thông tin ➔ Lưu trữ thông tin ➔ Xử lý thông tin ➔ Truyền thông tin.',
          'Con người thu nhận thông tin qua 5 giác quan: Thị giác (mắt), Thính giác (tai), Khứu giác (mũi), Vị giác (lưỡi), Xúc giác (da).',
          'Máy tính là công cụ hỗ trợ con người xử lý thông tin với tốc độ siêu nhanh và độ chính xác cực cao.',
          '5 thao tác sử dụng chuột: Di chuyển chuột, Nháy chuột (Click), Nháy đúp (Double-click), Nháy nút phải (Right-click), Kéo thả (Drag & Drop).'
        ],
        components: [
          {
            title: 'Bước 1: Thu nhận thông tin',
            icon: 'Mouse',
            description: 'Mắt nhìn thấy chữ trên bảng, tai nghe tiếng cô giảng bài, máy tính nhận tín hiệu từ bàn phím và chuột.',
            functionText: 'Tiếp nhận các tác động từ thế giới bên ngoài.',
            example: 'Ví dụ: Em đọc câu hỏi trong đề kiểm tra.'
          },
          {
            title: 'Bước 2: Lưu trữ thông tin',
            icon: 'HardDrive',
            description: 'Ghi nhớ kiến thức vào não bộ hoặc ghi chép vào vở bài tập, lưu tệp vào ổ đĩa máy tính.',
            functionText: 'Giữ lại thông tin để sử dụng khi cần.',
            example: 'Ví dụ: Ghi lại công thức toán vào sổ tay.'
          },
          {
            title: 'Bước 3: Xử lý thông tin',
            icon: 'Cpu',
            description: 'Bộ não con người suy nghĩ, tính toán; CPU máy tính thực hiện các phép toán logic để tìm kết quả.',
            functionText: 'Biến đổi thông tin ban đầu thành thông tin hữu ích mới.',
            example: 'Ví dụ: Tính nhẩm kết quả 25 x 4 = 100.'
          },
          {
            title: 'Bước 4: Truyền thông tin',
            icon: 'Monitor',
            description: 'Nói câu trả lời cho cô giáo, gửi tin nhắn cho bạn bè, máy tính xuất kết quả ra màn hình hoặc máy in.',
            functionText: 'Chia sẻ kết quả xử lý cho người khác.',
            example: 'Ví dụ: Viết đáp án vào bài thi.'
          }
        ]
      },
      {
        id: 'lesson-3',
        topicCode: 'A',
        lessonNumber: 3,
        title: 'Bài 3: Thông tin trong máy tính',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Dãy bit 0 và 1 - Ngôn ngữ nhị phân của máy tính; Các đơn vị đo dung lượng thông tin Byte, KB, MB, GB, TB.',
        keyPoints: [
          'Trong máy tính, mọi thông tin (văn bản, hình ảnh, âm thanh) đều được biểu diễn thành dãy bit (chỉ gồm hai ký hiệu 0 và 1).',
          'Bit (Binary digit): Là đơn vị đo lượng thông tin nhỏ nhất trong máy tính.',
          '1 Byte (B) = 8 bit.',
          'Các đơn vị đo bội số: 1 KB (Kilobyte) = 1024 B; 1 MB (Megabyte) = 1024 KB; 1 GB (Gigabyte) = 1024 MB; 1 TB (Terabyte) = 1024 GB.',
          'Dung lượng lưu trữ: Cho biết khả năng chứa dữ liệu nhiều hay ít của một thiết bị nhớ.'
        ],
        components: [
          {
            title: 'Dãy Bit (0 và 1)',
            icon: 'Code',
            description: 'Mỗi bit tương ứng với một trạng thái đóng/mở mạch điện hoặc có/không có tín hiệu từ tính.',
            functionText: 'Ngôn ngữ nền tảng của mọi thiết bị kỹ thuật số.',
            example: 'Ví dụ: Ký tự chữ "A" trong máy tính được mã hóa là dãy bit: 01000001.'
          },
          {
            title: 'Bảng đơn vị đo dung lượng',
            icon: 'HardDrive',
            description: 'Bit (b) < Byte (B) < Kilobyte (KB) < Megabyte (MB) < Gigabyte (GB) < Terabyte (TB).',
            functionText: 'Mỗi đơn vị gấp 1024 lần (2^10) đơn vị liền trước nó.',
            example: 'Ví dụ: 1 bức ảnh chụp đẹp có dung lượng khoảng 3 MB đến 5 MB; 1 USB có dung lượng 32 GB.'
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHỦ ĐỀ B: MẠNG MÁY TÍNH VÀ INTERNET (BÀI 4 -> BÀI 8)
  // --------------------------------------------------------------------------
  {
    id: 'topic-b',
    code: 'B',
    title: 'Chủ đề B: Mạng máy tính và Internet',
    description: 'Hiểu về cấu trúc mạng máy tính, kết nối Internet toàn cầu, tra cứu thông tin WWW và kỹ năng sử dụng Email.',
    iconName: 'Globe',
    lessons: [
      {
        id: 'lesson-4',
        topicCode: 'B',
        lessonNumber: 4,
        title: 'Bài 4: Mạng máy tính',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Khái niệm mạng máy tính, các thành phần của mạng và lợi ích chia sẻ tài nguyên.',
        keyPoints: [
          'Mạng máy tính: Là tập hợp các máy tính và thiết bị được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên.',
          '3 thành phần chính của mạng: Các thiết bị đầu cuối (Máy tính, điện thoại, máy in), Thiết bị kết nối (Cáp mạng, Switch, Router WiFi), Phần mềm mạng.',
          'Lợi ích: Giúp người dùng trao đổi dữ liệu nhanh chóng, dùng chung máy in, ổ đĩa và các phần mềm ứng dụng.'
        ],
        components: [
          {
            title: 'Thiết bị đầu cuối',
            icon: 'Monitor',
            description: 'Các thiết bị người dùng trực tiếp sử dụng để gửi hoặc nhận dữ liệu.',
            functionText: 'Tạo và hiển thị thông tin.',
            example: 'Ví dụ: Máy tính để bàn, Laptop, Máy tính bảng, Điện thoại thông minh, Máy in mạng.'
          },
          {
            title: 'Thiết bị kết nối mạng',
            icon: 'Globe',
            description: 'Các thiết bị trung gian định tuyến và truyền tải các gói tín hiệu mạng.',
            functionText: 'Kết nối các máy tính với nhau bằng dây cáp mạng hoặc sóng không dây WiFi.',
            example: 'Ví dụ: Bộ định tuyến Router WiFi, Bộ chia mạng Switch, Dây cáp mạng LAN RJ45.'
          }
        ]
      },
      {
        id: 'lesson-5',
        topicCode: 'B',
        lessonNumber: 5,
        title: 'Bài 5: Internet',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Mạng Internet là gì, đặc điểm chính và những lợi ích to lớn của Internet đối với học tập và đời sống.',
        keyPoints: [
          'Internet: Là mạng liên kết hàng triệu máy tính và mạng máy tính trên phạm vi toàn cầu.',
          'Đặc điểm của Internet: Tính toàn cầu, không thuộc quyền sở hữu của bất kỳ cá nhân hay tổ chức nào, cung cấp kho tài nguyên khổng lồ.',
          'Lợi ích: Học trực tuyến, tra cứu tài liệu, giải trí, kết nối bạn bè, mua sắm và thanh toán điện tử.'
        ]
      },
      {
        id: 'lesson-6',
        topicCode: 'B',
        lessonNumber: 6,
        title: 'Bài 6: Mạng thông tin toàn cầu (WWW)',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Tìm hiểu về World Wide Web (WWW), trang web (Web page), website, siêu liên kết (Hyperlink) và trình duyệt web.',
        keyPoints: [
          'World Wide Web (WWW): Là hệ thống thông tin trên Internet cho phép liên kết các tài liệu với nhau thông qua siêu văn bản.',
          'Website: Là tập hợp các trang web liên quan được tổ chức dưới một địa chỉ truy cập duy nhất (Domain).',
          'Siêu liên kết (Hyperlink): Đoạn chữ hoặc hình ảnh khi nhấp chuột vào sẽ dẫn đến một trang web hoặc tài liệu khác.',
          'Trình duyệt web (Web Browser): Phần mềm giúp con người truy cập và xem các trang web (Google Chrome, Microsoft Edge, Cốc Cốc, Safari).'
        ]
      },
      {
        id: 'lesson-7',
        topicCode: 'B',
        lessonNumber: 7,
        title: 'Bài 7: Tìm kiếm thông tin trên Internet',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Cách sử dụng máy tìm kiếm (Search Engine), mẹo chọn từ khóa thông minh để tìm thông tin nhanh và chính xác.',
        keyPoints: [
          'Máy tìm kiếm: Là trang web đặc biệt giúp người dùng tìm kiếm thông tin trên Internet dựa trên từ khóa (Google, Bing, Yahoo).',
          'Từ khóa tìm kiếm (Keyword): Là các từ hoặc cụm từ ngắn gọn thể hiện nội dung em cần tìm.',
          'Mẹo tìm kiếm chính xác: Đặt từ khóa trong dấu ngoặc kép "..." để tìm chính xác cụm từ; Chọn từ khóa ngắn gọn, đúng trọng tâm.'
        ]
      },
      {
        id: 'lesson-8',
        topicCode: 'B',
        lessonNumber: 8,
        title: 'Bài 8: Thư điện tử (Email)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Cấu trúc địa chỉ email, ưu điểm của thư điện tử so với thư truyền thống và cách gửi nhận email an toàn.',
        keyPoints: [
          'Thư điện tử (Email): Dịch vụ chuyển thư dưới dạng số trên Internet thông qua các hộp thư điện tử.',
          'Cấu trúc địa chỉ Email: <Tên người dùng>@<Tên nhà cung cấp dịch vụ> (Ví dụ: codomung@gmail.com).',
          'Ưu điểm: Tốc độ gửi nhận tức thì (vài giây), chi phí rẻ, có thể gửi kèm tệp tin văn bản, ảnh, âm thanh.',
          'Các mục chính khi soạn thư: Người nhận (To), Chủ đề thư (Subject), Nội dung thư, Tệp đính kèm (Attachment).'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHỦ ĐỀ C: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN (BÀI 9 -> BÀI 10)
  // --------------------------------------------------------------------------
  {
    id: 'topic-c',
    code: 'C',
    title: 'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    description: 'Kỹ năng an toàn thông tin số, quản lý cây thư mục và tệp tin khoa học trên máy tính.',
    iconName: 'ShieldAlert',
    lessons: [
      {
        id: 'lesson-9',
        topicCode: 'C',
        lessonNumber: 9,
        title: 'Bài 9: An toàn thông tin trên Internet',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Nhận biết các nguy cơ rủi ro trên mạng, bảo vệ thông tin cá nhân và quy tắc ứng xử văn minh trên không gian số.',
        keyPoints: [
          'Nguy cơ trên mạng: Bị lộ thông tin cá nhân, bị lừa đảo trực tuyến, nhiễm virus/mã độc, bị bắt nạt qua mạng (Cyberbullying).',
          'Bảo vệ thông tin cá nhân: Không cung cấp họ tên đầy đủ, số điện thoại, mật khẩu, địa chỉ nhà cho người lạ trên mạng.',
          'Tạo mật khẩu mạnh: Đủ dài (từ 8 ký tự trở lên), kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$).',
          'Bản quyền số: Luôn ghi rõ nguồn tác giả khi sử dụng hình ảnh, bài viết từ Internet; không tự ý chia sẻ tài liệu có bản quyền.'
        ]
      },
      {
        id: 'lesson-10',
        topicCode: 'C',
        lessonNumber: 10,
        title: 'Bài 10: Lưu trữ và tìm kiếm tệp tin trên máy tính',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Cấu trúc cây thư mục (Folder tree), tệp tin (File), phần mở rộng và kỹ năng sắp xếp tệp tin khoa học.',
        keyPoints: [
          'Tệp tin (File): Là đơn vị cơ bản để lưu trữ dữ liệu trên đĩa, gồm Tên tệp và Phần mở rộng ngăn cách bởi dấu chấm (ví dụ: TinHoc6.docx).',
          'Thư mục (Folder): Là nơi chứa các tệp tin và các thư mục con khác, giúp tổ chức dữ liệu ngăn nắp theo cấu trúc hình cây.',
          'Đường dẫn (Path): Là chỉ dẫn đường đi từ ổ đĩa qua các thư mục đến tệp tin cần mở (Ví dụ: D:\\HocTap\\TinHoc6\\Bai1.docx).',
          'Các thao tác: Tạo thư mục mới (New Folder), Đổi tên (Rename), Sao chép (Copy), Di chuyển (Cut/Paste), Xóa (Delete).'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHỦ ĐỀ D: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA TRONG MÔI TRƯỜNG SỐ (BÀI 11)
  // --------------------------------------------------------------------------
  {
    id: 'topic-d',
    code: 'D',
    title: 'Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số',
    description: 'Ứng dụng Sơ đồ tư duy (Mindmap) để hệ thống hóa kiến thức và ghi nhớ bài học sáng tạo.',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'lesson-11',
        topicCode: 'D',
        lessonNumber: 11,
        title: 'Bài 11: Sơ đồ tư duy',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Sơ đồ tư duy là gì, các thành phần chính và cách vẽ sơ đồ tư duy tóm tắt bài học nhanh chóng.',
        keyPoints: [
          'Sơ đồ tư duy (Mindmap): Là phương pháp trình bày thông tin một cách trực quan bằng việc kết hợp từ khóa, hình ảnh, màu sắc và các đường nối liên kết.',
          'Cấu trúc sơ đồ tư duy: Chủ đề chính ở trung tâm ➔ Các nhánh chính (ý lớn) tỏa ra xung quanh ➔ Các nhánh phụ (chi tiết) phát triển từ nhánh chính.',
          'Lợi ích: Giúp bộ não ghi nhớ kiến thức sâu hơn, kích thích tư duy sáng tạo và tóm tắt bài học ngắn gọn, dễ hiểu.',
          'Cách vẽ: Dùng từ khóa ngắn gọn, mỗi nhánh dùng một màu sắc riêng, thêm hình ảnh minh họa sinh động.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHỦ ĐỀ E: ỨNG DỤNG TIN HỌC (BÀI 12 -> BÀI 14)
  // --------------------------------------------------------------------------
  {
    id: 'topic-e',
    code: 'E',
    title: 'Chủ đề E: Ứng dụng tin học',
    description: 'Thành thạo kỹ năng soạn thảo văn bản, định dạng ký tự đoạn văn và trình bày dữ liệu dạng bảng biểu khoa học.',
    iconName: 'FileText',
    lessons: [
      {
        id: 'lesson-12',
        topicCode: 'E',
        lessonNumber: 12,
        title: 'Bài 12: Soạn thảo văn bản cơ bản',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Làm quen phần mềm Word, quy tắc gõ chữ Tiếng Việt có dấu (Telex/Vni) và các thao tác lưu tệp văn bản.',
        keyPoints: [
          'Phần mềm soạn thảo văn bản: Phổ biến nhất là Microsoft Word, Google Docs, OpenOffice Writer.',
          'Quy tắc gõ chữ Tiếng Việt (Kiểu Telex): aa -> â, aw -> ă, ee -> ê, oo -> ô, ow -> ơ, uw -> ư, dd -> đ. Dấu: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).',
          'Quy tắc khoảng trắng: Dấu câu (phẩy, chấm, hai chấm, chấm phẩy) phải viết sát ký tự liền trước, sau đó là một dấu cách (Space).',
          'Lưu văn bản: Nhấn tổ hợp phím Ctrl + S hoặc chọn File ➔ Save.'
        ]
      },
      {
        id: 'lesson-13',
        topicCode: 'E',
        lessonNumber: 13,
        title: 'Bài 13: Định dạng văn bản',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Kỹ năng định dạng ký tự (Font chữ, cỡ chữ, màu chữ, in đậm/nghiêng) và định dạng đoạn văn bản (Căn lề, giãn dòng).',
        keyPoints: [
          'Định dạng ký tự: Thay đổi Phông chữ (Font: Times New Roman, Arial), Cỡ chữ (Size: 13-14pt), Kiểu chữ (Bold: Ctrl+B, Italic: Ctrl+I, Underline: Ctrl+U), Màu chữ (Color).',
          'Định dạng đoạn văn: Căn lề trái (Ctrl+L), Căn giữa (Ctrl+E), Căn lề phải (Ctrl+R), Căn đều hai bên (Ctrl+J); Thụt lề đầu dòng và khoảng cách giữa các dòng (Line Spacing).',
          'Mục đích định dạng: Giúp văn bản đẹp mắt, trang nhã, rõ ràng và người đọc dễ tiếp thu thông tin.'
        ]
      },
      {
        id: 'lesson-14',
        topicCode: 'E',
        lessonNumber: 14,
        title: 'Bài 14: Trình bày thông tin ở dạng bảng',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Tạo bảng biểu trong văn bản, chèn thêm/xóa cột dòng, gộp ô và định dạng bảng thời khóa biểu đẹp mắt.',
        keyPoints: [
          'Bảng (Table): Được tạo thành từ các Hàng (Row) và các Cột (Column), giao giữa hàng và cột gọi là Ô (Cell).',
          'Cách chèn bảng: Vào thẻ Insert ➔ Chọn Table ➔ Kéo chọn số hàng và số cột cần tạo.',
          'Thao tác với bảng: Thêm hàng/cột (Insert Rows/Columns), Xóa hàng/cột (Delete), Gộp nhiều ô thành một ô (Merge Cells).',
          'Ứng dụng: Tạo thời khóa biểu, bảng điểm học tập, danh sách lớp, thực đơn dinh dưỡng.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // CHỦ ĐỀ F: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH (BÀI 15 -> BÀI 17)
  // --------------------------------------------------------------------------
  {
    id: 'topic-f',
    code: 'F',
    title: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
    description: 'Tư duy thuật toán, sơ đồ khối, 3 cấu trúc điều khiển lập trình và dự án thực tế Tin học và cuộc sống.',
    iconName: 'Code',
    lessons: [
      {
        id: 'lesson-15',
        topicCode: 'F',
        lessonNumber: 15,
        title: 'Bài 15: Thuật toán',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Khái niệm thuật toán, xác định đầu vào (Input), đầu ra (Output) và 2 cách mô tả thuật toán.',
        keyPoints: [
          'Thuật toán (Algorithm): Là dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để từ Đầu vào (Input) tìm ra được Đầu ra (Output) của bài toán.',
          'Các đặc trưng của thuật toán: Tính chính xác, tính rõ ràng, tính dừng (sau một số bước hữu hạn phải kết thúc).',
          '2 cách mô tả thuật toán: Liệt kê bằng lời văn tự nhiên từng bước, hoặc Vẽ sơ đồ khối (Flowchart).',
          'Các hình khối chuẩn trong sơ đồ: Hình Ovan (Bắt đầu/Kết thúc), Hình chữ nhật (Bước xử lý/Tính toán), Hình thoi (Kiểm tra điều kiện), Mũi tên (Hướng đi).'
        ]
      },
      {
        id: 'lesson-16',
        topicCode: 'F',
        lessonNumber: 16,
        title: 'Bài 16: Các cấu trúc điều khiển',
        durationMinutes: 30,
        isCompleted: false,
        summary: '3 cấu trúc điều khiển nền tảng trong lập trình: Cấu trúc tuần tự, Cấu trúc rẽ nhánh (Nếu...Thì...) và Cấu trúc lặp.',
        keyPoints: [
          '1. Cấu trúc tuần tự (Sequential): Các bước được thực hiện lần lượt theo thứ tự từ trên xuống dưới, bước trước xong mới đến bước sau.',
          '2. Cấu trúc rẽ nhánh (Selection/Branching): Quyết định bước tiếp theo dựa trên việc kiểm tra một điều kiện Đúng hay Sai (Dạng thiếu: "Nếu... Thì...", Dạng đủ: "Nếu... Thì... Không thì...").',
          '3. Cấu trúc lặp (Iteration/Loop): Một hoặc nhiều hành động được lặp đi lặp lại nhiều lần cho đến khi thỏa mãn điều kiện dừng.',
          'Ý nghĩa: Mọi chương trình máy tính trên thế giới đều được xây dựng từ sự kết hợp của 3 cấu trúc điều khiển cơ bản này.'
        ]
      },
      {
        id: 'lesson-17',
        topicCode: 'F',
        lessonNumber: 17,
        title: 'Bài 17: Dự án: Sổ tay tin học của em',
        durationMinutes: 35,
        isCompleted: false,
        summary: 'Dự án tổng kết: Vận dụng toàn bộ kiến thức Tin học 6 để thiết kế cuốn "Sổ tay tin học học đường" sáng tạo.',
        keyPoints: [
          'Mục tiêu dự án: Tổng hợp kiến thức từ Chủ đề A đến Chủ đề F thành một sản phẩm thực tế có giá trị phục vụ học tập.',
          'Nội dung sổ tay: Bảng thuật ngữ tin học, Sơ đồ tư duy các chủ đề, Mẹo sử dụng phím tắt, Quy tắc an toàn trên Internet.',
          'Công cụ thực hiện: Sử dụng phần mềm soạn thảo văn bản Word, chèn bảng, định dạng phông chữ, chèn hình ảnh và sơ đồ khối.',
          'Đánh giá sản phẩm: Tiêu chí tính đầy đủ, tính thẩm mỹ, sự sáng tạo và khả năng ứng dụng trong thực tế.'
        ]
      }
    ]
  }
];

// ============================================================================
// NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM TIN HỌC 6
// ============================================================================
export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-tin6-1',
    lesson_id: 'lesson-1',
    question_text: 'Thành phần nào sau đây được xem là "Bộ não" của máy tính, có nhiệm vụ xử lý thông tin và tính toán?',
    question_type: 'single_choice',
    options: [
      'Bộ xử lý trung tâm (CPU - Thân máy)',
      'Bàn phím (Keyboard)',
      'Màn hình máy tính (Monitor)',
      'Chuột máy tính (Mouse)'
    ],
    correct_answer: 'Bộ xử lý trung tâm (CPU - Thân máy)',
    explanation: 'Thân máy chứa CPU đóng vai trò như bộ não, thực hiện mọi phép tính toán và điều khiển mọi hoạt động của máy tính.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Tin 6'
  },
  {
    id: 'q-tin6-2',
    lesson_id: 'lesson-1',
    question_text: 'Trong các thiết bị sau, thiết bị nào thuộc nhóm "Thiết bị vào" (Input Device)?',
    question_type: 'single_choice',
    options: [
      'Bàn phím và Chuột máy tính',
      'Màn hình và Loa',
      'Máy in và Máy chiếu',
      'Tai nghe và Ổ đĩa cứng'
    ],
    correct_answer: 'Bàn phím và Chuột máy tính',
    explanation: 'Bàn phím và chuột giúp con người đưa dữ liệu và mệnh lệnh từ bên ngoài vào máy tính nên được gọi là Thiết bị vào.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Tin 6'
  },
  {
    id: 'q-tin6-3',
    lesson_id: 'lesson-3',
    question_text: '1 Byte (B) bằng bao nhiêu bit trong hệ thống biểu diễn thông tin nhị phân của máy tính?',
    question_type: 'single_choice',
    options: [
      '8 bit',
      '10 bit',
      '1024 bit',
      '16 bit'
    ],
    correct_answer: '8 bit',
    explanation: '1 Byte gồm đúng 8 bit nhị phân (gồm các chữ số 0 và 1). 1 KB = 1024 Byte.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề A - Tin 6'
  },
  {
    id: 'q-tin6-4',
    lesson_id: 'lesson-4',
    question_text: 'Lợi ích quan trọng nhất của mạng máy tính mang lại cho người dùng là gì?',
    question_type: 'single_choice',
    options: [
      'Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng',
      'Làm cho máy tính không bao giờ bị hỏng',
      'Tự động làm bài tập thay cho học sinh',
      'Tiết kiệm điện năng 100%'
    ],
    correct_answer: 'Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng',
    explanation: 'Mạng máy tính giúp các máy tính liên kết với nhau để chia sẻ tệp tin, dùng chung máy in và truyền tin tức tức thì.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Tin 6'
  },
  {
    id: 'q-tin6-5',
    lesson_id: 'lesson-9',
    question_text: 'Khi tham gia môi trường mạng Internet, hành động nào sau đây là AN TOÀN nhất?',
    question_type: 'single_choice',
    options: [
      'Không cung cấp mật khẩu và thông tin cá nhân cho người lạ',
      'Nhấp vào tất cả các đường link lạ nhận được',
      'Đặt mật khẩu đơn giản như "123456" cho dễ nhớ',
      'Hẹn gặp trực tiếp người lạ quen trên mạng một mình'
    ],
    correct_answer: 'Không cung cấp mật khẩu và thông tin cá nhân cho người lạ',
    explanation: 'Bảo vệ thông tin cá nhân và đặt mật khẩu mạnh là nguyên tắc hàng đầu để đảm bảo an toàn trên không gian mạng.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề C - Tin 6'
  },
  {
    id: 'q-tin6-6',
    lesson_id: 'lesson-15',
    question_text: 'Thuật toán trong Tin học được hiểu là gì?',
    question_type: 'single_choice',
    options: [
      'Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc',
      'Một loại virus máy tính nguy hiểm',
      'Tên gọi của chiếc máy tính đầu tiên trên thế giới',
      'Một bài văn tả cảnh thiên nhiên'
    ],
    correct_answer: 'Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc',
    explanation: 'Thuật toán là các bước chỉ dẫn cụ thể, tuần tự từ dữ liệu đầu vào (Input) để tạo ra kết quả mong muốn (Output).',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề F - Tin 6'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-tin6-1',
    lesson_id: 'lesson-1',
    lesson_title: 'Bài 1: Thông tin và dữ liệu',
    title: 'Bài tập: Phân loại các thiết bị phần cứng máy tính quanh em',
    description: 'Em hãy kể tên 3 thiết bị vào, 3 thiết bị ra và 2 thiết bị lưu trữ thông tin mà em thường thấy ở phòng thực hành Tin học hoặc tại nhà.',
    due_date: '2026-08-25T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Kể đúng 3 thiết bị vào', points: 40 },
      { criteria: 'Kể đúng 3 thiết bị ra', points: 40 },
      { criteria: 'Kể đúng 2 thiết bị lưu trữ', points: 20 }
    ]
  },
  {
    id: 'assign-tin6-2',
    lesson_id: 'lesson-11',
    lesson_title: 'Bài 11: Sơ đồ tư duy',
    title: 'Thực hành: Vẽ sơ đồ tư duy tóm tắt Chủ đề A "Máy tính và cộng đồng"',
    description: 'Hãy vẽ sơ đồ tư duy bằng tay hoặc phần mềm máy tính tóm tắt lại 3 bài học của Chủ đề A: Thông tin & Dữ liệu, Xử lý thông tin, và Thông tin trong máy tính.',
    due_date: '2026-08-28T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Đầy đủ nội dung 3 bài học', points: 50 },
      { criteria: 'Bố cục nhánh rõ ràng, có màu sắc minh họa', points: 50 }
    ]
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-tin6-1',
    assignment_id: 'assign-tin6-1',
    assignment_title: 'Bài tập: Phân loại các thiết bị phần cứng máy tính quanh em',
    student_id: 'student-em-hoc-sinh',
    student_name: 'Em Nguyễn Gia Bảo (Lớp 6A1)',
    student_avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1',
    content: 'Thưa Cô Đỗ Mừng, em xin nộp bài làm:\n- 3 Thiết bị vào: Bàn phím máy tính, Chuột quang, Micro thu âm.\n- 3 Thiết bị ra: Màn hình Dell, Loa nghe nhạc, Máy in màu phòng tin học.\n- 2 Thiết bị lưu trữ: Ổ cứng SSD trong thân máy và chiếc thẻ nhớ USB của bố em.',
    score: 100,
    max_score: 100,
    feedback: 'Cô Đỗ Mừng khen Gia Bảo làm bài rất chính xác, nêu ví dụ thực tế và trình bày sạch đẹp! Tiếp tục phát huy nhé em! 🌸💖',
    status: 'graded',
    submitted_at: '2026-08-08T15:30:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Lời nhắn từ Cô Đỗ Mừng 💖',
    message: 'Chào mừng các em học sinh khối 6 đến với trang học trực tuyến môn Tin Học bộ sách Kết Nối Tri Thức!',
    type: 'greeting',
    created_at: '10 phút trước',
    is_read: false
  },
  {
    id: 'notif-2',
    title: 'Điểm bài tập đã chấm xong 📝',
    message: 'Cô Đỗ Mừng đã chấm điểm 100/100 cho bài tập Phân loại phần cứng của em.',
    type: 'assignment',
    created_at: '1 giờ trước',
    is_read: false
  }
];

export const INITIAL_EVALUATIONS: StudentEvaluation[] = [
  {
    id: 'eval-1',
    student_id: 'student-em-hoc-sinh',
    student_name: 'Nguyễn Gia Bảo',
    student_code: 'HS-6A1-01',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1',
    attendance_score: 10.0,
    quiz_avg_score: 9.8,
    practice_score: 9.5,
    assignment_score: 10.0,
    final_score: 9.8,
    grade_level: 'xuat_sac',
    teacher_remarks: 'Học sinh rất thông minh, chăm chỉ, hoàn thành xuất sắc các bài thực hành và tích cực hỗ trợ bạn trong lớp. 🌸',
    badges_earned: ['🥇 Thủ Khoa Tin 6', '⚡ Thao Tác Siêu Tốc', '🌟 Chuyên Cần 100%'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-2',
    student_id: 'student-2',
    student_name: 'Trần Minh Ánh',
    student_code: 'HS-6A1-02',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=minhanh',
    attendance_score: 10.0,
    quiz_avg_score: 9.5,
    practice_score: 9.0,
    assignment_score: 9.5,
    final_score: 9.4,
    grade_level: 'xuat_sac',
    teacher_remarks: 'Nắm vững kiến thức phần cứng và mạng máy tính, làm bài trắc nghiệm nhanh và chuẩn xác.',
    badges_earned: ['🥈 Á Khoa Lớp 6A1', '💡 Tư Duy Logic'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-3',
    student_id: 'student-3',
    student_name: 'Lê Hoàng Nam',
    student_code: 'HS-6A1-03',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=hoangnam',
    attendance_score: 9.0,
    quiz_avg_score: 8.8,
    practice_score: 9.0,
    assignment_score: 8.5,
    final_score: 8.8,
    grade_level: 'tot',
    teacher_remarks: 'Kỹ năng gõ phím và sử dụng chuột rất tốt, cần chú ý ôn tập thêm phần đơn vị đo dung lượng Byte/Bit.',
    badges_earned: ['⌨️ Bàn Phím Vàng', '🚀 Tiến Bộ Nhanh'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-4',
    student_id: 'student-4',
    student_name: 'Phạm Thu Thảo',
    student_code: 'HS-6A1-04',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=thuthao',
    attendance_score: 9.5,
    quiz_avg_score: 8.5,
    practice_score: 8.5,
    assignment_score: 9.0,
    final_score: 8.7,
    grade_level: 'tot',
    teacher_remarks: 'Sơ đồ tư duy vẽ rất đẹp, sáng tạo, tiếp thu bài giảng nhanh.',
    badges_earned: ['🎨 Nghệ Sĩ Mindmap', '🎀 Chăm Chỉ'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-5',
    student_id: 'student-5',
    student_name: 'Vũ Đức Mạnh',
    student_code: 'HS-6A1-05',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ducmanh',
    attendance_score: 8.0,
    quiz_avg_score: 7.2,
    practice_score: 7.5,
    assignment_score: 7.8,
    final_score: 7.5,
    grade_level: 'dat',
    teacher_remarks: 'Có tiến bộ trong các bài thực hành chuột, cần làm thêm các bài trắc nghiệm để củng cố lý thuyết.',
    badges_earned: ['🌱 Nỗ Lực Học Tập'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-6',
    student_id: 'student-6',
    student_name: 'Đặng Mai Linh',
    student_code: 'HS-6A2-01',
    classroom: '6A2',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=mailinh',
    attendance_score: 10.0,
    quiz_avg_score: 9.6,
    practice_score: 9.5,
    assignment_score: 9.5,
    final_score: 9.6,
    grade_level: 'xuat_sac',
    teacher_remarks: 'Học sinh xuất sắc nhất lớp 6A2, rất đam mê lập trình thuật toán.',
    badges_earned: ['🥇 Thủ Khoa 6A2', '🧠 Siêu Thuật Toán'],
    updated_at: '2026-08-09T08:00:00Z'
  },
  {
    id: 'eval-7',
    student_id: 'student-7',
    student_name: 'Hoàng Quốc Việt',
    student_code: 'HS-6A2-02',
    classroom: '6A2',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=quocviet',
    attendance_score: 9.0,
    quiz_avg_score: 8.0,
    practice_score: 8.5,
    assignment_score: 8.0,
    final_score: 8.3,
    grade_level: 'tot',
    teacher_remarks: 'Ý thức học tập tốt, hoàn thành bài tập đúng hạn.',
    badges_earned: ['⭐ Học Sinh Giỏi'],
    updated_at: '2026-08-09T08:00:00Z'
  }
];
