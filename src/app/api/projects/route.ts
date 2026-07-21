import { NextRequest, NextResponse } from 'next/server';
import { initializeMockData, db } from '@/lib/db';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, Project } from '@/lib/types';

// Initialize mock data on first import
initializeMockData();

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let projects = Array.from(db.projects.values());

  // Filter by status
  if (status) {
    projects = projects.filter((p) => p.status === status);
  }

  // Filter by category
  if (category) {
    projects = projects.filter((p) => p.category === category);
  }

  // Filter by search
  if (search) {
    projects = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tagline.toLowerCase().includes(search),
    );
  }

  // Sort by created date (newest first)
  projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Paginate
  const total = projects.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedProjects = projects.slice(start, start + pageSize);

  const response: PaginatedResponse<Project> = {
    data: paginatedProjects,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };

  return createJsonResponse(response);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const { name, description, tagline, category } = body;

  // Validate input
  if (!name || !description || !tagline || !category) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', code: 'VALIDATION_ERROR' },
      { status: 400 },
    );
  }

  // Create new project
  const projectId = `proj_${Date.now()}`;
  const project: Project = {
    id: projectId,
    creator_id: 'user_1', // TODO: Get from auth
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description,
    tagline,
    status: 'idea',
    category,
    cover_image_url: null,
    logo_url: null,
    website_url: null,
    github_url: null,
    twitter_url: null,
    views_count: 0,
    followers_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.projects.set(projectId, project);

  return createJsonResponse(project, 201);
});
