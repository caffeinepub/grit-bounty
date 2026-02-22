import { useGetCallerUserProfile } from './useQueries';
import { Language } from '../types';
import { translations } from '../i18n/translations';

export function useLanguage() {
  const { data: userProfile } = useGetCallerUserProfile();

  // Default to English for now since backend doesn't store language preference yet
  const currentLanguage = Language.English;

  const setLanguage = async (language: Language) => {
    // Language preference will be stored when backend supports it
    console.log('Language preference:', language);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return {
    currentLanguage,
    setLanguage,
    t,
  };
}
