import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <footer className="bg-card border-t border-border mt-20" dir={dir}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
              ORTAM AI
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {lang === 'he' 
                ? 'המרכז לפיתוח AI - הגשר בין העולם הישן לעולם מבוסס AI. חממה טכנולוגית, הכשרות והשמה במקום אחד.'
                : 'The AI Development Center – bridging the old world and the AI-powered world. Tech incubator, training, and placement in one place.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">
              {lang === 'he' ? 'קישורים מהירים' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">
              {lang === 'he' ? 'צור קשר' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-foreground/70">
                <MapPin size={16} />
                <span>{lang === 'he' ? 'רח\' אילת 26, תל אביב יפו' : '26 Eilat St., Tel Aviv-Jaffa'}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Phone size={16} />
                <span>+972 (0)XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Mail size={16} />
                <span>info@ortam.ai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-foreground/50">
          <p>
            {lang === 'he' ? 'כל הזכויות שמורות © 2026 ORTAM AI' : '© 2026 ORTAM AI. All rights reserved.'}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              {lang === 'he' ? 'תנאי שימוש' : 'Terms of Use'}
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
