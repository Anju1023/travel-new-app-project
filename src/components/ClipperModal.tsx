'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractSpotInfo, saveSpot } from '@/app/actions/spot';

type SpotInfo = {
  id?: string;
  name: string;
  address: string;
  genre: string;
  latitude: number;
  longitude: number;
  description?: string;
  tags?: string[];
  original_url?: string;
};

interface ClipperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpotFound: (spot: SpotInfo) => void;
}

export default function ClipperModal({ isOpen, onClose, onSpotFound }: ClipperModalProps) {
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
      const data = await extractSpotInfo(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message || '解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsLoading(true);
    try {
      const savedSpot = await saveSpot(result);
      onSpotFound(savedSpot);
      setResult(null);
      setUrl('');
    } catch (err: any) {
      setError(err.message || '保存に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/40"
      >
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/20 flex justify-between items-center bg-white/30">
          <h3 className="font-black text-gray-800 text-xl tracking-tight">🔗 魔法のクリップ</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 text-gray-500 hover:bg-black/10 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <AnimatePresence mode="wait">
            {!result ? (
              // Step 1: Input URL
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <label className="block text-sm font-bold text-gray-500 ml-1">
                  SNSの投稿URLをペースト
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://instagram.com/p/..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/60 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 placeholder:text-gray-300"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  />
                </div>
                
                <motion.button
                  onClick={handleAnalyze}
                  disabled={isLoading || !url}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-black shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none transition-all flex items-center justify-center gap-2 overflow-hidden relative"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                      <span className="animate-pulse">AIが解析中...</span>
                    </div>
                  ) : '✨ スポットを特定する'}
                </motion.button>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50/50 backdrop-blur-sm text-red-600 text-sm font-bold rounded-xl text-center border border-red-100"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              // Step 2: Result Preview
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/40 p-6 rounded-[2rem] border border-white/60 shadow-inner">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-3xl">
                      📍
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-gray-900 leading-tight">{result.name}</h4>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black mt-2 uppercase tracking-wider">
                        {result.genre}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">ADDRESS</span>
                      {result.address}
                    </p>

                    {result.description && (
                      <div className="mt-4 text-sm text-gray-700 bg-white/80 p-4 rounded-2xl shadow-sm leading-relaxed border border-white/40">
                        {result.description}
                      </div>
                    )}

                    {result.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {result.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/80 border border-white/60 rounded-xl text-[10px] font-bold text-gray-500 shadow-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResult(null)}
                    disabled={isLoading}
                    className="flex-1 py-4 rounded-2xl bg-gray-200/50 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                  >
                    やり直す
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="flex-1 py-4 rounded-2xl bg-green-500 text-white font-black shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_30px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : '保存して追加'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
