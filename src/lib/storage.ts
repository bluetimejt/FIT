import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  MESSAGES: 'fit_messages',
  STREAK: 'fit_streak',
  LAST_ACTIVE: 'fit_last_active',
  SESSION_ID: 'fit_session_id',
} as const;

export interface StorageData {
  messages: number;
  streak: number;
  lastActive: string | null;
  sessionId: string;
}

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getStorageData(): StorageData {
  if (!isClient()) {
    return {
      messages: 0,
      streak: 0,
      lastActive: null,
      sessionId: '',
    };
  }

  return {
    messages: parseInt(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '0', 10),
    streak: parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10),
    lastActive: localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE),
    sessionId: getOrCreateSessionId(),
  };
}

export function getOrCreateSessionId(): string {
  if (!isClient()) return '';

  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
}

export function incrementMessages(): number {
  if (!isClient()) return 0;

  const current = parseInt(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '0', 10);
  const newCount = current + 1;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, newCount.toString());
  return newCount;
}

export function updateStreak(): { streak: number; isNewDay: boolean } {
  if (!isClient()) return { streak: 0, isNewDay: false };

  const today = new Date().toDateString();
  const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
  let streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0', 10);
  let isNewDay = false;

  if (!lastActive) {
    // First time user
    streak = 1;
    isNewDay = true;
  } else if (lastActive === today) {
    // Same day, no change
    isNewDay = false;
  } else {
    const lastDate = new Date(lastActive);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      streak += 1;
      isNewDay = true;
    } else if (diffDays > 1) {
      // Streak broken
      streak = 1;
      isNewDay = true;
    }
  }

  localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, today);

  return { streak, isNewDay };
}

export function resetStorage(): void {
  if (!isClient()) return;

  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.STREAK);
  localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVE);
  // Keep session ID for conversation continuity
}
