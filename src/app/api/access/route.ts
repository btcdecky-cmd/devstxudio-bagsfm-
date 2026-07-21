import { NextRequest, NextResponse } from 'next/server';
import { createJsonResponse, withErrorHandling } from '@/lib/api-middleware';
import type { AccessRequest } from '@/lib/types';
import { BAGSFM_MIN_TOKENS } from '@/lib/constants';

export const POST = withErrorHandling(async (req: NextRequest) => {
  const body = await req.json();
  const { walletAddress, email } = body;

  if (!walletAddress || !email) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', code: 'VALIDATION_ERROR' },
      { status: 400 },
    );
  }

  // TODO: Verify wallet using Solana RPC
  // For now, create a pending access request
  const accessRequest: AccessRequest = {
    id: `access_${Date.now()}`,
    user_id: `user_${Date.now()}`,
    user_email: email,
    token_amount: BAGSFM_MIN_TOKENS + 500,
    status: 'approved',
    verified_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  return createJsonResponse(accessRequest, 201);
});
