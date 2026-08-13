import { 
  UserProfile, 
  Tin6Topic, 
  Question, 
  Assignment, 
  Submission, 
  SystemNotification,
  StudentEvaluation,
  LessonVideo
} from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'teacher-co-do-mung',
    email: 'dothimung87@gmail.com',
    full_name: 'Cô Đỗ Thị Mừng',
    role: 'teacher',
    classroom: 'Khối 6',
    username: 'dothimung87',
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
// ĐẦY ĐỦ NỘI DUNG 6 CHỦ ĐỀ & 17 BÀI HỌC SGK TIN HỌC 6 - KẾT NỐI TRI THỨC
// ============================================================================
export const TIN6_TOPICS: Tin6Topic[] = [
  // --------------------------------------------------------------------------
  // CHỦ ĐỀ A: MÁY TÍNH VÀ CỘNG ĐỒNG (BÀI 1 -> BÀI 3)
  // --------------------------------------------------------------------------
  {
    id: 'topic-a',
    code: 'A',
    title: 'Chủ đề A: Máy tính và cộng đồng',
    description: 'Khám phá thông tin, dữ liệu, 4 bước xử lý thông tin và cách máy tính biểu diễn dữ liệu bằng dãy bit.',
    iconName: 'Cpu',
    lessons: [
      {
        id: 'lesson-1',
        topicCode: 'A',
        lessonNumber: 1,
        title: 'Bài 1: Thông tin và dữ liệu',
        durationMinutes: 15,
        isCompleted: true,
        summary: 'Phân biệt thông tin, dữ liệu, vật mang tin và vai trò quyết định của thông tin trong đời sống con người.',
        keyPoints: [
          'Thông tin (Information): Là tất cả những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.',
          'Dữ liệu (Data): Là thông tin được ghi lại trên vật mang tin dưới các dạng khác nhau như chữ viết, con số, hình ảnh, âm thanh.',
          'Vật mang tin: Là phương tiện dùng để lưu giữ và truyền đạt thông tin (ví dụ: trang sách, thẻ nhớ, USB, đĩa quang).',
          'Tầm quan trọng: Thông tin đem lại sự hiểu biết, giúp con người đưa ra những quyết định đúng đắn và hành động chính xác.'
        ],
        components: [
          {
            title: '1. Thông tin trong đời sống',
            icon: 'Sparkles',
            description: 'Tiếng chuông báo thức cho biết đã đến giờ dậy; biển báo giao thông cho biết đoạn đường đang sửa chữa.',
            functionText: 'Giúp con người nhận biết sự việc và đưa ra hành động phù hợp.',
            example: 'Ví dụ: Đèn tín hiệu giao thông màu đỏ báo hiệu mọi người phải dừng lại.'
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
        summary: 'Quy trình 4 bước xử lý thông tin của con người và máy tính; 5 thao tác cơ bản với chuột máy tính.',
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
            icon: 'Share2',
            description: 'Nói câu trả lời cho bạn nghe, gửi email, máy tính hiển thị kết quả lên màn hình hoặc qua loa.',
            functionText: 'Chia sẻ thông tin đã xử lý tới người khác hoặc thiết bị khác.',
            example: 'Ví dụ: Phát biểu đáp án bài toán trước lớp.'
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
        summary: 'Biểu diễn thông tin bằng dãy bit (0 và 1); các đơn vị đo dung lượng thông tin: Bit, Byte, KB, MB, GB, TB.',
        keyPoints: [
          'Bit (viết tắt của Binary Digit): Là đơn vị nhỏ nhất để biểu diễn và lưu trữ thông tin trong máy tính, chỉ nhận 1 trong 2 giá trị: 0 hoặc 1.',
          'Mọi dữ liệu (văn bản, hình ảnh, âm thanh) khi đưa vào máy tính đều được chuyển đổi thành dãy bit.',
          '1 Byte (B) = 8 bit.',
          'Bảng đơn vị đo dung lượng: 1 KB (Kilobyte) = 1024 B; 1 MB (Megabyte) = 1024 KB; 1 GB (Gigabyte) = 1024 MB; 1 TB (Terabyte) = 1024 GB.'
        ],
        components: [
          {
            title: '1. Khái niệm Bit nhị phân',
            icon: 'Binary',
            description: 'Bit tương tự như trạng thái bật/tắt của công tắc bóng đèn (0 = Tắt, 1 = Bật).',
            functionText: 'Ngôn ngữ nền tảng của toàn bộ thiết bị điện tử kỹ thuật số.',
            example: 'Ký tự chữ "A" trong máy tính được biểu diễn bằng dãy bit: 01000001.'
          },
          {
            title: '2. Các bậc dung lượng nhớ',
            icon: 'Layers',
            description: 'Quy ước đo lường bộ nhớ máy tính, thẻ nhớ, USB và dung lượng đường truyền mạng.',
            functionText: 'Đánh giá khả năng lưu trữ của các thiết bị phần cứng.',
            example: '1 bức ảnh chụp điện thoại ~ 3 MB; 1 thẻ nhớ USB ~ 32 GB.'
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
    description: 'Tìm hiểu mạng máy tính, cấu trúc mạng, Internet, trình duyệt Web, máy tìm kiếm và thư điện tử.',
    iconName: 'Globe',
    lessons: [
      {
        id: 'lesson-4',
        topicCode: 'B',
        lessonNumber: 4,
        title: 'Bài 4: Mạng máy tính',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Khái niệm mạng máy tính, các thành phần chính của mạng (thiết bị đầu cuối, thiết bị kết nối, phần mềm mạng) và lợi ích.',
        keyPoints: [
          'Khái niệm: Mạng máy tính là tập hợp các máy tính và thiết bị được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên.',
          '3 thành phần chính của mạng: Thiết bị đầu cuối (máy tính, máy in), Thiết bị kết nối (Switch, Router, Modem, Cáp mạng/Sóng WiFi), Phần mềm mạng (hệ điều hành mạng, ứng dụng mạng).',
          'Lợi ích của mạng máy tính: Chia sẻ dữ liệu, dùng chung thiết bị phần cứng (như máy in chung), giao tiếp và trao đổi thông tin nhanh chóng.'
        ],
        components: [
          {
            title: 'Thiết bị đầu cuối',
            icon: 'Monitor',
            description: 'Máy tính để bàn, laptop, máy tính bảng, điện thoại thông minh, máy in mạng.',
            functionText: 'Nơi người dùng trực tiếp nhập, gửi và nhận dữ liệu.',
            example: 'Máy tính học sinh trong phòng Tin học.'
          },
          {
            title: 'Thiết bị kết nối',
            icon: 'Wifi',
            description: 'Cáp mạng xoắn đôi, bộ chia mạng Switch, bộ phát sóng WiFi (Access Point), Modem Internet.',
            functionText: 'Tạo đường truyền dẫn tín hiệu dữ liệu giữa các thiết bị.',
            example: 'Router WiFi đặt tại lớp học.'
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
        summary: 'Đặc điểm của mạng Internet toàn cầu, các dịch vụ phổ biến trên Internet và vai trò trong xã hội hiện đại.',
        keyPoints: [
          'Internet là mạng liên kết hàng triệu máy tính trên phạm vi toàn cầu, hoạt động theo các giao thức mạng chuẩn quốc tế.',
          'Đặc điểm nổi bật: Phạm vi toàn cầu, không thuộc sở hữu của riêng cá nhân hay tổ chức nào, cung cấp kho tài nguyên khổng lồ.',
          'Các dịch vụ phổ biến trên Internet: Tra cứu thông tin (Web), Thư điện tử (Email), Mạng xã hội, Học tập trực tuyến, Mua sắm và giải trí trực tuyến.'
        ],
        components: [
          {
            title: 'Kho tri thức nhân loại',
            icon: 'BookOpen',
            description: 'Internet chứa hàng tỷ trang tài liệu, bài giảng, bách khoa toàn thư mở Wikipedia.',
            functionText: 'Hỗ trợ việc tự học, nghiên cứu khoa học của học sinh và thầy cô.',
            example: 'Tra cứu thông tin SGK Tin học 6 trực tuyến.'
          },
          {
            title: 'Kết nối và giao tiếp toàn cầu',
            icon: 'MessageSquare',
            description: 'Gọi video trực tiếp, họp lớp trực tuyến qua Zoom/Google Meet, trao đổi tài liệu học tập tức thì.',
            functionText: 'Xóa nhòa khoảng cách địa lý giữa các quốc gia.',
            example: 'Lớp học trực tuyến khi học sinh ở nhà.'
          }
        ]
      },
      {
        id: 'lesson-6',
        topicCode: 'B',
        lessonNumber: 6,
        title: 'Bài 6: Mạng thông tin toàn cầu (WWW)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Khái niệm World Wide Web (WWW), trang web (Web page), website, siêu liên kết (Hyperlink) và trình duyệt web (Web Browser).',
        keyPoints: [
          'World Wide Web (gọi tắt là Web hoặc WWW): Là hệ thống thông tin liên kết toàn cầu, cho phép truy cập tài liệu qua các siêu liên kết.',
          'Siêu liên kết (Hyperlink): Là liên kết từ một đoạn văn bản hoặc hình ảnh sang một trang web khác khi người dùng nhấp chuột vào.',
          'Trình duyệt Web (Web Browser): Là phần mềm giúp người dùng truy cập và xem nội dung các trang web (Google Chrome, MS Edge, Cốc Cốc, Safari, Firefox).',
          'Địa chỉ URL (Uniform Resource Locator): Là địa chỉ định danh duy nhất của mỗi trang web trên Internet (Ví dụ: https://moet.gov.vn).'
        ],
        components: [
          {
            title: 'Trình duyệt Web thông dụng',
            icon: 'Compass',
            description: 'Google Chrome, Microsoft Edge, Safari, Mozilla Firefox, Cốc Cốc.',
            functionText: 'Hiển thị mã HTML thành giao diện hình ảnh và chữ viết đẹp mắt cho người dùng.',
            example: 'Mở Google Chrome để truy cập trang web học tập.'
          },
          {
            title: 'Siêu liên kết (Hyperlink)',
            icon: 'Link',
            description: 'Khi rê chuột vào siêu liên kết, con trỏ chuột thường đổi thành hình bàn tay chỉ ngón.',
            functionText: 'Chuyển hướng tức thì sang nội dung liên quan.',
            example: 'Bấm vào chữ "Xem chi tiết" để mở trang mới.'
          }
        ]
      },
      {
        id: 'lesson-7',
        topicCode: 'B',
        lessonNumber: 7,
        title: 'Bài 7: Tìm kiếm thông tin trên Internet',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Sử dụng máy tìm kiếm (Google, Bing), lựa chọn từ khóa thông minh và kỹ năng đánh giá độ tin cậy của thông tin.',
        keyPoints: [
          'Máy tìm kiếm (Search Engine): Là trang web hỗ trợ người dùng tìm kiếm thông tin trên Internet dựa trên từ khóa (Google, Bing, Yahoo).',
          'Từ khóa (Keyword): Là từ hoặc cụm từ ngắn gọn thể hiện chính xác nội dung em cần tìm.',
          'Kỹ năng chọn từ khóa: Đặt từ khóa trong dấu ngoặc kép `"..."` để tìm chính xác cụm từ, sử dụng từ khóa cụ thể, tránh từ chung chung.',
          'Đánh giá độ tin cậy: Kiểm tra tác giả bài viết, cơ quan chủ quản trang web (tên miền `.edu.vn`, `.gov.vn`), ngày xuất bản bài viết.'
        ],
        components: [
          {
            title: '1. Chọn từ khóa hiệu quả',
            icon: 'Search',
            description: 'Dùng từ khóa ngắn gọn, đúng trọng tâm thay vì gõ cả câu hỏi dài.',
            functionText: 'Tăng tốc độ tìm kiếm và độ chính xác của kết quả.',
            example: 'Nên gõ: `"Tin học 6 kết nối tri thức"` thay vì gõ: `em muốn tìm sách tin học`.'
          },
          {
            title: '2. Đánh giá nguồn tin',
            icon: 'ShieldCheck',
            description: 'Không phải thông tin nào trên mạng cũng đúng 100%. Luôn đối chiếu với SGK và thầy cô giáo.',
            functionText: 'Tránh tiếp nhận thông tin sai lệch, tin giả.',
            example: 'Ưu tiên thông tin từ website Bộ Giáo dục và Đào tạo.'
          }
        ]
      },
      {
        id: 'lesson-8',
        topicCode: 'B',
        lessonNumber: 8,
        title: 'Bài 8: Thư điện tử (Email)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Cấu trúc địa chỉ email, ưu nhược điểm so với thư truyền thống, các bước soạn và gửi thư kèm tệp đính kèm.',
        keyPoints: [
          'Thư điện tử (Electronic Mail / Email): Là dịch vụ truyền nhận thư và tệp dữ liệu qua mạng Internet.',
          'Cấu trúc địa chỉ Email: `<Tên_người_dùng>@<Tên_miền_máy_chủ_thư>` (Ví dụ: `hocsinh.tin6@gmail.com`). Tên email viết liền, không dấu, không khoảng trắng.',
          'Ưu điểm của Email: Tốc độ gửi tức thì (vài giây), chi phí thấp, gửi được đồng thời cho nhiều người, đính kèm được nhiều tệp (ảnh, tài liệu, video ngắn).',
          'Quy tắc ứng xử khi gửi thư: Có tiêu đề thư rõ ràng, lời chào trang trọng ở đầu thư, nội dung lịch sự và lời cảm ơn ở cuối thư.'
        ],
        components: [
          {
            title: 'Cấu trúc địa chỉ Email',
            icon: 'Mail',
            description: 'Bao gồm 2 phần ngăn cách bởi ký tự `@` (A còng).',
            functionText: 'Định danh duy nhất hộp thư của mỗi cá nhân trên toàn cầu.',
            example: '`codomung@gmail.com` (Tên người dùng: `codomung`, Tên máy chủ: `gmail.com`).'
          },
          {
            title: 'Tệp đính kèm (Attachment)',
            icon: 'Paperclip',
            description: 'Biểu tượng hình chiếc kẹp giấy cho phép đính kèm bài tập làm xong gửi cô giáo.',
            functionText: 'Gửi kèm tệp Word, PowerPoint, PDF tiện lợi.',
            example: 'Đính kèm tệp `BaiTap_NguyenGiaBao.docx` gửi cô.'
          }
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
    description: 'An toàn thông tin cá nhân, bản quyền tác giả và kỹ năng quản lý dữ liệu trên không gian mạng.',
    iconName: 'Search',
    lessons: [
      {
        id: 'lesson-9',
        topicCode: 'C',
        lessonNumber: 9,
        title: 'Bài 9: An toàn thông tin trên Internet',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Bảo vệ thông tin cá nhân, nhận diện các mối nguy hại trên mạng (virus, lừa đảo trực tuyến), đặt mật khẩu an toàn.',
        keyPoints: [
          'Thông tin cá nhân cần bảo mật: Họ tên đầy đủ, ngày sinh, số điện thoại, địa chỉ nhà, ảnh chụp căn cước/hộ chiếu, mật khẩu tài khoản.',
          'Quy tắc đặt mật khẩu mạnh: Dài tối thiểu 8 ký tự, bao gồm cả chữ hoa, chữ thường, con số và ký tự đặc biệt (Ví dụ: `CoDoMung@2026!`).',
          'Các mối nguy hiểm trên mạng: Phần mềm độc hại (Virus, Trojan, Spyware), Lừa đảo qua liên kết lạ (Phishing), Bắt nạt qua mạng (Cyberbullying).',
          'Quy tắc an toàn: Không nhấp vào đường link lạ, không tải tệp không rõ nguồn gốc, luôn đăng xuất tài khoản khi dùng máy tính công cộng.'
        ],
        components: [
          {
            title: 'Quy tắc 3 KHÔNG bảo mật',
            icon: 'ShieldAlert',
            description: '1. Không cung cấp mật khẩu cho bất kỳ ai; 2. Không mở link lạ; 3. Không hẹn gặp riêng người quen qua mạng.',
            functionText: 'Bảo vệ bản thân và gia đình khỏi kẻ xấu trên mạng.',
            example: 'Khi nhận được tin nhắn trúng thưởng lạ ➔ Báo ngay cho bố mẹ/thầy cô.'
          },
          {
            title: 'Phần mềm diệt Virus',
            icon: 'ShieldCheck',
            description: 'Cài đặt phần mềm bảo vệ máy tính (Windows Defender, BKAV, Kaspersky).',
            functionText: 'Tự động quét và ngăn chặn virus xâm nhập.',
            example: 'Cập nhật cơ sở dữ liệu diệt virus định kỳ.'
          }
        ]
      },
      {
        id: 'lesson-10',
        topicCode: 'C',
        lessonNumber: 10,
        title: 'Bài 10: Sơ đồ tư duy',
        durationMinutes: 30,
        isCompleted: false,
        summary: 'Khái niệm sơ đồ tư duy (Mindmap), các thành phần chính (Chủ đề trung tâm, Nhánh chính, Nhánh phụ, Từ khóa, Hình ảnh) và cách vẽ.',
        keyPoints: [
          'Sơ đồ tư duy (Mindmap): Là phương pháp ghi chép trực quan bằng cách kết hợp từ khóa ngắn gọn, đường nối phân nhánh, màu sắc và hình ảnh minh họa.',
          'Cấu trúc sơ đồ tư duy: Chủ đề chính ở vị trí trung tâm ➔ Các nhánh cấp 1 (ý chính) tỏa ra xung quanh ➔ Các nhánh cấp 2, cấp 3 (chi tiết).',
          'Lợi ích của sơ đồ tư duy: Kích thích hoạt động cả 2 bán cầu não, giúp ghi nhớ bài học nhanh hơn gấp nhiều lần, phát triển tư duy sáng tạo.',
          'Công cụ vẽ: Có thể vẽ thủ công trên giấy A4 bằng bút màu hoặc vẽ bằng phần mềm máy tính (Mindomo, XMind, Canva).'
        ],
        components: [
          {
            title: '1. Chủ đề trung tâm',
            icon: 'Target',
            description: 'Vẽ ở chính giữa trang giấy, dùng hình ảnh nổi bật và chữ to rõ ràng.',
            functionText: 'Điểm khởi đầu và định hướng cho toàn bộ bài học.',
            example: 'Chủ đề trung tâm: "Tin học 6 - Chủ đề A".'
          },
          {
            title: '2. Các nhánh và từ khóa',
            icon: 'GitBranch',
            description: 'Nhánh chính vẽ nét dày, nhánh phụ vẽ nét mảnh; mỗi nhánh chỉ ghi 1-2 từ khóa then chốt.',
            functionText: 'Tổ chức kiến thức có hệ thống logic, dễ ôn tập.',
            example: 'Nhánh 1: "Thông tin", Nhánh 2: "Dữ liệu", Nhánh 3: "Vật mang tin".'
          }
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
    description: 'Văn hóa ứng xử văn minh trên không gian mạng, tôn trọng bản quyền phần mềm và nội dung số.',
    iconName: 'ShieldCheck',
    lessons: [
      {
        id: 'lesson-11',
        topicCode: 'D',
        lessonNumber: 11,
        title: 'Bài 11: Định dạng văn bản',
        durationMinutes: 30,
        isCompleted: false,
        summary: 'Các kỹ năng định dạng ký tự (Font, Size, Color, Bold, Italic, Underline) và định dạng đoạn văn bản (Căn lề, Giãn dòng) trong Word.',
        keyPoints: [
          'Định dạng văn bản: Là thay đổi kiểu dáng, kích thước, màu sắc của ký tự và cách trình bày các đoạn văn bản để văn bản đẹp mắt, dễ đọc và trang trọng.',
          'Định dạng ký tự: Phông chữ (Font, ví dụ: Times New Roman, Arial), Cỡ chữ (Size, ví dụ: 14pt), Kiểu chữ (B - Đậm, I - Nghiêng, U - Gạch chân), Màu chữ (Font Color).',
          'Định dạng đoạn văn bản: Căn lề trái (Ctrl+L), Căn giữa (Ctrl+E), Căn lề phải (Ctrl+R), Căn đều hai bên (Ctrl+J); Giãn khoảng cách giữa các dòng (Line Spacing).',
          'Quy tắc gõ văn bản tiếng Việt: Dấu cách đặt sau dấu câu (chấm, phẩy), không đặt dấu cách trước dấu câu; sử dụng bảng mã Unicode (phông Times New Roman) và kiểu gõ Telex.'
        ],
        components: [
          {
            title: '1. Định dạng ký tự',
            icon: 'Type',
            description: 'Các nút lệnh trong nhóm Font trên thẻ Home của phần mềm soạn thảo Word.',
            functionText: 'Làm nổi bật các tiêu đề và ý quan trọng trong bài văn.',
            example: 'Tiêu đề in đậm (Bold), cỡ chữ 16; nội dung cỡ chữ 14.'
          },
          {
            title: '2. Định dạng đoạn văn bản',
            icon: 'AlignLeft',
            description: 'Các nút lệnh trong nhóm Paragraph trên thẻ Home.',
            functionText: 'Tạo bố cục trang văn bản ngay ngắn, cân đối.',
            example: 'Tiêu đề căn giữa (Center); các đoạn nội dung căn đều 2 bên (Justify).'
          }
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
    description: 'Kỹ năng tạo bảng biểu, chèn hình ảnh minh họa, hoàn thiện tài liệu văn bản chuyên nghiệp.',
    iconName: 'FileText',
    lessons: [
      {
        id: 'lesson-12',
        topicCode: 'E',
        lessonNumber: 12,
        title: 'Bài 12: Trình bày thông tin ở dạng bảng',
        durationMinutes: 30,
        isCompleted: false,
        summary: 'Tạo bảng biểu (Table), thêm bớt hàng và cột, gộp tách ô (Merge/Split Cells), định dạng viền bảng trong văn bản.',
        keyPoints: [
          'Mục đích của bảng: Giúp trình bày thông tin một cách cô đọng, có cấu trúc rõ ràng, dễ so sánh và đối chiếu dữ liệu.',
          'Cấu trúc của bảng: Gồm các Hàng (Rows), Cột (Columns) và Ô (Cells - giao giữa một hàng và một cột).',
          'Thao tác cơ bản: Vào thẻ `Insert` ➔ Chọn `Table` ➔ Kéo chọn số hàng và số cột cần tạo.',
          'Chỉnh sửa bảng: Thêm hàng/cột (`Insert Above/Below/Left/Right`), Xóa hàng/cột (`Delete`), Gộp nhiều ô thành một ô (`Merge Cells`).'
        ],
        components: [
          {
            title: '1. Tạo bảng nhanh',
            icon: 'Table',
            description: 'Vào Insert ➔ Table để tạo bảng Thời khóa biểu, Bảng điểm học tập.',
            functionText: 'Sắp xếp danh sách lớp, kế hoạch học tập gọn gàng.',
            example: 'Bảng Thời khóa biểu tuần gồm 6 cột (Thứ 2 - Thứ 7) và 5 hàng (5 tiết học).'
          },
          {
            title: '2. Gộp ô và căn chỉnh',
            icon: 'Grid',
            description: 'Chọn các ô cần gộp ➔ Nhấp chuột phải chọn Merge Cells.',
            functionText: 'Tạo ô tiêu đề chung cho nhiều cột.',
            example: 'Gộp 6 ô hàng đầu tiên làm tiêu đề: "THỜI KHÓA BIỂU LỚP 6A1".'
          }
        ]
      },
      {
        id: 'lesson-13',
        topicCode: 'E',
        lessonNumber: 13,
        title: 'Bài 13: Thực hành: Hoàn thiện văn bản',
        durationMinutes: 35,
        isCompleted: false,
        summary: 'Chèn hình ảnh vào văn bản (Insert Picture), căn chỉnh vị trí hình ảnh so với chữ (Wrap Text), lưu và in ấn tài liệu.',
        keyPoints: [
          'Chèn hình ảnh: Vào thẻ `Insert` ➔ Chọn `Pictures` ➔ Chọn ảnh từ máy tính để chèn vào vị trí con trỏ soạn thảo.',
          'Căn chỉnh vị trí hình ảnh (Wrap Text): Chọn kiểu `In Line with Text` (ảnh nằm cùng dòng chữ), `Square` (chữ bao quanh ảnh dạng khung vuông), `Tight` (chữ bám sát viền ảnh).',
          'Thay đổi kích thước ảnh: Nhấp chọn ảnh, kéo thả các nút tròn ở 4 góc để phóng to/thu nhỏ mà không làm méo tỉ lệ ảnh.',
          'Lưu và in tệp: Phím tắt `Ctrl + S` để lưu bài thường xuyên; phím tắt `Ctrl + P` để xem trước và in văn bản ra giấy.'
        ],
        components: [
          {
            title: '1. Chèn ảnh minh họa',
            icon: 'Image',
            description: 'Thêm ảnh chụp phong cảnh, biểu tượng vào bài viết giúp văn bản trực quan, hấp dẫn.',
            functionText: 'Làm sinh động nội dung báo tường, tập san của lớp.',
            example: 'Chèn ảnh Vịnh Hạ Long vào bài văn thuyết minh du lịch.'
          },
          {
            title: '2. Kiểu bao quanh Wrap Text',
            icon: 'Layout',
            description: 'Giúp bố trí chữ và ảnh hài hòa, chuyên nghiệp như các trang tạp chí, báo in.',
            functionText: 'Tối ưu diện tích trang giấy in ấn.',
            example: 'Đặt ảnh ở góc phải, chữ bài học tự động uốn lượn xung quanh.'
          }
        ]
      },
      {
        id: 'lesson-14',
        topicCode: 'E',
        lessonNumber: 14,
        title: 'Bài 14: Thuật toán',
        durationMinutes: 30,
        isCompleted: false,
        summary: 'Khái niệm thuật toán (Algorithm), 2 cách mô tả thuật toán: Liệt kê các bước bằng ngôn ngữ tự nhiên và Sơ đồ khối (Flowchart).',
        keyPoints: [
          'Khái niệm: Thuật toán là dãy các chỉ dẫn từng bước rõ ràng, có thứ tự xác định để từ Đầu vào (Input) tìm ra Đầu ra (Output) của bài toán.',
          'Tính chất của thuật toán: Tính xác định (mỗi bước chỉ có một cách hiểu), Tính dừng (phải kết thúc sau một số bước hữu hạn), Tính đúng đắn (cho ra kết quả chính xác).',
          '2 cách mô tả thuật toán phổ biến: 1. Liệt kê từng bước bằng lời; 2. Vẽ Sơ đồ khối (Flowchart).',
          'Các hình khối chuẩn trong sơ đồ khối: Hình Oval (Bắt đầu / Kết thúc), Hình Chữ nhật (Thao tác xử lý/tính toán), Hình Thoi (Kiểm tra điều kiện rẽ nhánh), Hình Bình hành (Nhập Input / Xuất Output), Mũi tên (Hướng đi của luồng xử lý).'
        ],
        components: [
          {
            title: '1. Đầu vào (Input) & Đầu ra (Output)',
            icon: 'ArrowRightCircle',
            description: 'Input là thông tin ban đầu cung cấp; Output là kết quả mong muốn nhận được sau khi thực hiện thuật toán.',
            functionText: 'Xác định mục tiêu của bài toán.',
            example: 'Bài toán pha nước chanh: Input = Chanh, Đường, Nước; Output = Ly nước chanh thơm ngon.'
          },
          {
            title: '2. Ký hiệu Sơ đồ khối',
            icon: 'Workflow',
            description: 'Hình Oval (Start/End), Hình Bình hành (Nhập/Xuất), Hình Chữ nhật (Xử lý), Hình Thoi (Điều kiện).',
            functionText: 'Biểu diễn thuật toán trực quan, dễ lập trình.',
            example: 'Kiểm tra điểm thi >= 5: Nếu Đúng ➔ Đạt; Nếu Sai ➔ Cần cố gắng.'
          }
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
    description: 'Xây dựng các cấu trúc điều khiển trong lập trình (Tuần tự, Rẽ nhánh, Lặp) và Dự án tổng kết Sổ tay Tin học.',
    iconName: 'Workflow',
    lessons: [
      {
        id: 'lesson-15',
        topicCode: 'F',
        lessonNumber: 15,
        title: 'Bài 15: Các cấu trúc điều khiển trong thuật toán',
        durationMinutes: 30,
        isCompleted: false,
        summary: '3 cấu trúc điều khiển nền tảng trong lập trình: Cấu trúc tuần tự, Cấu trúc rẽ nhánh (Nếu...Thì...) và Cấu trúc lặp.',
        keyPoints: [
          '1. Cấu trúc tuần tự (Sequential): Các bước được thực hiện lần lượt theo thứ tự từ trên xuống dưới, bước trước hoàn thành xong mới chuyển sang bước tiếp theo.',
          '2. Cấu trúc rẽ nhánh (Selection/Branching): Quyết định bước tiếp theo dựa trên việc kiểm tra điều kiện Đúng hay Sai. (Dạng thiếu: "Nếu <Điều kiện> Thì <Làm gì>"; Dạng đủ: "Nếu <Điều kiện> Thì <Làm A> Không thì <Làm B>").',
          '3. Cấu trúc lặp (Iteration/Loop): Một hoặc nhiều hành động được lặp đi lặp lại nhiều lần cho đến khi thỏa mãn điều kiện dừng.',
          'Tầm quan trọng: Mọi chương trình máy tính phức tạp trên thế giới đều được xây dựng từ sự kết hợp của 3 cấu trúc điều khiển cơ bản này.'
        ],
        components: [
          {
            title: 'Cấu trúc rẽ nhánh (Nếu... Thì...)',
            icon: 'GitPullRequest',
            description: 'Đưa ra quyết định dựa trên điều kiện thực tế.',
            functionText: 'Giúp máy tính có khả năng tự động xử lý tình huống thông minh.',
            example: 'Nếu trời mưa ➔ Mang áo mưa; Không thì ➔ Đi bình thường.'
          },
          {
            title: 'Cấu trúc lặp',
            icon: 'RotateCw',
            description: 'Thực hiện công việc lặp lại nhiều lần mà không cần viết lại mã lệnh.',
            functionText: 'Giải phóng con người khỏi các công việc lặp đi lặp lại.',
            example: 'Lặp lại 10 lần: Tưới 1 gáo nước cho cây hoa.'
          }
        ]
      },
      {
        id: 'lesson-16',
        topicCode: 'F',
        lessonNumber: 16,
        title: 'Bài 16: Thực hành: Xây dựng thuật toán',
        durationMinutes: 35,
        isCompleted: false,
        summary: 'Luyện tập kỹ năng phân tích bài toán thực tế, mô tả thuật toán bằng sơ đồ khối hoàn chỉnh và kiểm thử tính đúng đắn.',
        keyPoints: [
          'Các bước giải quyết vấn đề bằng máy tính: 1. Xác định bài toán (Input, Output) ➔ 2. Xây dựng thuật toán ➔ 3. Viết chương trình ➔ 4. Chạy thử và sửa lỗi (Debug).',
          'Kỹ thuật phân rã bài toán: Chia bài toán lớn thành các bài toán nhỏ hơn để dễ giải quyết từng phần.',
          'Kiểm thử thuật toán (Dry Run): Thử chạy thuật toán với các bộ dữ liệu đầu vào khác nhau (kể cả các trường hợp đặc biệt) để đảm bảo kết quả luôn chính xác.',
          'Ví dụ kinh điển: Thuật toán tìm số lớn nhất (Max) trong 2 số a và b; Thuật toán tính tổng các số từ 1 đến N.'
        ],
        components: [
          {
            title: 'Thực hành 1: Tìm số lớn hơn trong 2 số a và b',
            icon: 'CheckSquare',
            description: 'Input: 2 số a, b. Điều kiện: Nếu a > b thì Max = a; Ngược lại Max = b. Output: Giá trị Max.',
            functionText: 'Vận dụng cấu trúc rẽ nhánh dạng đủ.',
            example: 'Cho a = 8, b = 12 ➔ Kết quả Max = 12.'
          },
          {
            title: 'Thực hành 2: Đếm ngược thời gian từ 10 về 0',
            icon: 'Timer',
            description: 'Input: Số bắt đầu N = 10. Lặp lại việc in N và giảm N đi 1 cho đến khi N = 0 thì in "Hết giờ!".',
            functionText: 'Vận dụng cấu trúc lặp với số lần biết trước.',
            example: 'Đồng hồ đếm ngược phóng tên lửa hoặc đếm giờ làm bài thi.'
          }
        ]
      },
      {
        id: 'lesson-17',
        topicCode: 'F',
        lessonNumber: 17,
        title: 'Bài 17: Dự án: Sổ tay tin học của em',
        durationMinutes: 45,
        isCompleted: false,
        summary: 'Dự án tích hợp tổng kết: Vận dụng toàn bộ kỹ năng từ Chủ đề A đến F để thiết kế cuốn "Sổ tay Tin học học đường" sáng tạo.',
        keyPoints: [
          'Mục tiêu dự án: Tổng hợp toàn bộ kiến thức Tin học 6 thành một sản phẩm học tập thực tế, đẹp mắt và có giá trị sử dụng lâu dài.',
          'Nội dung chính của sổ tay: 1. Bảng thuật ngữ Tin học hay dùng; 2. Sơ đồ tư duy tóm tắt 6 chủ đề; 3. Danh sách các phím tắt hữu ích trong Word; 4. Bản cam kết quy tắc an toàn trên Internet.',
          'Kỹ năng ứng dụng: Soạn thảo văn bản Word, chèn bảng biểu định dạng màu sắc, chèn hình ảnh minh họa, vẽ sơ đồ khối và lưu tệp chuyên nghiệp.',
          'Tiêu chí đánh giá sản phẩm: Đầy đủ nội dung (40%), Trình bày khoa học thẩm mỹ (30%), Sáng tạo độc đáo (20%), Thuyết trình tự tin (10%).'
        ],
        components: [
          {
            title: 'Phần 1: Trang bìa Sổ tay',
            icon: 'Book',
            description: 'Thiết kế trang bìa ấn tượng với khung viền, tiêu đề lớn và thông tin tác giả học sinh.',
            functionText: 'Tạo ấn tượng thị giác đầu tiên chuyên nghiệp.',
            example: 'Tiêu đề: "SỔ TAY BÍ KÍP TIN HỌC 6 - HỌC CÙNG CÔ ĐỖ MỪNG".'
          },
          {
            title: 'Phần 2: Bảng phím tắt siêu tốc',
            icon: 'Command',
            description: 'Bảng tổng hợp các phím tắt thần thánh: Ctrl+C (Sao chép), Ctrl+V (Dán), Ctrl+Z (Hoàn tác), Ctrl+S (Lưu).',
            functionText: 'Giúp học sinh thao tác máy tính nhanh như chuyên gia.',
            example: 'Bảng 2 cột: Cột 1 Phím tắt - Cột 2 Công dụng.'
          }
        ]
      }
    ]
  }
];

// ============================================================================
// NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM TƯƠNG TÁC ĐẦY ĐỦ CHO TỪNG BÀI HỌC (17 BÀI)
// ============================================================================
export const INITIAL_QUESTIONS: Question[] = [
  // Bài 1
  {
    id: 'q-lesson-1-1',
    lesson_id: 'lesson-1',
    question_text: 'Thao tác nào sau đây cho ta thấy rõ nhất khái niệm về "Thông tin"?',
    question_type: 'single_choice',
    options: [
      'Nghe thấy tiếng trống trường báo hiệu đã đến giờ vào lớp học',
      'Cầm một chiếc thẻ nhớ USB màu xanh',
      'Một xấp giấy trắng chưa in chữ',
      'Dây nguồn cắm điện của máy tính'
    ],
    correct_answer: 'Nghe thấy tiếng trống trường báo hiệu đã đến giờ vào lớp học',
    explanation: 'Tiếng trống trường mang lại sự hiểu biết cho học sinh về thời gian vào lớp, đó chính là Thông tin.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Bài 1'
  },
  {
    id: 'q-lesson-1-2',
    lesson_id: 'lesson-1',
    question_text: 'Vật nào sau đây được gọi là "Vật mang tin"?',
    question_type: 'single_choice',
    options: [
      'Quyển sách giáo khoa Tin học 6 và thẻ nhớ điện thoại',
      'Suy nghĩ trong đầu khi chưa nói ra',
      'Cảm giác vui mừng khi được điểm 10',
      'Một cơn gió mát thoảng qua'
    ],
    correct_answer: 'Quyển sách giáo khoa Tin học 6 và thẻ nhớ điện thoại',
    explanation: 'Vật mang tin là vật thể dùng để lưu trữ và chứa dữ liệu thông tin như sách báo, đĩa CD, thẻ nhớ, USB.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Bài 1'
  },

  // Bài 2
  {
    id: 'q-lesson-2-1',
    lesson_id: 'lesson-2',
    question_text: 'Quy trình xử lý thông tin gồm 4 bước theo thứ tự nào sau đây?',
    question_type: 'single_choice',
    options: [
      'Thu nhận thông tin ➔ Lưu trữ thông tin ➔ Xử lý thông tin ➔ Truyền thông tin',
      'Lưu trữ ➔ Thu nhận ➔ Truyền ➔ Xử lý',
      'Xử lý ➔ Truyền ➔ Thu nhận ➔ Lưu trữ',
      'Truyền ➔ Xử lý ➔ Thu nhận ➔ Lưu trữ'
    ],
    correct_answer: 'Thu nhận thông tin ➔ Lưu trữ thông tin ➔ Xử lý thông tin ➔ Truyền thông tin',
    explanation: 'Quy trình chuẩn: Tiếp nhận thông tin từ bên ngoài ➔ Lưu vào bộ nhớ ➔ Xử lý suy nghĩ tính toán ➔ Truyền kết quả ra ngoài.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Bài 2'
  },

  // Bài 3
  {
    id: 'q-lesson-3-1',
    lesson_id: 'lesson-3',
    question_text: '1 Byte (B) bằng bao nhiêu bit trong máy tính?',
    question_type: 'single_choice',
    options: [
      '8 bit',
      '10 bit',
      '1024 bit',
      '16 bit'
    ],
    correct_answer: '8 bit',
    explanation: '1 Byte tương đương với một dãy gồm đúng 8 bit nhị phân (các số 0 và 1).',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Bài 3'
  },
  {
    id: 'q-lesson-3-2',
    lesson_id: 'lesson-3',
    question_text: 'Thứ tự sắp xếp các đơn vị đo dung lượng nhớ từ NHỎ ĐẾN LỚN là:',
    question_type: 'single_choice',
    options: [
      'Bit ➔ Byte ➔ KB ➔ MB ➔ GB ➔ TB',
      'TB ➔ GB ➔ MB ➔ KB ➔ Byte ➔ Bit',
      'Byte ➔ Bit ➔ MB ➔ KB ➔ TB ➔ GB',
      'Bit ➔ Byte ➔ MB ➔ KB ➔ GB ➔ TB'
    ],
    correct_answer: 'Bit ➔ Byte ➔ KB ➔ MB ➔ GB ➔ TB',
    explanation: 'Đơn vị nhỏ nhất là Bit, tiếp đến Byte (8 bit), Kilobyte, Megabyte, Gigabyte và lớn nhất là Terabyte.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề A - Bài 3'
  },

  // Bài 4
  {
    id: 'q-lesson-4-1',
    lesson_id: 'lesson-4',
    question_text: 'Thiết bị nào sau đây thuộc nhóm "Thiết bị kết nối" trong mạng máy tính?',
    question_type: 'single_choice',
    options: [
      'Bộ chia mạng Switch và Bộ phát sóng WiFi (Router)',
      'Máy in và Màn hình máy tính',
      'Chuột và Bàn phím máy tính',
      'Loa nghe nhạc và Ổ đĩa cứng'
    ],
    correct_answer: 'Bộ chia mạng Switch và Bộ phát sóng WiFi (Router)',
    explanation: 'Switch, Router, Hub và cáp mạng là các thiết bị kết nối giúp truyền tín hiệu giữa các máy tính trong mạng.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Bài 4'
  },

  // Bài 5
  {
    id: 'q-lesson-5-1',
    lesson_id: 'lesson-5',
    question_text: 'Mạng Internet có đặc điểm quan trọng nào sau đây?',
    question_type: 'single_choice',
    options: [
      'Phạm vi kết nối toàn cầu và không thuộc quyền sở hữu của riêng ai',
      'Chỉ dùng được trong phạm vi một trường học',
      'Do một công ty duy nhất điều khiển toàn bộ',
      'Chỉ hoạt động được vào ban ngày'
    ],
    correct_answer: 'Phạm vi kết nối toàn cầu và không thuộc quyền sở hữu của riêng ai',
    explanation: 'Internet là mạng liên kết toàn cầu mở, phi tập trung và chia sẻ tài nguyên cho toàn nhân loại.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Bài 5'
  },

  // Bài 6
  {
    id: 'q-lesson-6-1',
    lesson_id: 'lesson-6',
    question_text: 'Phần mềm nào sau đây là một "Trình duyệt Web" (Web Browser)?',
    question_type: 'single_choice',
    options: [
      'Google Chrome, Cốc Cốc, Microsoft Edge',
      'Microsoft Word, Excel, PowerPoint',
      'Phần mềm diệt virus BKAV',
      'Windows Media Player'
    ],
    correct_answer: 'Google Chrome, Cốc Cốc, Microsoft Edge',
    explanation: 'Google Chrome, Cốc Cốc, Safari, Firefox, Edge là các trình duyệt web dùng để mở và duyệt các trang web trên Internet.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Bài 6'
  },

  // Bài 7
  {
    id: 'q-lesson-7-1',
    lesson_id: 'lesson-7',
    question_text: 'Để tìm kiếm chính xác một cụm từ trên Google, em nên đặt cụm từ đó trong cặp dấu gì?',
    question_type: 'single_choice',
    options: [
      'Cặp dấu ngoặc kép `"..."` ',
      'Cặp dấu ngoặc đơn `(...)` ',
      'Cặp dấu ngoặc nhọn `{...}` ',
      'Cặp dấu gạch chéo `//...//` '
    ],
    correct_answer: 'Cặp dấu ngoặc kép `"..."` ',
    explanation: 'Đặt trong dấu ngoặc kép ví dụ `"Tin học 6 Kết nối tri thức"` giúp máy tìm kiếm tìm chính xác thứ tự các từ trong ngoặc.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề B - Bài 7'
  },

  // Bài 8
  {
    id: 'q-lesson-8-1',
    lesson_id: 'lesson-8',
    question_text: 'Địa chỉ thư điện tử nào sau đây có cấu trúc HỢP LỆ?',
    question_type: 'single_choice',
    options: [
      'codomung@gmail.com',
      'codomung gmail.com',
      'codomung@',
      'codomung@@gmail.com'
    ],
    correct_answer: 'codomung@gmail.com',
    explanation: 'Địa chỉ email chuẩn gồm `<Tên_người_dùng>@<Tên_miền_máy_chủ>`, viết liền không dấu, có đúng 1 ký tự `@`.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Bài 8'
  },

  // Bài 9
  {
    id: 'q-lesson-9-1',
    lesson_id: 'lesson-9',
    question_text: 'Mật khẩu nào sau đây là mật khẩu MẠNH và AN TOÀN nhất?',
    question_type: 'single_choice',
    options: [
      'CoDoMung@2026!#',
      '12345678',
      'abcdefgh',
      'ngaythangnamsinh'
    ],
    correct_answer: 'CoDoMung@2026!#',
    explanation: 'Mật khẩu mạnh dài trên 8 ký tự, kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt như `@`, `!`, `#`.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề C - Bài 9'
  },

  // Bài 10
  {
    id: 'q-lesson-10-1',
    lesson_id: 'lesson-10',
    question_text: 'Khi vẽ một Sơ đồ tư duy (Mindmap), thành phần nào được đặt ở VỊ TRÍ TRUNG TÂM?',
    question_type: 'single_choice',
    options: [
      'Chủ đề chính (Ý tưởng cốt lõi của bài học)',
      'Các nhánh chi tiết nhỏ nhất',
      'Tên người vẽ sơ đồ',
      'Ngày tháng hoàn thành'
    ],
    correct_answer: 'Chủ đề chính (Ý tưởng cốt lõi của bài học)',
    explanation: 'Chủ đề chính luôn nằm ở vị trí trung tâm với hình ảnh hoặc chữ to nổi bật, từ đó tỏa ra các nhánh ý chính.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề C - Bài 10'
  },

  // Bài 11
  {
    id: 'q-lesson-11-1',
    lesson_id: 'lesson-11',
    question_text: 'Tổ hợp phím nào sau đây dùng để IN ĐẬM (Bold) đoạn văn bản được chọn trong Word?',
    question_type: 'single_choice',
    options: [
      'Ctrl + B',
      'Ctrl + I',
      'Ctrl + U',
      'Ctrl + S'
    ],
    correct_answer: 'Ctrl + B',
    explanation: 'Ctrl+B = In đậm (Bold); Ctrl+I = In nghiêng (Italic); Ctrl+U = Gạch chân (Underline); Ctrl+S = Lưu (Save).',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề D - Bài 11'
  },

  // Bài 12
  {
    id: 'q-lesson-12-1',
    lesson_id: 'lesson-12',
    question_text: 'Thao tác GỘP NHIỀU Ô thành 1 ô duy nhất trong bảng Word có tên tiếng Anh là gì?',
    question_type: 'single_choice',
    options: [
      'Merge Cells',
      'Split Cells',
      'Delete Table',
      'Insert Row'
    ],
    correct_answer: 'Merge Cells',
    explanation: 'Merge Cells = Gộp các ô đã chọn thành 1 ô; Split Cells = Tách 1 ô thành nhiều ô nhỏ.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề E - Bài 12'
  },

  // Bài 13
  {
    id: 'q-lesson-13-1',
    lesson_id: 'lesson-13',
    question_text: 'Để chèn một bức ảnh từ máy tính vào trang văn bản Word, em chọn lệnh nào?',
    question_type: 'single_choice',
    options: [
      'Insert ➔ Pictures',
      'File ➔ Print',
      'Home ➔ Font Color',
      'Layout ➔ Margins'
    ],
    correct_answer: 'Insert ➔ Pictures',
    explanation: 'Thẻ Insert (Chèn) chứa lệnh Pictures dùng để chèn hình ảnh vào văn bản.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề E - Bài 13'
  },

  // Bài 14
  {
    id: 'q-lesson-14-1',
    lesson_id: 'lesson-14',
    question_text: 'Trong sơ đồ khối thuật toán, hình nào dùng để biểu diễn thao tác KIỂM TRA ĐIỀU KIỆN rẽ nhánh?',
    question_type: 'single_choice',
    options: [
      'Hình thoi',
      'Hình chữ nhật',
      'Hình oval (elip)',
      'Hình bình hành'
    ],
    correct_answer: 'Hình thoi',
    explanation: 'Hình thoi: Kiểm tra điều kiện (Đúng/Sai); Hình chữ nhật: Thao tác tính toán/xử lý; Hình oval: Bắt đầu/Kết thúc.',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề E - Bài 14'
  },

  // Bài 15
  {
    id: 'q-lesson-15-1',
    lesson_id: 'lesson-15',
    question_text: 'Câu lệnh: "Nếu trời mưa thì em mang áo mưa, không thì em mặc đồng phục" thể hiện cấu trúc điều khiển nào?',
    question_type: 'single_choice',
    options: [
      'Cấu trúc rẽ nhánh dạng đủ (Nếu... Thì... Không thì...)',
      'Cấu trúc rẽ nhánh dạng thiếu',
      'Cấu trúc lặp',
      'Cấu trúc tuần tự'
    ],
    correct_answer: 'Cấu trúc rẽ nhánh dạng đủ (Nếu... Thì... Không thì...)',
    explanation: 'Có cả 2 nhánh hành động ứng với điều kiện Đúng (mang áo mưa) và Sai (mặc đồng phục) nên là cấu trúc rẽ nhánh dạng đủ.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề F - Bài 15'
  },

  // Bài 16
  {
    id: 'q-lesson-16-1',
    lesson_id: 'lesson-16',
    question_text: 'Cho 2 số a = 15, b = 9. Thuật toán tìm số lớn nhất (Max) sẽ cho ra kết quả Max bằng bao nhiêu?',
    question_type: 'single_choice',
    options: [
      '15',
      '9',
      '24',
      '6'
    ],
    correct_answer: '15',
    explanation: 'Vì a (15) > b (9) là Đúng nên Max được gán bằng a = 15.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề F - Bài 16'
  },

  // Bài 17
  {
    id: 'q-lesson-17-1',
    lesson_id: 'lesson-17',
    question_text: 'Khi thực hiện Dự án "Sổ tay Tin học của em", mục đích quan trọng nhất là gì?',
    question_type: 'single_choice',
    options: [
      'Vận dụng tổng hợp toàn bộ kiến thức Tin học 6 đã học để tạo ra sản phẩm thực tế hữu ích',
      'Chỉ để lấy điểm kiểm tra',
      'Chép lại toàn bộ sách giáo khoa vào sổ',
      'Chơi trò chơi điện tử trên máy tính'
    ],
    correct_answer: 'Vận dụng tổng hợp toàn bộ kiến thức Tin học 6 đã học để tạo ra sản phẩm thực tế hữu ích',
    explanation: 'Dự án học tập giúp học sinh biến lý thuyết thành kỹ năng thực hành thực tế, phát triển tư duy sáng tạo và tự học.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề F - Bài 17'
  }
];

// ============================================================================
// DANH SÁCH BÀI TẬP VẬN DỤNG & THỰC HÀNH TÍCH HỢP (ASSIGNMENTS) CHO TỪNG BÀI
// ============================================================================
export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-lesson-1',
    lesson_id: 'lesson-1',
    lesson_title: 'Bài 1: Thông tin và dữ liệu',
    title: 'Bài tập: Phân biệt thông tin và vật mang tin quanh em',
    description: 'Em hãy nêu 3 ví dụ cụ thể trong cuộc sống hàng ngày chỉ rõ: Đâu là Dữ liệu, Đâu là Vật mang tin và Đâu là Thông tin thu nhận được.',
    due_date: '2026-08-30T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Ví dụ 1 chính xác, rõ ràng', points: 30 },
      { criteria: 'Ví dụ 2 chính xác, thực tế', points: 30 },
      { criteria: 'Ví dụ 3 sáng tạo, liên hệ bản thân', points: 30 },
      { criteria: 'Trình bày sạch đẹp, đúng chính tả', points: 10 }
    ]
  },
  {
    id: 'assign-lesson-3',
    lesson_id: 'lesson-3',
    lesson_title: 'Bài 3: Thông tin trong máy tính',
    title: 'Bài tập: Đổi đơn vị đo dung lượng bộ nhớ',
    description: 'Một thẻ nhớ USB có dung lượng 4 GB. Hỏi thẻ nhớ đó có thể chứa được tối đa bao nhiêu bức ảnh, biết mỗi bức ảnh có dung lượng trung bình khoảng 2 MB? (Trình bày chi tiết phép tính).',
    due_date: '2026-08-30T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Đổi đúng 4 GB sang MB (4 x 1024 = 4096 MB)', points: 40 },
      { criteria: 'Tính đúng số lượng bức ảnh (4096 / 2 = 2048 ảnh)', points: 40 },
      { criteria: 'Có lời giải và đáp số rõ ràng', points: 20 }
    ]
  },
  {
    id: 'assign-lesson-8',
    lesson_id: 'lesson-8',
    lesson_title: 'Bài 8: Thư điện tử (Email)',
    title: 'Thực hành: Soạn thư điện tử gửi bài tập cho Cô Đỗ Mừng',
    description: 'Em hãy tạo một bản nháp thư điện tử gửi đến địa chỉ `codomung@gmail.com` với Tiêu đề: "[6A1] - Nộp bài tập Tin học 6 - Em Nguyễn Gia Bảo". Nội dung thư gồm lời chào, báo cáo nộp bài và lời cảm ơn cô.',
    due_date: '2026-09-05T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Địa chỉ người nhận và Tiêu đề đúng chuẩn', points: 30 },
      { criteria: 'Lời chào mở đầu và kết thư lễ phép', points: 30 },
      { criteria: 'Nội dung ngắn gọn, súc tích, lịch sự', points: 40 }
    ]
  },
  {
    id: 'assign-lesson-10',
    lesson_id: 'lesson-10',
    lesson_title: 'Bài 10: Sơ đồ tư duy',
    title: 'Thực hành: Vẽ Sơ đồ tư duy tóm tắt Chủ đề A',
    description: 'Em hãy vẽ một Sơ đồ tư duy (trên giấy A4 hoặc dùng phần mềm máy tính) tóm tắt toàn bộ kiến thức của Chủ đề A (Bài 1, Bài 2, Bài 3). Sử dụng ít nhất 3 màu sắc khác nhau và có hình vẽ minh họa.',
    due_date: '2026-09-15T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Đủ 3 bài học và các ý chính', points: 40 },
      { criteria: 'Sử dụng màu sắc và phân nhánh hợp lý', points: 30 },
      { criteria: 'Có hình vẽ minh họa sinh động', points: 30 }
    ]
  },
  {
    id: 'assign-lesson-12',
    lesson_id: 'lesson-12',
    lesson_title: 'Bài 12: Trình bày thông tin ở dạng bảng',
    title: 'Thực hành: Tạo Thời khóa biểu lớp em bằng Microsoft Word',
    description: 'Sử dụng phần mềm Word, em hãy tạo bảng Thời khóa biểu gồm 7 cột (Tiết, Thứ 2 ➔ Thứ 7) và 6 hàng. Định dạng màu nền hàng tiêu đề và căn lề giữa cho tất cả các ô.',
    due_date: '2026-09-20T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Tạo đúng số hàng và số cột', points: 30 },
      { criteria: 'Điền đầy đủ các môn học thực tế', points: 30 },
      { criteria: 'Định dạng màu sắc và căn giữa đẹp mắt', points: 40 }
    ]
  },
  {
    id: 'assign-lesson-17',
    lesson_id: 'lesson-17',
    lesson_title: 'Bài 17: Dự án: Sổ tay tin học của em',
    title: 'Dự án lớn: Nộp sản phẩm "Sổ tay Tin học 6" hoàn chỉnh',
    description: 'Tổng hợp sản phẩm dự án Sổ tay Tin học gồm 4 trang: Trang bìa, Trang tóm tắt lý thuyết, Trang bảng phím tắt và Trang cam kết an toàn mạng. Nộp tệp Word `.docx` hoặc tệp `.pdf`.',
    due_date: '2026-09-30T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Trang bìa đầy đủ thông tin và thẩm mỹ', points: 25 },
      { criteria: 'Nội dung kiến thức tóm tắt chính xác', points: 35 },
      { criteria: 'Vận dụng tốt các kỹ năng Word (Bảng, Ảnh, Wrap Text)', points: 25 },
      { criteria: 'Ý tưởng sáng tạo, độc đáo', points: 15 }
    ]
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [];
export const INITIAL_NOTIFICATIONS: SystemNotification[] = [];

export const INITIAL_EVALUATIONS: StudentEvaluation[] = [
  {
    id: 'eval-1',
    student_id: 'student-em-hoc-sinh',
    student_name: 'Nguyễn Gia Bảo',
    student_code: 'HS6A1-001',
    classroom: '6A1',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=giabao6a1',
    attendance_score: 10,
    quiz_avg_score: 9.5,
    practice_score: 9.0,
    assignment_score: 9.8,
    final_score: 9.6,
    grade_level: 'xuat_sac',
    teacher_remarks: 'Em học rất chăm chỉ, thao tác máy tính nhanh, trả lời bài tốt và luôn tích cực giúp đỡ các bạn trong lớp!',
    badges_earned: ['Học sinh xuất sắc', 'Chăm chỉ', 'Ong vàng Tin học'],
    updated_at: '2026-08-10T10:00:00Z'
  }
];

export const INITIAL_STUDENT_EVALUATIONS: StudentEvaluation[] = INITIAL_EVALUATIONS;

export const INITIAL_VIDEOS: LessonVideo[] = [
  {
    id: 'vid-1',
    lesson_id: 'lesson-1',
    lesson_title: 'Bài 1: Thông tin và dữ liệu',
    topic_code: 'A',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
    teacher_name: 'Cô Đỗ Mừng',
    teacher_avatar: '/images/avatar_co_mung.jpg',
    duration: '14:25',
    views_count: 1240,
    description: 'Bài giảng chi tiết phân biệt Thông tin và Dữ liệu - Môn Tin học 6 Kết Nối Tri Thức.',
    timestamps: [
      { time: '00:00', seconds: 0, title: 'Giới thiệu bài học' },
      { time: '03:15', seconds: 195, title: 'Thông tin là gì?' },
      { time: '07:40', seconds: 460, title: 'Dữ liệu và Vật mang tin' },
      { time: '11:20', seconds: 680, title: 'Bài tập củng cố' }
    ],
    created_at: '2026-08-01T08:00:00Z'
  }
];

export const INITIAL_LESSON_VIDEOS: LessonVideo[] = INITIAL_VIDEOS;
