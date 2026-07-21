'use client';

import { Avatar, Stat } from '@/components/avatar';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data - replace with API call
const mockProject = {
  id: '1',
  creator_id: 'user1',
  name: 'AI Agent Framework',
  slug: 'ai-agent-framework',
  description: 'An open-source framework for building autonomous AI agents',
  tagline: 'Build smarter agents, faster',
  status: 'building' as const,
  category: 'infrastructure' as const,
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

const mockCreator = {
  id: 'user1',
  email: 'creator@example.com',
  username: 'johndoe',
  avatar_url: null,
  bio: 'Building the future of AI',
  website: 'https://example.com',
  twitter: '@johndoe',
  github: 'johndoe',
  followers_count: 542,
  following_count: 123,
  projects_count: 5,
  created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
};

export default function ProjectDetailPage() {
  return (
    <div className="space-y-12 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-6">
          <Badge variant="building">{mockProject.status}</Badge>
          <div>
            <h1 className="text-5xl font-serif font-bold">{mockProject.name}</h1>
            <p className="mt-2 text-xl text-neutral-400">{mockProject.tagline}</p>
          </div>

          {/* Creator */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
            <div className="flex items-center space-x-4">
              <Avatar alt={mockCreator.username} size="lg" />
              <div>
                <p className="font-semibold text-gold">{mockCreator.username}</p>
                <p className="text-sm text-neutral-400">{mockCreator.bio}</p>
              </div>
            </div>
            <Button>Follow</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{mockProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={mockProject.website_url} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={mockProject.github_url} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={mockProject.twitter_url} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mock updates */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="pb-4 border-b border-neutral-700 last:pb-0 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">Update #{3 - i}</p>
                      <span className="text-xs text-neutral-500">2 days ago</span>
                    </div>
                    <p className="text-neutral-400">Just pushed a major update to the core framework. Everything is more stable now!</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardContent className="pt-6 space-y-6">
                <Stat label="Views" value={mockProject.views_count} />
                <Stat label="Followers" value={mockProject.followers_count} />
                <Stat label="Creator Followers" value={mockCreator.followers_count} />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full" size="lg">
                Follow Project
              </Button>
              <Button className="w-full" variant="outline" size="lg">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
