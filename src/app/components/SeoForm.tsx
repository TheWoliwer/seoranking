'use client';

import { useState, FormEvent } from 'react';

interface SeoFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export default function SeoForm({ onSubmit, isLoading }: SeoFormProps) {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basit URL doğrulama
    if (!url) {
      setError('URL alanı boş bırakılamaz');
      return;
    }
    
    // URL format kontrolü
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (!urlPattern.test(url)) {
      setError('Lütfen geçerli bir URL girin');
      return;
    }
    
    setError('');
    
    // URL'in protokol kontrolü ve düzeltme
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }
    
    onSubmit(formattedUrl);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 font-medium">
            Web Sitesi URL&apos;si
          </label>
          <input
            type="text"
            id="url"
            className="input"
            placeholder="Örneğin: example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analiz Ediliyor...
              </>
            ) : (
              'SEO Analizi Yap'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}