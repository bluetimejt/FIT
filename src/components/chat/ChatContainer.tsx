'use client';

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message } from './MessageBubble';
import { getOrCreateSessionId, incrementMessages, updateStreak, getStorageData } from '@/lib/storage';
import { getRankByMessages, checkLevelUp } from '@/lib/gamification';

interface ChatContainerProps {
  onMessageSent?: (newMessageCount: number, newStreak: number) => void;
}

export function ChatContainer({ onMessageSent }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, sessionId }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to get response');
        }

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Update gamification
        const previousCount = getStorageData().messages;
        const newCount = incrementMessages();
        const { streak } = updateStreak();

        // Check for level up
        const levelUp = checkLevelUp(previousCount, newCount);
        if (levelUp) {
          toast.success(`🎉 You've reached ${levelUp.name} rank!`, {
            description: `${levelUp.emoji} Keep up the great work!`,
            duration: 4000,
          });
        }

        // Notify parent of updated stats
        onMessageSent?.(newCount, streak);
      } catch (error) {
        console.error('Chat error:', error);
        toast.error('Failed to get response', {
          description: 'Please try again in a moment.',
        });

        // Remove the user message on error
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, onMessageSent]
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <MessageList messages={messages} isLoading={isLoading} onStarterClick={sendMessage} />
      <ChatInput onSend={sendMessage} disabled={isLoading || !sessionId} />
    </div>
  );
}
