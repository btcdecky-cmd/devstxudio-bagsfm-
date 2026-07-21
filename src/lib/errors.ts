/**
 * Custom error classes for Dev Studio
 */

export class DevStudioError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'DevStudioError';
  }
}

export class ValidationError extends DevStudioError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends DevStudioError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends DevStudioError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends DevStudioError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends DevStudioError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends DevStudioError {
  constructor(retryAfter: number = 60) {
    super(`Rate limit exceeded. Retry after ${retryAfter}s`, 'RATE_LIMIT', 429);
    this.name = 'RateLimitError';
  }
}

export function isDevStudioError(error: unknown): error is DevStudioError {
  return error instanceof DevStudioError;
}
