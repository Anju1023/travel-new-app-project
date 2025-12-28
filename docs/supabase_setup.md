# 🗄️ Supabase セットアップ手順 (Supabase Setup Guide)

このプロジェクトでスポットデータを保存するための、Supabase の設定手順です。

## 1. プロジェクトの作成
1. [Supabase Dashboard](https://supabase.com/dashboard) にアクセスしてログインします。
2. 「New Project」をクリックし、プロジェクト名（例: `spot-clipper`）とパスワードを設定して作成します。

## 2. 環境変数の設定
`.env.local` に以下の情報を追記します。

```text
NEXT_PUBLIC_SUPABASE_URL=あなたのProject URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのanon/publicキー
```

## 3. テーブルの作成 (SQL Editor)
SQL Editor で以下の SQL を実行してください。

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

alter table spots enable row level security;

create policy "Enable read access for all users"
on spots for select
using (true);

create policy "Enable insert access for all users"
on spots for insert
with check (true);
```