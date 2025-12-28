'use server';

import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// 出力データの形式を定義 (Structured Output)
const schema: Schema = {
  description: "店舗情報の抽出結果",
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING,
      description: "店舗名",
      nullable: false,
    },
    address: {
      type: SchemaType.STRING,
      description: "住所（可能な限り詳細に）",
      nullable: false,
    },
    genre: {
      type: SchemaType.STRING,
      description: "ジャンル（カフェ、ラーメン、観光スポットなど）",
      nullable: false,
    },
    latitude: {
      type: SchemaType.NUMBER,
      description: "店舗の緯度 (decimal degree)",
      nullable: false,
    },
    longitude: {
      type: SchemaType.NUMBER,
      description: "店舗の経度 (decimal degree)",
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: "お店の短い紹介文やおすすめポイント",
      nullable: true,
    },
    tags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "特徴を表すタグ（例：絶景、行列、デート、一人でも入りやすい）",
      nullable: true,
    }
  },
  required: ["name", "address", "genre", "latitude", "longitude"],
};

export async function extractSpotInfo(url: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  // Gemini 3.0 Flash モデルを指定
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `以下のURLのコンテンツから店舗情報を抽出してください。
URLの内容が店舗や場所でない場合は、エラーを返してください。

URL: ${url}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const data = JSON.parse(response.text());
    return { ...data, original_url: url };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("情報の抽出に失敗しました。URLが正しいか確認してください。");
  }
}

export async function saveSpot(spot: any) {
  // 重複チェック: すでに同じURLが保存されているか
  const { data: existingSpots } = await supabase
    .from('spots')
    .select('id')
    .eq('original_url', spot.original_url);

  if (existingSpots && existingSpots.length > 0) {
    throw new Error('このスポットはすでに保存されています！');
  }

  const { data, error } = await supabase
    .from('spots')
    .insert([
      {
        name: spot.name,
        address: spot.address,
        genre: spot.genre,
        latitude: spot.latitude,
        longitude: spot.longitude,
        description: spot.description,
        tags: spot.tags,
        original_url: spot.original_url,
      },
    ])
    .select();

  if (error) {
    console.error('Supabase Save Error:', error);
    throw new Error('スポットの保存に失敗しました');
  }

  return data[0];
}

export async function getSpots() {
  const { data, error } = await supabase
    .from('spots')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Fetch Error:', error);
    return [];
  }

  return data;
}

export async function deleteSpot(id: string) {
  const { error } = await supabase
    .from('spots')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase Delete Error:', error);
    throw new Error('スポットの削除に失敗しました');
  }

  return true;
}
