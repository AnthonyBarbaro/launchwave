'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { postToApi } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';

type NewsletterFormProps = {
  source: string;
  compact?: boolean;
};

export function NewsletterForm({ source, compact }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await postToApi('/newsletter', { email, source, hp });
      setStatus('success');
      setMessage('You are on the list.');
      setEmail('');
      trackEvent('newsletter_signup', { source });
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <form className={compact ? 'space-y-3' : 'mx-auto max-w-xl space-y-3'} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
        Email address
      </label>
      <input
        autoComplete="email"
        className="w-full rounded-full border border-border/25 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent"
        id={`newsletter-email-${source}`}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        required
        type="email"
        value={email}
      />
      <label className="hidden" htmlFor={`newsletter-hp-${source}`}>
        Leave this field empty
      </label>
      <input
        className="hidden"
        id={`newsletter-hp-${source}`}
        onChange={(event) => setHp(event.target.value)}
        tabIndex={-1}
        type="text"
        value={hp}
      />
      <button
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-accent/70 bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/90 disabled:opacity-60"
        disabled={status === 'loading'}
        type="submit"
      >
        {status === 'loading' ? 'Joining...' : 'Get the Checklist'}
        <Send aria-hidden className="h-4 w-4" />
      </button>
      {message && (
        <p className={status === 'error' ? 'text-sm text-red-300' : 'text-sm text-accent'} role="status">
          {message}
        </p>
      )}
    </form>
  );
}
