'use client';

import { useState } from 'react';
import { KeywordRanking } from '@/types';

interface KeywordRankingProps {
  url: string;
  keywords: KeywordRanking[];
}

export default function KeywordRankingComponent({ url, keywords }: KeywordRankingProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg mb-1 truncate max-w-xs" title={url}>
            {url}
          </h3>
          <p className="text-sm text-gray-500">Son güncelleme: {keywords[0]?.lastUpdated || 'Bilinmiyor'}</p>
        </div>
        <button 
          className="text-blue-600 text-sm font-medium hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Daralt' : 'Detaylar'}
        </button>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-3">Anahtar Kelime Sıralaması</h4>
        
        <div className="overflow-hidden">
          <div className={`grid grid-cols-1 gap-2 ${isExpanded ? '' : 'max-h-40 overflow-y-hidden'}`}>
            {keywords.map((keyword, index) => (
              <div 
                key={keyword.id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium truncate max-w-xs">{keyword.keyword}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{keyword.rank}</span>
                  {keyword.previousRank && (
                    <span 
                      className={`text-sm flex items-center ${getRankChangeColor(keyword.rank, keyword.previousRank)}`}
                      title={`Önceki sıralama: ${keyword.previousRank}`}
                    >
                      {getRankChangeArrow(keyword.rank, keyword.previousRank)}
                      <span className="ml-1">{getRankChangeDifference(keyword.rank, keyword.previousRank)}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {!isExpanded && keywords.length > 3 && (
            <div className="h-8 bg-gradient-to-t from-white to-transparent w-full relative -mt-8"></div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between">
          <button className="btn btn-outline text-sm px-4 py-2">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Yenile
          </button>
          <button className="btn btn-primary text-sm px-4 py-2">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Kelime Ekle
          </button>
        </div>
      </div>
    </div>
  );
}