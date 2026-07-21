'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { getRelativeTime } from '@/lib/utils';
import type { Project } from '@/lib/types';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  project: Project;
}

const statusMap: Record<string, 'idea' | 'building' | 'beta' | 'launched' | 'ipo'> = {
  idea: 'idea',
  building: 'building',
  beta: 'beta',
  launched: 'launched',
  ipo: 'ipo',
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={ROUTES.PROJECT_DETAIL(project.slug)}>
      <div className="glass group card-hover overflow-hidden">
        {/* Header */}
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={project.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                {project.logo_url && (
                  <img
                    src={project.logo_url}
                    alt={project.name}
                    className="mb-4 h-12 w-12 mx-auto rounded-lg"
                  />
                )}
                <p className="text-sm text-neutral-500">No cover image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Status */}
          <div className="mb-3 flex items-center justify-between">
            <Badge variant={statusMap[project.status] || 'default'}>
              {project.status}
            </Badge>
            <span className="text-xs text-neutral-500">
              {getRelativeTime(project.created_at)}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 font-serif text-lg font-semibold text-gold group-hover:text-gold-light transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm text-neutral-400 line-clamp-2">
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-700">
            <div className="flex items-center space-x-4 text-xs text-neutral-500">
              <span>{project.views_count} views</span>
              <span>{project.followers_count} followers</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
