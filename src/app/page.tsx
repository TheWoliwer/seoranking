'use client';

import { useState } from 'react';
import Link from 'next/link';
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
        <p className="text-gray-600 max-w-2xl mx-auto">
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
      
      {/* Yeni Özellik Tanıtımı */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Yeni: Anahtar Kelime Takibi
            </h2>
            <p className="text-gray-700 mb-4">
              Web siteniz için belirli anahtar kelimelerin arama motorlarındaki sıralamasını takip edin. Sıralamalardaki değişimleri izleyin ve SEO stratejinizi buna göre şekillendirin.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Sınırsız anahtar kelime ekleme ve takip etme</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Sıralama değişimlerini görsel olarak takip etme</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Günlük otomatik yenileme özelliği</span>
              </li>
            </ul>
            <Link href="/keywords" className="btn btn-primary inline-flex items-center">
              Anahtar Kelime Takibine Başla
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-3 border-b pb-2">
                <h3 className="font-medium">Örnek Kelime Takibi</h3>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Canlı</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">dijital pazarlama</span>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">3</span>
                    <span className="text-green-600 text-sm">↑ (2)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">seo analizi</span>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">7</span>
                    <span className="text-green-600 text-sm">↑ (4)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">web tasarım</span>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">12</span>
                    <span className="text-red-600 text-sm">↓ (3)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}