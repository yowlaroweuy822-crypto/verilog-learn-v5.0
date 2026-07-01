import {
  BUGS,
  EXERCISES,
  MICRO_EXERCISES,
  PROJECTS,
  TUTORIALS,
  WAVEFORMS,
} from '../content';
import type { LearningSection, ProgressState } from '../types';
import { itemKey, routeFor, type TrackableSection } from './keys';

export const STORAGE_KEY = 'veriloglearn_progress_v1';
const LEGACY_STORAGE_KEY = 'vl_state';

export interface LearningTarget {
  section: TrackableSection;
  id: string;
  sub?: number;
  title: string;
  path: string;
  key: string;
}

export function emptyProgress(): ProgressState {
  return { done: {} };
}

export function toggleDone(progress: ProgressState, key: string): ProgressState {
  const done = { ...progress.done };
  if (done[key]) {
    delete done[key];
  } else {
    done[key] = true;
  }
  return { done };
}

export function isDone(progress: ProgressState, key: string): boolean {
  return Boolean(progress.done[key]);
}

export function allLearningTargets(): LearningTarget[] {
  const targets: LearningTarget[] = [];

  MICRO_EXERCISES.forEach((exercise) => {
    targets.push(target('micro', exercise.id, exercise.title));
  });

  TUTORIALS.forEach((chapter) => {
    chapter.sections.forEach((section, index) => {
      targets.push(target('tutorial', chapter.id, `${chapter.title} · ${section.title}`, index));
    });
  });

  EXERCISES.forEach((exercise) => {
    targets.push(target('exercise', exercise.id, exercise.title));
  });

  BUGS.forEach((bug) => {
    targets.push(target('bug', bug.id, bug.title));
  });

  WAVEFORMS.forEach((waveform) => {
    targets.push(target('waveform', waveform.id, waveform.title));
  });

  PROJECTS.forEach((project) => {
    targets.push(target('project', project.id, `${project.part} ${project.title}`));
  });

  return targets;
}

export function totalItems(): number {
  return allLearningTargets().length;
}

export function doneCount(progress: ProgressState): number {
  const validKeys = new Set(allLearningTargets().map((entry) => entry.key));
  return Object.keys(progress.done).filter((key) => validKeys.has(key)).length;
}

export function progressPercent(progress: ProgressState): number {
  const total = totalItems();
  return total === 0 ? 0 : Math.round((doneCount(progress) / total) * 100);
}

export function getNextLearningTarget(progress: ProgressState): LearningTarget {
  return allLearningTargets().find((entry) => !progress.done[entry.key]) ?? allLearningTargets()[0];
}

export function loadProgress(): ProgressState {
  if (typeof localStorage === 'undefined') return emptyProgress();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return normalizeProgress(JSON.parse(stored));
    } catch {
      return emptyProgress();
    }
  }

  return migrateLegacyProgress();
}

export function saveProgress(progress: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function target(section: TrackableSection, id: string, title: string, sub?: number): LearningTarget {
  return {
    section,
    id,
    sub,
    title,
    path: routeFor(section as LearningSection, id, sub),
    key: itemKey(section, id, sub),
  };
}

function normalizeProgress(value: unknown): ProgressState {
  if (!value || typeof value !== 'object' || !('done' in value)) return emptyProgress();
  const rawDone = (value as { done?: unknown }).done;
  if (!rawDone || typeof rawDone !== 'object') return emptyProgress();

  const done: Record<string, true> = {};
  Object.entries(rawDone as Record<string, unknown>).forEach(([key, value]) => {
    if (value) done[key] = true;
  });
  return { done };
}

function migrateLegacyProgress(): ProgressState {
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacy) return emptyProgress();

  try {
    const parsed = JSON.parse(legacy) as { done?: Record<string, boolean> };
    const done: Record<string, true> = {};

    TUTORIALS.forEach((chapter) => {
      chapter.sections.forEach((_, index) => {
        if (parsed.done?.[`tut-${chapter.id}-${index}`]) {
          done[itemKey('tutorial', chapter.id, index)] = true;
        }
      });
    });

    MICRO_EXERCISES.forEach((item) => {
      if (parsed.done?.[`micro-${item.id}`]) done[itemKey('micro', item.id)] = true;
    });
    EXERCISES.forEach((item) => {
      if (parsed.done?.[`ex-${item.id}`] || parsed.done?.[`exercise-${item.id}`]) {
        done[itemKey('exercise', item.id)] = true;
      }
    });
    BUGS.forEach((item) => {
      if (parsed.done?.[`bug-${item.id}`]) done[itemKey('bug', item.id)] = true;
    });
    WAVEFORMS.forEach((item) => {
      if (parsed.done?.[`wv-${item.id}`] || parsed.done?.[`waveform-${item.id}`]) {
        done[itemKey('waveform', item.id)] = true;
      }
    });
    PROJECTS.forEach((item) => {
      if (parsed.done?.[`proj-${item.id}`] || parsed.done?.[`project-${item.id}`]) {
        done[itemKey('project', item.id)] = true;
      }
    });

    const progress = { done };
    saveProgress(progress);
    return progress;
  } catch {
    return emptyProgress();
  }
}
