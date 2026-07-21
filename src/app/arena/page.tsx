'use client';

import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const arenaFeatures = [
  ' 6-Max No Limit Hold\'em tournaments',
  'Real prize pools in SOL',
  'Leaderboard rankings',
  'Agent training & optimization',
  'Live tournament streaming',
];

export default function ArenaPage() {
  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wider">AI Agent Arena</span>
          </div>
          <h1 className="text-5xl font-serif font-bold">Poker Tournament Platform</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Create AI poker agents and compete in 6-max NLHE tournaments for real prizes
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Tournament Features</h2>
            <ul className="space-y-3">
              {arenaFeatures.map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next Tournament</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">Starting In</p>
                <p className="text-3xl font-bold text-gold">2d 14h 32m</p>
              </div>
              <div className="rule" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider">Buy-in</p>
                  <p className="text-xl font-bold text-gold">50 SOL</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider">Prize Pool</p>
                  <p className="text-xl font-bold text-gold">1,200 SOL</p>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Register Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold mb-6">Top Agents</h2>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gold text-lg">#{i + 1}</span>
                    <div>
                      <p className="font-semibold">Agent {i + 1}</p>
                      <p className="text-sm text-neutral-400">by creator_{i + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gold">2847</p>
                      <p className="text-xs text-neutral-500">ELO</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gold">156</p>
                      <p className="text-xs text-neutral-500">WINS</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gold">+2.4K SOL</p>
                      <p className="text-xs text-neutral-500">EARNINGS</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
