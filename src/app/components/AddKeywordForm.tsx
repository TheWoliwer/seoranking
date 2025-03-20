'use client';

import { useState, FormEvent } from 'react';
import { AddKeywordFormData } from '@/types';

interface AddKeywordFormProps {
  onSubmit: (data: AddKeywordFormData) => Promise<void>;
  isLoading: boolean;
}

export default function AddKeywordForm({ onSubmit, isLoading }: AddKeywordFormProps) {
  const [url, setUrl] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    url?: string;
    keyword?: string;
    keywords?: string;
  }>({});

  const handleAddKeyword = () => {
    // Hata kontrolü
    if (!keyword.trim()) {
      setErrors(prev => ({ ...prev, keyword: 'Anahtar kelime boş olamaz' }));
      return;
    }

    // Halihazırda eklenmiş mi kontrolü
    if (keywords.includes(keyword.trim())) {
      setErrors(prev => ({ ...prev, keyword: 'Bu anahtar kelime zaten eklenmiş' }));
      return;
    }

    // Anahtar kelimeyi listeye ekle
    setKeywords(prev => [...prev, keyword.trim()]);
    setKeyword('');
    setErrors(prev => ({ ...prev, keyword: undefined, keywords: undefined }));
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newErrors: {
      url?: string;
      keyword?: string;
      keywords?: string;
    } = {};

    // URL doğrulama
    if (!url) {
      newErrors.url = 'URL alanı boş bırakılamaz';
      hasError = true;
    } else {
      // URL format kontrolü
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
      if (!urlPattern.test(url)) {
        newErrors.url = 'Lütfen geçerli bir URL girin';
        hasError = true;
      }
    }

    // Anahtar kelimeler kontrolü
    if (keywords.length === 0) {
      newErrors.keywords = 'En az bir anahtar kelime eklemelisiniz';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    // URL'in protokol kontrolü ve düzeltme
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    onSubmit({
      url: formattedUrl,
      keywords
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">Anahtar Kelime Takibi Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 font-medium">
            Web Sitesi URL&apos;si
          </label>
          <input
            type="text"
            id="url"
            className={`input ${errors.url ? 'border-red-500' : ''}`}
            placeholder="Örneğin: example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errors.url) setErrors(prev => ({ ...prev, url: undefined }));
            }}
            disabled={isLoading}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="keyword" className="block mb-2 font-medium">
            Anahtar Kelimeler
          </label>
          <div className="flex">
            <input
              type="text"
              id="keyword"
              className={`input flex-1 mr-2 ${errors.keyword ? 'border-red-500' : ''}`}
              placeholder="Anahtar kelime ekleyin"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                if (errors.keyword) setErrors(prev => ({ ...prev, keyword: undefined }));
              }}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleAddKeyword}
              disabled={isLoading}
            >
              Ekle
            </button>
          </div>
          {errors.keyword && (
            <p className="mt-1 text-sm text-red-600">{errors.keyword}</p>
          )}
        </div>
        
        {/* Eklenen anahtar kelimeler listesi */}
        <div className="mb-6">
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((kw, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                >
                  <span>{kw}</span>
                  <button
                    type="button"
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleRemoveKeyword(index)}
                    disabled={isLoading}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            errors.keywords ? (
              <p className="mt-1 text-sm text-red-600">{errors.keywords}</p>
            ) : (
              <p className="text-sm text-gray-500">Henüz anahtar kelime eklenmedi</p>
            )
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
                Ekleniyor...
              </>
            ) : (
              'Takibe Al'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}