import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

export default function CreditScoreDisplay() {
  const { t } = useLanguage();
  const { data: userProfile } = useGetCallerUserProfile();

  if (!userProfile) return null;

  const currentRate = Number(userProfile.depositRate);
  const successfulQuests = Number(userProfile.successfulQuests);
  
  // Calculate progress from 50% to 2% (48% total range)
  const progressPercentage = ((50 - currentRate) / 48) * 100;
  
  // Calculate remaining quests to reach 2% minimum
  const questsToMinimum = Math.ceil((currentRate - 2) / 3);

  return (
    <Card className="border-neon-blue/30 bg-gradient-to-br from-neon-blue/5 to-transparent backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neon-blue">
          <Award className="h-5 w-5" />
          {t('creditScore.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Deposit Rate */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t('creditScore.depositRate')}</p>
            <p className="text-4xl font-bold text-neon-cyan">{currentRate}%</p>
          </div>
          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-lg px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            {successfulQuests} {t('creditScore.successfulQuests')}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('creditScore.progressToMinimum')}</span>
            <span className="font-semibold text-neon-blue">
              {questsToMinimum > 0 ? `${questsToMinimum} ${t('creditScore.questsRemaining')}` : t('creditScore.minimumReached')}
            </span>
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>50%</span>
              <span className="text-neon-cyan font-semibold">{currentRate}%</span>
              <span>2%</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">{t('creditScore.totalEarned')}</p>
            <p className="text-lg font-bold text-neon-magenta">
              {(Number(userProfile.totalEarned) / 100000000).toFixed(4)} ICP
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t('creditScore.totalDeposited')}</p>
            <p className="text-lg font-bold text-neon-cyan">
              {(Number(userProfile.totalDeposited) / 100000000).toFixed(4)} ICP
            </p>
          </div>
        </div>

        {/* Warning for high deposit rate */}
        {currentRate >= 40 && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
            <p className="text-xs text-yellow-500">
              {t('creditScore.highDepositWarning')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
