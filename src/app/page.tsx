export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
        <p className="text-gray-500 font-medium">📍 Google Maps will be here...</p>
      </div>

      {/* Floating Action Button (FAB) - Placeholder */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform font-bold text-lg flex items-center gap-2">
          <span>✨</span>
          魔法のクリップ
        </button>
      </div>

      {/* Sidebar / Bottom Sheet Placeholder */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white/80 backdrop-blur-md border-t border-gray-200 rounded-t-3xl shadow-2xl p-6 z-20 md:left-4 md:top-4 md:bottom-4 md:w-80 md:h-auto md:rounded-2xl md:border-t-0">
        <h2 className="text-xl font-bold text-gray-800 mb-4">保存したスポット</h2>
        <p className="text-sm text-gray-500">URLをペーストして、地図にピンを刺そう！</p>
      </div>
    </main>
  );
}