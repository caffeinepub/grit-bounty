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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { formatUSD, centsToUSD } from '../utils/formatters';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: bigint;
}

export default function WithdrawalDialog({ open, onOpenChange, currentBalance }: WithdrawalDialogProps) {
  const { t } = useLanguage();
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleClose = () => {
    setDestinationAddress('');
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-neon-magenta/30">
        <DialogHeader>
          <DialogTitle className="text-neon-magenta">{t('wallet.withdrawICP')}</DialogTitle>
          <DialogDescription>{t('wallet.withdrawDescription')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert className="border-yellow-500/30 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-500">
              Withdrawal functionality requires backend ICP Ledger integration. This feature is not yet available.
            </AlertDescription>
          </Alert>

          {/* Destination Address */}
          <div className="space-y-2">
            <Label htmlFor="destination">{t('wallet.destinationAddress')}</Label>
            <Input
              id="destination"
              placeholder={t('wallet.destinationPlaceholder')}
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              className="font-mono text-sm"
              disabled
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">{t('wallet.amount')}</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                disabled
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {t('wallet.availableBalance')}: {formatUSD(currentBalance)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t('wallet.cancel')}
          </Button>
          <Button disabled className="bg-neon-magenta hover:bg-neon-magenta/90">
            {t('wallet.continue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
