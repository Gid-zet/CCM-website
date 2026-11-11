/**
 * Vercel Web Analytics custom events (https://vercel.com/docs/analytics/custom-events).
 * Page views are tracked automatically by <Analytics /> in App.tsx.
 * Custom events need a Pro or Enterprise plan; on Hobby they are simply not recorded.
 * Never pass personal data (names, emails, phone numbers) here.
 */
import { track as vercelTrack } from '@vercel/analytics';

type Props = Record<string, string | number | boolean | null>;

export function track(event: string, props?: Props) {
  try { vercelTrack(event, props); } catch { /* analytics must never break the page */ }
}
