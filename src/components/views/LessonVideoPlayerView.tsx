import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  UploadCloud, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Plus, 
  X, 
  Sparkles, 
  BookOpen, 
  Heart,
  ListVideo,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonVideo, VideoComment } from '../../types';
import { INITIAL_VIDEOS, TIN6_TOPICS } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { sound } from '../../lib/soundFx';

export const LessonVideoPlayerView: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [videos, setVideos] = useState<LessonVideo[]>(() => {
    const saved = localStorage.getItem('tinhoc6_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [activeVideoId, setActiveVideoId] = useState<string>(videos[0]?.id || 'vid-1');
  const activeVideo = videos.find(v => v.id === activeVideoId) || videos[0];

  // Comment input state
  const [commentInput, setCommentInput] = useState<string>('');
  const [likesCount, setLikesCount] = useState<number>(248);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Modal Upload Video state (for Teacher)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newVideoLessonId, setNewVideoLessonId] = useState<string>('lesson-1');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');
  const [newVideoTitle, setNewVideoTitle] = useState<string>('');
  const [newVideoDuration, setNewVideoDuration] = useState<string>('15:00');
  const [newVideoDesc, setNewVideoDesc] = useState<string>('');

  const saveVideos = (updated: LessonVideo[]) => {
    setVideos(updated);
    localStorage.setItem('tinhoc6_videos', JSON.stringify(updated));
  };

  const handleSelectVideo = (videoId: string) => {
    sound.click();
    setActiveVideoId(videoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = () => {
    sound.click();
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      confetti({ particleCount: 30, spread: 45 });
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeVideo) return;
    sound.correct();

    const newComment: VideoComment = {
      id: 'comm-' + Date.now(),
      video_id: activeVideo.id,
      user_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=user',
      user_role: currentUser.role,
      comment_text: commentInput.trim(),
      created_at: 'Vừa xong'
    };

    const updatedVideos = videos.map(v => {
      if (v.id === activeVideo.id) {
        return {
          ...v,
          comments: [newComment, ...(v.comments || [])]
        };
      }
      return v;
    });

    saveVideos(updatedVideos);
    setCommentInput('');
  };

  const handleUploadNewVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoUrl) {
      alert('Vui lòng nhập đầy đủ tiêu đề và liên kết video!');
      return;
    }

    sound.victory();
    const allLessons = TIN6_TOPICS.flatMap(t => t.lessons);
    const targetLesson = allLessons.find(l => l.id === newVideoLessonId) || allLessons[0];

    // Format YouTube embed URL if needed
    let formattedUrl = newVideoUrl;
    if (formattedUrl.includes('watch?v=')) {
      formattedUrl = formattedUrl.replace('watch?v=', 'embed/');
    } else if (formattedUrl.includes('youtu.be/')) {
      formattedUrl = formattedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }

    const createdVideo: LessonVideo = {
      id: 'vid-' + Date.now(),
      lesson_id: targetLesson.id,
      lesson_title: targetLesson.title,
      topic_code: targetLesson.topicCode,
      video_url: formattedUrl,
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      teacher_name: currentUser.full_name || 'Cô Đỗ Mừng 💖',
      teacher_avatar: currentUser.avatar_url || '/images/avatar_co_mung.jpg',
      duration: newVideoDuration || '15:00',
      views_count: 1,
      description: newVideoDesc || `Video bài giảng chi tiết ${targetLesson.title} do giáo viên biên soạn.`,
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Khởi động & Giới thiệu bài giảng' },
        { time: '03:00', seconds: 180, title: 'Nội dung kiến thức trọng tâm' },
        { time: '10:00', seconds: 600, title: 'Hướng dẫn thực hành & Vận dụng' }
      ],
      comments: [],
      created_at: new Date().toISOString()
    };

    const updated = [createdVideo, ...videos];
    saveVideos(updated);
    setActiveVideoId(createdVideo.id);
    setIsUploadModalOpen(false);
    
    // Reset form
    setNewVideoTitle('');
    setNewVideoUrl('');
    setNewVideoDesc('');

    confetti({ particleCount: 80, spread: 70 });
    alert(`🎉 Đã đẩy thành công Video bài giảng "${targetLesson.title}" lên hệ thống!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Banner of Video Classroom */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-pinkBrand-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black">
            <Video className="w-4 h-4 text-yellow-300" />
            <span>PHÒNG HỌC VIDEO BÀI GIẢNG TRỰC TUYẾN TIN HỌC 6 🌸</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Kho Video Bài Giảng Chuẩn SGK Kết Nối Tri Thức</h2>
          <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed font-medium">
            Học sinh có thể xem video giảng dạy trực quan của Cô Đỗ Mừng, xem theo từng mốc thời gian và đặt câu hỏi thắc mắc trực tiếp bên dưới video.
          </p>
        </div>

        {/* Upload Button for Teacher */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => {
              sound.click();
              setIsUploadModalOpen(true);
            }}
            className="px-5 py-3 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-pinkBrand-500" />
            <span>📤 Đẩy Video Bài Học Mới (Giáo Viên)</span>
          </button>
        </div>
      </div>

      {/* 2. Main Player Layout: Left (Player & Details) + Right (Playlist) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Video Player, Timestamps, Notes & Comments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Video Frame (16:9 Aspect Ratio) */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-100 dark:border-slate-800 bg-black aspect-video relative group">
            {activeVideo?.video_url ? (
              <iframe
                src={`${activeVideo.video_url}?autoplay=0&rel=0`}
                title={activeVideo.lesson_title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900 p-6 text-center space-y-3">
                <Play className="w-16 h-16 text-pinkBrand-500 fill-pinkBrand-500 animate-pulse" />
                <h4 className="text-base font-bold">Video Bài Giảng Đang Được Cập Nhật</h4>
                <p className="text-xs text-slate-400">Cô Đỗ Mừng đang tải lên video cho bài học này.</p>
              </div>
            )}
          </div>

          {/* Video Metadata & Actions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1 rounded-full bg-pinkBrand-50 text-pinkBrand-600 text-xs font-black">
                CHỦ ĐỀ {activeVideo.topic_code} • {activeVideo.duration}
              </span>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  <span>{activeVideo.views_count.toLocaleString()} lượt xem</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Thời lượng: {activeVideo.duration}</span>
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white leading-tight">
              {activeVideo.lesson_title}
            </h3>

            {/* Teacher Profile Row + Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-pink-100 p-0.5 shadow-sm">
                  <img src={activeVideo.teacher_avatar} alt={activeVideo.teacher_name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1">
                    <span>{activeVideo.teacher_name}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400">Giáo viên Giảng dạy Tin học 6</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all ${
                    isLiked 
                      ? 'bg-pinkBrand-500 text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-pink-50'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  <span>{likesCount} Thích</span>
                </button>

                <button
                  onClick={() => alert('Đã sao chép liên kết video bài giảng vào bộ nhớ tạm! 🌸')}
                  className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-black flex items-center gap-1.5 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Timestamps / Video Chapters */}
          {activeVideo.timestamps && activeVideo.timestamps.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>⏱️ Mốc Thời Gian & Các Phần Giảng Trong Video</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeVideo.timestamps.map((ts, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3 hover:border-pinkBrand-300 transition-colors"
                  >
                    <span className="px-2.5 py-1 rounded-xl bg-pinkBrand-50 text-pinkBrand-600 text-xs font-black font-mono shrink-0">
                      {ts.time}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                      {ts.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description & Summary Notes */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-50/80 to-rose-50/80 dark:bg-slate-800/40 border border-pink-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-black text-pinkBrand-600 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>📝 Tóm Tắt Nội Dung Video Bài Giảng</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {activeVideo.description}
            </p>
          </div>

          {/* Q&A / Comments Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Hỏi Đáp & Bình Luận Bài Học ({activeVideo.comments?.length || 0})</span>
              </h4>
              <span className="text-xs text-slate-400 font-bold">Cô Đỗ Mừng hỗ trợ giải đáp</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Em có thắc mắc gì về video bài giảng này không? Nhập câu hỏi tại đây..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-pinkBrand-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-pinkBrand-500 hover:bg-pinkBrand-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {activeVideo.comments && activeVideo.comments.length > 0 ? (
                activeVideo.comments.map(c => (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                    <img src={c.user_avatar} alt="" className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-slate-800 dark:text-white">{c.user_name}</span>
                          {c.user_role === 'teacher' && (
                            <span className="px-2 py-0.2 rounded-md bg-pink-100 text-pinkBrand-600 text-[10px] font-black">
                              Giáo Viên 👩‍🏫
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{c.created_at}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {c.comment_text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên đặt câu hỏi cho Cô Đỗ Mừng nhé! 🌸</p>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT 1 COL: 17 Video Playlist by 6 Topics */}
        <div className="space-y-4">
          <div className="p-4.5 rounded-3xl bg-white dark:bg-[#151828] border border-pink-100 dark:border-slate-800 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-pinkBrand-500" />
                <span>Danh Sách 17 Video Bài Học</span>
              </h3>
              <span className="text-xs font-black text-pinkBrand-600">
                {videos.length} Video
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Chọn video để xem bài giảng tương ứng
            </p>
          </div>

          {/* Video List */}
          <div className="space-y-2.5 max-h-[800px] overflow-y-auto pr-1 no-scrollbar">
            {videos.map((vid, idx) => {
              const isSelected = vid.id === activeVideo.id;

              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-pinkBrand-50/90 dark:bg-pinkBrand-950/40 border-pinkBrand-400 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-[#151828] border-slate-100 dark:border-slate-800/80 hover:border-pink-200 text-slate-700 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  {/* Thumbnail / Index */}
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-xs">
                    <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className={`w-5 h-5 ${isSelected ? 'text-pinkBrand-400 fill-pinkBrand-400' : 'text-white fill-white'}`} />
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isSelected ? 'text-pinkBrand-700 dark:text-pinkBrand-300 font-black' : 'text-slate-800 dark:text-slate-100'
                    }`}>
                      {vid.lesson_title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Chủ đề {vid.topic_code} • {vid.teacher_name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. MODAL UPLOAD VIDEO (DÀNH CHO GIÁO VIÊN) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151828] w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-pink-100 dark:border-slate-800 relative">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold text-pinkBrand-600 bg-pink-50 px-2.5 py-0.5 rounded-lg">
                DÀNH CHO GIÁO VIÊN: CÔ ĐỖ MỪNG 💖
              </span>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white mt-1">
                📤 Đẩy Video Bài Học Mới Lên Hệ Thống
              </h3>
            </div>

            <form onSubmit={handleUploadNewVideo} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  1. Chọn Bài Học SGK Tin 6:
                </label>
                <select
                  value={newVideoLessonId}
                  onChange={(e) => {
                    setNewVideoLessonId(e.target.value);
                    const sel = TIN6_TOPICS.flatMap(t => t.lessons).find(l => l.id === e.target.value);
                    if (sel) setNewVideoTitle(sel.title);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white"
                >
                  {TIN6_TOPICS.flatMap(t => t.lessons).map(l => (
                    <option key={l.id} value={l.id}>
                      Chủ đề {l.topicCode} - {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  2. Tiêu đề Video Bài Giảng:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Video Bài 1: Thông tin và dữ liệu (Cô Đỗ Mừng)"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  3. Liên kết Video (YouTube URL hoặc Link MP4 Cloud):
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=... hoặc https://..."
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium"
                />
                <p className="text-[10px] text-slate-400 mt-1">Hỗ trợ link YouTube, Google Drive, hoặc link video MP4 trực tiếp.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Thời lượng video (phút:giây):
                  </label>
                  <input
                    type="text"
                    placeholder="15:30"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Người đăng:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.full_name || 'Cô Đỗ Mừng'}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  4. Ghi chú tóm tắt nội dung bài giảng:
                </label>
                <textarea
                  rows={3}
                  placeholder="Tóm tắt những điểm trọng tâm các em cần lưu ý khi xem video..."
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pinkBrand-500 hover:bg-pinkBrand-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Xác Nhận Đẩy Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
