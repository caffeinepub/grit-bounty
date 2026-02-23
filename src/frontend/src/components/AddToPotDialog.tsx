import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAddToPot } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, Coins, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface AddToPotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questId: bigint;
  questTitle: string;
  currentRewardPool: bigint;
}

export default function AddToPotDialog({
  open,
  onOpenChange,
  questId,
  questTitle,
  currentRewardPool,
}: AddToPotDialogProps) {
  const { t } = useLanguage();
  const { mutateAsync: addToPot, isPending } = useAddToPot();
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    const contributionAmount = parseFloat(amount);
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      toast.error(t('launchMission.invalidReward'));
      return;
    }

    const contributionE8s = BigInt(Math.floor(contributionAmount * 100000000));

    try {
      await addToPot({ questId, contribution: contributionE8s });
      toast.success(t('bountyBoard.contributionSuccess'));
      setAmount('');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(t('bountyBoard.contributionError') + ': ' + error.message);
    }
  };

  const currentPoolICP = Number(currentRewardPool) / 100000000;
  const contributionAmount = parseFloat(amount) || 0;
  const newPoolICP = currentPoolICP + contributionAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-neon-magenta/30 bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-neon-magenta flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t('bountyBoard.addToPot')}
          </DialogTitle>
          <DialogDescription>{t('bountyBoard.addToPotDescription')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('deposit.questTitle')}</p>
            <p className="font-semibold line-clamp-2">{questTitle}</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('bountyBoard.currentPool')}</span>
              <span className="font-semibold text-neon-cyan flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {currentPoolICP.toFixed(4)} ICP
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution">{t('bountyBoard.yourContribution')}</Label>
              <Input
                id="contribution"
                type="number"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                disabled={isPending}
              />
            </div>

            {contributionAmount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-neon-magenta/10 border border-neon-magenta/30">
                <span className="font-semibold text-neon-magenta">{t('bountyBoard.newPool')}</span>
                <span className="text-xl font-bold text-neon-magenta">
                  {newPoolICP.toFixed(4)} ICP
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {t('deposit.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !amount || parseFloat(amount) <= 0}
            className="w-full sm:w-auto bg-neon-magenta text-white hover:bg-neon-magenta/90 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('deposit.processing')}
              </>
            ) : (
              t('bountyBoard.contribute')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
