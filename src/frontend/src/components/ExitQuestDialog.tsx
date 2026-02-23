import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useExitQuest } from '../hooks/useQueries';
import { QuestImmutable } from '../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

interface ExitQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable;
}

export default function ExitQuestDialog({ open, onOpenChange, quest }: ExitQuestDialogProps) {
  const { t } = useLanguage();
  const exitQuestMutation = useExitQuest();
  const [isExiting, setIsExiting] = useState(false);

  // Calculate publisher's initial contribution
  const totalCrowdfunding = quest.crowdfundingContributions.reduce(
    (sum, [_, amount]) => sum + Number(amount),
    0
  );
  const publisherContribution = Number(quest.rewardPool) - totalCrowdfunding;
  const publisherContributionICP = publisherContribution / 100000000;

  const handleConfirm = async () => {
    setIsExiting(true);
    try {
      await exitQuestMutation.mutateAsync(quest.questId);
      onOpenChange(false);
    } catch (error) {
      console.error('Exit quest error:', error);
    } finally {
      setIsExiting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-orange-500/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-400">
            {t('exitQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p className="text-muted-foreground">
              {t('exitQuest.description')}
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 space-y-2">
              <p className="font-semibold text-foreground">{quest.title}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('exitQuest.yourContribution')}</span>
                  <span className="font-semibold text-neon-cyan">
                    {publisherContributionICP.toFixed(4)} ICP
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('exitQuest.crowdfunding')}</span>
                  <span className="font-semibold">
                    {quest.crowdfundingContributions.length} {t('exitQuest.contributors')}
                  </span>
                </div>
              </div>
              <p className="text-sm text-orange-400 mt-2">
                {t('exitQuest.refundInfo')}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isExiting}>
            {t('exitQuest.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isExiting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isExiting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('exitQuest.exiting')}
              </>
            ) : (
              t('exitQuest.confirm')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
