import type { LearningSection } from '../types';

export type TrackableSection = Exclude<LearningSection, 'home' | 'reference' | 'playground'>;

export function itemKey(section: TrackableSection, id: string, sub?: number): string {
  if (section === 'tutorial') {
    return `tutorial:${id}:${sub ?? 0}`;
  }
  return `${section}:${id}`;
}

export function routeFor(section: LearningSection, id?: string, sub?: number): string {
  if (section === 'home') return '/';
  if (section === 'reference') return '/reference';
  if (section === 'playground') return '/playground';
  if (section === 'tutorial') return `/tutorial/${id ?? 'ch1'}/${sub ?? 0}`;
  return `/${section}/${id ?? ''}`;
}
