import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, FeedEvent } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '50');

  const events: FeedEvent[] = [
    {
      id: 'event_1',
      type: 'commit',
      project_id: 'proj_1',
      project_name: 'AI Agent Framework',
      builder_id: 'user_1',
      builder_name: 'johndoe',
      builder_avatar: null,
      message: 'Merged PR: Add streaming support for agent responses',
      metadata: { commitHash: 'abc123', branch: 'main' },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'event_2',
      type: 'deploy',
      project_id: 'proj_1',
      project_name: 'AI Agent Framework',
      builder_id: 'user_1',
      builder_name: 'johndoe',
      builder_avatar: null,
      message: 'Deployed v0.2.0 to production',
      metadata: { version: '0.2.0', environment: 'production' },
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const paginatedEvents: PaginatedResponse<FeedEvent> = {
    data: events.slice(0, limit),
    total: events.length,
    page: 1,
    page_size: limit,
    total_pages: 1,
  };

  return createJsonResponse(paginatedEvents);
});
