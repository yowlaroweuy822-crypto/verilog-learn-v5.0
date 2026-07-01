import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProgressState } from '../types';
import { emptyProgress, loadProgress, saveProgress, toggleDone } from '../lib/progress';

interface ProgressContextValue {
  progress: ProgressState;
  toggleItem: (key: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      return loadProgress();
    } catch {
      return emptyProgress();
    }
  });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      toggleItem: (key) => setProgress((current) => toggleDone(current, key)),
      resetProgress: () => setProgress(emptyProgress()),
    }),
    [progress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used within ProgressProvider');
  return value;
}
