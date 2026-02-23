import { useLanguage } from '../hooks/useLanguage';
import { useGetTransactionHistory } from '../hooks/useQueries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowUpRight, ArrowDownLeft, Coins, AlertCircle } from 'lucide-react';
import { formatUSD, formatTransactionType, formatTransactionStatus, formatTimestamp } from '../utils/formatters';
import { TransactionType, TransactionStatus } from '../backend';

export default function TransactionHistory() {
  const { t } = useLanguage();
  const { data: transactions, isLoading, error } = useGetTransactionHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-neon-cyan" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-destructive">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="text-sm">{t('wallet.loadError')}</span>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">{t('wallet.noTransactions')}</p>
      </div>
    );
  }

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.deposit:
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case TransactionType.withdrawal:
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case TransactionType.bountyContribution:
        return <Coins className="h-4 w-4 text-neon-cyan" />;
      default:
        return <Coins className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.success:
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{formatTransactionStatus(status, t)}</Badge>;
      case TransactionStatus.pending:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{formatTransactionStatus(status, t)}</Badge>;
      case TransactionStatus.failed:
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{formatTransactionStatus(status, t)}</Badge>;
      default:
        return <Badge variant="outline">{formatTransactionStatus(status, t)}</Badge>;
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">{t('wallet.transactionHistory')}</h3>
      <ScrollArea className="h-[300px] rounded-md border border-neon-cyan/20 p-2">
        <div className="space-y-2">
          {transactions.map(([id, tx]) => (
            <div
              key={Number(id)}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="shrink-0">{getTransactionIcon(tx.transactionType)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {formatTransactionType(tx.transactionType, t)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(tx.timestamp)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-neon-cyan">
                  {formatUSD(tx.amountCents)}
                </p>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
