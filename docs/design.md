# 🎨 Spot Clipper - デザイン仕様書 (Design Document)

**Version:** 0.1.0
**Last Updated:** 2025-12-26

## 1. デザインコンセプト (Concept)

### テーマ: "Instant Discovery" (瞬間の発見)
- **キーワード:** 軽快、鮮やか、没入感。
- **UI の雰囲気:** 地図とコンテンツが主役。UI パーツは極力シンプルに、コンテンツ（写真や地図）を引き立てる「ガラスのような」デザイン。

### カラーパレット (Color Palette)
Tailwind CSS v4 の変数 (`--color-*`) を活用して管理。

- **Primary (Accent):** `oklch(0.6 0.2 230)` (Vivid Blue)
  - アクションボタン、現在地、強調表示に使用。信頼感とテクノロジー感。
- **Secondary:** `oklch(0.85 0.15 80)` (Warm Orange)
  - ピン、注目スポット、"New" バッジなど。楽しさと食欲をそそる色。
- **Background:** `oklch(0.98 0 0)` (Near White) / `oklch(0.15 0 0)` (Dark Mode)
  - クリーンでノイズのない背景。
- **Surface:** `oklch(1 0 0 / 80%)` (Glassmorphism)
  - カードやモーダル背景に「すりガラス効果」を使用して、地図が透けて見える演出。

---

## 2. 画面構成 (Screen Flow)

### 📱 1. メイン画面 (Main Map View)
アプリのホーム画面。地図が全画面に広がる。

- **Map Layer:**
  - Google Maps をフルスクリーン表示。
  - カスタムスタイル: 建物や道路はシンプルに、保存したピンを目立たせる。
- **Floating Action Button (FAB):**
  - 画面下部中央に大きな「＋」ボタン。
  - これを押すと URL 入力モードへ。
- **Bottom Sheet (Draggable):**
  - 画面下部に「保存したスポット」のリストを少しだけ表示。
  - 上にスワイプするとリストが全画面に広がる。

### ✨ 2. クリップ・モーダル (Clipper Modal)
URL を解析する魔法のインターフェース。

- **Step 1: Input**
  - 中央にシンプルな入力フィールド。「URL をペースト」
- **Step 2: Analyzing (Gemini 3.0 Action)**
  - 解析中はワクワクするローディングアニメーション。
  - 「🎥 動画を解析中...」「🏠 住所を特定しました！」などのステータスを表示。
- **Step 3: Preview & Confirm**
  - 解析された結果（店名、写真、タグ、地図上の位置）をカードで表示。
  - 「保存する」ボタンで確定。

### 📍 3. スポット詳細 (Spot Detail)
ピンをタップした時の表示。

- **Header:** お店のアイキャッチ画像（SNS から取得）。
- **Title:** 店名とジャンルタグ。
- **Action:** 「Google マップで開く」「ルート案内」「元の投稿を見る」ボタン。
- **AI Summary:** Gemini が生成した「ここがおすすめ！」という短い要約文。

---

## 3. UI コンポーネント設計 (Tailwind CSS v4)

### Buttons
- **Primary:** `bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform`
- **Ghost:** `bg-transparent text-gray-700 hover:bg-gray-100`

### Cards (Glass Effect)
- `bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl`
- iOS のような洗練された質感。

### Typography
- **Font:** Inter (英数字), Noto Sans JP (日本語)
- **Headings:** 太字で視認性高く。
- **Body:** スマホでも読みやすいサイズ感 (16px base)。

---

## 4. インタラクション (Interaction)
- **Micro-interactions:**
  - ピンをタップした時に「ぽよん」と跳ねるアニメーション。
  - 保存完了時に紙吹雪が舞うようなフィードバック。
- **Haptic Feedback:**
  - クリップ完了時などに触覚フィードバックを入れて「完了した感」を出す。

## 5. レスポンシブ対応
- 基本は **Mobile First**。
- PC 表示時は、左側にリスト／右側に地図の 2 カラムレイアウトに変形。
