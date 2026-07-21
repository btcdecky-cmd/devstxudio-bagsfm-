import { NextRequest, NextResponse } from 'next/server';
import { DevStudioError } from '@/lib/errors';

export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof DevStudioError) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
            code: error.code,
          },
          { status: error.statusCode },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Internal server error',
          code: 'SERVER_ERROR',
        },
        { status: 500 },
      );
    }
  };
}

export function withAuth(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return withErrorHandling(async (req: NextRequest) => {
    // TODO: Implement JWT verification
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 },
      );
    }
    return handler(req, userId);
  });
}

export function createJsonResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}
