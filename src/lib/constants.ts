/**
 * Application-wide constants
 */

export const SITE_NAME = 'Dev Studio';
export const SITE_DESCRIPTION = 'Build in public. Create projects, share updates, and track development progress while your community follows the journey from idea to launch.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Project statuses
export const PROJECT_STATUSES = ['idea', 'building', 'beta', 'launched', 'ipo'] as const;
export const PROJECT_CATEGORIES = [
  'finance',
  'social',
  'gaming',
  'infrastructure',
  'marketplace',
  'education',
  'other',
] as const;

// Update types
export const UPDATE_TYPES = ['milestone', 'commit', 'deploy', 'feature', 'bug_fix', 'launch'] as const;

// Stack proficiency levels
export const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'expert'] as const;

// Solana configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const BAGSFM_TOKEN_MINT = process.env.NEXT_PUBLIC_BAGSFM_MINT || '';
export const BAGSFM_MIN_TOKENS = 1000; // Minimum tokens required for access

// Feature flags
export const FEATURES = {
  ENABLE_AI_AGENT_ARENA: true,
  ENABLE_AI_APP_BUILDER: true,
  ENABLE_IPO: true,
  ENABLE_LIVE_FEED: true,
  ENABLE_GITHUB_SYNC: true,
} as const;

// Theme colors
export const THEME = {
  primary: '#1a1a1a', // ink-900
  accent: '#d4af37', // gold
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Navigation routes
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  BUILDERS: '/builders',
  DASHBOARD: '/dashboard',
  ARENA: '/arena',
  BUILDER: '/builder',
  INCUBATOR: '/incubator',
  LIVE: '/live',
  GITHUB: '/github',
  ACCESS: '/access',
} as const;

// API endpoints
export const API = {
  BASE: '/api',
  PROJECTS: '/api/projects',
  USERS: '/api/users',
  UPDATES: '/api/updates',
  FEED: '/api/feed',
  AGENTS: '/api/agents',
  HOUSES: '/api/houses',
  ACCESS: '/api/access',
} as const;

// Error messages
export const ERRORS = {
  UNAUTHORIZED: 'Please sign in to continue',
  FORBIDDEN: 'You do not have permission to access this resource',
  NOT_FOUND: 'The resource you are looking for does not exist',
  SERVER_ERROR: 'An error occurred. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
} as const;
