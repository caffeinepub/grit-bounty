import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

// Map browser language codes to our Language enum
const browserLanguageMap: Record<string, Language> = {
  'en': Language.English,
  'en-US': Language.English,
  'en-GB': Language.English,
  'zh': Language.SimplifiedChinese,
  'zh-CN': Language.SimplifiedChinese,
  'zh-Hans': Language.SimplifiedChinese,
  'es': Language.Spanish,
  'es-ES': Language.Spanish,
  'es-MX': Language.Spanish,
  'fr': Language.French,
  'fr-FR': Language.French,
  'ja': Language.Japanese,
  'ja-JP': Language.Japanese,
  'ko': Language.Korean,
  'ko-KR': Language.Korean,
  'de': Language.German,
  'de-DE': Language.German,
  'ar': Language.Arabic,
  'ar-SA': Language.Arabic,
  'pt': Language.Portuguese,
  'pt-BR': Language.Portuguese,
  'pt-PT': Language.Portuguese,
  'ru': Language.Russian,
  'ru-RU': Language.Russian,
  'it': Language.Italian,
  'it-IT': Language.Italian,
  'nl': Language.Dutch,
  'nl-NL': Language.Dutch,
  'hi': Language.Hindi,
  'hi-IN': Language.Hindi,
  'tr': Language.Turkish,
  'tr-TR': Language.Turkish,
  'pl': Language.Polish,
  'pl-PL': Language.Polish,
};

function detectBrowserLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem('preferredLanguage');
  if (stored && Object.values(Language).includes(stored as Language)) {
    return stored as Language;
  }

  // Detect from browser
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Try exact match first
  if (browserLanguageMap[browserLang]) {
    return browserLanguageMap[browserLang];
  }
  
  // Try language code without region (e.g., 'en' from 'en-US')
  const langCode = browserLang.split('-')[0];
  if (browserLanguageMap[langCode]) {
    return browserLanguageMap[langCode];
  }
  
  // Default to English
  return Language.English;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => detectBrowserLanguage());

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations[Language.English];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return createElement(
    LanguageContext.Provider,
    { value: { currentLanguage, setLanguage, t } },
    children
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
