'use client';

import { useState } from 'react';
import { extractSpotInfo } from '@/app/actions/spot';

type SpotInfo = {
  name: string;
  address: string;
  genre: string;
  description?: string;
  tags?: string[];
};

interface ClipperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClipperModal({ isOpen, onClose }: ClipperModalProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SpotInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Server Action を呼び出す
      const data = await extractSpotInfo(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message || '解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
          <h3 className="font-bold text-gray-800 text-lg">🔗 魔法のクリップ</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {!result ? (
            // Step 1: Input URL
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-600">
                SNSの投稿URLをペースト
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://instagram.com/p/..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !url}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    解析中...
                  </>
                ) : (
                  '✨ スポットを特定する'
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                  {error}
                </div>
              )}
            </div>
          ) : (
            // Step 2: Result Preview
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-2xl">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{result.name}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mt-1">
                      {result.genre}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2 flex items-start gap-1">
                  <span className="text-gray-400">🏠</span>
                  {result.address}
                </p>

                {result.description && (
                  <div className="mt-3 text-sm text-gray-700 bg-white/60 p-3 rounded-xl">
                    💡 {result.description}
                  </div>
                )}

                {result.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white border border-gray-100 rounded-md text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button 
                  onClick={onClose} 
                  className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold shadow-lg hover:bg-green-600 transition-transform active:scale-95"
                >
                  保存する (未実装)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
