import { NextRequest, NextResponse } from 'next/server';
import { AddKeywordFormData, KeywordRanking } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const data: AddKeywordFormData = await request.json();
    
    if (!data.url || !data.keywords || data.keywords.length === 0) {
      return NextResponse.json(
        { error: 'URL ve anahtar kelimeler gereklidir' },
        { status: 400 }
      );
    }
    
    // Gerçek bir uygulamada burada veritabanına kayıt yapılacak
    // Şimdilik başarılı yanıt dönelim
    
    return NextResponse.json({
      success: true,
      message: `${data.url} URL'si için ${data.keywords.length} anahtar kelime takibe alındı`
    });
  } catch (error) {
    console.error('Anahtar kelime ekleme hatası:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    const currentDate = new Date().toISOString().slice(0, 10);
    
    // Gerçek bir uygulamada burada veritabanından veriler çekilecek
    // Şimdilik örnek veri dönelim
    
    // Eğer belirli bir URL için istek yapılmışsa
    if (url) {
      const keywords: KeywordRanking[] = [
        { id: 1, keyword: 'yazılım', rank: 5, lastUpdated: currentDate, previousRank: 8 },
        { id: 2, keyword: 'geliştirme', rank: 12, lastUpdated: currentDate, previousRank: 10 },
        { id: 3, keyword: 'mobil uygulama', rank: 3, lastUpdated: currentDate, previousRank: 5 },
      ];
      
      return NextResponse.json(keywords);
    }
    
    // Tüm takip edilen siteleri listele
    const trackedSites = [
      {
        id: 1,
        url: 'https://example.com',
        lastCheck: currentDate,
        score: 85,
        rankings: { google: 12, bing: 15, yandex: 8 },
        keywords: [
          { id: 1, keyword: 'yazılım', rank: 3, lastUpdated: currentDate, previousRank: 5 },
          { id: 2, keyword: 'geliştirme', rank: 8, lastUpdated: currentDate, previousRank: 7 },
          { id: 3, keyword: 'eğitim', rank: 12, lastUpdated: currentDate, previousRank: 15 },
        ]
      },
      {
        id: 2,
        url: 'https://samplesite.com',
        lastCheck: currentDate,
        score: 72,
        rankings: { google: 23, bing: 18, yandex: 12 },
        keywords: [
          { id: 4, keyword: 'pazarlama', rank: 5, lastUpdated: currentDate, previousRank: 8 },
          { id: 5, keyword: 'strateji', rank: 16, lastUpdated: currentDate, previousRank: 12 },
          { id: 6, keyword: 'analiz', rank: 7, lastUpdated: currentDate, previousRank: 9 },
        ]
      }
    ];
    
    return NextResponse.json(trackedSites);
  } catch (error) {
    console.error('Anahtar kelime takip hatası:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}