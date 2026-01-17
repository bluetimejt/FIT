'use client';

import { getRankByMessages, getNextRank, getProgressToNextRank, Rank } from '@/lib/gamification';

interface LevelProgressProps {
  messages: number;
}

export function LevelProgress({ messages }: LevelProgressProps) {
  const currentRank = getRankByMessages(messages);
  const nextRank = getNextRank(currentRank);
  const progress = getProgressToNextRank(messages);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Level
        </span>
        <span className="text-xs text-muted-foreground">
          {nextRank ? `${progress.current}/${progress.required}` : 'MAX'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">{currentRank.emoji}</span>
        <div className="flex-1">
          <div className="text-lg font-semibold text-foreground">
            {currentRank.name}
          </div>
          {nextRank && (
            <div className="text-xs text-muted-foreground">
              Next: {nextRank.name}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
    </div>
  );
}
