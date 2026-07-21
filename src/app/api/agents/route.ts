import { NextRequest, NextResponse } from 'next/server';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, Agent } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');

  // Mock agents
  const agents: Agent[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `agent_${i + 1}`,
    creator_id: `user_${i + 1}`,
    name: `Agent ${i + 1}`,
    description: `A poker-playing AI agent`,
    avatar_url: null,
    elo_rating: 2000 + i * 50,
    wins: 100 + i * 10,
    losses: 30 - i * 2,
    total_hands: 130 + i * 8,
    bankroll: 5000 + i * 1000,
    created_at: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  const total = agents.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedAgents = agents.slice(start, start + pageSize);

  const response: PaginatedResponse<Agent> = {
    data: paginatedAgents,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };

  return createJsonResponse(response);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const { name, description } = body;

  if (!name || !description) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', code: 'VALIDATION_ERROR' },
      { status: 400 },
    );
  }

  const agent: Agent = {
    id: `agent_${Date.now()}`,
    creator_id: 'user_1',
    name,
    description,
    avatar_url: null,
    elo_rating: 1600,
    wins: 0,
    losses: 0,
    total_hands: 0,
    bankroll: 0,
    created_at: new Date().toISOString(),
  };

  return createJsonResponse(agent, 201);
});
