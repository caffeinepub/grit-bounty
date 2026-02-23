import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetWalletAddress, useGetWalletBalance } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, ArrowUpRight, History, Loader2, Check } from 'lucide-react';
import { formatICPBalance } from '../utils/formatters';
import WithdrawalDialog from './WithdrawalDialog';
import TransactionHistory from './TransactionHistory';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function WalletSection() {
  const { t } = useLanguage();
  const { data: walletAddress, isLoading: addressLoading } = useGetWalletAddress();
  const { data: balance, isLoading: balanceLoading } = useGetWalletBalance();
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const balanceICP = balance ? formatICPBalance(balance) : '0.00000000';
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
                {balanceICP} <span className="text-xl">ICP</span>
              </div>
            )}
          </div>

          {/* Deposit Address */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{t('wallet.depositAddress')}</div>
            {addressLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{t('wallet.loadingAddress')}</span>
              </div>
            ) : walletAddress ? (
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background/50 rounded border border-neon-cyan/20 text-xs font-mono break-all">
                  {walletAddress}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyAddress}
                  className="border-neon-cyan/30 hover:bg-neon-cyan/10"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">{t('wallet.addressUnavailable')}</div>
            )}
            <p className="text-xs text-muted-foreground">{t('wallet.depositInfo')}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => setWithdrawalOpen(true)}
              disabled={!hasBalance || balanceLoading}
              className="flex-1 bg-neon-magenta text-white hover:bg-neon-magenta/90"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {t('wallet.withdraw')}
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

      {/* Withdrawal Dialog */}
      <WithdrawalDialog
        open={withdrawalOpen}
        onOpenChange={setWithdrawalOpen}
        currentBalance={balance || 0n}
      />
    </>
  );
}
