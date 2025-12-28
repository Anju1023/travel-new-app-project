'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ClipperModal from '@/components/ClipperModal';
import { getSpots } from '@/app/actions/spot';

export type Spot = {
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

// MapComponent を動的にインポートし、SSR を無効化
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 animate-pulse">Loading Map...</p>
    </div>
  )
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);

  // 初期ロード時に全スポットを取得
  useEffect(() => {
    async function loadSpots() {
      const data = await getSpots();
      setSpots(data);
    }
    loadSpots();
  }, []);

  const handleSpotFound = (newSpot: Spot) => {
    setSpots((prev) => [newSpot, ...prev]); // リストに追加
    setSelectedSpot(newSpot); // 地図をそこに移動
    setIsModalOpen(false);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Map Component */}
      <MapComponent selectedSpot={selectedSpot} allSpots={spots} />

      {/* Floating Action Button (FAB) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform font-bold text-lg flex items-center gap-2 cursor-pointer"
        >
          <span>✨</span>
          魔法のクリップ
        </button>
      </div>

      {/* Sidebar / Bottom Sheet Placeholder */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white/80 backdrop-blur-md border-t border-gray-200 rounded-t-3xl shadow-2xl p-6 z-20 md:left-4 md:top-4 md:bottom-4 md:w-80 md:h-auto md:rounded-2xl md:border-t-0">
        <h2 className="text-xl font-bold text-gray-800 mb-4">保存したスポット</h2>
        <p className="text-sm text-gray-500">URLをペーストして、地図にピンを刺そう！</p>
      </div>

      {/* Clipper Modal */}
      <ClipperModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSpotFound={handleSpotFound}
      />
    </main>
  );
}
