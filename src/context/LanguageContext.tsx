"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { de } from '../locales/de';

type Language = 'en' | 'de';
type Dictionary = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem('bossert-lang');
    if (saved === 'en' || saved === 'de') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('bossert-lang', newLang);
  };

  const t = lang === 'en' ? en : de;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
