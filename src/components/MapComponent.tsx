'use client';

import { useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// 地図のカメラ制御用の子コンポーネント
function MapControl({ selectedSpot }: { selectedSpot: any }) {
  const map = useMap();

  useEffect(() => {
    if (map && selectedSpot) {
      map.panTo({ lat: selectedSpot.latitude, lng: selectedSpot.longitude });
      map.setZoom(16);
    }
  }, [map, selectedSpot]);

  return null;
}

export default function MapComponent({ selectedSpot, allSpots }: { selectedSpot: any, allSpots: any[] }) {
  if (!API_KEY) {
    return (
      <div className="w-full h-full bg-blue-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-xs">
          <p className="text-blue-600 font-bold text-lg mb-2">🗺️ Maps API Key Required</p>
          <p className="text-blue-400 text-sm">
            .env.local (およびVercelの環境変数) に API キーを設定してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 35.6812, lng: 139.7671 }} // 東京駅
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'bf51a91027ad466'}
      >
        <MapControl selectedSpot={selectedSpot} />

        {/* 保存されたすべてのスポットを表示 */}
        {allSpots.map((spot) => (
          <AdvancedMarker 
            key={spot.id || spot.name} 
            position={{ lat: spot.latitude, lng: spot.longitude }}
          >
            <Pin 
              background={selectedSpot?.id === spot.id || selectedSpot?.name === spot.name ? '#ef4444' : '#fbbf24'} 
              glyphColor={'#fff'} 
              borderColor={'#fff'} 
            />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
