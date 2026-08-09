import { 
  UserProfile, 
  Tin6Topic, 
  Question, 
  Assignment, 
  Submission, 
  SystemNotification 
} from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'teacher-co-do-mung',
    email: 'codomung@tinhoc6.edu.vn',
    full_name: 'Cô Đỗ Mừng',
    role: 'teacher',
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
    email: 'hocsinh.tin6@school.edu.vn',
    full_name: 'Em Nguyễn Gia Bảo (Lớp 6A1)',
    role: 'student',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Quản trị viên Hệ thống Cùng Học Tin 6',
    xp: 5000,
    level: 15,
    coins: 2000,
    streak_days: 45,
    created_at: '2025-09-01T00:00:00Z'
  }
];

export const TIN6_TOPICS: Tin6Topic[] = [
  {
    id: 'topic-a',
    code: 'A',
    title: 'Chủ đề A: Máy tính và Em (Máy tính và cộng đồng)',
    description: 'Tìm hiểu thông tin, dữ liệu, các thành phần phần cứng và biểu diễn thông tin trong máy tính.',
    iconName: 'Cpu',
    lessons: [
      {
        id: 'lesson-1',
        topicCode: 'A',
        lessonNumber: 1,
        title: 'Bài 1: Thông tin và dữ liệu (Máy tính & các thành phần cơ bản)',
        durationMinutes: 15,
        isCompleted: true,
        summary: 'Hiểu rõ khái niệm thông tin, dữ liệu, vật mang tin và 4 thành phần cơ bản của hệ thống máy tính.',
        keyPoints: [
          'Thông tin là những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.',
          'Dữ liệu là thông tin dưới dạng được ghi lại trên vật mang tin (chữ viết, con số, hình ảnh, âm thanh).',
          'Vật mang tin là phương tiện lưu giữ và truyền đạt thông tin (giấy, đĩa mềm, thẻ nhớ, USB).',
          'Máy tính gồm 4 khối chức năng: Thân máy (CPU & Bộ nhớ), Thiết bị vào (Chuột, Bàn phím), Thiết bị ra (Màn hình, Loa, Máy in), Bộ nhớ ngoài.'
        ],
        components: [
          {
            title: '1. Thân máy tính (CPU - Bộ xử lý trung tâm)',
            icon: 'Cpu',
            description: 'Thân máy là bộ não của máy tính, chứa các linh kiện xử lý thông tin và dữ liệu.',
            functionText: 'Thực hiện mọi phép tính toán, điều khiển hoạt động của các thiết bị khác trong máy tính.',
            example: 'Ví dụ: Chip vi xử lý Intel Core, AMD Ryzen.'
          },
          {
            title: '2. Bộ nhớ trong (RAM & ROM)',
            icon: 'HardDrive',
            description: 'Lưu trữ các chương trình và dữ liệu đang chạy để CPU xử lý tức thì.',
            functionText: 'Bộ nhớ RAM sẽ bị mất dữ liệu khi tắt máy; Bộ nhớ ROM lưu các chương trình khởi động máy tính.',
            example: 'Ví dụ: Thanh RAM 8GB, RAM 16GB.'
          },
          {
            title: '3. Thiết bị vào (Input Devices)',
            icon: 'Mouse',
            description: 'Giúp con người đưa thông tin và mệnh lệnh vào máy tính.',
            functionText: 'Thu nhận dữ liệu từ thế giới bên ngoài (ký tự, âm thanh, hình ảnh) chuyển thành dạng số.',
            example: 'Ví dụ: Bàn phím, Chuột máy tính, Máy quét (Scanner), Micro, Camera.'
          },
          {
            title: '4. Thiết bị ra (Output Devices)',
            icon: 'Monitor',
            description: 'Giúp máy tính đưa kết quả xử lý ra cho con người hiểu được.',
            functionText: 'Chuyển dữ liệu trong máy tính thành văn bản trên màn hình, âm thanh qua loa hoặc trang in ra giấy.',
            example: 'Ví dụ: Màn hình, Loa, Tai nghe, Máy in, Máy chiếu.'
          }
        ]
      },
      {
        id: 'lesson-2',
        topicCode: 'A',
        lessonNumber: 2,
        title: 'Bài 2: Xử lý thông tin & Rèn luyện kỹ năng sử dụng chuột',
        durationMinutes: 20,
        isCompleted: true,
        summary: 'Các bước xử lý thông tin trong đời sống và máy tính; 5 thao tác cơ bản với chuột máy tính.',
        keyPoints: [
          'Quy trình xử lý thông tin gồm 4 bước: Thu nhận thông tin -> Lưu trữ thông tin -> Xử lý thông tin -> Truyền thông tin.',
          '5 thao tác sử dụng chuột: Di chuyển chuột, Nháy chuột (Click), Nháy đúp (Double-click), Nháy nút phải (Right-click), Kéo thả (Drag & Drop).'
        ],
        components: [
          {
            title: 'Chuột máy tính (Mouse)',
            icon: 'MousePointer',
            description: 'Thiết bị trỏ giúp điều khiển con trỏ trên màn hình máy tính nhanh chóng.',
            functionText: 'Gồm nút trái (chọn đối tượng), nút phải (mở menu lệnh) và con lăn (cuộn trang web/văn bản).',
            example: 'Chuột quang có dây, Chuột không dây Bluetooth.'
          }
        ]
      },
      {
        id: 'lesson-3',
        topicCode: 'A',
        lessonNumber: 3,
        title: 'Bài 3: Máy tính trong hoạt động thông tin & Soạn thảo cơ bản',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Máy tính hỗ trợ con người thu nhận, lưu trữ, xử lý và truyền thông tin vượt bậc.',
        keyPoints: [
          'Máy tính có khả năng tính toán nhanh, chính xác, lưu trữ dung lượng khổng lồ và làm việc không biết mệt mỏi.',
          'Hạn chế của máy tính: Máy tính chưa thể có cảm xúc, trực giác và khả năng tư duy sáng tạo như con người.'
        ]
      },
      {
        id: 'lesson-4',
        topicCode: 'A',
        lessonNumber: 4,
        title: 'Bài 4: Biểu diễn văn bản, hình ảnh, âm thanh trong máy tính',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Dãy bit 0 và 1 - Ngôn ngữ của máy tính; Các đơn vị đo dung lượng thông tin (Byte, KB, MB, GB).',
        keyPoints: [
          'Dãy bit là dãy các ký hiệu 0 và 1 (chữ số nhị phân - binary digit).',
          'Mọi văn bản, hình ảnh, âm thanh khi đưa vào máy tính đều được chuyển đổi thành dãy bit.',
          '1 Byte (B) = 8 bit. 1 Kilobyte (KB) = 1024 B. 1 Megabyte (MB) = 1024 KB. 1 Gigabyte (GB) = 1024 MB.'
        ]
      }
    ]
  },
  {
    id: 'topic-b',
    code: 'B',
    title: 'Chủ đề B: Mạng máy tính và Internet',
    description: 'Kết nối mạng máy tính, mạng toàn cầu Internet, tìm kiếm thông tin và gửi thư điện tử Email.',
    iconName: 'Globe',
    lessons: [
      {
        id: 'lesson-5',
        topicCode: 'B',
        lessonNumber: 5,
        title: 'Bài 5: Mạng máy tính',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Khái niệm mạng máy tính, các thành phần và lợi ích chia sẻ tài nguyên.',
        keyPoints: [
          'Mạng máy tính là tập hợp các máy tính được kết nối với nhau để trao đổi thông tin và chia sẻ tài nguyên.',
          'Các thành phần của mạng: Thiết bị đầu cuối (máy tính, máy in), Thiết bị kết nối (Switch, Router, Cáp mạng, Wi-Fi), Phần mềm mạng.'
        ]
      },
      {
        id: 'lesson-6',
        topicCode: 'B',
        lessonNumber: 6,
        title: 'Bài 6: Mạng thông tin toàn cầu (Internet & WWW)',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Internet, World Wide Web, trình duyệt web và các website.',
        keyPoints: [
          'Internet là mạng liên kết hàng triệu mạng máy tính trên toàn thế giới.',
          'World Wide Web (WWW) là mạng thông tin toàn cầu gồm các trang web được liên kết với nhau bằng siêu liên kết.'
        ]
      },
      {
        id: 'lesson-7',
        topicCode: 'B',
        lessonNumber: 7,
        title: 'Bài 7: Tìm kiếm thông tin trên Internet',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Máy tìm kiếm và kỹ năng lựa chọn từ khóa thông minh để tìm kiếm bài học nhanh nhất.',
        keyPoints: [
          'Máy tìm kiếm (Search Engine) như Google giúp tìm kiếm thông tin bằng từ khóa.',
          'Nên chọn từ khóa ngắn gọn, đúng trọng tâm, có thể đặt trong dấu ngoặc kép "..." để tìm chính xác cụm từ.'
        ]
      },
      {
        id: 'lesson-8',
        topicCode: 'B',
        lessonNumber: 8,
        title: 'Bài 8: Thư điện tử (Email)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Cấu trúc địa chỉ email và cách gửi nhận thư điện tử an toàn.',
        keyPoints: [
          'Địa chỉ email có dạng: <Tên người dùng>@<Tên nhà cung cấp dịch vụ> (Ví dụ: codomung@gmail.com).',
          'Ưu điểm của email: gửi nhận nhanh chóng, gửi được cho nhiều người cùng lúc, đính kèm được tệp tin.'
        ]
      }
    ]
  },
  {
    id: 'topic-c',
    code: 'C',
    title: 'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    description: 'An toàn thông tin cá nhân và bảo vệ bản quyền trên môi trường mạng số.',
    iconName: 'ShieldAlert',
    lessons: [
      {
        id: 'lesson-9',
        topicCode: 'C',
        lessonNumber: 9,
        title: 'Bài 9: An toàn thông tin và bản quyền trên môi trường mạng',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Quy tắc bảo mật mật khẩu, phòng tránh virus và tôn trọng quyền tác giả trên mạng.',
        keyPoints: [
          'Không chia sẻ mật khẩu, thông tin cá nhân (địa chỉ, số điện thoại) cho người lạ trên mạng.',
          'Đặt mật khẩu mạnh gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
          'Tôn trọng bản quyền tác giả: ghi rõ nguồn trích dẫn khi sử dụng tài liệu, hình ảnh trên mạng.'
        ]
      }
    ]
  },
  {
    id: 'topic-d',
    code: 'D',
    title: 'Chủ đề D: Đạo đức, pháp luật và văn hóa số',
    description: 'Sử dụng sơ đồ tư duy để tóm tắt và ghi nhớ kiến thức học tập khoa học.',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'lesson-10',
        topicCode: 'D',
        lessonNumber: 10,
        title: 'Bài 10: Sơ đồ tư duy (Mindmap)',
        durationMinutes: 20,
        isCompleted: false,
        summary: 'Cách tạo sơ đồ tư duy bằng tay hoặc phần mềm máy tính để hệ thống hóa bài học.',
        keyPoints: [
          'Sơ đồ tư duy là phương pháp biểu diễn thông tin bằng hình ảnh, từ khóa và các nhánh nối liên kết.',
          'Chủ đề chính ở trung tâm, các ý chính là các nhánh lớn, ý phụ là các nhánh nhỏ phát triển từ nhánh lớn.'
        ]
      }
    ]
  },
  {
    id: 'topic-e',
    code: 'E',
    title: 'Chủ đề E: Ứng dụng tin học (Soạn thảo văn bản)',
    description: 'Định dạng văn bản đẹp mắt và trình bày thông tin khoa học ở dạng bảng biểu.',
    iconName: 'FileText',
    lessons: [
      {
        id: 'lesson-11',
        topicCode: 'E',
        lessonNumber: 11,
        title: 'Bài 11: Định dạng văn bản (Font chữ, màu sắc, căn lề)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Các thao tác định dạng ký tự (In đậm, In nghiêng, Gạch chân) và căn lề đoạn văn bản.',
        keyPoints: [
          'Định dạng ký tự: Phông chữ (Font), Cỡ chữ (Size), Kiểu chữ (Bold, Italic, Underline), Màu chữ.',
          'Định dạng đoạn văn bản: Căn trái (Ctrl+L), Căn giữa (Ctrl+E), Căn phải (Ctrl+R), Căn đều hai bên (Ctrl+J).'
        ]
      },
      {
        id: 'lesson-12',
        topicCode: 'E',
        lessonNumber: 12,
        title: 'Bài 12: Trình bày thông tin ở dạng bảng (Table)',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Tạo bảng, chèn thêm cột, dòng và định dạng bảng thời khóa biểu, danh sách lớp.',
        keyPoints: [
          'Bảng gồm các hàng (Rows) và các cột (Columns). Giao nhau giữa hàng và cột là ô (Cell).',
          'Bảng giúp trình bày thông tin cô đọng, dễ so sánh, theo dõi như Thời khóa biểu, Bảng điểm.'
        ]
      }
    ]
  },
  {
    id: 'topic-f',
    code: 'F',
    title: 'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính (Thuật toán)',
    description: 'Tư duy thuật toán, các cấu trúc điều khiển và dự án thực tế Tin học và cuộc sống.',
    iconName: 'Code',
    lessons: [
      {
        id: 'lesson-13',
        topicCode: 'F',
        lessonNumber: 13,
        title: 'Bài 13: Thuật toán và các cách mô tả thuật toán',
        durationMinutes: 25,
        isCompleted: false,
        summary: 'Khái niệm thuật toán, cách mô tả bằng liệt kê từng bước và sơ đồ khối (Flowchart).',
        keyPoints: [
          'Thuật toán là dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một bài toán hay công việc.',
          'Hai cách mô tả thuật toán phổ biến: Liệt kê bằng lời văn tự nhiên và Vẽ sơ đồ khối.'
        ]
      },
      {
        id: 'lesson-14',
        topicCode: 'F',
        lessonNumber: 14,
        title: 'Bài 14: Các cấu trúc điều khiển (Tuần tự, Rẽ nhánh, Lặp)',
        durationMinutes: 25,
        isCompleted: false,
        summary: '3 cấu trúc điều khiển cơ bản trong tư duy lập trình và thuật toán.',
        keyPoints: [
          'Cấu trúc tuần tự: Các bước được thực hiện lần lượt từ đầu đến cuối theo đúng thứ tự.',
          'Cấu trúc rẽ nhánh: "NẾU... THÌ...": Thực hiện hành động tùy thuộc vào điều kiện đúng hay sai.',
          'Cấu trúc lặp: Thực hiện lặp đi lặp lại một hành động khi điều kiện còn thỏa mãn.'
        ]
      },
      {
        id: 'lesson-15',
        topicCode: 'F',
        lessonNumber: 15,
        title: 'Bài 15: Dự án Tin học và cuộc sống',
        durationMinutes: 30,
        isCompleted: false,
        summary: 'Ứng dụng toàn bộ kiến thức Tin 6 để thiết kế cẩm nang học tập, sơ đồ tư duy sáng tạo.',
        keyPoints: [
          'Kết hợp soạn thảo văn bản, bảng biểu, tìm kiếm hình ảnh trên Internet và tư duy sơ đồ tư duy để hoàn thành dự án học tập.'
        ]
      }
    ]
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-tin6-1',
    lesson_id: 'lesson-1',
    question_text: 'Thành phần nào được xem là "Bộ não" của máy tính, có nhiệm vụ xử lý thông tin và tính toán?',
    question_type: 'single_choice',
    options: [
      'Bộ xử lý trung tâm (CPU - Thân máy)',
      'Bàn phím (Keyboard)',
      'Màn hình máy tính (Monitor)',
      'Chuột máy tính (Mouse)'
    ],
    correct_answer: 'Bộ xử lý trung tâm (CPU - Thân máy)',
    explanation: 'Thân máy chứa CPU (Central Processing Unit) đóng vai trò như bộ não, thực hiện mọi phép tính toán và điều khiển hoạt động của máy tính.',
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
      'Tai nghe và Ổ đĩa mềm'
    ],
    correct_answer: 'Bàn phím và Chuột máy tính',
    explanation: 'Bàn phím và chuột giúp người dùng đưa dữ liệu và lệnh từ bên ngoài vào máy tính nên được gọi là Thiết bị vào.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề A - Tin 6'
  },
  {
    id: 'q-tin6-3',
    lesson_id: 'lesson-1',
    question_text: '1 Byte (B) bằng bao nhiêu bit trong hệ thống biểu diễn thông tin nhị phân?',
    question_type: 'single_choice',
    options: [
      '8 bit',
      '10 bit',
      '1024 bit',
      '16 bit'
    ],
    correct_answer: '8 bit',
    explanation: '1 Byte gồm 8 bit nhị phân (gồm các chữ số 0 và 1).',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề A - Tin 6'
  },
  {
    id: 'q-tin6-4',
    lesson_id: 'lesson-5',
    question_text: 'Mạng máy tính mang lại lợi ích lớn nhất nào cho người sử dụng?',
    question_type: 'single_choice',
    options: [
      'Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng',
      'Làm cho máy tính không bao giờ bị hỏng',
      'Tự động làm bài tập thay cho học sinh',
      'Tiết kiệm điện năng 100%'
    ],
    correct_answer: 'Chia sẻ tài nguyên, dữ liệu và trao đổi thông tin nhanh chóng',
    explanation: 'Mạng máy tính giúp các máy tính có thể gửi nhận tệp tin, dùng chung máy in và truyền tin tức tức thì.',
    points: 10,
    difficulty: 'easy',
    tag: 'Chủ đề B - Tin 6'
  },
  {
    id: 'q-tin6-5',
    lesson_id: 'lesson-13',
    question_text: 'Thuật toán trong Tin học được hiểu là gì?',
    question_type: 'single_choice',
    options: [
      'Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc',
      'Một loại virus máy tính',
      'Tên gọi của chiếc máy tính đầu tiên',
      'Một bài văn tả cảnh thiên nhiên'
    ],
    correct_answer: 'Dãy các chỉ dẫn từng bước rõ ràng, có thứ tự để giải quyết một công việc',
    explanation: 'Thuật toán là các bước cụ thể, tuần tự từ dữ liệu đầu vào (Input) để tạo ra kết quả mong muốn (Output).',
    points: 10,
    difficulty: 'medium',
    tag: 'Chủ đề F - Tin 6'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-tin6-1',
    lesson_id: 'lesson-1',
    lesson_title: 'Bài 1: Thông tin và dữ liệu (Máy tính & các thành phần)',
    title: 'Bài tập: Phân loại các thiết bị phần cứng máy tính quanh em',
    description: 'Em hãy kể tên 3 thiết bị vào, 3 thiết bị ra và 2 thiết bị lưu trữ thông tin mà em thường thấy ở phòng thực hành Tin học hoặc tại nhà.',
    due_date: '2026-08-25T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Kể đúng và giải thích 3 thiết bị vào', points: 40 },
      { criteria: 'Kể đúng và giải thích 3 thiết bị ra', points: 40 },
      { criteria: 'Kể đúng 2 thiết bị lưu trữ', points: 20 }
    ]
  },
  {
    id: 'assign-tin6-2',
    lesson_id: 'lesson-10',
    lesson_title: 'Bài 10: Sơ đồ tư duy',
    title: 'Thực hành: Vẽ sơ đồ tư duy tóm tắt Chủ đề A "Máy tính và Em"',
    description: 'Hãy vẽ sơ đồ tư duy bằng tay hoặc phần mềm máy tính tóm tắt lại 4 bài học của Chủ đề A: Thông tin, Xử lý thông tin, Phần cứng máy tính và Đơn vị đo dung lượng.',
    due_date: '2026-08-28T23:59:00Z',
    max_score: 100,
    rubric: [
      { criteria: 'Đầy đủ nội dung 4 bài học', points: 50 },
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
    student_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
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
