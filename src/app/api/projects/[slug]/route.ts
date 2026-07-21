import { NextRequest, NextResponse } from 'next/server';
import { db, getProjectBySlug, getUserById } from '@/lib/db';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import { NotFoundError } from '@/lib/errors';
import type { ProjectDetail } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    throw new NotFoundError('Project');
  }

  const creator = getUserById(project.creator_id);
  if (!creator) {
    throw new NotFoundError('Creator');
  }

  const projectDetail: ProjectDetail = {
    ...project,
    creator,
    updates: [],
    is_following: false,
  };

  return createJsonResponse(projectDetail);
});

export const PATCH = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    throw new NotFoundError('Project');
  }

  const body = await req.json();
  const updated = { ...project, ...body, updated_at: new Date().toISOString() };

  db.projects.set(project.id, updated);

  return createJsonResponse(updated);
});
