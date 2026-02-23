import { useLanguage } from '../hooks/useLanguage';
import { useGetTransactionHistory } from '../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ArrowDownLeft, ArrowUpRight, Coins, MinusCircle } from 'lucide-react';
import { formatICPBalance, formatTransactionType, formatTransactionStatus, formatTimestamp } from '../utils/formatters';
import { TransactionType, TransactionStatus } from '../backend';

export default function TransactionHistory() {
  const { t } = useLanguage();
  const { data: transactions = [], isLoading } = useGetTransactionHistory();

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.deposit:
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case TransactionType.withdrawal:
        return <ArrowUpRight className="h-4 w-4 text-red-400" />;
      case TransactionType.taskPayment:
        return <Coins className="h-4 w-4 text-neon-cyan" />;
      case TransactionType.taskDeduction:
        return <MinusCircle className="h-4 w-4 text-orange-400" />;
    }
  };

  const getTypeColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.deposit:
      case TransactionType.taskPayment:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case TransactionType.withdrawal:
      case TransactionType.taskDeduction:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.success:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case TransactionStatus.pending:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case TransactionStatus.failed:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-neon-blue" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">{t('wallet.noTransactions')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-neon-blue">{t('wallet.transactionHistory')}</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {transactions.map(([id, tx]) => (
            <div
              key={Number(id)}
              className="flex items-start gap-3 p-3 bg-background/30 rounded border border-neon-blue/10 hover:border-neon-blue/30 transition-colors"
            >
              <div className="mt-1">{getTypeIcon(tx.transactionType)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <Badge className={getTypeColor(tx.transactionType)} variant="outline">
                    {formatTransactionType(tx.transactionType, t)}
                  </Badge>
                  <Badge className={getStatusColor(tx.status)} variant="outline">
                    {formatTransactionStatus(tx.status, t)}
                  </Badge>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold">
                    {formatICPBalance(tx.amountE8)} ICP
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(tx.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
