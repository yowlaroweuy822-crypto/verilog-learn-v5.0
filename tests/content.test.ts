import { describe, expect, it } from 'vitest';
import {
  BUGS,
  EXERCISES,
  MICRO_EXERCISES,
  PROJECTS,
  REF_TABS,
  TUTORIALS,
  WAVEFORMS,
} from '../src/content';
import { validateContentCatalog } from '../src/lib/contentValidation';

describe('content catalog', () => {
  it('has no duplicate ids and no missing exercise essentials', () => {
    const errors = validateContentCatalog({
      tutorials: TUTORIALS,
      microExercises: MICRO_EXERCISES,
      exercises: EXERCISES,
      bugs: BUGS,
      waveforms: WAVEFORMS,
      projects: PROJECTS,
      referenceTabs: REF_TABS,
    });

    expect(errors).toEqual([]);
  });

  it('keeps the migrated learning inventory', () => {
    expect(TUTORIALS).toHaveLength(20);
    expect(MICRO_EXERCISES).toHaveLength(15);
    expect(EXERCISES).toHaveLength(30);
    expect(BUGS).toHaveLength(8);
    expect(WAVEFORMS).toHaveLength(3);
    expect(PROJECTS).toHaveLength(5);
    expect(REF_TABS).toHaveLength(6);
  });
});
