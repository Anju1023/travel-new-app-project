'use client';

import { Spot } from '@/app/page';

interface SpotListProps {
  spots: Spot[];
  isLoading?: boolean;
  onSpotSelect: (spot: Spot) => void;
  selectedSpotId?: string;
}

export default function SpotList({ spots, isLoading, onSpotSelect, selectedSpotId }: SpotListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-[1.5rem] bg-white/40 border border-white/60 space-y-3">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">保存済み</h2>
        <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {spots.length} Spots
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide hover:scrollbar-default transition-all">
        {spots.length === 0 ? (
          <div className="text-center py-20 bg-white/30 rounded-[2rem] border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm font-bold">まだスポットがありません。<br/>右下のボタンから追加しよう！✨</p>
          </div>
        ) : (
          spots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => onSpotSelect(spot)}
              className={`group p-5 rounded-[1.5rem] cursor-pointer transition-all duration-300 border ${
                selectedSpotId === spot.id
                  ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-primary/30 scale-[1.02]'
                  : 'bg-white/40 border-white/60 hover:bg-white/80 hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-black text-gray-900 leading-tight text-lg group-hover:text-primary transition-colors">
                  {spot.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-primary/10 text-primary uppercase tracking-tighter">
                  {spot.genre}
                </span>
                {spot.tags && spot.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-400 font-bold">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 line-clamp-1 flex items-center gap-1.5 opacity-80">
                <span className="text-primary text-sm">📍</span> {spot.address}
              </p>

              {selectedSpotId === spot.id && spot.description && (
                <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    {spot.description}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
