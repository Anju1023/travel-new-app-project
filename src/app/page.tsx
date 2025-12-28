'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ClipperModal from '@/components/ClipperModal';
import { getSpots } from '@/app/actions/spot';
import SpotList from '@/components/SpotList';

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
  const [isLoadingSpots, setIsLoadingSpots] = useState(true);

  // 初期ロード時に全スポットを取得
  useEffect(() => {
    async function loadSpots() {
      setIsLoadingSpots(true);
      const data = await getSpots();
      setSpots(data);
      setIsLoadingSpots(false);
    }
    loadSpots();
  }, []);

  const handleSpotFound = (newSpot: Spot) => {
    setSpots((prev) => [newSpot, ...prev]); // リストに追加
    setSelectedSpot(newSpot); // 地図をそこに移動
    setIsModalOpen(false);
  };

  const handleSpotDelete = (id: string) => {
    setSpots((prev) => prev.filter(spot => spot.id !== id));
    if (selectedSpot?.id === id) {
      setSelectedSpot(null);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Map Component */}
      <MapComponent selectedSpot={selectedSpot} allSpots={spots} />

      {/* Floating Action Button (FAB) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 md:left-auto md:right-10 md:translate-x-0">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-10 py-5 rounded-full shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 font-black text-xl flex items-center gap-3 cursor-pointer group active:scale-95"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
          魔法のクリップ
        </button>
      </div>

      {/* Sidebar / Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-white/60 backdrop-blur-2xl border-t border-white/40 rounded-t-3xl shadow-2xl p-6 z-20 md:left-6 md:top-6 md:bottom-6 md:w-80 md:h-auto md:rounded-3xl md:border-t-0 overflow-hidden border-white/20">
        <SpotList 
          spots={spots} 
          isLoading={isLoadingSpots}
          onSpotSelect={(spot) => setSelectedSpot(spot)} 
          onSpotDelete={handleSpotDelete}
          selectedSpotId={selectedSpot?.id}
        />
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
