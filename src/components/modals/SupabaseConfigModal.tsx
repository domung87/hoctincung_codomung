import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Save, 
  Copy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  clearSupabaseConfig, 
  testSupabaseConnection 
} from '../../lib/supabase';
import { sound } from '../../lib/soundFx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: () => void;
}

export const SupabaseConfigModal: React.FC<Props> = ({ isOpen, onClose, onConfigSaved }) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getSupabaseConfig();
      setUrl(current.url || '');
      setAnonKey(current.anonKey || '');
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    sound.click();
    if (!url.trim() || !anonKey.trim()) {
      setTestResult({ success: false, message: 'Vui lòng nhập cả Supabase URL và Anon Public Key.' });
      return;
    }

    saveSupabaseConfig(url, anonKey);
    setIsTesting(true);
    setTestResult(null);

    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);

    if (res.success) {
      sound.correct();
    } else {
      sound.wrong();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    saveSupabaseConfig(url, anonKey);
    sound.correct();
    alert('Đã lưu cấu hình kết nối Supabase thành công! Dữ liệu sẽ tự động đồng bộ.');
    onConfigSaved();
    onClose();
  };

  const handleClear = () => {
    sound.click();
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    setTestResult(null);
    alert('Đã xóa cấu hình Supabase. Hệ thống sẽ quay về chế độ Local Database.');
    onConfigSaved();
  };

  const handleCopySQL = () => {
    sound.click();
    const sqlUrl = 'supabase/init_database.sql';
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#151828] w-full max-w-2xl max-h-[90vh] rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-emerald-200 dark:border-slate-800 flex flex-col relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shadow-sm">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base md:text-lg font-extrabold text-slate-800 dark:text-white">
                Cấu Hình Kết Nối Cơ Sở Dữ Liệu Supabase
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> LIVE DB
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Nhập thông tin Project Supabase của Thầy/Cô để lưu trữ và đồng bộ dữ liệu thật 100%
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          {/* Instructions Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 text-xs text-slate-700 dark:text-slate-200 space-y-2">
            <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">
              📍 Lấy thông tin kết nối ở đâu trên Supabase?
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
              <li>Đăng nhập <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" /></a> và chọn Project của bạn.</li>
              <li>Vào <strong>Project Settings ➔ API</strong>.</li>
              <li>Copy <strong>Project URL</strong> và <strong>Project API Keys (anon public)</strong> dán vào 2 ô bên dưới.</li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span>Supabase Project URL:</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-500" />
                <span>Supabase Anon Public API Key (anon key):</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Test Connection Status Banner */}
            {testResult && (
              <div className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 font-semibold ${
                testResult.success 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Xóa cấu hình
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isTesting}
                  onClick={handleTest}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-extrabold flex items-center gap-1.5 transition-all border border-emerald-300 dark:border-emerald-800"
                >
                  <Zap className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span>{isTesting ? 'Đang kiểm tra...' : 'Kiểm Tra Kết Nối'}</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu & Đồng Bộ Ngay</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
