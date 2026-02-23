import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Difficulty } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Coins, AlertCircle, Users, Target } from 'lucide-react';
import { useGetCallerBalance } from '../hooks/useQueries';

interface PublishQuestConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  rewardPool: bigint;
  difficulty: Difficulty;
  participantCount: bigint;
  onConfirm: () => Promise<void>;
}

export default function PublishQuestConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  rewardPool,
  difficulty,
  participantCount,
  onConfirm,
}: PublishQuestConfirmationDialogProps) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: balance, isLoading: balanceLoading } = useGetCallerBalance();

  const rewardPoolICP = Number(rewardPool) / 100000000;
  const participants = Number(participantCount);
  const balanceICP = balance ? Number(balance) / 100000000 : 0;
  const hasInsufficientBalance = balance !== undefined && balance < rewardPool;

  useEffect(() => {
    if (open && hasInsufficientBalance) {
      setError(
        `${t('publishConfirm.insufficientBalance')} ${t('publishConfirm.required')}: ${rewardPoolICP.toFixed(4)} ICP, ${t('publishConfirm.available')}: ${balanceICP.toFixed(4)} ICP`
      );
    } else {
      setError(null);
    }
  }, [open, hasInsufficientBalance, rewardPoolICP, balanceICP, t]);

  const handleConfirm = async () => {
    if (hasInsufficientBalance) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t('publishConfirm.publishFailed'));
    } finally {
      setIsProcessing(false);
    }
  };

  const getDifficultyLabel = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.easy:
        return t('difficulty.easy');
      case Difficulty.medium:
        return t('difficulty.medium');
      case Difficulty.hard:
        return t('difficulty.hard');
      default:
        return diff;
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.easy:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case Difficulty.medium:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case Difficulty.hard:
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-neon-magenta/30 bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-neon-magenta flex items-center gap-2">
            <Target className="h-5 w-5" />
            {t('publishConfirm.confirmTitle')}
          </DialogTitle>
          <DialogDescription>{t('publishConfirm.confirmDescription')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Quest Title */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('publishConfirm.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{title}</p>
          </div>

          {/* Quest Description */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('publishConfirm.questDescription')}</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          </div>

          <Separator />

          {/* Quest Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('publishConfirm.difficulty')}</span>
              <Badge className={getDifficultyColor(difficulty)}>
                {getDifficultyLabel(difficulty)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('publishConfirm.participantCount')}</span>
              <span className="font-semibold flex items-center gap-1">
                <Users className="h-4 w-4" />
                {participants}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-neon-magenta/10 border border-neon-magenta/30">
              <span className="font-semibold text-neon-magenta">{t('publishConfirm.rewardPool')}</span>
              <span className="text-xl font-bold text-neon-magenta flex items-center gap-1">
                <Coins className="h-5 w-5" />
                {rewardPoolICP.toFixed(4)} ICP
              </span>
            </div>

            {balanceLoading ? (
              <div className="flex items-center justify-center p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">{t('publishConfirm.checkingBalance')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('publishConfirm.yourBalance')}</span>
                <span className={`font-semibold ${hasInsufficientBalance ? 'text-red-400' : 'text-green-400'}`}>
                  {balanceICP.toFixed(4)} ICP
                </span>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-400">{t('publishConfirm.lockInfo')}</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {t('publishConfirm.cancel')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing || balanceLoading || hasInsufficientBalance}
            className="w-full sm:w-auto bg-neon-magenta text-white hover:bg-neon-magenta/90 font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('publishConfirm.publishing')}
              </>
            ) : (
              t('publishConfirm.confirmAndPublish')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
