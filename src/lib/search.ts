import {
  BUGS,
  EXERCISES,
  MICRO_EXERCISES,
  PROJECTS,
  REF_TABS,
  TUTORIALS,
  WAVEFORMS,
} from '../content';
import { routeFor } from './keys';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  sectionLabel: string;
  icon: string;
  path: string;
}

export function searchCatalog(query: string): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const results: SearchResult[] = [];

  TUTORIALS.forEach((chapter) => {
    chapter.sections.forEach((section, index) => {
      const haystack = normalize(`${chapter.title} ${chapter.desc} ${section.title} ${stripHtml(section.html)}`);
      if (haystack.includes(q)) {
        results.push({
          id: `tutorial-${chapter.id}-${index}`,
          title: section.title,
          description: chapter.title,
          sectionLabel: '系统教程',
          icon: chapter.icon,
          path: routeFor('tutorial', chapter.id, index),
        });
      }
    });
  });

  MICRO_EXERCISES.forEach((exercise) => {
    addExerciseResult(results, q, 'micro', '微练习', '✏️', exercise);
  });

  EXERCISES.forEach((exercise) => {
    addExerciseResult(results, q, 'exercise', '综合练习', '🎯', exercise);
  });

  BUGS.forEach((bug) => {
    const haystack = normalize(`${bug.title} ${stripHtml(bug.desc)} ${bug.buggy} ${stripHtml(bug.explanation)}`);
    if (haystack.includes(q)) {
      results.push({
        id: `bug-${bug.id}`,
        title: bug.title,
        description: stripHtml(bug.desc).slice(0, 90),
        sectionLabel: 'Bug Hunt',
        icon: '🐛',
        path: routeFor('bug', bug.id),
      });
    }
  });

  WAVEFORMS.forEach((waveform) => {
    const haystack = normalize(`${waveform.title} ${stripHtml(waveform.desc)} ${stripHtml(waveform.answer)}`);
    if (haystack.includes(q)) {
      results.push({
        id: `waveform-${waveform.id}`,
        title: waveform.title,
        description: stripHtml(waveform.desc).slice(0, 90),
        sectionLabel: '波形阅读',
        icon: '📊',
        path: routeFor('waveform', waveform.id),
      });
    }
  });

  PROJECTS.forEach((exercise) => {
    addExerciseResult(results, q, 'project', '项目实战', '🚀', exercise);
  });

  REF_TABS.forEach((tab) => {
    const haystack = normalize(`${tab.label} ${stripHtml(tab.content)}`);
    if (haystack.includes(q)) {
      results.push({
        id: `reference-${tab.id}`,
        title: tab.label,
        description: 'Verilog 语法速查表',
        sectionLabel: '语法速查',
        icon: '📖',
        path: `/reference?tab=${tab.id}`,
      });
    }
  });

  return results.slice(0, 12);
}

function addExerciseResult(
  results: SearchResult[],
  q: string,
  section: 'micro' | 'exercise' | 'project',
  sectionLabel: string,
  icon: string,
  exercise: { id: string; title: string; desc: string; iface?: string; answer?: string; part?: string; tb?: string; note?: string; hints?: string[] },
) {
  const haystack = normalize(`${exercise.part ?? ''} ${exercise.title} ${stripHtml(exercise.desc)} ${exercise.iface ?? ''} ${exercise.answer ?? ''} ${exercise.tb ?? ''} ${exercise.note ?? ''} ${(exercise.hints ?? []).join(' ')}`);
  if (!haystack.includes(q)) return;

  results.push({
    id: `${section}-${exercise.id}`,
    title: `${exercise.part ? `${exercise.part} ` : ''}${exercise.title}`,
    description: stripHtml(exercise.desc).slice(0, 90),
    sectionLabel,
    icon,
    path: routeFor(section, exercise.id),
  });
}

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
