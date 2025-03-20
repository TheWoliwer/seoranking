'use client';

import { useEffect, useState } from 'react';
import SeoRanking from '@/components/SeoRanking';
import { TrackedSite } from '@/types';

export default function Dashboard() {
  const [savedUrls, setSavedUrls] = useState<TrackedSite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Örnek olarak kaydedilmiş URL'leri gösteriyoruz
    // Gerçek projede bu veri API'den gelecektir
    setTimeout(() => {
      setSavedUrls([
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO İzleme Panosu</h1>
        <button className="btn btn-primary">Yeni URL Ekle</button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Yükleniyor...</p>
        </div>
      ) : savedUrls.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedUrls.map((item) => (
            <SeoRanking key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-8">
          <p className="text-gray-600 mb-4">Henüz kaydedilmiş URL bulunmuyor.</p>
          <button className="btn btn-primary">İlk URL&apos;nizi Ekleyin</button>
        </div>
      )}
    </div>
  );
}