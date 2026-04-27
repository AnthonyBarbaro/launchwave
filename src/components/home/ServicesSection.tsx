'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { services } from '@/data/services';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function ServicesSection() {
  return (
    <Section
      description="Your website should not just look good. It should capture leads, qualify prospects, and show you what is working."
      eyebrow="Services"
      id="services"
      title="Website, AI, SEO, and automation systems built to sell"
    >
      <motion.div
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {services.map((service) => (
          <motion.div key={service.slug} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <Link href={`/services/${service.slug}`}>
              <Card className="group h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-glow">
                <service.icon aria-hidden className="h-8 w-8 text-accent" />
                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore service
                  <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-lg border border-accent/25 bg-accent/10 p-5 md:flex-row md:items-center">
        <div className="flex gap-3">
          <FileCheck2 aria-hidden className="mt-1 h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="font-bold">Free 48-Hour Website Launch Checklist</h3>
            <p className="mt-1 text-sm text-muted">Get the essentials for copy, design, forms, SEO, analytics, and launch QA.</p>
          </div>
        </div>
        <Button href="/contact#contact-form" location="lead_magnet" variant="secondary">
          Get the Checklist
        </Button>
      </div>
    </Section>
  );
}
