'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Section } from '@/components/ui/Section';

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <Section eyebrow="FAQ" title="Questions before your launch">
      <div className="mx-auto grid max-w-4xl gap-3">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div className="rounded-lg border border-border/20 bg-panel/60" key={faq.question}>
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                onClick={() => setOpen(isOpen ? -1 : index)}
                type="button"
              >
                {faq.question}
                <ChevronDown aria-hidden className={`h-5 w-5 shrink-0 text-accent transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    animate={{ height: 'auto', opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                  >
                    <p className="px-5 pb-5 text-sm leading-7 text-muted">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
