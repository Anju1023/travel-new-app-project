# ✅ Spot Clipper - 開発タスクリスト (Development Tasks)

**Project Status:** 🚧 Planning & Setup

---

## 🏗️ Phase 0: Project Setup (環境構築)
- [x] **Initial Setup**
  - [x] Initialize Next.js 16 project (App Router, TypeScript, Tailwind CSS).
  - [x] Configure Tailwind CSS v4.
  - [x] Setup ESLint & Prettier.
- [x] **Infrastructure**
  - [x] Create Google Cloud Project (for Maps API & Vertex AI).
  - [x] Setup Supabase project (Database).
  - [x] Set environment variables (`.env.local`).

## 🧩 Phase 1: MVP Implementation (最小機能開発)
### 1.1 UI Skeleton (画面の枠組み)
- [x] **Layout**
  - [x] Create `MainLayout` with full-screen map container.
  - [x] Implement responsive sidebar/bottom sheet structure.
- [x] **Components**
  - [x] `MapComponent` (Google Maps wrapper).
  - [x] `ClipperModal` (URL input & result preview).
  - [x] `SpotList` (Sidebar/Drawer list).

### 1.2 AI & Backend (頭脳部分)
- [x] **Gemini Integration**
  - [x] Implement `extractSpotInfo` server action (call Gemini 3.0 Flash).
  - [x] Define structured output schema (JSON) for spot data.
  - [x] Test with sample URLs (Instagram, Web).
- [x] **Database**
  - [x] Define `spots` table schema in Supabase.
  - [x] Create CRUD functions (save, fetch spots).

### 1.3 Map & Interaction (地図連携)
- [x] **Map Logic**
  - [x] Display pins (markers) from DB data.
  - [x] Implement "Fly to" animation when selecting a spot.
  - [x] Add info window (Detail view) on marker click.

## 💅 Phase 2: Polish & UX (洗練)
- [x] **Design Refinement**
  - [x] Apply "Glassmorphism" styles to cards/modals.
  - [x] Add loading animations (Lottie or CSS).
  - [x] Implement micro-interactions (haptic feedback, transitions).
- [ ] **Mobile Optimization**
  - [ ] Ensure touch-friendly tap targets.
  - [ ] PWA setup (manifest, icons) for "Add to Home Screen".

## 🚀 Phase 3: Launch Prep (リリース準備)
- [ ] **Testing**
  - [ ] Manual testing on mobile devices.
  - [ ] Fix bugs and edge cases.
- [ ] **Deployment**
  - [ ] Deploy to Vercel.
  - [ ] Verify production environment variables.

---

## 📝 メモ (Notes)
- **Gemini 3.0 Flash** は速度重視で使用。
- 地図の API Key は公開しないように注意 (`NEXT_PUBLIC_` の扱い)。
- モバイルでの操作感を最優先に調整する。
