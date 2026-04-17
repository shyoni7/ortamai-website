import React from 'react';
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import AccessibilityWidget from './AccessibilityWidget';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground" dir={dir}>
      <a href="#main-content" className="skip-link">
        {dir === 'rtl' ? 'דלג לתוכן הראשי' : 'Skip to main content'}
      </a>
      <Navigation />
      <main id="main-content" className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </div>
  );
}
