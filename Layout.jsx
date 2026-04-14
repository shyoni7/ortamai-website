import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import CookieConsent from "./components/ui/CookieConsent";
import AccessibilityMenu from "./components/ui/AccessibilityMenu";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { t } from "./components/translations";

function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
      title={lang === "he" ? "Switch to English" : "עבור לעברית"}
    >
      {lang === "he" ? "EN" : "עב"}
    </button>
  );
}

function LayoutInner({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const tr = t[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  const navItems = [
    { name: tr.nav.home, href: createPageUrl("Home") },
    { name: tr.nav.incubator, href: createPageUrl("Incubator") },
    { name: tr.nav.academy, href: createPageUrl("Academy") },
    { name: tr.nav.placement, href: createPageUrl("Placement") },
    { name: tr.nav.about, href: createPageUrl("About") },
    { name: tr.nav.contact, href: createPageUrl("Contact") },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" dir={dir}>
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
      <AccessibilityMenu />
      
      <style>{`
        :root {
          --c-primary: #06B6D4;
          --c-accent: #F472B6;
          --c-bg-dark: #0B1120;
        }
        * {
          font-family: 'Heebo', 'Assistant', sans-serif;
        }
        
        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          right: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to left, rgb(6, 182, 212), rgb(168, 85, 247));
          transition: width 0.3s ease-out;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after {
            transition: none;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <motion.img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67cebd73b55b6d545c36facb/47cae0727_image.png" 
                alt="ORTAM AI" 
                className="h-12 w-auto"
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-cyan-600 bg-cyan-50 active"
                      : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button + Language Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://app.ortamai.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 text-sm font-medium transition-colors">
                אוטומציות
              </a>
              <LanguageToggle />
              <Link to={createPageUrl("Contact")}>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
                  {tr.nav.cta}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side={dir === "rtl" ? "right" : "left"} className="bg-white border-gray-200">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive(item.href)
                          ? "text-cyan-600 bg-cyan-50"
                          : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <a href="https://app.ortamai.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-all">
                    אוטומציות
                  </a>
                  <Link to={createPageUrl("Contact")}>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold mt-4">
                      {tr.nav.cta}
                    </Button>
                  </Link>
                  <div className="mt-4 flex justify-center">
                    <LanguageToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_67cebd73b55b6d545c36facb/47cae0727_image.png" 
                alt="ORTAM AI" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-600 text-sm max-w-sm">
                {tr.footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">{tr.footer.quickLinks}</h4>
              <div className="flex flex-col gap-2">
                <Link to={createPageUrl("Incubator")} className="text-gray-600 hover:text-cyan-600 text-sm transition-colors">
                  {tr.nav.incubator}
                </Link>
                <Link to={createPageUrl("Academy")} className="text-gray-600 hover:text-cyan-600 text-sm transition-colors">
                  {tr.nav.academy}
                </Link>
                <Link to={createPageUrl("Placement")} className="text-gray-600 hover:text-cyan-600 text-sm transition-colors">
                  {tr.nav.placement}
                </Link>
                <Link to={createPageUrl("About")} className="text-gray-600 hover:text-cyan-600 text-sm transition-colors">
                  {tr.nav.about}
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">{tr.footer.contactTitle}</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p>yoni.ortam@gmail.com</p>
                <p dir="ltr">052-338-1822</p>
                <p>{tr.footer.address}</p>
                <Link to={createPageUrl("Contact")} className="text-cyan-600 hover:text-cyan-700 transition-colors">
                  {tr.footer.sendMessage}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 ORTAM AI. {tr.footer.rights}
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                {tr.footer.terms}
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                {tr.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <LanguageProvider>
      <LayoutInner>{children}</LayoutInner>
    </LanguageProvider>
  );
}