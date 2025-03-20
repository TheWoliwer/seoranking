'use client';

import { useState } from 'react';
import SeoForm from '@/components/SeoForm';
import SeoResults from '@/components/SeoResults';
import { SeoResult } from '@/types';

export default function Home() {
  const [seoResults, setSeoResults] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Bu bölümde gerçek API çağrısı yapılacak, şimdilik mockup veri dönüyoruz
      const response = await fetch('/api/analyze-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('SEO analizi yapılırken bir hata oluştu');
      }
      
      const data = await response.json();
      setSeoResults(data);
    } catch (err) {
      console.error('SEO analiz hatası:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('SEO analizi sırasında bir hata oluştu');
      }
      
      // Hata durumunda örnek veri gösterme (geliştirme aşamasında)
      setSeoResults({
        url: url,
        score: 85,
        findings: [
          { title: 'Sayfa Başlığı', status: 'good', message: 'Sayfa başlığı SEO için optimize edilmiş' },
          { title: 'Meta Açıklaması', status: 'warning', message: 'Meta açıklaması çok kısa' },
          { title: 'H1 Kullanımı', status: 'good', message: 'H1 etiketi doğru kullanılmış' },
        ],
        rankings: {
          google: 12,
          bing: 15,
          yandex: 8
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">SEO Sıralama Analizi</h1>
        <p className="text-gray-600">
          Web sitenizin URL&apos;sini girerek SEO skorunu ve arama motorlarındaki sıralamasını öğrenin
        </p>
      </div>
      
      <SeoForm onSubmit={handleAnalysis} isLoading={loading} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {seoResults && <SeoResults results={seoResults} />}
    </div>
  );
}