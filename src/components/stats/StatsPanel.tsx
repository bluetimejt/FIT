'use client';

import { LevelProgress } from './LevelProgress';
import { StreakCounter } from './StreakCounter';
import { Card } from '@/components/ui/card';

interface StatsPanelProps {
  messages: number;
  streak: number;
}

export function StatsPanel({ messages, streak }: StatsPanelProps) {
  return (
    <Card className="p-5 space-y-5 bg-card border-border">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        Your Progress
      </div>

      <LevelProgress messages={messages} />

      <div className="border-t border-border pt-4">
        <StreakCounter streak={streak} totalMessages={messages} />
      </div>

      {/* Motivational tip */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <span className="text-foreground/80">Tip:</span> Check in daily with your coach to maintain your streak and unlock new ranks!
        </p>
      </div>
    </Card>
  );
}
