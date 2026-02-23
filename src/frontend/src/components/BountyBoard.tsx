import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetActiveQuests } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Difficulty } from '../backend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import QuestCard from './QuestCard';

export default function BountyBoard() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');

  const difficultyParam = activeDifficulty === 'all' ? 'all' : (activeDifficulty as Difficulty);
  const { data: quests = [], isLoading } = useGetActiveQuests(difficultyParam);

  const difficulties = ['all', 'easy', 'medium', 'hard'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-cyan">{t('bountyBoard.title')}</h2>
      </div>

      <Tabs value={activeDifficulty} onValueChange={setActiveDifficulty} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-card/50 border border-neon-cyan/20">
          {difficulties.map((difficulty) => (
            <TabsTrigger
              key={difficulty}
              value={difficulty}
              className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan font-semibold"
            >
              {difficulty === 'all' ? t('bountyBoard.allQuests') : t(`difficulty.${difficulty}`)}
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
                {quests.map((quest) => (
                  <QuestCard key={Number(quest.questId)} quest={quest} userIdentity={identity || null} />
                ))}
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
