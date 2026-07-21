import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with actual database
const projects = new Map();
const users = new Map();
const updates = new Map();
const feedEvents = new Map();

export const db = {
  projects,
  users,
  updates,
  feedEvents,
};

// Mock data initialization
export function initializeMockData() {
  // Add sample projects
  const sampleProject = {
    id: 'proj_1',
    creator_id: 'user_1',
    name: 'AI Agent Framework',
    slug: 'ai-agent-framework',
    description: 'An open-source framework for building autonomous AI agents',
    tagline: 'Build smarter agents, faster',
    status: 'building',
    category: 'infrastructure',
    cover_image_url: null,
    logo_url: null,
    website_url: 'https://example.com',
    github_url: 'https://github.com/example',
    twitter_url: 'https://twitter.com/example',
    views_count: 2500,
    followers_count: 156,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  projects.set(sampleProject.id, sampleProject);

  // Add sample user
  const sampleUser = {
    id: 'user_1',
    email: 'creator@example.com',
    username: 'johndoe',
    avatar_url: null,
    bio: 'Building the future of AI',
    website: 'https://example.com',
    twitter: '@johndoe',
    github: 'johndoe',
    followers_count: 542,
    following_count: 123,
    projects_count: 1,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  users.set(sampleUser.id, sampleUser);
}

// Query helpers
export function getProjectBySlug(slug: string) {
  for (const project of projects.values()) {
    if (project.slug === slug) {
      return project;
    }
  }
  return null;
}

export function getUserById(userId: string) {
  return users.get(userId);
}

export function getProjectsByCreator(creatorId: string) {
  return Array.from(projects.values()).filter((p) => p.creator_id === creatorId);
}
