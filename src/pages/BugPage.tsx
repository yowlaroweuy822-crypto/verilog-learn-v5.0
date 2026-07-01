import { Navigate, NavLink, useParams } from 'react-router-dom';
import { BUGS } from '../content';
import { CompletionButton } from '../components/CompletionButton';
import { HtmlBlock } from '../components/HtmlBlock';
import { itemKey, routeFor } from '../lib/keys';
import { useUi } from '../state/UiContext';

export function BugPage() {
  const { bugId } = useParams();
  const { isExpanded, toggleExpanded } = useUi();
  const index = BUGS.findIndex((item) => item.id === bugId);
  const bug = BUGS[index];

  if (!bug) return <Navigate to={routeFor('bug', BUGS[0].id)} replace />;

  const ansKey = `bug-${bug.id}-answer`;

  return (
    <article>
      <div className="breadcrumb">
        <NavLink to={routeFor('bug', BUGS[0].id)}>Bug Hunt</NavLink> › 第 {index + 1} 题
      </div>
      <h1 className="page-title">🐛 Bug Hunt 找错训练</h1>
      <p className="page-sub">先读代码，自己定位问题，再展开解析。这个训练比直接背答案更能建立避坑直觉。</p>
      <section className="ex-card">
        <header className="ex-header">
          <span className="ex-num bug">Bug {index + 1}</span>
          <h2 className="ex-title">{bug.title}</h2>
        </header>
        <div className="ex-body">
          <HtmlBlock html={bug.desc} className="ex-desc" />
          <pre className="bug-code">
            <span className="bug-marker">有 BUG</span>
            <code>{bug.buggy}</code>
          </pre>
          <button className="ans-toggle danger" type="button" aria-expanded={isExpanded(ansKey)} onClick={() => toggleExpanded(ansKey)}>
            {isExpanded(ansKey) ? '收起 Bug 解析' : '揭示 Bug 与修复'}
          </button>
          {isExpanded(ansKey) ? (
            <div className="bug-answer show">
              <div className="bug-explain">
                <strong>Bug 分析：</strong>
                <HtmlBlock html={bug.explanation} />
              </div>
              <div className="bug-fix-label">✓ 修复后代码：</div>
              <pre>
                <code>{bug.fix}</code>
              </pre>
            </div>
          ) : null}
          <CompletionButton itemKey={itemKey('bug', bug.id)} doneLabel="✓ 已找到" pendingLabel="我找到了，标记" />
        </div>
      </section>
      <nav className="chapter-nav" aria-label="找错前后导航">
        {index > 0 ? (
          <NavLink className="cn-btn" to={routeFor('bug', BUGS[index - 1].id)}>
            ← {BUGS[index - 1].title}
          </NavLink>
        ) : (
          <span />
        )}
        {index < BUGS.length - 1 ? (
          <NavLink className="cn-btn next" to={routeFor('bug', BUGS[index + 1].id)}>
            {BUGS[index + 1].title} →
          </NavLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}