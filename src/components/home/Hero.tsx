'use client';

import { motion } from 'framer-motion';
import { Bot, Gauge, LineChart, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GrowthChart } from '@/components/visuals/GrowthChart';
import { MetricCard } from '@/components/visuals/MetricCard';
import { siteConfig } from '@/config/site';

const floatingCards = [
  { label: 'AI Lead Qualification', icon: Bot },
  { label: 'SEO Growth Engine', icon: LineChart },
  { label: 'Conversion Tracking', icon: Gauge },
  { label: '48-Hour Launch', icon: Rocket }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} transition={{ duration: 0.5 }}>
            <Badge>Conversion-ready in less than 48 hours</Badge>
          </motion.div>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.08, duration: 0.55 }}
          >
            Launch a Website That Gets Leads in Less Than 48 Hours
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.16, duration: 0.55 }}
          >
            We build high-converting websites, AI chatbots, automations, and SEO growth systems for businesses that want more calls, more leads, and more revenue.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.24, duration: 0.55 }}
          >
            <Button href={siteConfig.bookingUrl || '/contact#contact-form'} location="hero_primary">
              Book a Free Strategy Call
            </Button>
            <Button href="#process" location="hero_secondary" variant="secondary">
              See How It Works
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.18, duration: 0.6 }}
        >
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Example growth model</p>
                <p className="text-xs text-muted">Demo data for illustration only</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Live dashboard</span>
            </div>
            <GrowthChart />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <MetricCard label="Revenue lift" note="Modeled" value="+38%" />
              <MetricCard label="Lead quality" note="Scored" value="82/100" />
              <MetricCard label="Launch" note="Path" value="48h" />
            </div>
          </Card>

          <div className="pointer-events-none absolute -left-5 -top-6 hidden grid-cols-1 gap-3 md:grid">
            {floatingCards.slice(0, 2).map((item, index) => (
              <FloatingCard delay={index * 0.12} icon={item.icon} key={item.label} label={item.label} />
            ))}
          </div>
          <div className="pointer-events-none absolute -bottom-5 -right-5 hidden grid-cols-1 gap-3 md:grid">
            {floatingCards.slice(2).map((item, index) => (
              <FloatingCard delay={0.22 + index * 0.12} icon={item.icon} key={item.label} label={item.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ label, icon: Icon, delay }: { label: string; icon: typeof Bot; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0], opacity: 1 }}
      className="flex items-center gap-2 rounded-full border border-border/25 bg-panel/80 px-3 py-2 text-sm shadow-2xl backdrop-blur-xl"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay, duration: 4, repeat: Infinity, repeatType: 'mirror' }}
    >
      <Icon aria-hidden className="h-4 w-4 text-accent" />
      {label}
    </motion.div>
  );
}
