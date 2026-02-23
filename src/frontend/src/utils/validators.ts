/**
 * Validate ICP address format
 * ICP addresses are account identifiers (64 hex characters) or principal IDs
 */
export function validateICPAddress(address: string): string | null {
  if (!address || address.trim().length === 0) {
    return 'Address is required';
  }

  // Remove whitespace
  const trimmed = address.trim();

  // Check for account identifier format (64 hex characters)
  const accountIdRegex = /^[0-9a-fA-F]{64}$/;
  if (accountIdRegex.test(trimmed)) {
    return null;
  }

  // Check for principal ID format (base32 with dashes)
  const principalRegex = /^[a-z0-9]{5}-[a-z0-9]{5}-[a-z0-9]{5}-[a-z0-9]{5}-[a-z0-9]{3}$/;
  if (principalRegex.test(trimmed)) {
    return null;
  }

  // Check for longer principal formats
  if (trimmed.match(/^[a-z0-9-]+$/) && trimmed.includes('-')) {
    return null;
  }

  return 'Invalid ICP address format';
}

/**
 * Validate withdrawal amount
 */
export function validateWithdrawalAmount(
  amountE8: bigint,
  balanceE8: bigint,
  feeE8: bigint
): string | null {
  if (amountE8 <= 0n) {
    return 'Amount must be greater than zero';
  }

  const totalRequired = amountE8 + feeE8;
  if (totalRequired > balanceE8) {
    return 'Insufficient balance (including fee)';
  }

  // Minimum withdrawal: 0.0001 ICP (10000 e8)
  const minWithdrawal = 10000n;
  if (amountE8 < minWithdrawal) {
    return 'Minimum withdrawal is 0.0001 ICP';
  }

  return null;
}
