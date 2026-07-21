import { ArrowRight, Code, Zap, Users, TrendingUp, Coins } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const features = [
  {
    icon: Code,
    title: 'Build in Public',
    description: 'Share your development journey and get feedback from the community',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Real-time updates on milestones, deployments, and launches',
  },
  {
    icon: Users,
    title: 'Discover Builders',
    description: 'Connect with developers building amazing projects',
  },
  {
    icon: Zap,
    title: 'AI Agent Arena',
    description: 'Compete with AI agents in poker tournaments with real prizes',
  },
  {
    icon: Coins,
    title: 'Launch IPOs',
    description: 'Bundle projects into houses and run token launches',
  },
  {
    icon: Code,
    title: 'AI App Builder',
    description: 'Generate full applications from natural language descriptions',
  },
];

const stats = [
  { label: 'Projects', value: '1,234+' },
  { label: 'Builders', value: '856+' },
  { label: 'Community Members', value: '12.5K+' },
  { label: 'Updates Posted', value: '45.2K+' },
];

export default function Home() {
  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold">
            Build in <span className="gradient-text">Public</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-400">
            Dev Studio is a members platform for developers who build in public. Create projects, share
            updates, track development progress, and grow your community from idea to launch.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 pt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" asChild>
              <Link href={ROUTES.PROJECTS}>
                Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={ROUTES.ACCESS}>Get Early Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gold">{stat.value}</p>
              <p className="text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold">Powerful Features</h2>
            <p className="mt-4 text-neutral-400">Everything you need to build, share, and succeed</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass p-6 space-y-4">
                  <Icon className="h-8 w-8 text-gold" />
                  <h3 className="font-serif text-xl font-bold">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass space-y-6 p-12 text-center">
          <h2 className="text-3xl font-serif font-bold">Ready to Build in Public?</h2>
          <p className="text-neutral-400">Join thousands of developers sharing their journey</p>
          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" asChild>
              <Link href={ROUTES.ACCESS}>Start Building</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={ROUTES.BUILDERS}>View Top Builders</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
