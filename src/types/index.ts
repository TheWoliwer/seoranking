// SEO Sonuç tipi
export interface SeoResult {
  url: string;
  score: number;
  findings: SeoFinding[];
  rankings: SeoRankings;
}

// SEO Bulguları
export interface SeoFinding {
  title: string;
  status: 'good' | 'warning' | 'error';
  message: string;
}

// Arama Motoru Sıralamaları
export interface SeoRankings {
  google: number;
  bing: number;
  yandex: number;
}

// Takip edilen Site
export interface TrackedSite {
  id: number;
  url: string;
  lastCheck: string;
  score: number;
  rankings: SeoRankings;
}