'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble, Message } from './MessageBubble';
import { Loader2 } from 'lucide-react';

const STARTER_QUESTIONS = [
  'Create a 30-minute HIIT workout',
  'What should I eat after working out?',
  'How do I stay motivated to exercise?',
  'Design a beginner strength routine',
];

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onStarterClick?: (question: string) => void;
}

export function MessageList({ messages, isLoading, onStarterClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="text-4xl mb-4">💪</div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Welcome to F.I.T.
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Your personal Fitness Intensity Trainer is ready. Ask about workouts,
            nutrition, or get motivated to reach your goals!
          </p>

          {/* Starter questions */}
          <div className="w-full max-w-md space-y-2">
            {STARTER_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => onStarterClick?.(question)}
                className="w-full text-left px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground hover:bg-secondary hover:border-primary/50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Coach is thinking...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
