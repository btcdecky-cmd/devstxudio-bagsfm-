'use client';

import { Avatar, Stat } from '@/components/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp } from 'lucide-react';

const mockBuilders = [
  {
    rank: 1,
    username: 'satoshi_sama',
    followers: 2840,
    projects: 12,
    bio: 'Building the future of decentralized tech',
  },
  {
    rank: 2,
    username: 'elena_dev',
    followers: 1950,
    projects: 8,
    bio: 'AI & Web3 engineer',
  },
  {
    rank: 3,
    username: 'marco_builds',
    followers: 1620,
    projects: 15,
    bio: 'Full-stack developer & open source advocate',
  },
];

export default function BuildersPage() {
  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold">Discover Builders</h1>
          <p className="text-neutral-400 max-w-2xl">
            Meet the developers building amazing projects in public. Sorted by followers and community
            engagement.
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {mockBuilders.map((builder, idx) => (
            <Card key={builder.username} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gold/10">
                      {idx === 0 ? (
                        <Trophy className="h-6 w-6 text-gold" />
                      ) : (
                        <span className="font-bold text-gold text-lg">#{builder.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gold">{builder.username}</p>
                      <p className="text-sm text-neutral-400">{builder.bio}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gold">{builder.followers}</p>
                      <p className="text-xs text-neutral-500">FOLLOWERS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gold">{builder.projects}</p>
                      <p className="text-xs text-neutral-500">PROJECTS</p>
                    </div>
                  </div>

                  <Button size="sm" className="ml-4">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
