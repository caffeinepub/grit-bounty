import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function BountyBoard() {
  const { t } = useLanguage();
  const [activeDifficulty, setActiveDifficulty] = useState<string>('easy');

  // Placeholder - will be replaced with real data from backend
  const quests: any[] = [];
  const isLoading = false;

  const difficulties = ['easy', 'medium', 'hard', 'extreme', 'impossible'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-cyan">{t('bountyBoard.title')}</h2>
      </div>

      <Tabs value={activeDifficulty} onValueChange={setActiveDifficulty} className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-12 bg-card/50 border border-neon-cyan/20">
          {difficulties.map((difficulty) => (
            <TabsTrigger
              key={difficulty}
              value={difficulty}
              className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan font-semibold"
            >
              {t(`difficulty.${difficulty}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {difficulties.map((difficulty) => (
          <TabsContent key={difficulty} value={difficulty} className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-neon-cyan" />
              </div>
            ) : quests.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quest cards will be rendered here */}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-lg text-muted-foreground">{t('bountyBoard.noQuests')}</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
