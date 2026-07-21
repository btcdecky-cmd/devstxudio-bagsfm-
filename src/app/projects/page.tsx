'use client';

import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/lib/hooks/use-projects';
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '@/lib/constants';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function ProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');

  const { projects, loading, error, pagination, refetch } = useProjects({
    status: selectedStatus,
    category: selectedCategory,
    search: searchQuery,
  });

  return (
    <div className="space-y-8 py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-serif font-bold">Explore Projects</h1>
            <p className="mt-2 text-neutral-400">Discover amazing projects being built in public</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ink-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <p className="text-sm font-semibold text-neutral-400 mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {PROJECT_STATUSES.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStatus(selectedStatus === status ? undefined : status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-400 mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === category ? undefined : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {error && (
          <Card className="border-red-500/50 bg-red-500/10">
            <CardContent className="text-red-400">{error}</CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-80 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">No projects found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <Button variant="ghost" disabled>
                  Previous
                </Button>
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={i + 1 === pagination.page ? 'default' : 'ghost'}
                    size="sm"
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button variant="ghost">Next</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
