'use client';

import { Dumbbell } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Dumbbell className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">
          F.I.T.
        </h1>
        <p className="text-xs text-muted-foreground">
          Fitness Intensity Trainer
        </p>
      </div>
    </header>
  );
}
