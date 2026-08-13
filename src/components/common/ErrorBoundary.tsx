import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lỗi giao diện (ErrorBoundary caught):', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('tinhoc6_topics');
      localStorage.removeItem('tinhoc6_profiles_v4');
      localStorage.removeItem('tinhoc6_current_user_id_v4');
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#151828] shadow-2xl border border-pink-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pinkBrand-600 flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              Đang tải lại giao diện học tập 🌸
            </h2>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Hệ thống phát hiện cần làm mới dữ liệu bộ nhớ đệm (Cache) để hiển thị đầy đủ 17 bài học Tin học 6.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pinkBrand-500 to-rose-500 hover:from-pinkBrand-600 hover:to-rose-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tải Lại Trang Ngay 🚀</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
