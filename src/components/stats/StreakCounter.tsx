'use client';

import { Flame, MessageCircle } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  totalMessages: number;
}

export function StreakCounter({ streak, totalMessages }: StreakCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Streak */}
      <div className="bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Flame className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <div className="text-lg font-semibold text-foreground">{streak}</div>
          <div className="text-xs text-muted-foreground">Day streak</div>
        </div>
      </div>

      {/* Total messages */}
      <div className="bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-lg font-semibold text-foreground">
            {totalMessages}
          </div>
          <div className="text-xs text-muted-foreground">Total chats</div>
        </div>
      </div>
    </div>
  );
}
