'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { KeywordRanking } from '@/types';
import { getKeywordRankingForUrl } from '@/lib/keyword-service';

export default function KeywordDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [url, setUrl] = useState<string>('');
  const [keywords, setKeywords] = useState<KeywordRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'trend' | 'comparison'>('trend');

  useEffect(() => {
    if (params.id) {
      // Gerçek uygulamada burada ID'yi kullanarak URL'yi ve detaylarını alacağız
      // Şimdilik örnek URL kullanıyoruz
      loadData(decodeURIComponent(params.id as string));
    }
  }, [params.id]);

  const loadData = async (siteId: string) => {
    setLoading(true);
    try {
      // Gerçek uygulamada ID'den URL'yi alacağız
      const url = siteId === '1' ? 'https://example.com' : 'https://samplesite.com';
      setUrl(url);
      
      // Anahtar kelimeleri al
      const data = await getKeywordRankingForUrl(url);
      setKeywords(data);
    } catch (error) {
      console.error('Anahtar kelime detay yükleme hatası:', error);
      setError('Anahtar kelime detayları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Sıralama değişim okunun rengini belirleme
  const getRankChangeColor = (current: number, previous?: number): string => {
    if (!previous) return 'text-gray-400';
    if (current < previous) return 'text-green-600';
    if (current > previous) return 'text-red-600';
    return 'text-gray-400';
  };

  // Sıralama değişim okunu belirleme
  const getRankChangeArrow = (current: number, previous?: number) => {
    if (!previous) return '–';
    if (current < previous) return '↑';
    if (current > previous) return '↓';
    return '–';
  };

  // Sıralama değişim farkını belirleme
  const getRankChangeDifference = (current: number, previous?: number): string => {
    if (!previous) return '';
    const diff = Math.abs(current - previous);
    return diff > 0 ? `(${diff})` : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => router.push('/keywords')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold">Anahtar Kelime Detayları</h1>
          <p className="text-gray-600">{url}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sıralama Performansı</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded text-sm ${chartType === 'trend' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setChartType('trend')}
                >
                  Trend
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm ${chartType === 'comparison' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setChartType('comparison')}
                >
                  Karşılaştırma
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg mb-6">
              {chartType === 'trend' ? (
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p>Burada anahtar kelimelerin zaman içindeki performans grafiği gösterilecek</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p>Burada anahtar kelimelerin karşılaştırma grafiği gösterilecek</p>
                </div>
              )}
            </div>

            <h3 className="font-bold mb-3">Takip Edilen Anahtar Kelimeler</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Anahtar Kelime</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Sıralama</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Değişim</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Son Güncelleme</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {keywords.map((keyword) => (
                    <tr key={keyword.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium">{keyword.keyword}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-lg font-bold">{keyword.rank}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div 
                          className={`flex items-center ${getRankChangeColor(keyword.rank, keyword.previousRank)}`}
                          title={keyword.previousRank ? `Önceki sıralama: ${keyword.previousRank}` : 'Önceki veri yok'}
                        >
                          <span className="text-lg mr-1">{getRankChangeArrow(keyword.rank, keyword.previousRank)}</span>
                          <span>{getRankChangeDifference(keyword.rank, keyword.previousRank)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {keyword.lastUpdated}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Detay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Yeni Anahtar Kelime Ekle</h2>
            <div className="flex">
              <input
                type="text"
                className="input flex-1 mr-2"
                placeholder="Anahtar kelime"
              />
              <button className="btn btn-primary">
                Ekle
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}