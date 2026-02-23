import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAddBounty, useGetCallerBalance } from '../hooks/useQueries';
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
import { Coins, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddBountyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questId: bigint;
  questTitle: string;
  currentRewardPool: bigint;
}

export default function AddBountyDialog({
  open,
  onOpenChange,
  questId,
  questTitle,
  currentRewardPool,
}: AddBountyDialogProps) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const { data: balance, isLoading: balanceLoading } = useGetCallerBalance();
  const { mutateAsync: addBounty, isPending } = useAddBounty();

  const balanceICP = balance ? Number(balance) / 100000000 : 0;
  const currentPoolICP = Number(currentRewardPool) / 100000000;
  const contributionAmount = parseFloat(amount) || 0;
  const newPoolICP = currentPoolICP + contributionAmount;

  const hasInsufficientBalance = contributionAmount > balanceICP;
  const isInvalidAmount = contributionAmount <= 0 || isNaN(contributionAmount);

  useEffect(() => {
    if (!open) {
      setAmount('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isInvalidAmount) {
      toast.error(t('addBounty.invalidAmount'));
      return;
    }

    if (hasInsufficientBalance) {
      toast.error(t('addBounty.insufficientBalance'));
      return;
    }

    try {
      const amountE8 = BigInt(Math.floor(contributionAmount * 100000000));
      await addBounty({ questId, amountE8 });
      toast.success(t('addBounty.success'));
      onOpenChange(false);
    } catch (error: any) {
      console.error('Add bounty error:', error);
      toast.error(error.message || t('addBounty.error'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-neon-cyan" />
            {t('addBounty.title')}
          </DialogTitle>
          <DialogDescription>{t('addBounty.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('addBounty.questTitle')}</Label>
            <p className="text-sm font-medium line-clamp-2">{questTitle}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('addBounty.yourBalance')}</Label>
            <p className="text-lg font-bold text-neon-cyan">
              {balanceLoading ? t('wallet.loadingBalance') : `${balanceICP.toFixed(4)} ICP`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bounty-amount">{t('addBounty.amount')}</Label>
            <Input
              id="bounty-amount"
              type="number"
              step="0.0001"
              min="0"
              placeholder="0.0000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
              disabled={isPending}
            />
            {hasInsufficientBalance && contributionAmount > 0 && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-destructive">{t('addBounty.insufficientBalanceWarning')}</p>
              </div>
            )}
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-muted/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('addBounty.currentPool')}</span>
              <span className="font-medium">{currentPoolICP.toFixed(4)} ICP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('addBounty.yourContribution')}</span>
              <span className="font-medium text-neon-cyan">+{contributionAmount.toFixed(4)} ICP</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between text-sm font-bold">
              <span>{t('addBounty.newPool')}</span>
              <span className="text-neon-cyan">{newPoolICP.toFixed(4)} ICP</span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              {t('addBounty.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isPending || isInvalidAmount || hasInsufficientBalance || balanceLoading}
              className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
            >
              {isPending ? t('addBounty.adding') : t('addBounty.confirm')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
