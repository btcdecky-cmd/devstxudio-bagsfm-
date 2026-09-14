import { ArrowRight, BarChart3, Check, Code2, Layers3, MousePointerClick, ShieldCheck, Sparkles, Target, WalletCards, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const networkPillars = [
  { icon: Target, title: 'Reach the right builders', text: 'Contextual placements across projects, tools, updates, and developer communities.' },
  { icon: BarChart3, title: 'Measure real activity', text: 'Track delivery, clicks, conversions, and spend with reporting built for operators.' },
  { icon: WalletCards, title: 'Monetize your surface', text: 'Turn project pages, newsletters, and apps into carefully managed inventory.' },
];

const formats = ['Display banners', 'Native project cards', 'Featured launches', 'Newsletter sponsorships'];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-48 -top-40 h-[34rem] w-[34rem] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="eyebrow mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Dev Ads Network · Built for the Dev Studio ecosystem</div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">Build your audience. <span className="gradient-text">Advertise your product.</span> Monetize your reach.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-400">A developer-first advertising network for teams growing products and publishers turning trusted attention into sustainable revenue.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={ROUTES.DASHBOARD}><Button size="lg">Start a campaign <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href={ROUTES.PROJECTS}><Button size="lg" variant="outline">Explore the network</Button></Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-400" /> Moderated placements</span><span className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-400" /> First-party delivery</span></div>
          </div>
          <div className="glass relative p-4 shadow-2xl shadow-amber-950/20 sm:p-6">
            <div className="rounded-lg border border-white/10 bg-[#111]/90 p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-xs uppercase tracking-[.2em] text-neutral-500">Campaign cockpit</p><p className="mt-1 text-lg font-semibold text-white">Developer launch / Q3</p></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Active</span></div>
              <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-3"><div><p className="text-xs text-neutral-500">Impressions</p><p className="mt-1 text-2xl font-semibold text-white">284.6K</p><p className="text-xs text-emerald-300">+18.4%</p></div><div><p className="text-xs text-neutral-500">CTR</p><p className="mt-1 text-2xl font-semibold text-white">3.82%</p><p className="text-xs text-emerald-300">+0.64%</p></div><div><p className="text-xs text-neutral-500">Spend</p><p className="mt-1 text-2xl font-semibold text-white">$4,280</p><p className="text-xs text-neutral-500">of $8,000</p></div></div>
              <div className="rounded-lg border border-white/10 bg-white/[.03] p-4"><div className="flex items-center justify-between text-xs text-neutral-500"><span>Delivery pace</span><span>53.5%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[53.5%] rounded-full bg-gradient-to-r from-amber-500 to-yellow-200" /></div><div className="mt-5 flex items-center justify-between text-xs"><span className="text-neutral-400">4 placements live</span><span className="text-amber-300">View report →</span></div></div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-lg border border-white/10 bg-[#191919] px-4 py-3 shadow-xl sm:flex"><div className="rounded-md bg-emerald-400/10 p-2"><MousePointerClick className="h-4 w-4 text-emerald-300" /></div><div><p className="text-xs text-neutral-500">Verified conversions</p><p className="text-sm font-semibold text-white">1,842 this month</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.02]"><div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">{networkPillars.map(({ icon: Icon, title, text }) => <div key={title} className="border-b border-white/10 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"><Icon className="h-5 w-5 text-amber-300" /><h2 className="mt-4 text-xl font-semibold text-white">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">{text}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="eyebrow">One network, two ways to grow</p><h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">A better layer between great products and their audience.</h2></div><p className="max-w-xl text-lg leading-8 text-neutral-400">Dev Ads keeps paid discovery transparent and useful. Every sponsored surface is labeled, reviewed, and measured without compromising the organic Dev Studio experience.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2"><div className="glass p-7"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-300/10"><Sparkles className="h-5 w-5 text-amber-300" /></div><h3 className="mt-6 text-2xl font-semibold text-white">For advertisers</h3><p className="mt-3 text-neutral-400">Launch contextual campaigns that reach builders when they are researching, shipping, and choosing what to use next.</p><ul className="mt-6 space-y-3 text-sm text-neutral-300">{['Campaigns with reviewable targeting', 'Creative studio for copy variations', 'Performance reporting that teams can trust'].map((item) => <li key={item} className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul><Link className="mt-7 inline-flex items-center text-sm font-medium text-amber-300" href={ROUTES.DASHBOARD}>Open advertiser console <ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="glass p-7"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-400/10"><Layers3 className="h-5 w-5 text-blue-300" /></div><h3 className="mt-6 text-2xl font-semibold text-white">For publishers</h3><p className="mt-3 text-neutral-400">Turn your trusted project page, newsletter, or application into quality inventory with clear controls and earnings.</p><ul className="mt-6 space-y-3 text-sm text-neutral-300">{['Register and verify your properties', 'Choose formats and approve categories', 'See earnings and request payouts'].map((item) => <li key={item} className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul><Link className="mt-7 inline-flex items-center text-sm font-medium text-amber-300" href={ROUTES.ACCESS}>Become a publisher <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div></section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><div className="rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/[.12] via-white/[.03] to-transparent p-8 sm:p-12"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="eyebrow">Supported inventory</p><h2 className="mt-3 text-3xl font-semibold text-white">Make every placement count.</h2><p className="mt-3 max-w-xl text-neutral-400">Start with direct-sold and contextual inventory. Expand your mix as your audience and reporting mature.</p></div><div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">{formats.map((format) => <span key={format} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-neutral-300">{format}</span>)}</div></div></div></section>

      <section className="mx-auto max-w-4xl px-4 pb-24 text-center sm:px-6"><Code2 className="mx-auto h-7 w-7 text-amber-300" /><h2 className="mt-5 text-4xl font-semibold text-white">Build what people can discover.</h2><p className="mx-auto mt-4 max-w-2xl text-neutral-400">Dev Studio remains the home for organic project discovery, builder updates, and live ecosystem activity. Dev Ads adds a clearly labeled growth layer on top.</p><Link href={ROUTES.PROJECTS}><Button className="mt-8" size="lg">Explore Dev Studio <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></section>
    </div>
  );
}
