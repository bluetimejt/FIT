export interface Rank {
  level: number;
  name: string;
  minMessages: number;
  maxMessages: number;
  emoji: string;
}

export const RANKS: Rank[] = [
  { level: 1, name: 'Rookie', minMessages: 0, maxMessages: 9, emoji: '🌱' },
  { level: 2, name: 'Regular', minMessages: 10, maxMessages: 19, emoji: '💪' },
  { level: 3, name: 'Athlete', minMessages: 20, maxMessages: 29, emoji: '🏃' },
  { level: 4, name: 'Pro', minMessages: 30, maxMessages: 39, emoji: '⚡' },
  { level: 5, name: 'Champion', minMessages: 40, maxMessages: 49, emoji: '🏆' },
  { level: 6, name: 'Legend', minMessages: 50, maxMessages: Infinity, emoji: '👑' },
];

export function getRankByMessages(messages: number): Rank {
  for (const rank of RANKS) {
    if (messages >= rank.minMessages && messages <= rank.maxMessages) {
      return rank;
    }
  }
  return RANKS[RANKS.length - 1]; // Default to Legend if somehow above
}

export function getNextRank(currentRank: Rank): Rank | null {
  const nextIndex = RANKS.findIndex((r) => r.level === currentRank.level) + 1;
  if (nextIndex >= RANKS.length) {
    return null; // Already at max rank
  }
  return RANKS[nextIndex];
}

export function getProgressToNextRank(messages: number): {
  current: number;
  required: number;
  percentage: number;
} {
  const currentRank = getRankByMessages(messages);
  const nextRank = getNextRank(currentRank);

  if (!nextRank) {
    // Already at max rank
    return { current: messages, required: messages, percentage: 100 };
  }

  const messagesInCurrentRank = messages - currentRank.minMessages;
  const messagesNeededForRank = nextRank.minMessages - currentRank.minMessages;
  const percentage = Math.min(
    100,
    Math.round((messagesInCurrentRank / messagesNeededForRank) * 100)
  );

  return {
    current: messagesInCurrentRank,
    required: messagesNeededForRank,
    percentage,
  };
}

export function checkLevelUp(
  previousMessages: number,
  newMessages: number
): Rank | null {
  const previousRank = getRankByMessages(previousMessages);
  const newRank = getRankByMessages(newMessages);

  if (newRank.level > previousRank.level) {
    return newRank;
  }
  return null;
}
