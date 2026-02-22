import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Coins, Shield } from 'lucide-react';
import { toast } from 'sonner';
import DepositConfirmationDialog from './DepositConfirmationDialog';

interface QuestCardProps {
  quest: {
    id: bigint;
    title: string;
    description: string;
    rewardPool: bigint;
    difficulty: string;
    status: string;
  };
}

export default function QuestCard({ quest }: QuestCardProps) {
  const { t } = useLanguage();
  const { data: userProfile } = useGetCallerUserProfile();
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  const depositRate = userProfile ? Number(userProfile.depositRate) : 50;
  const rewardPoolICP = Number(quest.rewardPool) / 100000000;
  const depositAmount = (rewardPoolICP * depositRate) / 100;

  const handleAcceptClick = () => {
    setShowDepositDialog(true);
  };

  const handleConfirmDeposit = async () => {
    try {
      // Placeholder for actual ICP deposit and quest acceptance
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('bountyBoard.acceptSuccess'));
    } catch (error: any) {
      throw new Error(error.message || t('bountyBoard.acceptError'));
    }
  };

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

  return (
    <>
      <Card className="group relative overflow-hidden border-neon-cyan/30 bg-card/80 backdrop-blur transition-all hover:border-neon-cyan hover:shadow-lg hover:shadow-neon-cyan/20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <CardHeader className="relative">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold line-clamp-2">{quest.title}</CardTitle>
            <Badge className={`${getDifficultyColor(quest.difficulty)} shrink-0`}>
              {t(`difficulty.${quest.difficulty}`)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">{quest.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-neon-blue">
              <Eye className="h-4 w-4" />
              <span className="font-semibold">0</span>
              <span className="text-muted-foreground">{t('bountyBoard.hype')}</span>
            </div>
            <div className="flex items-center gap-1 text-neon-magenta">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{rewardPoolICP.toFixed(4)}</span>
              <span className="text-muted-foreground">ICP</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
            <Shield className="h-4 w-4 text-neon-cyan shrink-0" />
            <div className="flex-1 text-xs">
              <span className="text-muted-foreground">{t('deposit.required')}: </span>
              <span className="font-bold text-neon-cyan">{depositAmount.toFixed(4)} ICP</span>
              <span className="text-muted-foreground"> ({depositRate}%)</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative">
          <Button
            onClick={handleAcceptClick}
            disabled={quest.status !== 'active'}
            className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold"
          >
            {t('deposit.acceptAndPayDeposit')}
          </Button>
        </CardFooter>
      </Card>

      <DepositConfirmationDialog
        open={showDepositDialog}
        onOpenChange={setShowDepositDialog}
        questTitle={quest.title}
        rewardPool={quest.rewardPool}
        depositAmount={depositAmount}
        depositRate={depositRate}
        onConfirm={handleConfirmDeposit}
      />
    </>
  );
}
