import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { PaginatedResponse, User } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const search = searchParams.get('search')?.toLowerCase();

  let users = Array.from(db.users.values());

  // Filter by search
  if (search) {
    users = users.filter(
      (u) => u.username.toLowerCase().includes(search) || u.bio?.toLowerCase().includes(search),
    );
  }

  // Sort by followers (most followed first)
  users.sort((a, b) => b.followers_count - a.followers_count);

  // Paginate
  const total = users.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedUsers = users.slice(start, start + pageSize);

  const response: PaginatedResponse<User> = {
    data: paginatedUsers,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };

  return createJsonResponse(response);
});
