import axios from 'axios';
import { SeoResult } from '@/types';

// SEO verileri almak için servis
export async function analyzeSeo(url: string): Promise<SeoResult> {
  try {
    // Kendi backend API'nize istek gönderin
    const response = await axios.post<SeoResult>('/api/analyze-seo', { url });
    return response.data;
  } catch (error) {
    console.error('SEO analiz hatası:', error);
    throw new Error('SEO analizi yapılırken bir hata oluştu');
  }
}

// Kaydedilmiş URL'leri getiren servis
export async function getSavedUrls() {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    // Şimdilik mockup veri dönüyoruz
    return [
      { 
        id: 1, 
        url: 'https://example.com', 
        lastCheck: '2023-09-15',
        score: 85,
        rankings: { google: 12, bing: 15, yandex: 8 }
      },
      { 
        id: 2, 
        url: 'https://samplesite.com', 
        lastCheck: '2023-09-14',
        score: 72,
        rankings: { google: 23, bing: 18, yandex: 12 }
      },
    ];
  } catch (error) {
    console.error('Kaydedilmiş URL getirme hatası:', error);
    throw new Error('Kaydedilmiş URL\'ler alınırken bir hata oluştu');
  }
}

// URL'yi takibe alan servis
export async function trackUrl(url: string) {
  try {
    // Gerçek projede burada API çağrısı yapılacak
    return { success: true, message: 'URL başarıyla takibe alındı' };
  } catch (error) {
    console.error('URL takip hatası:', error);
    throw new Error('URL takibe alınırken bir hata oluştu');
  }
}