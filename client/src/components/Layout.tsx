import React from 'react';
import { ReactNode } from 'react';
import { useLocation } from 'wouter';
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
  const [location] = useLocation();
  // The home journey film owns the full viewport — no nav offset there.
  const isHome = location === '/';

  return (
    // overflow-x-clip (not hidden): clips sideways overflow without creating a
    // scroll container, which would break position:sticky descendants.
    <div className="min-h-screen bg-background text-foreground overflow-x-clip" dir={dir}>
      <a href="#main-content" className="skip-link">
        {dir === 'rtl' ? 'דלג לתוכן הראשי' : 'Skip to main content'}
      </a>
      <Navigation />
      <main id="main-content" className={isHome ? '' : 'pt-14 md:pt-20'}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </div>
  );
}
