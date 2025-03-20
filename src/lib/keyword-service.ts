import axios from 'axios';
import { AddKeywordFormData, KeywordRanking, TrackedSite } from '@/types';

// Anahtar kelime/URL'leri eklemek için servis
export async function addKeywordsForTracking(data: AddKeywordFormData): Promise<{success: boolean; message: string}> {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    // Şimdilik başarılı bir cevap döneceğiz
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simülasyon için bekleme
    
    return { 
      success: true, 
      message: `${data.url} URL'si için ${data.keywords.length} anahtar kelime takibe alındı` 
    };
  } catch (error) {
    console.error('Anahtar kelime ekleme hatası:', error);
    throw new Error('Anahtar kelimeler eklenirken bir hata oluştu');
  }
}

// Takip edilen anahtar kelimeleri getirmek için servis
export async function getTrackedKeywords(): Promise<TrackedSite[]> {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    // Şimdilik mockup veri dönüyoruz
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simülasyon için bekleme
    
    const currentDate = new Date().toISOString().slice(0, 10);
    
    return [
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
          { id: 4, keyword: 'web tasarım', rank: 6, lastUpdated: currentDate, previousRank: 6 },
          { id: 5, keyword: 'mobil uygulama', rank: 9, lastUpdated: currentDate, previousRank: 11 },
        ]
      },
      {
        id: 2,
        url: 'https://samplesite.com',
        lastCheck: currentDate,
        score: 72,
        rankings: { google: 23, bing: 18, yandex: 12 },
        keywords: [
          { id: 6, keyword: 'pazarlama', rank: 5, lastUpdated: currentDate, previousRank: 8 },
          { id: 7, keyword: 'strateji', rank: 16, lastUpdated: currentDate, previousRank: 12 },
          { id: 8, keyword: 'analiz', rank: 7, lastUpdated: currentDate, previousRank: 9 },
        ]
      }
    ];
  } catch (error) {
    console.error('Takip edilen anahtar kelime hatası:', error);
    throw new Error('Takip edilen anahtar kelimeler alınırken bir hata oluştu');
  }
}

// Belirli bir URL için anahtar kelime sıralamalarını almak için servis
export async function getKeywordRankingForUrl(url: string): Promise<KeywordRanking[]> {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    // Şimdilik mockup veri dönüyoruz
    const allTrackedSites = await getTrackedKeywords();
    const site = allTrackedSites.find(site => site.url === url);
    
    if (!site || !site.keywords) {
      return [];
    }
    
    return site.keywords;
  } catch (error) {
    console.error('URL anahtar kelime sıralaması hatası:', error);
    throw new Error('URL için anahtar kelime sıralamaları alınırken bir hata oluştu');
  }
}

// Anahtar kelime sıralamalarını yenilemek için servis
export async function refreshKeywordRankings(urlId: number): Promise<{success: boolean; message: string}> {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    // Şimdilik başarılı bir cevap döneceğiz
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simülasyon için bekleme
    
    return { 
      success: true, 
      message: 'Anahtar kelime sıralamaları başarıyla güncellendi' 
    };
  } catch (error) {
    console.error('Anahtar kelime güncelleme hatası:', error);
    throw new Error('Anahtar kelime sıralamaları güncellenirken bir hata oluştu');
  }
}