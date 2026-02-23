import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useWithdrawICP } from '../hooks/useQueries';
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
import { Loader2, AlertCircle } from 'lucide-react';
import { formatICPBalance } from '../utils/formatters';
import { validateICPAddress, validateWithdrawalAmount } from '../utils/validators';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: bigint;
}

export default function WithdrawalDialog({ open, onOpenChange, currentBalance }: WithdrawalDialogProps) {
  const { t } = useLanguage();
  const withdrawMutation = useWithdrawICP();
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const FEE_PERCENTAGE = 0.0001; // 0.01%
  const amountE8 = amount ? BigInt(Math.floor(parseFloat(amount) * 100000000)) : 0n;
  const feeE8 = BigInt(Math.floor(Number(amountE8) * FEE_PERCENTAGE));
  const netAmountE8 = amountE8 > feeE8 ? amountE8 - feeE8 : 0n;

  const addressError = destinationAddress ? validateICPAddress(destinationAddress) : null;
  const amountError = amount ? validateWithdrawalAmount(amountE8, currentBalance, feeE8) : null;

  const canProceed = destinationAddress && amount && !addressError && !amountError;

  const handleConfirm = async () => {
    if (!canProceed) return;

    try {
      await withdrawMutation.mutateAsync({
        destinationAddress,
        amountE8,
      });
      setDestinationAddress('');
      setAmount('');
      setShowConfirmation(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  const handleClose = () => {
    if (!withdrawMutation.isPending) {
      setDestinationAddress('');
      setAmount('');
      setShowConfirmation(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-neon-magenta/30">
        <DialogHeader>
          <DialogTitle className="text-neon-magenta">
            {showConfirmation ? t('wallet.confirmWithdrawal') : t('wallet.withdrawICP')}
          </DialogTitle>
          <DialogDescription>
            {showConfirmation
              ? t('wallet.confirmWithdrawalDescription')
              : t('wallet.withdrawDescription')}
          </DialogDescription>
        </DialogHeader>

        {!showConfirmation ? (
          <div className="space-y-4 py-4">
            {/* Destination Address */}
            <div className="space-y-2">
              <Label htmlFor="destination">{t('wallet.destinationAddress')}</Label>
              <Input
                id="destination"
                placeholder={t('wallet.destinationPlaceholder')}
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                className="font-mono text-sm"
              />
              {addressError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {addressError}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">{t('wallet.amount')}</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.00000001"
                  min="0"
                  placeholder="0.00000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ICP
                </span>
              </div>
              {amountError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {amountError}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {t('wallet.availableBalance')}: {formatICPBalance(currentBalance)} ICP
              </p>
            </div>

            {/* Fee Calculation */}
            {amount && !amountError && (
              <div className="space-y-2 p-3 bg-background/50 rounded border border-neon-cyan/20">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('wallet.withdrawalAmount')}</span>
                  <span className="font-semibold">{formatICPBalance(amountE8)} ICP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('wallet.transactionFee')}</span>
                  <span className="text-orange-400">{formatICPBalance(feeE8)} ICP (0.01%)</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-neon-cyan/20">
                  <span className="font-semibold">{t('wallet.netAmount')}</span>
                  <span className="font-bold text-neon-cyan">{formatICPBalance(netAmountE8)} ICP</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Alert className="border-neon-cyan/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{t('wallet.withdrawalWarning')}</AlertDescription>
            </Alert>

            <div className="space-y-3 p-4 bg-background/50 rounded border border-neon-magenta/20">
              <div>
                <div className="text-xs text-muted-foreground mb-1">{t('wallet.destinationAddress')}</div>
                <code className="text-xs font-mono break-all">{destinationAddress}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('wallet.withdrawalAmount')}</span>
                <span className="font-semibold">{formatICPBalance(amountE8)} ICP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('wallet.transactionFee')}</span>
                <span className="text-orange-400">{formatICPBalance(feeE8)} ICP</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neon-magenta/20">
                <span className="font-semibold">{t('wallet.recipientReceives')}</span>
                <span className="font-bold text-neon-cyan">{formatICPBalance(netAmountE8)} ICP</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!showConfirmation ? (
            <>
              <Button variant="outline" onClick={handleClose} disabled={withdrawMutation.isPending}>
                {t('wallet.cancel')}
              </Button>
              <Button
                onClick={() => setShowConfirmation(true)}
                disabled={!canProceed || withdrawMutation.isPending}
                className="bg-neon-magenta hover:bg-neon-magenta/90"
              >
                {t('wallet.continue')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                disabled={withdrawMutation.isPending}
              >
                {t('wallet.back')}
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={withdrawMutation.isPending}
                className="bg-neon-magenta hover:bg-neon-magenta/90"
              >
                {withdrawMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('wallet.processing')}
                  </>
                ) : (
                  t('wallet.confirmWithdraw')
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
