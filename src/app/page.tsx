'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AuthGate } from '@/components/AuthGate';
import { ChatContainer } from '@/components/chat';
import { StatsPanel, MobileStats } from '@/components/stats';
import { getStorageData, updateStreak } from '@/lib/storage';

export default function Home() {
  const [messages, setMessages] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load initial stats from localStorage
  useEffect(() => {
    const data = getStorageData();
    setMessages(data.messages);

    // Update streak on load (handles new day logic)
    const { streak: currentStreak } = updateStreak();
    setStreak(currentStreak);

    setIsHydrated(true);
  }, []);

  // Callback when message is sent
  const handleMessageSent = (newMessageCount: number, newStreak: number) => {
    setMessages(newMessageCount);
    setStreak(newStreak);
  };

  // Don't render stats until hydrated to avoid mismatch
  if (!isHydrated) {
    return (
      <main className="flex flex-col h-screen bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <AuthGate>
      <main className="flex flex-col h-screen bg-background">
        <Header />

        {/* Mobile stats bar */}
        <div className="md:hidden">
          <MobileStats messages={messages} streak={streak} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            <ChatContainer onMessageSent={handleMessageSent} />
          </div>

          {/* Desktop stats panel */}
          <aside className="hidden md:block w-72 lg:w-80 border-l border-border p-4 overflow-y-auto bg-background">
            <StatsPanel messages={messages} streak={streak} />
          </aside>
        </div>
      </main>
    </AuthGate>
  );
}
