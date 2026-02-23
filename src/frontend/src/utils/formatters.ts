import { TransactionType, TransactionStatus } from '../backend';

/**
 * Format USD amount from cents to human-readable string with 2 decimal places
 */
export function formatUSD(amountCents: bigint): string {
  const dollars = Number(amountCents) / 100;
  return `$${dollars.toFixed(2)} USD`;
}

/**
 * Format USD amount from cents to dollars (number)
 */
export function centsToUSD(amountCents: bigint): number {
  return Number(amountCents) / 100;
}

/**
 * Convert USD dollars to cents
 */
export function usdToCents(dollars: number): bigint {
  return BigInt(Math.floor(dollars * 100));
}

/**
 * @deprecated Use formatUSD instead - ICP currency has been replaced with USD
 */
export function formatICPBalance(amountE8: bigint): string {
  const icp = Number(amountE8) / 100000000;
  return icp.toFixed(8);
}

/**
 * @deprecated Use formatUSD instead - ICP currency has been replaced with USD
 */
export function formatICPWithUnit(amountE8: bigint): string {
  return `${formatICPBalance(amountE8)} ICP`;
}

/**
 * Format transaction type to display string
 */
export function formatTransactionType(type: TransactionType, t: (key: string) => string): string {
  switch (type) {
    case TransactionType.deposit:
      return t('wallet.typeDeposit');
    case TransactionType.withdrawal:
      return t('wallet.typeWithdrawal');
    case TransactionType.taskPayment:
      return t('wallet.typeTaskPayment');
    case TransactionType.taskDeduction:
      return t('wallet.typeTaskDeduction');
    case TransactionType.bountyContribution:
      return t('wallet.typeBountyContribution');
    case TransactionType.serviceFee:
      return t('wallet.typeServiceFee');
    default:
      return String(type);
  }
}

/**
 * Format transaction status to display string
 */
export function formatTransactionStatus(status: TransactionStatus, t: (key: string) => string): string {
  switch (status) {
    case TransactionStatus.success:
      return t('wallet.statusSuccess');
    case TransactionStatus.pending:
      return t('wallet.statusPending');
    case TransactionStatus.failed:
      return t('wallet.statusFailed');
    default:
      return String(status);
  }
}

/**
 * Format timestamp (bigint nanoseconds) to human-readable date-time string
 */
export function formatTimestamp(timestampNs: bigint): string {
  const timestampMs = Number(timestampNs) / 1000000;
  const date = new Date(timestampMs);
  
  // Format: "Feb 23, 2026 14:30"
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
