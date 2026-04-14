import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ortam_lang") || "he"; } catch { return "he"; }
  });

  const toggle = () => {
    setLang(l => {
      const next = l === "he" ? "en" : "he";
      try { localStorage.setItem("ortam_lang", next); } catch {}
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}