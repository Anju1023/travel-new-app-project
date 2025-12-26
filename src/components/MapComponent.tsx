'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function MapComponent() {
  if (!API_KEY) {
    return (
      <div className="w-full h-full bg-blue-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-xs">
          <p className="text-blue-600 font-bold text-lg mb-2">🗺️ Maps API Key Required</p>
          <p className="text-blue-400 text-sm">
            .env.local に API キーを設定してください。
            <br />
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
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
        mapId={'bf51a91027ad466'} // 必要ならMap IDを設定（Advanced Markerに必要）
      >
        {/* サンプルのピン（後でDBと連動させるよ！） */}
        <AdvancedMarker position={{ lat: 35.6812, lng: 139.7671 }}>
          <Pin background={'#fbbf24'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
