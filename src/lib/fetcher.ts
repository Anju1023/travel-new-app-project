import * as cheerio from 'cheerio';

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch URL: ${url} (${response.status})`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      '';
    
    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';

    const siteName = $('meta[property="og:site_name"]').attr('content') || '';

    // 本文のテキストもある程度取得（ノイズが多いので長さを制限）
    const bodyText = $('body').text().replace(/\s+/g, ' ').slice(0, 2000);

    return {
      title,
      description,
      siteName,
      bodyText,
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
}
