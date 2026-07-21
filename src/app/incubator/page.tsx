'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockHouses = [
  {
    id: '1',
    name: 'Web3 House',
    symbol: 'WEB3',
    projects: 5,
    status: 'live' as const,
    raised: 125000,
    maxSupply: 1000000,
    currentPrice: 0.15,
  },
  {
    id: '2',
    name: 'AI House',
    symbol: 'AIH',
    projects: 3,
    status: 'pending' as const,
    raised: 0,
    maxSupply: 500000,
    currentPrice: 0,
  },
];

export default function IncubatorPage() {
  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold">Incubator & IPO</h1>
          <p className="text-neutral-400 max-w-2xl">
            Bundle projects into houses and launch token offerings with built-in vesting schedules
          </p>
        </div>
      </div>

      {/* Create House */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New House</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="House name"
              className="w-full bg-ink-800 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <textarea
              placeholder="Description"
              className="w-full bg-ink-800 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-gold min-h-[100px]"
            />
            <Button className="w-full">Create House</Button>
          </CardContent>
        </Card>
      </div>

      {/* Houses Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold mb-6">Active Houses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockHouses.map((house) => (
            <Card key={house.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl">{house.name}</CardTitle>
                <Badge variant={house.status === 'live' ? 'launched' : 'beta'}>
                  {house.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Symbol</p>
                    <p className="text-lg font-bold text-gold">{house.symbol}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Projects</p>
                    <p className="text-lg font-bold text-gold">{house.projects}</p>
                  </div>
                  {house.status === 'live' && (
                    <>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">Price</p>
                        <p className="text-lg font-bold text-gold">${house.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">Raised</p>
                        <p className="text-lg font-bold text-gold">${house.raised.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button className="w-full" variant={house.status === 'live' ? 'default' : 'secondary'}>
                  {house.status === 'live' ? 'Buy Tokens' : 'Configure'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
