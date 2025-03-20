'use client';

import { useEffect, useState } from 'react';
import { TrackedSite } from '@/types';

interface DashboardSummaryProps {
  sites: TrackedSite[];
}

export default function DashboardSummary({ sites }: DashboardSummaryProps) {
  const [stats, setStats] = useState({
    totalSites: 0,
    averageScore: 0,
    bestRanking: 0,
    totalKeywords: 0
  });

  useEffect(() => {
    if (sites.length > 0) {
      // Toplam site sayısı
      const totalSites = sites.length;
      
      // Ortalama SEO skoru
      const totalScore = sites.reduce((sum, site) => sum + site.score, 0);
      const averageScore = Math.round(totalScore / totalSites);
      
      // En iyi sıralama (en düşük değer)
      const rankings = sites.map(site => Math.min(
        site.rankings.google,
        site.rankings.bing,
        site.rankings.yandex
      ));
      const bestRanking = Math.min(...rankings);
      
      // Toplam anahtar kelime sayısı
      const totalKeywords = sites.reduce((sum, site) => {
        return sum + (site.keywords?.length || 0);
      }, 0);

      setStats({
        totalSites,
        averageScore,
        bestRanking,
        totalKeywords
      });
    }
  }, [sites]);

  // SEO skoru rengini belirleme
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">Takip Edilen Siteler</p>
            <div className="text-2xl font-bold">{stats.totalSites}</div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-50 to-green-100">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium">Ortalama SEO Skoru</p>
            <div className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
              {stats.averageScore}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="flex items-center">
          <div className="bg-purple-500 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">En İyi Sıralama</p>
            <div className="text-2xl font-bold">#{stats.bestRanking || '-'}</div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="flex items-center">
          <div className="bg-amber-500 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-amber-700 font-medium">Takip Edilen Kelimeler</p>
            <div className="text-2xl font-bold">{stats.totalKeywords}</div>
          </div>
        </div>
      </div>
    </div>
  );
}