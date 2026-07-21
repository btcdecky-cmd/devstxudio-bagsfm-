import { NextRequest, NextResponse } from 'next/server';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, House } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');

  // Mock houses
  const houses: House[] = [
    {
      id: 'house_1',
      creator_id: 'user_1',
      name: 'Web3 House',
      description: 'A collection of Web3 projects',
      projects: [],
      symbol: 'WEB3',
      token_address: null,
      total_raised: 125000,
      max_supply: 1000000,
      current_price: 0.15,
      status: 'live',
      vesting_schedule: [],
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const total = houses.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedHouses = houses.slice(start, start + pageSize);

  const response: PaginatedResponse<House> = {
    data: paginatedHouses,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };

  return createJsonResponse(response);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const { name, description, symbol } = body;

  if (!name || !description || !symbol) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', code: 'VALIDATION_ERROR' },
      { status: 400 },
    );
  }

  const house: House = {
    id: `house_${Date.now()}`,
    creator_id: 'user_1',
    name,
    description,
    projects: [],
    symbol,
    token_address: null,
    total_raised: 0,
    max_supply: 1000000,
    current_price: 0,
    status: 'pending',
    vesting_schedule: [],
    created_at: new Date().toISOString(),
  };

  return createJsonResponse(house, 201);
});
