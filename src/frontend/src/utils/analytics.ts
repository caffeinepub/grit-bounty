/**
 * Analytics utility module with built-in error handling, timeouts, and graceful degradation.
 * Implements fire-and-forget pattern to prevent blocking application initialization.
 */

const ANALYTICS_TIMEOUT = 2000; // 2 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

let analyticsAvailable = true;
let failureCount = 0;
const MAX_FAILURES = 3;

/**
 * Fire-and-forget analytics tracking with timeout and retry logic
 */
async function trackWithTimeout(
  trackFn: () => Promise<void>,
  timeoutMs: number = ANALYTICS_TIMEOUT
): Promise<void> {
  return Promise.race([
    trackFn(),
    new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error('Analytics timeout')), timeoutMs)
    ),
  ]);
}

/**
 * Retry logic with exponential backoff
 */
async function retryWithBackoff(
  fn: () => Promise<void>,
  retries: number = MAX_RETRIES
): Promise<void> {
  for (let i = 0; i <= retries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      if (i === retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)));
    }
  }
}

/**
 * Safe analytics tracking wrapper
 */
async function safeTrack(trackFn: () => Promise<void>): Promise<void> {
  if (!analyticsAvailable) {
    console.log('[Analytics] Skipped - marked unavailable');
    return;
  }

  try {
    await trackWithTimeout(() => retryWithBackoff(trackFn));
    failureCount = 0; // Reset on success
  } catch (error) {
    failureCount++;
    console.warn('[Analytics] Tracking failed:', error);

    if (failureCount >= MAX_FAILURES) {
      analyticsAvailable = false;
      console.warn('[Analytics] Marked as unavailable after repeated failures');
    }
  }
}

/**
 * Track credits changed event (fire-and-forget)
 */
export function trackCreditsChanged(data: any): void {
  // Fire and forget - don't await
  safeTrack(async () => {
    const response = await fetch('https://api.caffeine.ai/beans/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }
  }).catch(() => {
    // Silently catch - already logged in safeTrack
  });
}

/**
 * Track generic event (fire-and-forget)
 */
export function trackEvent(eventName: string, data?: any): void {
  safeTrack(async () => {
    console.log(`[Analytics] Event: ${eventName}`, data);
    // Add actual tracking implementation here if needed
  }).catch(() => {
    // Silently catch
  });
}

/**
 * Reset analytics availability (useful for testing)
 */
export function resetAnalytics(): void {
  analyticsAvailable = true;
  failureCount = 0;
}
