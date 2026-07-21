'use client';

import { useFeed } from '@/lib/hooks/use-feed';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRelativeTime } from '@/lib/utils';
import { Activity } from 'lucide-react';

export default function LivePage() {
  const { events, loading, error } = useFeed();

  const eventTypeConfig: Record<string, { label: string; color: string }> = {
    commit: { label: '📝 Commit', color: 'bg-blue-500' },
    deploy: { label: '🚀 Deploy', color: 'bg-green-500' },
    launch: { label: '🎉 Launch', color: 'bg-purple-500' },
    milestone: { label: '🏁 Milestone', color: 'bg-gold' },
    project_created: { label: '✨ New Project', color: 'bg-yellow-500' },
  };

  return (
    <div className="space-y-8 py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="h-6 w-6 text-gold animate-pulse" />
          <span className="text-sm font-semibold text-gold uppercase tracking-wider">Live Feed</span>
        </div>
        <h1 className="text-4xl font-serif font-bold">What's Happening Now</h1>
        <p className="mt-2 text-neutral-400">Real-time updates from builders in our community</p>
      </div>

      {/* Feed */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {error && (
          <Card className="border-red-500/50 bg-red-500/10">
            <CardContent className="text-red-400 pt-6">{error}</CardContent>
          </Card>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-24 pt-6" />
              </Card>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">No events yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const config = eventTypeConfig[event.type] || { label: event.type, color: 'bg-gray-500' };
              return (
                <Card key={event.id} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${config.color} h-10 w-10 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                        <span className="text-sm font-bold">•</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {event.builder_name}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                        <p className="font-semibold text-gold mb-2">{event.project_name}</p>
                        <p className="text-neutral-400 text-sm mb-2">{event.message}</p>
                        <p className="text-xs text-neutral-500">{getRelativeTime(event.created_at)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
