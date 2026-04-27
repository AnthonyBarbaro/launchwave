'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Calendar, MessageCircle, X } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { apiBaseUrl, getSessionId, postToApi } from '@/lib/api';
import { trackChatOpen, trackEvent, trackLeadQualified } from '@/lib/analytics';
import { ChatMessage } from './ChatMessage';
import { LeadCaptureForm } from './LeadCaptureForm';

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

type LeadProfile = Record<string, string | string[] | number | undefined>;

type ChatResponse = {
  reply: string;
  leadProfile?: LeadProfile;
  leadScore?: number;
  recommendedPackage?: string;
  nextStep?: string;
  shouldShowBookingCta?: boolean;
};

const starterMessage =
  'Hi, I’m the AI Growth Assistant. I can help map the right website, SEO, AI, or automation path. What kind of business are you growing?';

const quickReplies = [
  'I need a new website fast',
  'I want more qualified leads',
  'I need AI chat and automations',
  'I want SEO pages that rank'
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [leadProfile, setLeadProfile] = useState<LeadProfile>({});
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: starterMessage }]);
  const [bookingCta, setBookingCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessionId = useMemo(() => getSessionId(), []);

  useEffect(() => {
    const openChat = () => {
      setOpen(true);
      trackChatOpen();
    };

    window.addEventListener('launchwave:open-chat', openChat);
    return () => window.removeEventListener('launchwave:open-chat', openChat);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function toggleOpen() {
    setOpen((current) => {
      const next = !current;
      if (next) trackChatOpen();
      return next;
    });
  }

  async function submitMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || typing) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setTyping(true);
    trackEvent('chat_message_sent', { length: trimmed.length });

    try {
      if (!apiBaseUrl) {
        throw new Error('API endpoint not configured.');
      }

      const response = await postToApi<ChatResponse>('/chat', {
        sessionId,
        messages: nextMessages,
        leadProfile,
        pageUrl: window.location.href
      });

      setMessages((current) => [...current, { role: 'assistant', content: response.reply }]);
      if (response.leadProfile) setLeadProfile(response.leadProfile);
      if (typeof response.leadScore === 'number') trackLeadQualified(response.leadScore);
      if (response.shouldShowBookingCta) setBookingCta(true);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'I can help qualify your project once the API endpoint is connected. For now, tell us your goals on the contact form and we’ll recommend the best next step.'
        }
      ]);
      setBookingCta(true);
    } finally {
      setTyping(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-4 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-lg border border-border/25 bg-panel/95 shadow-2xl backdrop-blur-xl"
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-border/20 p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Bot aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">AI Growth Assistant</p>
                  <p className="text-xs text-muted">Qualifies fit, timeline, and next step</p>
                </div>
              </div>
              <button
                aria-label="Close chatbot"
                className="rounded-full p-2 text-muted transition hover:bg-accent/10 hover:text-foreground"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4" ref={scrollRef}>
              {messages.map((message, index) => (
                <ChatMessage content={message.content} key={`${message.role}-${index}-${message.content.slice(0, 16)}`} role={message.role} />
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-border/20 bg-background/70 px-4 py-3 text-sm text-muted">
                    Typing...
                  </div>
                </div>
              )}
              {messages.length > 2 && (
                <LeadCaptureForm
                  onSubmit={(lead) => {
                    setLeadProfile((current) => ({ ...current, ...lead }));
                    setMessages((current) => [
                      ...current,
                      { role: 'assistant', content: 'Thanks. I’ll include that with the project context and recommend the cleanest next step.' }
                    ]);
                  }}
                />
              )}
            </div>

            {bookingCta && (
              <div className="border-t border-border/20 p-3">
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-glow"
                  href={siteConfig.bookingUrl || '/contact#contact-form'}
                >
                  <Calendar aria-hidden className="h-4 w-4" />
                  Book a Free Strategy Call
                </a>
              </div>
            )}

            <div className="border-t border-border/20 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    className="rounded-full border border-border/25 px-3 py-1.5 text-xs text-muted transition hover:border-accent/60 hover:text-foreground"
                    key={reply}
                    onClick={() => submitMessage(reply)}
                    type="button"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form className="flex gap-2" onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="chat-input">
                  Send a message
                </label>
                <input
                  className="min-w-0 flex-1 rounded-full border border-border/25 bg-background/70 px-4 py-3 text-sm"
                  id="chat-input"
                  maxLength={700}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tell me what you want to grow..."
                  value={input}
                />
                <button className="rounded-full bg-accent px-4 text-sm font-semibold text-white" disabled={typing} type="submit">
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? 'Close AI Growth Assistant' : 'Open AI Growth Assistant'}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-glow"
        onClick={toggleOpen}
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X aria-hidden className="h-6 w-6" /> : <MessageCircle aria-hidden className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
