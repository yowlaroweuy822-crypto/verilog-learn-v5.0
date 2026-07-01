import type { Exercise, LearningSection } from '../types';
import { itemKey } from '../lib/keys';
import { CompletionButton } from './CompletionButton';
import { HtmlBlock } from './HtmlBlock';
import { useUi } from '../state/UiContext';

const LEVEL_LABELS = {
  trivial: '入门',
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export function ExerciseCard({
  exercise,
  section,
  badge,
}: {
  exercise: Exercise;
  section: Extract<LearningSection, 'micro' | 'exercise' | 'project'>;
  badge: string;
}) {
  const { isExpanded, toggleExpanded } = useUi();
  const hints = exercise.hints ?? ['暂无提示', '暂无更多提示', '暂无代码提示'];
  const key = itemKey(section, exercise.id);
  const level = exercise.level ?? 'easy';

  const hintKeys = {
    idea: `${key}-hint-idea`,
    syntax: `${key}-hint-syntax`,
    code: `${key}-hint-code`,
  };
  const answerKey = `${key}-answer`;
  const tbKey = `${key}-tb`;

  return (
    <article className="ex-card">
      <header className="ex-header">
        <span className={`ex-num ${section}`}>{badge}</span>
        <h1 className="ex-title">{exercise.title}</h1>
        <span className={`lvl ${level}`}>{LEVEL_LABELS[level]}</span>
      </header>
      <div className="ex-body">
        <div className="ex-meta">
          <span>📝 {exercise.len}</span>
          <span>⏱ {exercise.time}</span>
        </div>
        <HtmlBlock html={exercise.desc} className="ex-desc" />

        <div className="iface-box">
          <div className="if-t">模块接口（你需要实现的代码框架）</div>
          <pre>
            <code>{`${exercise.iface}\n    // 在这里写你的代码\n\nendmodule`}</code>
          </pre>
        </div>

        <div className="hint-row" aria-label="提示">
          {[
            { id: 'idea' as const, label: '💡 思路提示', ek: hintKeys.idea },
            { id: 'syntax' as const, label: '🔑 关键语法', ek: hintKeys.syntax },
            { id: 'code' as const, label: '📝 核心代码', ek: hintKeys.code },
          ].map((hint) => (
            <button
              key={hint.id}
              className={`hint-btn ${isExpanded(hint.ek) ? 'show' : ''}`}
              type="button"
              aria-expanded={isExpanded(hint.ek)}
              onClick={() => toggleExpanded(hint.ek)}
            >
              {isExpanded(hint.ek) ? `${hint.label} (收起)` : hint.label}
            </button>
          ))}
        </div>

        {isExpanded(hintKeys.idea) ? <HtmlBlock html={String(hints[0] ?? '暂无提示')} className="hint-content show h1" /> : null}
        {isExpanded(hintKeys.syntax) ? <HtmlBlock html={String(hints[1] ?? '暂无更多提示')} className="hint-content show h2" /> : null}
        {isExpanded(hintKeys.code) ? (
          <div className="hint-content show h3">
            <pre>
              <code>{String(hints[2] ?? '暂无代码提示')}</code>
            </pre>
          </div>
        ) : null}

        <button className="ans-toggle" type="button" aria-expanded={isExpanded(answerKey)} onClick={() => toggleExpanded(answerKey)}>
          {isExpanded(answerKey) ? '收起参考答案' : '查看参考答案'}
        </button>
        {isExpanded(answerKey) ? (
          <div className="ans-box show">
            <div className="ans-label">✓ 参考答案</div>
            <pre>
              <code>{exercise.answer}</code>
            </pre>
            {exercise.tb ? (
              <>
                <button className="tb-toggle" type="button" aria-expanded={isExpanded(tbKey)} onClick={() => toggleExpanded(tbKey)}>
                  {isExpanded(tbKey) ? '收起 Testbench' : '显示 Testbench 示例'}
                </button>
                {isExpanded(tbKey) ? (
                  <div className="tb-box show">
                    <pre>
                      <code>{exercise.tb}</code>
                    </pre>
                  </div>
                ) : null}
              </>
            ) : null}
            {exercise.note ? <HtmlBlock html={exercise.note} className="callout info answer-note" /> : null}
          </div>
        ) : null}

        <CompletionButton itemKey={key} doneLabel="✓ 已完成" pendingLabel="标记为已完成" />
      </div>
    </article>
  );
}