import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('zh')) {
    if (browserLang.includes('tw') || browserLang.includes('hk') || browserLang.includes('hant')) {
      return Language.TraditionalChinese;
    }
    return Language.SimplifiedChinese;
  }
  
  return Language.English;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider(props: LanguageProviderProps): React.ReactElement {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    if (stored && Object.values(Language).includes(stored as Language)) {
      return stored as Language;
    }
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('Language changed to:', language);
  }, [language]);

  const setLanguage = (lang: Language): void => {
    console.log('Setting language to:', lang);
    setLanguageState(lang);
  };

  const translate = (key: string): string => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for language: ${language}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    translate,
    t: translate,
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: contextValue },
    props.children
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
