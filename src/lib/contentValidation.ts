import type {
  BugCase,
  Exercise,
  ProjectStep,
  ReferenceTab,
  TutorialChapter,
  WaveformCase,
} from '../types';

export interface ContentCatalog {
  tutorials: TutorialChapter[];
  microExercises: Exercise[];
  exercises: Exercise[];
  bugs: BugCase[];
  waveforms: WaveformCase[];
  projects: ProjectStep[];
  referenceTabs: ReferenceTab[];
}

export function validateContentCatalog(content: ContentCatalog): string[] {
  const errors: string[] = [];
  assertUnique('tutorial chapter', content.tutorials.map((item) => item.id), errors);
  assertUnique('micro exercise', content.microExercises.map((item) => item.id), errors);
  assertUnique('exercise', content.exercises.map((item) => item.id), errors);
  assertUnique('bug case', content.bugs.map((item) => item.id), errors);
  assertUnique('waveform', content.waveforms.map((item) => item.id), errors);
  assertUnique('project', content.projects.map((item) => item.id), errors);
  assertUnique('reference tab', content.referenceTabs.map((item) => item.id), errors);

  [...content.microExercises, ...content.exercises, ...content.projects].forEach((exercise) => {
    if (!exercise.iface.trim()) errors.push(`${exercise.id} is missing iface`);
    if (!exercise.answer.trim()) errors.push(`${exercise.id} is missing answer`);
    if (!exercise.len.trim()) errors.push(`${exercise.id} is missing len`);
    if (!exercise.time.trim()) errors.push(`${exercise.id} is missing time`);
  });

  content.tutorials.forEach((chapter) => {
    if (chapter.sections.length === 0) errors.push(`${chapter.id} has no tutorial sections`);
  });

  return errors;
}

function assertUnique(label: string, ids: string[], errors: string[]): void {
  const seen = new Set<string>();
  ids.forEach((id) => {
    if (seen.has(id)) errors.push(`Duplicate ${label} id: ${id}`);
    seen.add(id);
  });
}
