'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrackedSite } from '@/types';
import { getTrackedKeywords } from '@/lib/keyword-service';

export default function StatsPage() {
  const [trackedSites, setTrackedSites] = useState<TrackedSite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalKeywords: 0,
    averageScore: 0,
    topKeywords: [] as { keyword: string; count: number }[],
    urlsWithMostKeywords: [] as { url: string; count: number }[],
    bestPerformingUrls: [] as { url: string; score: number }[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTrackedKeywords();
      setTrackedSites(data);
      
      // İstatistikleri hesapla
      calculateStats(data);
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sites: TrackedSite[]) => {
    // Toplam URL sayısı
    const totalUrls = sites.length;
    
    // Toplam anahtar kelime sayısı
    let totalKeywords = 0;
    let allKeywords: { keyword: string; url: string }[] = [];
    
    sites.forEach(site => {
      if (site.keywords && site.keywords.length > 0) {
        totalKeywords += site.keywords.length;
        
        // Tüm anahtar kelimeleri topla
        site.keywords.forEach(keyword => {
          allKeywords.push({
            keyword: keyword.keyword,
            url: site.url
          });
        });
      }
    });
    
    // Ortalama SEO skoru
    const totalScore = sites.reduce((acc, site) => acc + site.score, 0);
    const averageScore = totalUrls > 0 ? Math.round(totalScore / totalUrls) : 0;
    
    // En çok kullanılan anahtar kelimeler
    const keywordCounts: Record<string, number> = {};
    allKeywords.forEach(item => {
      if (keywordCounts[item.keyword]) {
        keywordCounts[item.keyword]++;
      } else {
        keywordCounts[item.keyword] = 1;
      }
    });
    
    const topKeywords = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // En çok anahtar kelime içeren URL'ler
    const urlKeywordCounts: Record<string, number> = {};
    sites.forEach(site => {
      urlKeywordCounts[site.url] = site.keywords?.length || 0;
    });
    
    const urlsWithMostKeywords = Object.entries(urlKeywordCounts)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // En iyi performans gösteren URL'ler
    const bestPerformingUrls = [...sites]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(site => ({ url: site.url, score: site.score }));
    
    setStats({
      totalUrls,
      totalKeywords,
      averageScore,
      topKeywords,
      urlsWithMostKeywords,
      bestPerformingUrls
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">İstatistikler ve Genel Bakış</h1>
        <div className="flex space-x-2">
          <Link href="/dashboard" className="btn btn-outline">
            SEO Paneli
          </Link>
          <Link href="/keywords" className="btn btn-outline">
            Anahtar Kelimeler
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Özet Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Takip Edilen Web Siteleri</p>
                  <h3 className="text-3xl font-bold text-blue-900">{stats.totalUrls}</h3>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-green-50 to-green-100">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-green-700">Takip Edilen Anahtar Kelimeler</p>
                  <h3 className="text-3xl font-bold text-green-900">{stats.totalKeywords}</h3>
                </div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="flex items-center">
                <div className="bg-purple-500 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-purple-700">Ortalama SEO Skoru</p>
                  <h3 className="text-3xl font-bold text-purple-900">{stats.averageScore}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Alt İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* En Çok Kullanılan Anahtar Kelimeler */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">En Çok Kullanılan Anahtar Kelimeler</h2>
              <div className="space-y-3">
                {stats.topKeywords.length > 0 ? (
                  stats.topKeywords.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.keyword}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {item.count} site
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Henüz takip edilen anahtar kelime yok</p>
                )}
              </div>
            </div>

            {/* En İyi Performans Gösteren URL'ler */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">En İyi SEO Performansı</h2>
              <div className="space-y-3">
                {stats.bestPerformingUrls.length > 0 ? (
                  stats.bestPerformingUrls.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium truncate max-w-xs" title={item.url}>{item.url}</span>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Skor: {item.score}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Henüz takip edilen URL yok</p>
                )}
              </div>
            </div>

            {/* En Çok Anahtar Kelime İçeren URL'ler */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">En Çok Kelime Takibi Yapılan Siteler</h2>
              <div className="space-y-3">
                {stats.urlsWithMostKeywords.length > 0 ? (
                  stats.urlsWithMostKeywords.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium truncate max-w-xs" title={item.url}>{item.url}</span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {item.count} kelime
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Henüz takip edilen URL yok</p>
                )}
              </div>
            </div>

            {/* Grafik Gösterimi */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">SEO Performans Grafiği</h2>
              <div className="bg-gray-50 rounded-lg h-60 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p>Burada SEO skorlarının zamana göre grafiği gösterilecek</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-bold mb-4">Hızlı Erişim</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">SEO Paneli</h3>
                    <p className="text-sm text-gray-600">Takip ettiğiniz sitelerin durumunu görün</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/keywords" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Anahtar Kelimeler</h3>
                    <p className="text-sm text-gray-600">Kelime sıralamalarını takip edin</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">SEO Analizi</h3>
                    <p className="text-sm text-gray-600">Yeni bir site analizi yapın</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}