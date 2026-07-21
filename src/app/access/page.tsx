'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';
import { BAGSFM_MIN_TOKENS } from '@/lib/constants';

export default function AccessPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'success' | 'error' | null;
    message: string;
  }>({ status: null, message: '' });

  const handleVerify = async () => {
    setIsVerifying(true);
    // TODO: Integrate Solana wallet verification
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setVerificationResult({
      status: 'success',
      message: `Verified! You have ${BAGSFM_MIN_TOKENS + 500} bagsfm tokens. Access granted.`,
    });
    setIsVerifying(false);
  };

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-6 w-6 text-gold" />
          <span className="text-sm font-semibold text-gold uppercase tracking-wider">Gated Access</span>
        </div>
        <h1 className="text-5xl font-serif font-bold">Get Early Access</h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mt-4">
          Verify your bagsfm token ownership to unlock exclusive features and become a founding member
        </p>
      </div>

      {/* Verification Card */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Verify Token Ownership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Solana Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your Solana wallet address..."
                className="w-full bg-ink-800 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            {verificationResult.status && (
              <div
                className={`p-4 rounded-lg flex items-start space-x-3 ${
                  verificationResult.status === 'success'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                <CheckCircle
                  className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    verificationResult.status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                />
                <p
                  className={verificationResult.status === 'success' ? 'text-green-400' : 'text-red-400'}
                >
                  {verificationResult.message}
                </p>
              </div>
            )}

            <div className="bg-ink-800/50 border border-neutral-700 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-neutral-300">Requirements:</p>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>✓ Hold at least {BAGSFM_MIN_TOKENS} bagsfm tokens</li>
                <li>✓ Connected Solana wallet</li>
                <li>✓ Active community member</li>
              </ul>
            </div>

            <Button
              onClick={handleVerify}
              disabled={!walletAddress.trim() || isVerifying}
              size="lg"
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <span className="animate-spin-slow mr-2">⚙️</span>
                  Verifying...
                </>
              ) : (
                <>Verify & Gain Access</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Exclusive Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Early Access', desc: 'Be first to try new features' },
            { title: 'Governance', desc: 'Vote on platform decisions' },
            { title: 'Rewards', desc: 'Earn incentives for participation' },
          ].map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-neutral-400">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
