# 🗄️ Supabase セットアップ手順 (Supabase Setup Guide)

このプロジェクトでスポットデータを保存するための、Supabase の設定手順です。

## 1. プロジェクトの作成
1. [Supabase Dashboard](https://supabase.com/dashboard) にアクセスしてログインします。
2. 「New Project」をクリックし、プロジェクト名（例: `spot-clipper`）とパスワードを設定して作成します。
3. プロジェクトが準備できるまで数分待ちます。

## 2. 環境変数の設定
プロジェクト設定の「API」セクションから以下の情報を取得し、`.env.local` に追記します。

```text
NEXT_PUBLIC_SUPABASE_URL=あなたのProject URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのanon/publicキー
```

## 3. テーブルの作成 (SQL Editor)
Supabase ダッシュボードの左メニューから「SQL Editor」を開き、「New query」を作成して以下の SQL を貼り付けて実行（Run）してください。

```sql
-- spots テーブルの作成
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

-- Row Level Security (RLS) の設定
-- 開発をスムーズにするため、誰でも読み書きできるように設定しています。
alter table spots enable row level security;

-- 読み取り権限（全員）
create policy "Enable read access for all users"
on spots for select
using (true);

-- 書き込み権限（全員）
create policy "Enable insert access for all users"
on spots for insert
with check (true);
```

## 4. 完了確認
SQL 実行後、左メニューの「Table Editor」から `spots` テーブルが作成されていることを確認してください。
