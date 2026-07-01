import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface UiState {
  dark: boolean;
  expanded: Record<string, boolean>;
  playgroundCode: string;
}

interface UiContextValue extends UiState {
  toggleDark: () => void;
  toggleExpanded: (key: string) => void;
  isExpanded: (key: string) => boolean;
  setPlaygroundCode: (code: string) => void;
}

const STORAGE_KEY = 'veriloglearn_ui_v1';
const defaultState: UiState = { dark: false, expanded: {}, playgroundCode: '' };

const UiContext = createContext<UiContextValue | undefined>(undefined);

function loadInitialState(): UiState {
  if (typeof localStorage === 'undefined') return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch {
    /* ignore */
  }
  // 没有存储过时，跟随系统偏好
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return { ...defaultState, dark: true };
  }
  return defaultState;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UiState>(loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.body.classList.toggle('dark', state.dark);
  }, [state]);

  const value = useMemo<UiContextValue>(() => ({
    ...state,
    toggleDark: () => setState((s) => ({ ...s, dark: !s.dark })),
    toggleExpanded: (key) => setState((s) => ({ ...s, expanded: { ...s.expanded, [key]: !s.expanded[key] } })),
    isExpanded: (key) => Boolean(state.expanded[key]),
    setPlaygroundCode: (code) => setState((s) => ({ ...s, playgroundCode: code })),
  }), [state]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const value = useContext(UiContext);
  if (!value) throw new Error('useUi must be used within UiProvider');
  return value;
}
