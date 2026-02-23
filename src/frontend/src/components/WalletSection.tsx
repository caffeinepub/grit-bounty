import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetWalletBalance } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, History, Loader2, DollarSign } from 'lucide-react';
import { formatUSD } from '../utils/formatters';
import TransactionHistory from './TransactionHistory';
import RechargeDialog from './RechargeDialog';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

export default function WalletSection() {
  const { t } = useLanguage();
  const { data: balance, isLoading: balanceLoading } = useGetWalletBalance();
  const [rechargeOpen, setRechargeOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const balanceUSD = balance ? formatUSD(balance) : '$0.00 USD';
  const hasBalance = balance && balance > 0n;

  return (
    <>
      <Card className="border-neon-cyan/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-neon-cyan">
            <Wallet className="h-5 w-5" />
            {t('wallet.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Display */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{t('wallet.balance')}</div>
            {balanceLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{t('wallet.loadingBalance')}</span>
              </div>
            ) : (
              <div className="text-3xl font-bold text-neon-cyan">
                {balanceUSD}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => setRechargeOpen(true)}
              disabled={balanceLoading}
              className="flex-1 bg-neon-magenta text-white hover:bg-neon-magenta/90"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              {t('wallet.recharge')}
            </Button>
            <Button
              onClick={() => setHistoryOpen(!historyOpen)}
              variant="outline"
              className="flex-1 border-neon-blue/30 hover:bg-neon-blue/10"
            >
              <History className="mr-2 h-4 w-4" />
              {t('wallet.history')}
            </Button>
          </div>

          {/* Transaction History Collapsible */}
          <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
            <CollapsibleContent>
              <div className="pt-4 border-t border-neon-cyan/20">
                <TransactionHistory />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Recharge Dialog */}
      <RechargeDialog
        open={rechargeOpen}
        onOpenChange={setRechargeOpen}
        currentBalance={balance || 0n}
      />
    </>
  );
}
