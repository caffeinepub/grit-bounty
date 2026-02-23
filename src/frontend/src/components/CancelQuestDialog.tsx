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
import { Loader2, AlertCircle, Coins, RefreshCw } from 'lucide-react';
import { useCancelQuest } from '../hooks/useQueries';

interface CancelQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable | null;
}

export default function CancelQuestDialog({ open, onOpenChange, quest }: CancelQuestDialogProps) {
  const { t } = useLanguage();
  const { mutateAsync: cancelQuest, isPending } = useCancelQuest();
  const [error, setError] = useState<string | null>(null);

  if (!quest) return null;

  const rewardPoolICP = Number(quest.reward) / 100000000;

  const handleConfirm = async () => {
    setError(null);
    try {
      await cancelQuest(quest.questId);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t('cancelQuest.cancelError'));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-neon-cyan/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-neon-cyan flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            {t('cancelQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>{t('cancelQuest.description')}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Quest Info */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('cancelQuest.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{quest.title}</p>
          </div>

          <Separator />

          {/* Refund Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="font-semibold text-green-400">{t('cancelQuest.fullRefund')}</span>
              <span className="text-xl font-bold text-green-400 flex items-center gap-1">
                <Coins className="h-5 w-5" />
                {rewardPoolICP.toFixed(4)} ICP
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-400">{t('cancelQuest.refundInfo')}</p>
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
            {t('cancelQuest.back')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            className="w-full sm:w-auto bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('cancelQuest.cancelling')}
              </>
            ) : (
              t('cancelQuest.confirmCancel')
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
