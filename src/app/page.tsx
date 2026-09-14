import {
  ArrowUpRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Compass,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const stats = [
  { value: '42M+', label: 'monthly developer impressions' },
  { value: '3.8%', label: 'average campaign CTR' },
  { value: '1,240+', label: 'verified publisher surfaces' },
];

const benefits = [
  { icon: Target, title: 'Reach with context', copy: 'Show up inside the projects, tools, and conversations your next customer already trusts.' },
  { icon: BarChart3, title: 'Measure what matters', copy: 'See delivery, attention, and outcomes in one clear workspace built for growth teams.' },
  { icon: CircleDollarSign, title: 'Grow sustainably', copy: 'Turn quality attention into revenue without sacrificing the experience that earned it.' },
];

const advertiserPoints = ['Intent-based audience targeting', 'Creative review before launch', 'Live pacing and conversion reporting'];
const publisherPoints = ['Simple inventory controls', 'Transparent earnings and payouts', 'Brand-safe campaigns only'];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/10">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-20 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="fade-in">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-gold-light">
              <span className="pulse-dot size-1.5 rounded-full bg-emerald-300" /> The developer growth network
            </div>
            <h1 className="max-w-4xl text-[3.35rem] font-semibold leading-[.98] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.65rem]">Turn attention into <span className="gradient-text">momentum.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-400 sm:text-lg">Dev Ads connects ambitious products with the developer audiences that move markets—and gives trusted publishers a better way to grow.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={ROUTES.DASHBOARD}><Button size="lg" className="h-12 px-6">Start growing <ArrowUpRight data-icon="inline-end" /></Button></Link>
              <Link href={ROUTES.ACCESS}><Button size="lg" variant="outline" className="h-12 px-6">Get publisher access</Button></Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-neutral-500"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Reviewed placements</span><span className="flex items-center gap-2"><Zap className="size-4 text-gold" /> First-party reporting</span></div>
          </div>

          <div className="relative fade-in [animation-delay:120ms]">
            <div className="dashboard-card relative overflow-hidden rounded-2xl border border-white/15 bg-[#111318]/95 p-4 shadow-2xl shadow-black/50 sm:p-6">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative flex items-start justify-between border-b border-white/10 pb-5"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-neutral-500">Campaign overview</p><p className="mt-2 text-lg font-semibold text-white">Developer launch</p></div><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">Live</span></div>
              <div className="relative grid grid-cols-2 gap-5 py-6 sm:grid-cols-3"><div><p className="text-xs text-neutral-500">Impressions</p><p className="mt-2 text-2xl font-semibold tracking-tight text-white">284.6K</p><p className="mt-1 text-xs text-emerald-300">+18.4%</p></div><div><p className="text-xs text-neutral-500">Engagement</p><p className="mt-2 text-2xl font-semibold tracking-tight text-white">3.82%</p><p className="mt-1 text-xs text-emerald-300">+0.64%</p></div><div className="col-span-2 sm:col-span-1"><p className="text-xs text-neutral-500">Budget used</p><p className="mt-2 text-2xl font-semibold tracking-tight text-white">53.5%</p><p className="mt-1 text-xs text-neutral-500">$4,280 of $8,000</p></div></div>
              <div className="relative rounded-xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-center justify-between text-xs text-neutral-500"><span>Delivery pace</span><span className="text-neutral-300">On track</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[53.5%] rounded-full bg-gradient-to-r from-gold to-gold-light" /></div><div className="mt-5 flex items-center justify-between text-xs"><span className="text-neutral-400">4 placements live</span><span className="flex items-center gap-1 text-gold-light">View report <ArrowUpRight className="size-3" /></span></div></div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#1b1d22] px-4 py-3 shadow-xl sm:flex"><div className="rounded-lg bg-emerald-300/10 p-2.5"><MousePointer2 className="size-4 text-emerald-300" /></div><div><p className="text-[10px] uppercase tracking-wider text-neutral-500">Verified conversions</p><p className="mt-1 text-sm font-semibold text-white">1,842 this month</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[.025]"><div className="mx-auto grid max-w-7xl grid-cols-1 px-4 sm:px-6 md:grid-cols-3 lg:px-8">{stats.map((stat) => <div key={stat.label} className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><p className="text-3xl font-semibold tracking-tight text-white">{stat.value}</p><p className="mt-1 text-xs uppercase tracking-[.12em] text-neutral-500">{stat.label}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="max-w-2xl"><p className="eyebrow">Why Dev Ads</p><h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">A smarter layer between great products and their audience.</h2><p className="mt-5 text-lg leading-8 text-neutral-400">Paid discovery should feel as thoughtful as the products it supports. We make it relevant, measurable, and respectful by design.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{benefits.map(({ icon: Icon, title, copy }, index) => <article key={title} className="card-hover rounded-2xl border border-white/10 bg-white/[.035] p-6"><div className="flex items-center justify-between"><div className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold"><Icon className="size-5" /></div><span className="text-xs text-neutral-600">0{index + 1}</span></div><h3 className="mt-7 text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-neutral-400">{copy}</p></article>)}</div></section>

      <section className="border-y border-white/10 bg-[#0d0f13]"><div className="mx-auto grid max-w-7xl md:grid-cols-2"><div className="border-b border-white/10 p-8 sm:p-12 md:border-b-0 md:border-r lg:p-16"><div className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold"><TrendingUp className="size-5" /></div><p className="eyebrow mt-8">For advertisers</p><h2 className="mt-3 text-3xl font-semibold text-white">Put your product in the right conversation.</h2><p className="mt-4 leading-7 text-neutral-400">Reach builders while they are learning, comparing, and ready to make their next decision.</p><ul className="mt-7 flex flex-col gap-3 text-sm text-neutral-300">{advertiserPoints.map((point) => <li key={point} className="flex items-center gap-3"><Check className="size-4 text-emerald-300" />{point}</li>)}</ul><Link href={ROUTES.DASHBOARD} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">Open advertiser console <ArrowUpRight className="size-4" /></Link></div><div className="p-8 sm:p-12 lg:p-16"><div className="flex size-11 items-center justify-center rounded-xl bg-blue-300/10 text-blue-300"><Users className="size-5" /></div><p className="eyebrow mt-8">For publishers</p><h2 className="mt-3 text-3xl font-semibold text-white">Make your audience work harder for you.</h2><p className="mt-4 leading-7 text-neutral-400">Choose the brands your community sees and turn your best surfaces into dependable revenue.</p><ul className="mt-7 flex flex-col gap-3 text-sm text-neutral-300">{publisherPoints.map((point) => <li key={point} className="flex items-center gap-3"><Check className="size-4 text-emerald-300" />{point}</li>)}</ul><Link href={ROUTES.ACCESS} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">Apply for access <ArrowUpRight className="size-4" /></Link></div></div></section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold"><Compass className="size-5" /></div><h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Build what people can discover.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-400">Your next customer is already exploring. Give them a better path from curiosity to action.</p><Link href={ROUTES.PROJECTS}><Button size="lg" className="mt-8">Explore the network <ArrowUpRight data-icon="inline-end" /></Button></Link></section>
    </main>
  );
}
