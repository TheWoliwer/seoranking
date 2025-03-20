'use client';

import { useState } from 'react';
import { TrackedSite } from '@/types';

interface SeoRankingProps {
  data: TrackedSite;
}

export default function SeoRanking({ data }: SeoRankingProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  // SEO skoru renk belirleme
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg mb-1 truncate" title={data.url}>
            {data.url}
          </h3>
          <p className="text-sm text-gray-500">Son kontrol: {data.lastCheck}</p>
        </div>
        <div className={`text-xl font-bold ${getScoreColor(data.score)}`}>
          {data.score}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Sıralama</h4>
          <button 
            className="text-blue-600 text-sm hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Gizle' : 'Detaylar'}
          </button>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <p className="text-gray-600">Google</p>
            <p className="font-bold">{data.rankings.google}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Bing</p>
            <p className="font-bold">{data.rankings.bing}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Yandex</p>
            <p className="font-bold">{data.rankings.yandex}</p>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Sayfa Hızı</span>
                <span className="text-sm font-medium">İyi (89/100)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Mobil Uyumluluk</span>
                <span className="text-sm font-medium">Mükemmel (95/100)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Backlink Sayısı</span>
                <span className="text-sm font-medium">127</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="btn btn-outline text-sm mr-2">Yenile</button>
              <button className="btn btn-primary text-sm">Tam Rapor</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}