import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
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
import { Loader2, Coins, Shield, AlertCircle } from 'lucide-react';

interface DepositConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questTitle: string;
  rewardPool: bigint;
  depositAmount: number;
  depositRate: number;
  onConfirm: () => Promise<void>;
}

export default function DepositConfirmationDialog({
  open,
  onOpenChange,
  questTitle,
  rewardPool,
  depositAmount,
  depositRate,
  onConfirm,
}: DepositConfirmationDialogProps) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t('deposit.transferFailed'));
    } finally {
      setIsProcessing(false);
    }
  };

  const rewardPoolICP = Number(rewardPool) / 100000000;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-neon-cyan/30 bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('deposit.confirmTitle')}
          </DialogTitle>
          <DialogDescription>{t('deposit.confirmDescription')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Quest Info */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('deposit.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{questTitle}</p>
          </div>

          <Separator />

          {/* Financial Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('deposit.rewardPool')}</span>
              <span className="font-semibold text-neon-magenta flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {rewardPoolICP.toFixed(4)} ICP
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('deposit.yourDepositRate')}</span>
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                {depositRate}%
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <span className="font-semibold text-neon-cyan">{t('deposit.depositRequired')}</span>
              <span className="text-xl font-bold text-neon-cyan">
                {depositAmount.toFixed(4)} ICP
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-400">{t('deposit.depositInfo')}</p>
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
            {t('deposit.cancel')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full sm:w-auto bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('deposit.processing')}
              </>
            ) : (
              t('deposit.confirmAndPay')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
