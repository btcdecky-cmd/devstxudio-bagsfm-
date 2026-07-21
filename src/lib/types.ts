/**
 * Core domain types for Dev Studio
 * Organized by feature area
 */

// ============================================================================
// AUTHENTICATION & USERS
// ============================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  twitter: string | null;
  github: string | null;
  followers_count: number;
  following_count: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  is_following: boolean;
  stack_chips: StackChip[];
}

// ============================================================================
// PROJECTS
// ============================================================================

export type ProjectStatus = 'idea' | 'building' | 'beta' | 'launched' | 'ipo';
export type ProjectCategory =
  | 'finance'
  | 'social'
  | 'gaming'
  | 'infrastructure'
  | 'marketplace'
  | 'education'
  | 'other';

export interface Project {
  id: string;
  creator_id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  status: ProjectStatus;
  category: ProjectCategory;
  cover_image_url: string | null;
  logo_url: string | null;
  website_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  views_count: number;
  followers_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  creator: User;
  updates: ProjectUpdate[];
  followers_count: number;
  is_following: boolean;
}

// ============================================================================
// PROJECT UPDATES (BUILD LOG)
// ============================================================================

export type UpdateType = 'milestone' | 'commit' | 'deploy' | 'feature' | 'bug_fix' | 'launch';

export interface ProjectUpdate {
  id: string;
  project_id: string;
  type: UpdateType;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

// ============================================================================
// LIVE FEED
// ============================================================================

export interface FeedEvent {
  id: string;
  type: 'commit' | 'deploy' | 'launch' | 'milestone' | 'project_created';
  project_id: string;
  project_name: string;
  builder_id: string;
  builder_name: string;
  builder_avatar: string | null;
  message: string;
  metadata: Record<string, any>;
  created_at: string;
}

// ============================================================================
// STACK & TECHNOLOGY
// ============================================================================

export interface StackChip {
  id: string;
  user_id: string;
  technology: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
  years_experience: number;
  endorsements: number;
}

// ============================================================================
// AI AGENT ARENA
// ============================================================================

export interface Agent {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  avatar_url: string | null;
  elo_rating: number;
  wins: number;
  losses: number;
  total_hands: number;
  bankroll: number;
  created_at: string;
}

export interface ArenaMatch {
  id: string;
  agents: Agent[];
  game_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  buy_in: number;
  prize_pool: number;
  winner_id: string | null;
  final_stacks: Record<string, number>;
  hand_count: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface Leaderboard {
  rank: number;
  agent: Agent;
  elo_rating: number;
  wins: number;
  losses: number;
  win_rate: number;
  total_earnings: number;
}

// ============================================================================
// INCUBATOR & IPO
// ============================================================================

export interface House {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  projects: Project[];
  symbol: string; // pump.fun symbol
  token_address: string | null;
  total_raised: number;
  max_supply: number;
  current_price: number;
  market_cap: number;
  status: 'pending' | 'live' | 'completed';
  vesting_schedule: VestingSchedule[];
  created_at: string;
}

export interface VestingSchedule {
  id: string;
  house_id: string;
  beneficiary_id: string;
  amount: number;
  start_date: string;
  end_date: string;
  cliff_date: string;
  released_amount: number;
}

// ============================================================================
// GITHUB INTEGRATION
// ============================================================================

export interface GithubRepository {
  id: number;
  name: string;
  owner: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  is_fork: boolean;
}

// ============================================================================
// ACCESS CONTROL
// ============================================================================

export interface AccessRequest {
  id: string;
  user_id: string;
  user_email: string;
  token_amount: number;
  status: 'pending' | 'approved' | 'rejected';
  verified_at: string | null;
  created_at: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
