import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Contrast, 
  Type,
  MinusCircle,
  PlusCircle,
  Bold,
  Heading,
  Link as LinkIcon,
  X,
  FileText,
  Map
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AccessibilityMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    disableAnimations: false,
    contrast: false,
    textSize: 0,
    readableFont: false,
    highlightHeadings: false,
    highlightLinks: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings) => {
    const root = document.documentElement;

    // High Contrast
    if (newSettings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Disable Animations
    if (newSettings.disableAnimations) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    // Contrast
    if (newSettings.contrast) {
      root.classList.add("enhanced-contrast");
    } else {
      root.classList.remove("enhanced-contrast");
    }

    // Text Size
    root.style.fontSize = `${100 + newSettings.textSize * 10}%`;

    // Readable Font
    if (newSettings.readableFont) {
      root.classList.add("readable-font");
    } else {
      root.classList.remove("readable-font");
    }

    // Highlight Headings
    if (newSettings.highlightHeadings) {
      root.classList.add("highlight-headings");
    } else {
      root.classList.remove("highlight-headings");
    }

    // Highlight Links
    if (newSettings.highlightLinks) {
      root.classList.add("highlight-links");
    } else {
      root.classList.remove("highlight-links");
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      disableAnimations: false,
      contrast: false,
      textSize: 0,
      readableFont: false,
      highlightHeadings: false,
      highlightLinks: false,
    };
    setSettings(defaultSettings);
    localStorage.removeItem("accessibility-settings");
    applySettings(defaultSettings);
  };

  const ToggleItem = ({ icon: Icon, label, checked, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-gray-900 font-medium">{label}</span>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-cyan-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        .high-contrast {
          filter: contrast(1.5);
        }
        
        .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
        
        .enhanced-contrast {
          filter: contrast(1.3) brightness(1.1);
        }
        
        .readable-font * {
          font-family: Arial, sans-serif !important;
        }
        
        .highlight-headings h1,
        .highlight-headings h2,
        .highlight-headings h3,
        .highlight-headings h4,
        .highlight-headings h5,
        .highlight-headings h6 {
          background-color: #fef3c7 !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.25rem !important;
        }
        
        .highlight-links a {
          background-color: #fef3c7 !important;
          text-decoration: underline !important;
          padding: 0.125rem 0.25rem !important;
        }
      `}</style>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 bottom-36 z-50 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center"
            aria-label="פתח תפריט נגישות"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/73e8a1f5d_images.png"
              alt="נגישות"
              className="w-10 h-10"
            />
          </motion.button>
        </SheetTrigger>

        <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="border-b border-gray-200 pb-4">
            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
              תפריט נגישות
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </SheetTitle>
          </SheetHeader>

          <div className="py-6 space-y-4">
            <ToggleItem
              icon={Eye}
              label="ניגודיות מוקדמת"
              checked={settings.highContrast}
              onChange={(val) => updateSetting("highContrast", val)}
            />

            <ToggleItem
              icon={EyeOff}
              label="ביטול אנימציות / תנובתיות"
              checked={settings.disableAnimations}
              onChange={(val) => updateSetting("disableAnimations", val)}
            />

            <ToggleItem
              icon={Contrast}
              label="Contrast"
              checked={settings.contrast}
              onChange={(val) => updateSetting("contrast", val)}
            />

            {/* Text Size Controls */}
            <div className="py-3 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">גודל טקסט</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSetting("textSize", Math.max(-2, settings.textSize - 1))}
                  disabled={settings.textSize <= -2}
                >
                  <MinusCircle className="w-5 h-5" />
                </Button>
                <span className="text-gray-700 font-medium w-16 text-center">
                  {100 + settings.textSize * 10}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateSetting("textSize", Math.min(3, settings.textSize + 1))}
                  disabled={settings.textSize >= 3}
                >
                  <PlusCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <ToggleItem
              icon={Bold}
              label="נטוי קריא"
              checked={settings.readableFont}
              onChange={(val) => updateSetting("readableFont", val)}
            />

            <ToggleItem
              icon={Heading}
              label="סימון כותרות"
              checked={settings.highlightHeadings}
              onChange={(val) => updateSetting("highlightHeadings", val)}
            />

            <ToggleItem
              icon={LinkIcon}
              label="סימון קישורים והיצמדים"
              checked={settings.highlightLinks}
              onChange={(val) => updateSetting("highlightLinks", val)}
            />

            {/* Links Section */}
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate(createPageUrl("AccessibilityStatement"));
                }}
                className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition-colors w-full"
              >
                <FileText className="w-5 h-5" />
                <span>הצהרת נגישות</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate(createPageUrl("SiteMap"));
                }}
                className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition-colors w-full"
              >
                <Map className="w-5 h-5" />
                <span>מפת האתר</span>
              </button>
            </div>

            {/* Reset Button */}
            <div className="pt-6">
              <Button
                variant="outline"
                onClick={resetSettings}
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                אפס הגדרות נגישות
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}