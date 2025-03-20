'use client';

import { useEffect, useState } from 'react';
import { AddKeywordFormData, TrackedSite } from '@/types';
import KeywordRanking from '@/components/KeywordRanking';
import AddKeywordForm from '@/components/AddKeywordForm';
import { getTrackedKeywords, addKeywordsForTracking } from '@/lib/keyword-service';

export default function KeywordTrackingPage() {
  const [trackedSites, setTrackedSites] = useState<TrackedSite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddingKeywords, setIsAddingKeywords] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    loadTrackedKeywords();
  }, []);

  const loadTrackedKeywords = async () => {
    setLoading(true);
    try {
      const data = await getTrackedKeywords();
      setTrackedSites(data);
    } catch (error) {
      console.error('Anahtar kelime yükleme hatası:', error);
      showNotification('Anahtar kelimeler yüklenirken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeywords = async (data: AddKeywordFormData) => {
    setIsAddingKeywords(true);
    try {
      const result = await addKeywordsForTracking(data);
      showNotification(result.message, 'success');
      setShowForm(false);
      loadTrackedKeywords(); // Yeni eklenen verileri yükle
    } catch (error) {
      console.error('Anahtar kelime ekleme hatası:', error);
      showNotification('Anahtar kelimeler eklenirken bir hata oluştu', 'error');
    } finally {
      setIsAddingKeywords(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: '',
        type: 'success'
      });
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Anahtar Kelime Takibi</h1>
          <p className="text-gray-600">Web sitelerinizin anahtar kelimelerini ve sıralamalarını izleyin</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'İptal' : 'Yeni Kelime Ekle'}
        </button>
      </div>

      {notification.show && (
        <div className={`rounded-md p-4 ${notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <AddKeywordForm onSubmit={handleAddKeywords} isLoading={isAddingKeywords} />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : trackedSites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {trackedSites.map((site) => (
            <KeywordRanking 
              key={site.id} 
              url={site.url} 
              keywords={site.keywords || []}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <p className="text-gray-600 mb-4">Henüz takip edilen anahtar kelime bulunmuyor.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
          >
            İlk Anahtar Kelimelerinizi Ekleyin
          </button>
        </div>
      )}
    </div>
  );
}