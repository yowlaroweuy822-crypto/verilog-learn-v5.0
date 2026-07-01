import { Navigate, NavLink, useParams } from 'react-router-dom';
import { WAVEFORMS } from '../content';
import { CompletionButton } from '../components/CompletionButton';
import { HtmlBlock } from '../components/HtmlBlock';
import { itemKey, routeFor } from '../lib/keys';
import { useUi } from '../state/UiContext';

export function WaveformPage() {
  const { waveformId } = useParams();
  const { isExpanded, toggleExpanded } = useUi();
  const index = WAVEFORMS.findIndex((item) => item.id === waveformId);
  const waveform = WAVEFORMS[index];

  if (!waveform) return <Navigate to={routeFor('waveform', WAVEFORMS[0].id)} replace />;

  const ansKey = `waveform-${waveform.id}-answer`;

  return (
    <article>
      <div className="breadcrumb">
        <NavLink to={routeFor('waveform', WAVEFORMS[0].id)}>波形阅读</NavLink> › 第 {index + 1} 题
      </div>
      <h1 className="page-title">📊 波形阅读训练</h1>
      <p className="page-sub">先观察信号变化，再判断电路行为。读波形是 Verilog 调试的核心能力。</p>
      <section className="ex-card">
        <header className="ex-header">
          <span className="ex-num waveform">波形 {index + 1}</span>
          <h2 className="ex-title">{waveform.title}</h2>
        </header>
        <div className="ex-body">
          <HtmlBlock html={waveform.desc} className="ex-desc" />
          <HtmlBlock html={waveform.svg} className="ex-svg" />
          <button className="ans-toggle purple" type="button" aria-expanded={isExpanded(ansKey)} onClick={() => toggleExpanded(ansKey)}>
            {isExpanded(ansKey) ? '收起答案解析' : '查看答案解析'}
          </button>
          {isExpanded(ansKey) ? (
            <div className="ans-box show">
              <div className="ans-label">✓ 答案解析</div>
              <HtmlBlock html={waveform.answer} />
            </div>
          ) : null}
          <CompletionButton itemKey={itemKey('waveform', waveform.id)} doneLabel="✓ 已读懂" pendingLabel="我读懂了" />
        </div>
      </section>
      <nav className="chapter-nav" aria-label="波形前后导航">
        {index > 0 ? (
          <NavLink className="cn-btn" to={routeFor('waveform', WAVEFORMS[index - 1].id)}>
            ← {WAVEFORMS[index - 1].title}
          </NavLink>
        ) : (
          <span />
        )}
        {index < WAVEFORMS.length - 1 ? (
          <NavLink className="cn-btn next" to={routeFor('waveform', WAVEFORMS[index + 1].id)}>
            {WAVEFORMS[index + 1].title} →
          </NavLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}