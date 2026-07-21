import { NextRequest, NextResponse } from 'next/server';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, ProjectUpdate } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const projectId = searchParams.get('projectId');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  // Mock updates data
  const updates: ProjectUpdate[] = [
    {
      id: 'update_1',
      project_id: projectId || 'proj_1',
      type: 'milestone',
      title: 'Alpha Release',
      content: 'We\'ve released the first alpha version of the framework',
      image_url: null,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'update_2',
      project_id: projectId || 'proj_1',
      type: 'feature',
      title: 'Added Streaming Support',
      content: 'Users can now stream responses in real-time',
      image_url: null,
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const total = updates.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedUpdates = updates.slice(start, start + pageSize);

  const response: PaginatedResponse<ProjectUpdate> = {
    data: paginatedUpdates,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };

  return createJsonResponse(response);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const { projectId, type, title, content, imageUrl } = body;

  if (!projectId || !type || !title || !content) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', code: 'VALIDATION_ERROR' },
      { status: 400 },
    );
  }

  const update: ProjectUpdate = {
    id: `update_${Date.now()}`,
    project_id: projectId,
    type,
    title,
    content,
    image_url: imageUrl || null,
    created_at: new Date().toISOString(),
  };

  return createJsonResponse(update, 201);
});
