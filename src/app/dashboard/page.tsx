'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SeoRanking from '@/components/SeoRanking';
import { TrackedSite } from '@/types';
import DashboardSummary from '../components/DashboardSummary';

export default function Dashboard() {
  const [savedUrls, setSavedUrls] = useState<TrackedSite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddUrl, setShowAddUrl] = useState<boolean>(false);
  const [newUrl, setNewUrl] = useState<string>('');

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

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    
    // URL format kontrolü
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (!urlPattern.test(newUrl)) {
      alert('Lütfen geçerli bir URL girin');
      return;
    }
    
    // URL'in protokol kontrolü ve düzeltme
    let formattedUrl = newUrl;
    if (!/^https?:\/\//i.test(newUrl)) {
      formattedUrl = `https://${newUrl}`;
    }
    
    // Örnek olarak yeni URL'yi listeye ekliyoruz
    // Gerçek projede API'ye gönderilecek
    const newTrackedSite: TrackedSite = {
      id: savedUrls.length + 1,
      url: formattedUrl,
      lastCheck: new Date().toISOString().slice(0, 10),
      score: Math.floor(Math.random() * 30) + 60, // 60-90 arası rastgele puan
      rankings: {
        google: Math.floor(Math.random() * 30) + 1,
        bing: Math.floor(Math.random() * 30) + 1,
        yandex: Math.floor(Math.random() * 30) + 1
      }
    };
    
    setSavedUrls([...savedUrls, newTrackedSite]);
    setNewUrl('');
    setShowAddUrl(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO İzleme Panosu</h1>
        <div className="space-x-2">
          <Link href="/keywords" className="btn btn-outline">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Anahtar Kelimeler
          </Link>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddUrl(!showAddUrl)}
          >
            {showAddUrl ? 'İptal' : 'Yeni URL Ekle'}
          </button>
        </div>
      </div>
      
      {/* Özet İstatistikler */}
      {!loading && savedUrls.length > 0 && (
        <DashboardSummary sites={savedUrls} />
      )}

      {showAddUrl && (
        <div className="card mb-6">
          <h2 className="text-lg font-medium mb-3">Yeni URL Ekle</h2>
          <form onSubmit={handleAddUrl}>
            <div className="flex">
              <input
                type="text"
                className="input flex-1 mr-2"
                placeholder="Örneğin: example.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Ekle
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : savedUrls.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedUrls.map((item) => (
            <SeoRanking key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h.01M15 10h.01M9 14h6"></path>
          </svg>
          <p className="text-gray-600 mb-4">Henüz takip edilen URL bulunmuyor.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddUrl(true)}
          >
            İlk URL&apos;nizi Ekleyin
          </button>
        </div>
      )}

      {/* Anahtar Kelime Takip Özelliği Tanıtımı */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
        <div className="flex items-start">
          <div className="bg-blue-500 rounded-full p-2 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">Anahtar Kelime Sıralama Takibi</h3>
            <p className="text-blue-700 mb-3">
              Web siteleriniz için önemli anahtar kelimeleri takip edin ve sıralama değişimlerini izleyin.
            </p>
            <Link 
              href="/keywords" 
              className="text-blue-600 hover:underline inline-flex items-center font-medium"
            >
              Anahtar Kelime Takip Sayfasına Git
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}