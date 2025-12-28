# Spot Clipper 🗺️

**Repository:** https://github.com/Anju1023/travel-new-app-project.git
**Live App:** https://vercel.com/anjus-projects-ee5add78/spot-clipper

**「SNSで見つけた『行きたい』を、地図上の『行ける』に変える」**
Instagram, TikTok, X (Twitter), Web 記事などの URL をペーストするだけで、AI (Gemini 3.0 Flash) が店舗情報・位置情報を特定し、地図上に自動でピン留めするアプリです。

## ✨ Key Features (機能)

- **🪄 Magic Clip**: URL をペーストするだけで、Gemini AI が店名・住所・ジャンルを自動抽出。
- **🗺️ Map Integration**: 抽出されたスポットを Google Maps 上にピンとして自動表示。
- **💾 Auto Save**: スポット情報は Supabase (Database) に自動保存され、リロードしても消えません。
- **💎 Glassmorphism UI**: Tailwind CSS v4 を活用した、モダンで美しいすりガラス風デザイン。
- **📱 PWA Ready**: スマホのホーム画面に追加して、ネイティブアプリのように使えます。

## 🛠️ Tech Stack (技術スタック)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion (Animations) + Lucide React (Icons)
- **AI**: Google Gemini 3.0 Flash (via `@google/generative-ai`)
- **Map**: Google Maps Platform (via `@vis.gl/react-google-maps`)
- **Database**: Supabase (PostgreSQL)

## 🚀 Getting Started (始め方)

### Prerequisites (前提条件)

以下の API キーが必要です：
1.  **Google Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)
2.  **Google Maps API Key**: [Google Cloud Console](https://console.cloud.google.com/)
3.  **Supabase Project URL & Key**: [Supabase Dashboard](https://supabase.com/)

### Installation (インストール)

1.  リポジトリをクローンします:
    ```bash
    git clone https://github.com/Anju1023/travel-new-app-project.git
    cd travel-new-app-project
    ```

2.  依存関係をインストールします:
    ```bash
    npm install
    ```

3.  環境変数ファイル `.env.local` を作成し、キーを設定します:
    ```env
    GEMINI_API_KEY=your_gemini_key
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  開発サーバーを起動します:
    ```bash
    npm run dev
    ```

5.  ブラウザで `http://localhost:3000` を開きます。

## 📜 Database Setup (DBセットアップ)

Supabase の SQL Editor で以下のクエリを実行してテーブルを作成してください:

```sql
create table spots (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text not null,
  genre text not null,
  latitude float8 not null,
  longitude float8 not null,
  description text,
  tags text[],
  original_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS設定 (開発用: 全許可)
alter table spots enable row level security;
create policy "Enable read access for all users" on spots for select using (true);
create policy "Enable insert access for all users" on spots for insert with check (true);
create policy "Enable delete access for all users" on spots for delete using (true);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.