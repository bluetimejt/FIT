'use client';

import { Flame, MessageCircle } from 'lucide-react';
import { getRankByMessages } from '@/lib/gamification';

interface MobileStatsProps {
  messages: number;
  streak: number;
}

export function MobileStats({ messages, streak }: MobileStatsProps) {
  const rank = getRankByMessages(messages);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
      {/* Rank badge */}
      <div className="flex items-center gap-2">
        <span className="text-lg">{rank.emoji}</span>
        <span className="text-sm font-medium text-foreground">{rank.name}</span>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-foreground">{streak}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{messages}</span>
        </div>
      </div>
    </div>
  );
}
