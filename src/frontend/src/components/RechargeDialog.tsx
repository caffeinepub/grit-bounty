import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCreateStripeCheckoutSession } from '../hooks/useQueries';
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
import { DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatUSD } from '../utils/formatters';

interface RechargeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: bigint;
}

export default function RechargeDialog({
  open,
  onOpenChange,
  currentBalance,
}: RechargeDialogProps) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const { mutateAsync: createCheckoutSession, isPending } = useCreateStripeCheckoutSession();

  useEffect(() => {
    if (!open) {
      setAmount('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rechargeAmount = parseFloat(amount);
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      toast.error(t('recharge.invalidAmount'));
      return;
    }

    try {
      const amountCents = BigInt(Math.floor(rechargeAmount * 100));
      const amountUSD = BigInt(Math.floor(rechargeAmount));

      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-cancel`;

      const sessionJson = await createCheckoutSession({
        request: { amountUSD, amountCents },
        successUrl,
        cancelUrl,
      });

      const session = JSON.parse(sessionJson) as { id: string; url: string };
      
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }

      // Redirect to Stripe checkout
      window.location.href = session.url;
    } catch (error: any) {
      console.error('Recharge error:', error);
      toast.error(error.message || t('recharge.error'));
    }
  };

  const rechargeAmount = parseFloat(amount) || 0;
  const isInvalidAmount = rechargeAmount <= 0 || isNaN(rechargeAmount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-neon-cyan" />
            {t('recharge.title')}
          </DialogTitle>
          <DialogDescription>{t('recharge.description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('recharge.currentBalance')}</Label>
            <p className="text-lg font-bold text-neon-cyan">
              {formatUSD(currentBalance)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recharge-amount">{t('recharge.amount')}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="recharge-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg pl-7"
                disabled={isPending}
              />
            </div>
            <p className="text-xs text-muted-foreground">{t('recharge.amountHint')}</p>
          </div>

          {rechargeAmount > 0 && (
            <div className="space-y-2 p-3 rounded-lg bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('recharge.rechargeAmount')}</span>
                <span className="font-medium text-neon-cyan">${rechargeAmount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>{t('recharge.newBalance')}</span>
                <span className="text-neon-cyan">
                  ${((Number(currentBalance) / 100) + rechargeAmount).toFixed(2)} USD
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              {t('recharge.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isPending || isInvalidAmount}
              className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('recharge.processing')}
                </>
              ) : (
                t('recharge.confirm')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
