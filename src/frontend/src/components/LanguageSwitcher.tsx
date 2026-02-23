import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languageNames: Record<Language, string> = {
  [Language.English]: 'English',
  [Language.SimplifiedChinese]: '简体中文',
  [Language.Spanish]: 'Español',
  [Language.French]: 'Français',
  [Language.Japanese]: '日本語',
  [Language.Korean]: '한국어',
  [Language.German]: 'Deutsch',
  [Language.Arabic]: 'العربية',
  [Language.Portuguese]: 'Português',
  [Language.Russian]: 'Русский',
  [Language.Italian]: 'Italiano',
  [Language.Dutch]: 'Nederlands',
  [Language.Hindi]: 'हिन्दी',
  [Language.Turkish]: 'Türkçe',
  [Language.Polish]: 'Polski',
};

const languageFlags: Record<Language, string> = {
  [Language.English]: '🇬🇧',
  [Language.SimplifiedChinese]: '🇨🇳',
  [Language.Spanish]: '🇪🇸',
  [Language.French]: '🇫🇷',
  [Language.Japanese]: '🇯🇵',
  [Language.Korean]: '🇰🇷',
  [Language.German]: '🇩🇪',
  [Language.Arabic]: '🇸🇦',
  [Language.Portuguese]: '🇵🇹',
  [Language.Russian]: '🇷🇺',
  [Language.Italian]: '🇮🇹',
  [Language.Dutch]: '🇳🇱',
  [Language.Hindi]: '🇮🇳',
  [Language.Turkish]: '🇹🇷',
  [Language.Polish]: '🇵🇱',
};

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-neon-cyan/30 hover:bg-neon-cyan/10 hover:border-neon-cyan"
        >
          <Globe className="h-4 w-4 text-neon-cyan" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 max-h-[400px] overflow-y-auto border-neon-cyan/30 bg-card/95 backdrop-blur"
      >
        {Object.values(Language).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`cursor-pointer ${
              currentLanguage === lang
                ? 'bg-neon-cyan/20 text-neon-cyan font-semibold'
                : 'hover:bg-neon-cyan/10'
            }`}
          >
            <span className="mr-2">{languageFlags[lang]}</span>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
