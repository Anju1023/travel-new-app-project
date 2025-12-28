'use client';

import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, InfoWindow } from '@vis.gl/react-google-maps';

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
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [clickedSpot, setClickedSpot] = useState<any | null>(null);

  // 選択されたスポットが変わったら、そのスポットの詳細を開く
  useEffect(() => {
    if (selectedSpot) {
      setClickedSpot(selectedSpot);
      setInfoWindowOpen(true);
    }
  }, [selectedSpot]);

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
            onClick={() => {
              setClickedSpot(spot);
              setInfoWindowOpen(true);
            }}
          >
            <Pin 
              background={clickedSpot?.id === spot.id || clickedSpot?.name === spot.name ? '#ef4444' : '#fbbf24'} 
              glyphColor={'#fff'} 
              borderColor={'#fff'} 
            />
          </AdvancedMarker>
        ))}

        {/* 詳細ウィンドウ (InfoWindow) */}
        {infoWindowOpen && clickedSpot && (
          <InfoWindow
            position={{ lat: clickedSpot.latitude, lng: clickedSpot.longitude }}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-bold text-gray-900 text-sm mb-1">{clickedSpot.name}</h3>
              <p className="text-[10px] text-gray-500 mb-2">{clickedSpot.address}</p>
              {clickedSpot.description && (
                <p className="text-[11px] text-gray-700 line-clamp-3 bg-gray-50 p-1.5 rounded">
                  {clickedSpot.description}
                </p>
              )}
              {clickedSpot.original_url && (
                <a 
                  href={clickedSpot.original_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-500 hover:underline mt-2 inline-block"
                >
                  🔗 元の投稿を見る
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
