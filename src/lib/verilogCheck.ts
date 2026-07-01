import type { CodeCheckResult, Exercise } from '../types';

const KEYWORDS = [
  'assign',
  'always',
  'posedge',
  'negedge',
  'case',
  'if',
  'else',
  '<=',
  'begin',
  'endmodule',
  'wire',
  'reg',
];

export function runStaticVerilogCheck(code: string, exercise?: Exercise): CodeCheckResult {
  const normalized = stripComments(code);
  const warnings: string[] = [];
  const moduleCount = matchCount(normalized, /^\s*module\b/gm);
  const endmoduleCount = matchCount(normalized, /\bendmodule\b/g);
  const assignCount = matchCount(normalized, /^\s*assign\b/gm);
  const alwaysCount = matchCount(normalized, /\balways\s*@/g);
  const beginCount = matchCount(normalized, /\bbegin\b/g);
  const endCount = matchCount(normalized, /\bend\b/g);

  if (moduleCount === 0) warnings.push('没有检测到 module 定义。');
  if (moduleCount > 1) warnings.push('检测到多个 module，确认当前题目是否只需要实现一个模块。');
  if (moduleCount !== endmoduleCount) warnings.push('module 与 endmodule 数量不一致，请检查模块是否闭合。');
  if (beginCount !== endCount) warnings.push('begin 与 end 数量不一致，请检查过程块或分支是否闭合。');
  if (/\balways\s*@\s*\([^)]*,[^)]*\)/.test(normalized)) {
    warnings.push('检测到逗号敏感列表，建议使用 always @(*) 或完整列出敏感信号。');
  }

  const sequentialBlocks = normalized.match(/always\s*@\s*\([^)]*posedge[^)]*\)[\s\S]*?(?=\balways\s*@|\bendmodule\b|$)/g) ?? [];
  sequentialBlocks.forEach((block) => {
    if (/(?<![=!<>])=(?!=)/.test(block)) {
      warnings.push('时序 always 块中发现阻塞赋值 =，建议使用非阻塞赋值 <=。');
    }
  });

  const combBlocks = normalized.match(/always\s*@\s*(?:\(\s*\*\s*\)|\*)[\s\S]*?(?=\balways\s*@|\bendmodule\b|$)/g) ?? [];
  combBlocks.forEach((block) => {
    if (/\bif\s*\(/.test(block) && !/\belse\b/.test(block)) {
      warnings.push('组合 always 中发现 if 没有配套 else，可能产生锁存器。');
    }
    if (/\bcase\s*\(/.test(block) && !/\bdefault\s*:/.test(block)) {
      warnings.push('组合 case 中没有 default 分支，可能产生锁存器。');
    }
  });

  const expectedKeywords = exercise ? keywordsFromAnswer(exercise.answer) : [];
  const matchedKeywords = expectedKeywords.filter((keyword) => normalized.includes(keyword));
  const missingKeywords = expectedKeywords.filter((keyword) => !normalized.includes(keyword));

  return {
    moduleCount,
    assignCount,
    alwaysCount,
    warnings,
    matchedKeywords,
    missingKeywords,
  };
}

function stripComments(code: string): string {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

function matchCount(code: string, pattern: RegExp): number {
  return code.match(pattern)?.length ?? 0;
}

function keywordsFromAnswer(answer: string): string[] {
  return KEYWORDS.filter((keyword) => answer.includes(keyword));
}
