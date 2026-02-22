import { useState } from 'react';
import { useSaveCallerUserProfile, useGetCallerUserProfile } from '../hooks/useQueries';
import { Language } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function LanguageSelection() {
  const { data: userProfile } = useGetCallerUserProfile();
  const { mutateAsync: saveProfile, isPending } = useSaveCallerUserProfile();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const languages = [
    { code: Language.SimplifiedChinese, name: '简体中文', flag: '🇨🇳' },
    { code: Language.English, name: 'English', flag: '🇺🇸' },
    { code: Language.Spanish, name: 'Español', flag: '🇪🇸' },
    { code: Language.French, name: 'Français', flag: '🇫🇷' },
    { code: Language.Japanese, name: '日本語', flag: '🇯🇵' },
    { code: Language.Korean, name: '한국어', flag: '🇰🇷' },
  ];

  const handleLanguageSelect = async (language: Language) => {
    setSelectedLanguage(language);
    if (userProfile) {
      await saveProfile({
        ...userProfile,
        name: userProfile.name || 'Warrior',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-neon-cyan/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-neon-cyan">Select Your Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                disabled={isPending}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10"
              >
                {isPending && selectedLanguage === lang.code ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <>
                    <span className="text-4xl">{lang.flag}</span>
                    <span className="font-semibold">{lang.name}</span>
                  </>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
