'use client';

import { useUser } from '@/lib/hooks/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin-slow text-4xl">⚙️</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold">Sign In Required</h1>
          <p className="text-neutral-400">Please sign in to access your dashboard</p>
          <Button size="lg">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold">Dashboard</h1>
        <p className="mt-2 text-neutral-400">Welcome back, {user.username}!</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-400">Your Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gold">{user.projects_count}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-400">Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gold">{user.followers_count}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-400">Following</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gold">{user.following_count}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
