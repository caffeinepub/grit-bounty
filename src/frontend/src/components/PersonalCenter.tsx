import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Trophy, Target } from 'lucide-react';
import CreditScoreDisplay from './CreditScoreDisplay';

export default function PersonalCenter() {
  const { t } = useLanguage();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();

  // Placeholder data - will be replaced with real quest data from backend
  const acceptedQuests: any[] = [];
  const isLoading = false;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'extreme':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'impossible':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'accepted':
        return 25;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Credit Score Display */}
      {userProfile && <CreditScoreDisplay />}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-blue">{t('personalCenter.title')}</h2>
        <p className="text-muted-foreground mt-2">{t('personalCenter.subtitle')}</p>
      </div>

      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-card/50 border border-neon-blue/20">
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue font-semibold"
          >
            <Target className="mr-2 h-4 w-4" />
            {t('personalCenter.acceptedQuests')}
          </TabsTrigger>
          <TabsTrigger
            value="posted"
            className="data-[state=active]:bg-neon-magenta/20 data-[state=active]:text-neon-magenta font-semibold"
          >
            <Trophy className="mr-2 h-4 w-4" />
            {t('personalCenter.postedBounties')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accepted" className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : acceptedQuests && acceptedQuests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {acceptedQuests.map((quest) => (
                <Card
                  key={quest.id.toString()}
                  className="border-neon-blue/30 bg-card/80 backdrop-blur hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/20 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-bold line-clamp-2">{quest.title}</CardTitle>
                      <Badge className={`${getDifficultyColor(quest.difficulty)} shrink-0`}>
                        {t(`difficulty.${quest.difficulty}`)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{quest.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.progress')}</span>
                        <span className="font-semibold text-neon-blue">{getProgressValue(quest.status)}%</span>
                      </div>
                      <Progress value={getProgressValue(quest.status)} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted-foreground">{t('personalCenter.reward')}</span>
                      <span className="font-bold text-neon-magenta">
                        {Number(quest.rewardPool) / 100000000} ICP
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">{t('personalCenter.noAcceptedQuests')}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="posted" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">{t('personalCenter.noPostedBounties')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
