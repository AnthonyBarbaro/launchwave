'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { services } from '@/data/services';
import { postToApi } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';

type ContactState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  timeline: string;
  selectedService: string;
  message: string;
  hp: string;
};

const initialState: ContactState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  budget: '',
  timeline: '',
  selectedService: '',
  message: '',
  hp: ''
};

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const update = (field: keyof ContactState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await postToApi('/contact', form);
      trackEvent('contact_submit', {
        selectedService: form.selectedService,
        budget: form.budget,
        timeline: form.timeline
      });
      setStatus('success');
      setForm(initialState);
    } catch (submitError) {
      setStatus('error');
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your message.');
    }
  }

  return (
    <form
      className="grid gap-5 rounded-lg border border-border/20 bg-panel/70 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8"
      id="contact-form"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required value={form.name} onChange={(value) => update('name', value)} />
        <Field
          label="Email"
          name="email"
          required
          type="email"
          value={form.email}
          onChange={(value) => update('email', value)}
        />
        <Field label="Phone" name="phone" value={form.phone} onChange={(value) => update('phone', value)} />
        <Field label="Company" name="company" value={form.company} onChange={(value) => update('company', value)} />
        <Field label="Website" name="website" type="url" value={form.website} onChange={(value) => update('website', value)} />
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Budget range
          <select
            className="rounded-md border border-border/25 bg-background/70 px-3 py-3 text-sm text-foreground"
            value={form.budget}
            onChange={(event) => update('budget', event.target.value)}
          >
            <option value="">Select a range</option>
            <option value="$2k-$5k">$2k-$5k</option>
            <option value="$5k-$10k">$5k-$10k</option>
            <option value="$10k-$15k">$10k-$15k</option>
            <option value="$15k+">$15k+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Timeline
          <select
            className="rounded-md border border-border/25 bg-background/70 px-3 py-3 text-sm text-foreground"
            value={form.timeline}
            onChange={(event) => update('timeline', event.target.value)}
          >
            <option value="">Select a timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="Next quarter">Next quarter</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-foreground">
        Service
        <select
          className="rounded-md border border-border/25 bg-background/70 px-3 py-3 text-sm text-foreground"
          value={form.selectedService}
          onChange={(event) => update('selectedService', event.target.value)}
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-foreground">
        What are you trying to launch or improve?
        <textarea
          className="min-h-32 rounded-md border border-border/25 bg-background/70 px-3 py-3 text-sm text-foreground placeholder:text-muted"
          maxLength={1800}
          onChange={(event) => update('message', event.target.value)}
          placeholder="Tell us about your website, goals, services, timeline, and what would make this project a win."
          required
          value={form.message}
        />
      </label>

      <label className="hidden" htmlFor="contact-hp">
        Leave this field empty
      </label>
      <input
        className="hidden"
        id="contact-hp"
        onChange={(event) => update('hp', event.target.value)}
        tabIndex={-1}
        type="text"
        value={form.hp}
      />

      {status === 'error' && (
        <p className="rounded-md border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      {status === 'success' && (
        <p className="flex items-center gap-2 rounded-md border border-accent/35 bg-accent/10 px-4 py-3 text-sm text-accent" role="status">
          <CheckCircle2 aria-hidden className="h-4 w-4" />
          Message sent. We will review your goals and follow up with the best next step.
        </p>
      )}

      <button
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/70 bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/90 disabled:opacity-60"
        disabled={status === 'loading'}
        type="submit"
      >
        {status === 'loading' ? 'Sending...' : 'Start My 48-Hour Launch'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground" htmlFor={`contact-${name}`}>
      {label}
      <input
        autoComplete={name === 'email' ? 'email' : name}
        className="rounded-md border border-border/25 bg-background/70 px-3 py-3 text-sm text-foreground placeholder:text-muted"
        id={`contact-${name}`}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}
