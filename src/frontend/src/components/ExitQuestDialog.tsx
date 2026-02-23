import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { QuestImmutable } from '../backend';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertCircle, Coins, LogOut, Users } from 'lucide-react';
import { useExitQuest, useGetUserProfile } from '../hooks/useQueries';
import { centsToUSD } from '../utils/formatters';

interface ExitQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable | null;
}

export default function ExitQuestDialog({ open, onOpenChange, quest }: ExitQuestDialogProps) {
  const { t } = useLanguage();
  const { mutateAsync: exitQuest, isPending } = useExitQuest();
  const [error, setError] = useState<string | null>(null);

  if (!quest) return null;

  const originalBountyUSD = centsToUSD(quest.originalBountyAmountCents);
  const totalContributionsUSD = quest.bountyContributions.reduce(
    (sum, contrib) => sum + centsToUSD(contrib.amountCents),
    0
  );
  const refundAmountUSD = originalBountyUSD;

  const handleConfirm = async () => {
    setError(null);
    try {
      await exitQuest(quest.questId);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t('exitQuest.exitError'));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-orange-500/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-400 flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            {t('exitQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>{t('exitQuest.description')}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Quest Info */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('exitQuest.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{quest.title}</p>
          </div>

          <Separator />

          {/* Bounty Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('exitQuest.originalBounty')}</span>
              <span className="font-semibold">${originalBountyUSD.toFixed(2)} USD</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('exitQuest.contributions')}</span>
              <span className="font-semibold text-neon-magenta">${totalContributionsUSD.toFixed(2)} USD</span>
            </div>
          </div>

          <Separator />

          {/* Contributors List */}
          {quest.bountyContributions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{t('exitQuest.contributors')}</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {quest.bountyContributions.map((contrib, idx) => {
                  const contributorId = contrib.contributorId.toString();
                  const amountUSD = centsToUSD(contrib.amountCents);
                  return (
                    <ContributorRow key={idx} contributorId={contributorId} amountUSD={amountUSD} />
                  );
                })}
              </div>
            </div>
          )}

          <Separator />

          {/* Refund Details */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <span className="font-semibold text-green-400">{t('exitQuest.refundAmount')}</span>
            <span className="text-xl font-bold text-green-400 flex items-center gap-1">
              <Coins className="h-5 w-5" />
              ${refundAmountUSD.toFixed(2)} USD
            </span>
          </div>

          {/* Warning Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
            <p className="text-xs text-orange-400">{t('exitQuest.warning')}</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {t('exitQuest.back')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('exitQuest.exiting')}
              </>
            ) : (
              t('exitQuest.confirmExit')
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ContributorRow({ contributorId, amountUSD }: { contributorId: string; amountUSD: number }) {
  const { data: profile } = useGetUserProfile(contributorId as any);

  return (
    <div className="flex items-center justify-between text-xs p-2 rounded bg-muted/30">
      <span className="font-mono truncate max-w-[150px]">
        {profile?.name || `${contributorId.slice(0, 10)}...`}
      </span>
      <span className="font-semibold text-neon-cyan">${amountUSD.toFixed(2)} USD</span>
    </div>
  );
}
