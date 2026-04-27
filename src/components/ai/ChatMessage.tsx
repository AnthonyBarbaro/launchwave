type ChatMessageProps = {
  role: 'assistant' | 'user';
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
          isUser ? 'bg-accent text-white' : 'border border-border/20 bg-background/70 text-foreground'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
