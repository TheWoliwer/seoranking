import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SEO Sıralama Aracı',
  description: 'Web sitelerinizin SEO sıralamasını kontrol etmek için kullanılan basit bir araç',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}