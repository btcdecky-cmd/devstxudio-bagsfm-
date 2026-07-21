import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge classNames using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(past);
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
