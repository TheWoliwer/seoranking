import { SeoResult, KeywordRanking } from '@/types';

// SEO sonuçlarını PDF olarak indirmek için fonksiyon
// Gerçek projede PDF oluşturma kütüphanesi kullanılmalıdır (örneğin: jspdf)
export function downloadSeoReport(result: SeoResult) {
  // Bu fonksiyon gerçek bir uygulamada PDF veya CSV oluşturacaktır
  // Şimdilik basit bir JSON dosyası indiriyoruz
  
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const filename = `seo-rapor-${formatURLForFilename(result.url)}-${timestamp}.json`;
  
  const reportData = JSON.stringify(result, null, 2);
  
  // Dosyayı indirme işlemi
  downloadFile(reportData, filename, 'application/json');
}

// Anahtar kelime sıralama raporunu indirmek için fonksiyon
export function downloadKeywordReport(url: string, keywords: KeywordRanking[]) {
  // Bu fonksiyon gerçek bir uygulamada PDF veya CSV oluşturacaktır
  // Şimdilik basit bir JSON dosyası indiriyoruz
  
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const filename = `anahtar-kelime-raporu-${formatURLForFilename(url)}-${timestamp}.json`;
  
  const reportData = JSON.stringify({
    url,
    date: new Date().toISOString(),
    keywords
  }, null, 2);
  
  // Dosyayı indirme işlemi
  downloadFile(reportData, filename, 'application/json');
}

// URL'yi dosya adı için uygun hale getiren yardımcı fonksiyon
function formatURLForFilename(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-');
}

// Dosya indirme işlemi için yardımcı fonksiyon
function downloadFile(content: string, filename: string, contentType: string) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  
  a.href = URL.createObjectURL(file);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Temizlik
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, 0);
}

// SEO puanını renk koduna dönüştüren yardımcı fonksiyon
export function getScoreColorClass(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

// Sıralama değişimine göre renk ve ok belirleme
export function getRankChangeInfo(current: number, previous?: number) {
  if (!previous) {
    return {
      color: 'text-gray-400',
      arrow: '–',
      difference: ''
    };
  }
  
  const diff = Math.abs(current - previous);
  
  if (current < previous) {
    return {
      color: 'text-green-600',
      arrow: '↑',
      difference: diff > 0 ? `(${diff})` : ''
    };
  }
  
  if (current > previous) {
    return {
      color: 'text-red-600',
      arrow: '↓',
      difference: diff > 0 ? `(${diff})` : ''
    };
  }
  
  return {
    color: 'text-gray-400',
    arrow: '–',
    difference: ''
  };
}