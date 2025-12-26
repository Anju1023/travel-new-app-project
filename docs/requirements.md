# 🗺️ Spot Clipper - 要件定義書 (Requirements Document)

**Version:** 0.1.0
**Last Updated:** 2025-12-26
**Status:** Draft

## 1. プロジェクト概要

### コンセプト

**「SNS で見つけた『行きたい』を、地図上の『行ける』に変える」**
Instagram, TikTok, X (Twitter), Web 記事などの URL をペーストするだけで、AI (Gemini 3.0 Flash) が店舗情報・位置情報を特定し、地図上に自動でピン留めするアプリ。

### 解決する課題

- SNS の「保存済み」に埋もれて、結局どこに行きたかったのか忘れる。
- 投稿内の店名や住所を Google マップに手入力で転記するのが面倒。
- 動画だけで店名がテキスト化されていない投稿からも情報を抜き出したい。

---

## 2. 技術スタック (Tech Stack)

### Frontend & Application

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React Context / Hooks
- **Map Library:** Google Maps Platform (Maps JavaScript API)

### Backend & AI

- **AI Model:** **Gemini 3.0 Flash** (via Google Vertex AI or AI Studio)
  - **役割:** URL/動画/テキストからの非構造化データ抽出、住所特定、タグ生成。
- **Database:** Supabase (PostgreSQL)
- **API:** Next.js Server Actions / Route Handlers

---

## 3. 機能要件 (Functional Requirements)

### Phase 1: MVP (Minimum Viable Product)

#### 1. 魔法のクリップ機能 (Magic Clip)

- **入力:** ユーザーが SNS の URL (Instagram, TikTok, X, 食べログなど) を入力フォームにペースト。
- **処理:**
  1.  Gemini 3.0 Flash が URL 先のコンテンツ（テキスト、画像、動画）を解析。
  2.  **情報抽出:** 店名、住所、電話番号、ジャンル、特徴（「絶景」「パンケーキ」など）を抽出。
  3.  **Grounding:** 抽出した情報を Google 検索/マップデータと照合し、正確な座標 (Lat/Lng) を特定。
- **出力:** 解析結果をプレビュー表示し、ユーザーが「保存」ボタンで確定。

#### 2. マップビュー (Map View)

- 保存されたスポットを地図上にピン表示。
- ピンをタップすると、店名・写真・元 URL へのリンクを表示。
- 現在地周辺の保存スポットを強調表示。

#### 3. スポットリスト (List View)

- 保存したスポットをカード形式で一覧表示。
- ジャンルやタグでのフィルタリング（例：「カフェ」「ラーメン」）。

---

## 4. データモデル (簡易設計)

### `spots` テーブル

| Column         | Type      | Description                             |
| :------------- | :-------- | :-------------------------------------- |
| `id`           | uuid      | Primary Key                             |
| `original_url` | text      | 元の SNS 投稿 URL                       |
| `name`         | text      | 店舗名 (Gemini 抽出)                    |
| `address`      | text      | 住所 (Gemini 抽出)                      |
| `latitude`     | float     | 緯度                                    |
| `longitude`    | float     | 経度                                    |
| `tags`         | text[]    | 自動生成タグ (ex: ["ランチ", "デート"]) |
| `notes`        | text      | Gemini による要約メモ                   |
| `created_at`   | timestamp | 作成日時                                |

---

## 5. UI/UX デザイン方針

- **Mobile First:** 旅先や移動中のスマホ操作を最優先。
- **Speed:** URL ペーストから解析完了までを爆速に（Gemini 3.0 Flash の速度を活かす）。
- **Visual:** 地図と写真を中心にした、ワクワクするデザイン。

---

## 6. 今後の拡張構想 (Roadmap)

- **ルート生成:** 保存したピンを繋いで、Gemini が最適な移動ルートを提案。
- **友達共有:** 「京都旅行」などのリストを作って友達とシェア。
- **リアルタイム通知:** 保存したスポットの近くを通ったらプッシュ通知でお知らせ。
