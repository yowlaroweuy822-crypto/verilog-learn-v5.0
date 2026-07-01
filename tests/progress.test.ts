import { describe, expect, it } from 'vitest';
import { MICRO_EXERCISES } from '../src/content';
import { itemKey } from '../src/lib/keys';
import { doneCount, emptyProgress, getNextLearningTarget, progressPercent, toggleDone } from '../src/lib/progress';

describe('progress helpers', () => {
  it('toggles completion without mutating the previous object', () => {
    const progress = emptyProgress();
    const key = itemKey('micro', MICRO_EXERCISES[0].id);
    const done = toggleDone(progress, key);
    const undone = toggleDone(done, key);

    expect(progress.done[key]).toBeUndefined();
    expect(done.done[key]).toBe(true);
    expect(undone.done[key]).toBeUndefined();
  });

  it('returns the first unfinished learning target', () => {
    const first = getNextLearningTarget(emptyProgress());
    const progress = toggleDone(emptyProgress(), first.key);
    const next = getNextLearningTarget(progress);

    expect(first.section).toBe('micro');
    expect(next.key).not.toBe(first.key);
    expect(doneCount(progress)).toBe(1);
    expect(progressPercent(progress)).toBeGreaterThan(0);
  });
});
