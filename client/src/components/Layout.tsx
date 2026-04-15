import React, { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground" dir={dir}>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
