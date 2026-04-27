'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatbotWidget = dynamic(() => import('./ChatbotWidget').then((module) => module.ChatbotWidget), {
  ssr: false
});

export function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return <ChatbotWidget />;
}
