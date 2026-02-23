import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const languageOptions = [
  { value: Language.English, flag: '🇬🇧', native: 'English', chinese: '英语' },
  { value: Language.SimplifiedChinese, flag: '🇨🇳', native: '简体中文', chinese: '简体中文' },
  { value: Language.TraditionalChinese, flag: '🇹🇼', native: '繁體中文', chinese: '繁体中文' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languageOptions.find((opt) => opt.value === language);

  const handleLanguageChange = (newLanguage: Language) => {
    console.log('LanguageSwitcher: Changing language from', language, 'to', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            className={`flex items-center gap-3 cursor-pointer ${
              language === option.value ? 'bg-accent' : ''
            }`}
          >
            <span className="text-xl">{option.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{option.native}</div>
              <div className="text-xs text-muted-foreground">{option.chinese}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
