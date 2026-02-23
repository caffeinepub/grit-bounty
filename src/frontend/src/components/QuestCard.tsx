import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile, useAcceptQuest, useAddToPot } from '../hooks/useQueries';
import { QuestImmutable } from '../backend';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Coins, Shield, Plus, Users } from 'lucide-react';
import { toast } from 'sonner';
import DepositConfirmationDialog from './DepositConfirmationDialog';
import AddToPotDialog from './AddToPotDialog';
import type { Identity } from '@dfinity/agent';

interface QuestCardProps {
  quest: QuestImmutable;
  userIdentity: Identity | null;
}

export default function QuestCard({ quest, userIdentity }: QuestCardProps) {
  const { t } = useLanguage();
  const { data: userProfile } = useGetCallerUserProfile();
  const { mutateAsync: acceptQuest, isPending: isAccepting } = useAcceptQuest();
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showAddToPotDialog, setShowAddToPotDialog] = useState(false);

  const depositRate = userProfile ? Number(userProfile.depositRate) : 50;
  const rewardPoolICP = Number(quest.rewardPool) / 100000000;
  const participantCount = Number(quest.participantCount);
  const perWarriorReward = rewardPoolICP / participantCount;
  const depositAmount = (perWarriorReward * depositRate) / 100;

  const isOwnQuest = userIdentity && quest.publisherId.toString() === userIdentity.getPrincipal().toString();

  const handleAcceptClick = () => {
    setShowDepositDialog(true);
  };

  const handleConfirmDeposit = async () => {
    try {
      await acceptQuest(quest.questId);
      toast.success(t('bountyBoard.acceptSuccess'));
    } catch (error: any) {
      throw new Error(error.message || t('bountyBoard.acceptError'));
    }
  };

  const handleAddToPot = () => {
    setShowAddToPotDialog(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
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
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-1 text-neon-blue">
              <Eye className="h-4 w-4" />
              <span className="font-semibold">{Number(quest.hypeCount)}</span>
              <span className="text-muted-foreground">{t('bountyBoard.hype')}</span>
            </div>
            <div className="flex items-center gap-1 text-neon-magenta">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{rewardPoolICP.toFixed(4)}</span>
              <span className="text-muted-foreground">ICP</span>
            </div>
            <div className="flex items-center gap-1 text-neon-cyan">
              <Users className="h-4 w-4" />
              <span className="font-semibold">{participantCount}</span>
              <span className="text-muted-foreground">{t('bountyBoard.warriors')}</span>
            </div>
          </div>
          {quest.crowdfundingContributions.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {quest.crowdfundingContributions.length} {t('bountyBoard.contributors')}
            </div>
          )}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
            <Shield className="h-4 w-4 text-neon-cyan shrink-0" />
            <div className="flex-1 text-xs">
              <span className="text-muted-foreground">{t('deposit.required')}: </span>
              <span className="font-bold text-neon-cyan">{depositAmount.toFixed(4)} ICP</span>
              <span className="text-muted-foreground"> ({depositRate}%)</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative flex gap-2">
          {!isOwnQuest && (
            <>
              <Button
                onClick={handleAcceptClick}
                disabled={isAccepting}
                className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold"
              >
                {t('deposit.acceptAndPayDeposit')}
              </Button>
              <Button
                onClick={handleAddToPot}
                variant="outline"
                size="icon"
                className="border-neon-magenta/30 hover:bg-neon-magenta/20"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          )}
          {isOwnQuest && (
            <Button disabled className="w-full" variant="outline">
              {t('bountyBoard.yourQuest')}
            </Button>
          )}
        </CardFooter>
      </Card>

      <DepositConfirmationDialog
        open={showDepositDialog}
        onOpenChange={setShowDepositDialog}
        questTitle={quest.title}
        rewardPool={quest.rewardPool}
        participantCount={quest.participantCount}
        depositAmount={depositAmount}
        depositRate={depositRate}
        onConfirm={handleConfirmDeposit}
      />

      <AddToPotDialog
        open={showAddToPotDialog}
        onOpenChange={setShowAddToPotDialog}
        questId={quest.questId}
        questTitle={quest.title}
        currentRewardPool={quest.rewardPool}
      />
    </>
  );
}
