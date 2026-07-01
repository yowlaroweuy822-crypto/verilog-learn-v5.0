export type LearningSection =
  | 'home'
  | 'tutorial'
  | 'micro'
  | 'exercise'
  | 'bug'
  | 'waveform'
  | 'project'
  | 'reference'
  | 'playground';

export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard';

export interface TutorialSection {
  title: string;
  html: string;
}

export interface TutorialChapter {
  id: string;
  icon: string;
  title: string;
  desc: string;
  sections: TutorialSection[];
}

export interface Exercise {
  id: string;
  title: string;
  level?: Difficulty;
  len: string;
  time: string;
  desc: string;
  iface: string;
  hints?: [string, string, string] | string[];
  answer: string;
  tb?: string;
  note?: string;
  part?: string;
}

export interface BugCase {
  id: string;
  title: string;
  desc: string;
  buggy: string;
  explanation: string;
  fix: string;
}

export interface WaveformCase {
  id: string;
  title: string;
  desc: string;
  svg: string;
  answer: string;
}

export interface ProjectStep extends Exercise {
  part: string;
}

export interface ReferenceTab {
  id: string;
  label: string;
  content: string;
}

export interface ProgressState {
  done: Record<string, true>;
}

export interface CodeCheckResult {
  moduleCount: number;
  assignCount: number;
  alwaysCount: number;
  warnings: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}
