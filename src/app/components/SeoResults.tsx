'use client';

import { SeoResult, SeoFinding } from '@/types';

interface SeoResultsProps {
  results: SeoResult;
}

export default function SeoResults({ results }: SeoResultsProps) {
  // Skorun rengini belirleme
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Bulgu durumuna göre ikonları belirleme
  const getStatusIcon = (status: SeoFinding['status']) => {
    switch (status) {
      case 'good':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-1">Analiz Sonuçları</h2>
          <p className="text-gray-600 text-sm">{results.url}</p>
        </div>
        <div className={`text-3xl font-bold px-3 py-1 rounded-md ${getScoreColor(results.score)}`}>
          {results.score}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">Arama Motoru Sıralaması</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-100 rounded-md text-center">
            <h4 className="text-sm text-gray-600 mb-1">Google</h4>
            <p className="text-lg font-bold">{results.rankings.google}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-md text-center">
            <h4 className="text-sm text-gray-600 mb-1">Bing</h4>
            <p className="text-lg font-bold">{results.rankings.bing}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-md text-center">
            <h4 className="text-sm text-gray-600 mb-1">Yandex</h4>
            <p className="text-lg font-bold">{results.rankings.yandex}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">SEO Analizi</h3>
        <div className="space-y-3">
          {results.findings.map((finding, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
              <div className="mr-3 mt-0.5">{getStatusIcon(finding.status)}</div>
              <div>
                <h4 className="font-medium">{finding.title}</h4>
                <p className="text-sm text-gray-600">{finding.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t flex justify-between">
        <button className="btn btn-outline">
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
          Raporu İndir
        </button>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Takibe Al
        </button>
      </div>
    </div>
  );
}