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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertTriangle, Coins, TrendingDown } from 'lucide-react';
import { useAbandonQuest } from '../hooks/useQueries';

interface AbandonQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable | null;
}

export default function AbandonQuestDialog({ open, onOpenChange, quest }: AbandonQuestDialogProps) {
  const { t } = useLanguage();
  const { mutateAsync: abandonQuest, isPending } = useAbandonQuest();
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!quest) return null;

  const depositAmountICP = Number(quest.depositAmount) / 100000000;
  const isConfirmValid = confirmText.toUpperCase() === 'CONFIRM';

  const handleConfirm = async () => {
    if (!isConfirmValid) return;

    setError(null);
    try {
      await abandonQuest(quest.questId);
      onOpenChange(false);
      setConfirmText('');
    } catch (err: any) {
      setError(err.message || t('abandonQuest.abandonError'));
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setConfirmText('');
      setError(null);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="border-red-500/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {t('abandonQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>{t('abandonQuest.description')}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Quest Info */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('abandonQuest.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{quest.title}</p>
          </div>

          <Separator />

          {/* Consequences */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="font-semibold text-red-400">{t('abandonQuest.forfeitDeposit')}</span>
              <span className="text-xl font-bold text-red-400 flex items-center gap-1">
                <Coins className="h-5 w-5" />
                {depositAmountICP.toFixed(4)} ICP
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <span className="font-semibold text-orange-400">{t('abandonQuest.depositRateReset')}</span>
              <span className="text-xl font-bold text-orange-400 flex items-center gap-1">
                <TrendingDown className="h-5 w-5" />
                50%
              </span>
            </div>
          </div>

          {/* Warning Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-xs text-red-400">{t('abandonQuest.warning')}</p>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('abandonQuest.typeConfirm')}</p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="CONFIRM"
              className="font-mono uppercase"
              disabled={isPending}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {t('abandonQuest.back')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmValid || isPending}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('abandonQuest.abandoning')}
              </>
            ) : (
              t('abandonQuest.confirmAbandon')
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
