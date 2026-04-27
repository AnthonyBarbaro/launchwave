'use client';

import { Bot, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const questions = [
  'What kind of business do you run?',
  'Do you need a new site or redesign?',
  'What is your timeline?',
  'What is your budget range?',
  'Do you want AI chat, SEO, automations, or analytics?'
];

export function AiPreview() {
  return (
    <Section
      description="Let your website ask the right questions before you ever get on the phone."
      eyebrow="AI lead systems"
      title="Qualify prospects while your team stays focused"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-3xl font-bold">The AI Growth Assistant guides visitors from curiosity to next step.</h3>
          <p className="mt-5 leading-8 text-muted">
            It captures project context, identifies the strongest service fit, scores the lead, and recommends a clear action without blocking the page.
          </p>
          <div className="mt-7">
            <Button
              location="ai_preview"
              onClick={() => window.dispatchEvent(new Event('launchwave:open-chat'))}
            >
              Try the AI Growth Assistant
            </Button>
          </div>
        </div>
        <Card className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Bot aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">Lead qualification flow</p>
              <p className="text-xs text-muted">Example questions</p>
            </div>
          </div>
          <div className="grid gap-3">
            {questions.map((question) => (
              <div className="flex items-start gap-3 rounded-lg border border-border/20 bg-background/45 p-4" key={question}>
                <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-6 text-muted">{question}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
