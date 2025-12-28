'use client';

import { Spot } from '@/app/page';

interface SpotListProps {
  spots: Spot[];
  onSpotSelect: (spot: Spot) => void;
  selectedSpotId?: string;
}

export default function SpotList({ spots, onSpotSelect, selectedSpotId }: SpotListProps) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">保存したスポット</h2>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
        {spots.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">まだスポットがありません。<br/>URLをペーストして追加しよう！</p>
          </div>
        ) : (
          spots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => onSpotSelect(spot)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                selectedSpotId === spot.id
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-blue-100 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 leading-tight">{spot.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 uppercase">
                  {spot.genre}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 flex items-center gap-1">
                <span>📍</span> {spot.address}
              </p>
              {spot.description && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-2 italic">
                  "{spot.description}"
                </p>
              )}
              {spot.tags && spot.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {spot.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
