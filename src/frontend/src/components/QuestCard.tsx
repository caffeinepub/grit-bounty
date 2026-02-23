import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile, useAcceptQuest, useGetUserProfile } from '../hooks/useQueries';
import { QuestImmutable } from '../backend';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Eye, Coins, Shield, Plus, Users, ChevronDown, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import DepositConfirmationDialog from './DepositConfirmationDialog';
import AddBountyDialog from './AddBountyDialog';
import { formatUSD, centsToUSD } from '../utils/formatters';
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
  const [showAddBountyDialog, setShowAddBountyDialog] = useState(false);
  const [showContributors, setShowContributors] = useState(false);

  const depositRate = userProfile ? Number(userProfile.depositRate) : 50;
  const rewardPoolUSD = centsToUSD(quest.reward);
  const participantCount = Number(quest.participantCount);
  const perWarriorReward = rewardPoolUSD / participantCount;
  const depositAmount = (perWarriorReward * depositRate) / 100;

  const isOwnQuest = userIdentity && quest.publisherId.toString() === userIdentity.getPrincipal().toString();

  const originalBountyUSD = centsToUSD(quest.originalBountyAmountCents);
  const additionalContributions = quest.bountyContributions || [];
  const totalAdditionalUSD = additionalContributions.reduce(
    (sum, contrib) => sum + centsToUSD(contrib.amountCents),
    0
  );

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

  const handleAddBounty = () => {
    setShowAddBountyDialog(true);
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
              <span className="font-semibold">${rewardPoolUSD.toFixed(2)}</span>
              <span className="text-muted-foreground">USD</span>
            </div>
            <div className="flex items-center gap-1 text-neon-cyan">
              <Users className="h-4 w-4" />
              <span className="font-semibold">{participantCount}</span>
              <span className="text-muted-foreground">{t('bountyBoard.warriors')}</span>
            </div>
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{t('bountyBoard.originalBounty')}</span>
              <span className="font-medium">${originalBountyUSD.toFixed(2)} USD</span>
            </div>
            {totalAdditionalUSD > 0 && (
              <>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{t('bountyBoard.additionalBounties')}</span>
                  <span className="font-medium text-neon-cyan">+${totalAdditionalUSD.toFixed(2)} USD</span>
                </div>
                {additionalContributions.length > 0 && (
                  <Collapsible open={showContributors} onOpenChange={setShowContributors}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-auto py-1 px-2 text-xs hover:bg-muted/50"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {additionalContributions.length} {t('bountyBoard.contributors')}
                        <ChevronDown
                          className={`h-3 w-3 ml-auto transition-transform ${showContributors ? 'rotate-180' : ''}`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-2">
                      {additionalContributions.map((contrib, index) => (
                        <ContributorItem key={index} contribution={contrib} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
            <Shield className="h-4 w-4 text-neon-cyan shrink-0" />
            <div className="flex-1 text-xs">
              <span className="text-muted-foreground">{t('deposit.required')}: </span>
              <span className="font-bold text-neon-cyan">${depositAmount.toFixed(2)} USD</span>
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
                onClick={handleAddBounty}
                variant="outline"
                size="icon"
                className="border-neon-magenta/30 hover:bg-neon-magenta/20"
                title={t('addBounty.title')}
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
        rewardPool={quest.reward}
        participantCount={quest.participantCount}
        depositAmount={depositAmount}
        depositRate={depositRate}
        onConfirm={handleConfirmDeposit}
      />

      <AddBountyDialog
        open={showAddBountyDialog}
        onOpenChange={setShowAddBountyDialog}
        questId={quest.questId}
        questTitle={quest.title}
        currentRewardPool={quest.reward}
      />
    </>
  );
}

function ContributorItem({ contribution }: { contribution: { contributorId: any; amountCents: bigint; timestamp: bigint } }) {
  const { data: profile } = useGetUserProfile(contribution.contributorId);
  const amountUSD = centsToUSD(contribution.amountCents);
  const contributorName = profile?.name || contribution.contributorId.toString().slice(0, 10) + '...';

  return (
    <div className="flex justify-between items-center text-xs p-2 rounded bg-muted/50">
      <span className="text-muted-foreground truncate flex-1">{contributorName}</span>
      <span className="font-medium text-neon-cyan ml-2">${amountUSD.toFixed(2)} USD</span>
    </div>
  );
}
