'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Google API'den token almak için gerekli işlemleri burada gerçekleştir
      console.log('Auth code received:', code);
      
      // Başarılı giriş sonrası yönlendirme
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      // Hata durumunda ana sayfaya yönlendir
      router.push('/');
    }
  }, [router, searchParams]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-2xl font-bold mb-4">Giriş İşlemi</h1>
      <p className="text-gray-600 mb-4">Google hesabınız ile giriş yapılıyor...</p>
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}