import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAbandonQuest } from '../hooks/useQueries';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertTriangle } from 'lucide-react';

interface AbandonQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: QuestImmutable;
}

export default function AbandonQuestDialog({ open, onOpenChange, quest }: AbandonQuestDialogProps) {
  const { t } = useLanguage();
  const abandonQuestMutation = useAbandonQuest();
  const [isAbandoning, setIsAbandoning] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const depositAmountICP = Number(quest.depositAmount) / 100000000;
  const isConfirmValid = confirmText === 'CONFIRM';

  const handleConfirm = async () => {
    if (!isConfirmValid) return;

    setIsAbandoning(true);
    try {
      await abandonQuestMutation.mutateAsync(quest.questId);
      onOpenChange(false);
      setConfirmText('');
    } catch (error) {
      console.error('Abandon quest error:', error);
    } finally {
      setIsAbandoning(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmText('');
    }
    onOpenChange(open);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="border-red-500/30 bg-card/95 backdrop-blur">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            {t('abandonQuest.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="text-muted-foreground">
              {t('abandonQuest.description')}
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-foreground">{quest.title}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('abandonQuest.forfeitAmount')}</span>
                  <span className="font-semibold text-red-400">
                    {depositAmountICP.toFixed(4)} ICP
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('abandonQuest.depositRateReset')}</span>
                  <span className="font-semibold text-red-400">50%</span>
                </div>
              </div>
              <div className="bg-red-500/20 border border-red-500/40 rounded p-3 mt-3">
                <p className="text-sm font-semibold text-red-300">
                  {t('abandonQuest.warning')}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-foreground">
                {t('abandonQuest.typeConfirm')}
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="CONFIRM"
                className="font-mono"
                disabled={isAbandoning}
              />
              <p className="text-xs text-muted-foreground">
                {t('abandonQuest.typeConfirmHint')}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isAbandoning}>
            {t('abandonQuest.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isAbandoning || !isConfirmValid}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {isAbandoning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('abandonQuest.abandoning')}
              </>
            ) : (
              t('abandonQuest.confirm')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
