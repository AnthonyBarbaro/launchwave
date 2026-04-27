'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

type LeadCaptureFormProps = {
  onSubmit: (lead: { name?: string; email?: string }) => void;
};

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ name, email });
  }

  return (
    <form className="grid gap-2 rounded-lg border border-border/20 bg-background/60 p-3" onSubmit={submit}>
      <label className="sr-only" htmlFor="chat-lead-name">
        Name
      </label>
      <input
        className="rounded-md border border-border/25 bg-panel px-3 py-2 text-sm"
        id="chat-lead-name"
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        value={name}
      />
      <label className="sr-only" htmlFor="chat-lead-email">
        Email
      </label>
      <input
        className="rounded-md border border-border/25 bg-panel px-3 py-2 text-sm"
        id="chat-lead-email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        type="email"
        value={email}
      />
      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white" type="submit">
        Share contact
        <Send aria-hidden className="h-4 w-4" />
      </button>
    </form>
  );
}
