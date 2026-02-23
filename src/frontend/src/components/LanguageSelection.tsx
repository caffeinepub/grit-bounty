import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

export default function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const { setLanguage } = useLanguage();

  const languages = [
    { code: Language.SimplifiedChinese, name: '简体中文', flag: '🇨🇳' },
    { code: Language.English, name: 'English', flag: '🇺🇸' },
    { code: Language.Spanish, name: 'Español', flag: '🇪🇸' },
    { code: Language.French, name: 'Français', flag: '🇫🇷' },
    { code: Language.Japanese, name: '日本語', flag: '🇯🇵' },
    { code: Language.Korean, name: '한국어', flag: '🇰🇷' },
    { code: Language.German, name: 'Deutsch', flag: '🇩🇪' },
    { code: Language.Arabic, name: 'العربية', flag: '🇸🇦' },
    { code: Language.Portuguese, name: 'Português', flag: '🇵🇹' },
    { code: Language.Russian, name: 'Русский', flag: '🇷🇺' },
    { code: Language.Italian, name: 'Italiano', flag: '🇮🇹' },
    { code: Language.Dutch, name: 'Nederlands', flag: '🇳🇱' },
    { code: Language.Hindi, name: 'हिन्दी', flag: '🇮🇳' },
    { code: Language.Turkish, name: 'Türkçe', flag: '🇹🇷' },
    { code: Language.Polish, name: 'Polski', flag: '🇵🇱' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onLanguageSelect(lang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-4xl border-neon-cyan/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-neon-cyan font-bold">
            Select Your Language / 选择您的语言
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
              >
                <span className="text-4xl">{lang.flag}</span>
                <span className="font-semibold text-sm">{lang.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
