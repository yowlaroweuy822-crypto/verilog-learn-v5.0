import { describe, expect, it } from 'vitest';
import { searchCatalog } from '../src/lib/search';

describe('global search', () => {
  it('finds tutorial and exercise content', () => {
    const tutorialResults = searchCatalog('状态机');
    const exerciseResults = searchCatalog('UART');

    expect(tutorialResults.some((item) => item.sectionLabel === '系统教程')).toBe(true);
    expect(exerciseResults.some((item) => item.sectionLabel === '项目实战' || item.sectionLabel === '综合练习')).toBe(true);
  });

  it('limits empty results for blank queries', () => {
    expect(searchCatalog('   ')).toEqual([]);
  });
});
