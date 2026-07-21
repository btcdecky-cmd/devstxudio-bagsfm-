import { NextRequest, NextResponse } from 'next/server';
import { db, getUserById } from '@/lib/db';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import type { UserProfile } from '@/lib/types';

export const GET = withErrorHandling(async (req: NextRequest) => {
  // TODO: Get from auth token
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    throw new UnauthorizedError();
  }

  const user = getUserById(userId);
  if (!user) {
    throw new NotFoundError('User');
  }

  const userProfile: UserProfile = {
    ...user,
    is_following: false,
    stack_chips: [],
  };

  return createJsonResponse(userProfile);
});
