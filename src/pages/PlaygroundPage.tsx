import { useMemo, useState } from 'react';
import { EXERCISES, MICRO_EXERCISES, PROJECTS } from '../content';
import { runStaticVerilogCheck } from '../lib/verilogCheck';
import type { Exercise } from '../types';
import { CodeEditor } from '../components/CodeEditor';
import { useUi } from '../state/UiContext';

const DEFAULT_CODE = `module blink(
    input clk,
    input rst,
    output reg led
);
    reg [25:0] cnt;

    always @(posedge clk) begin
        if (rst) begin
            cnt <= 0;
            led <= 0;
        end else begin
            cnt <= cnt + 1;
            if (cnt == 26'd49999999) begin
                cnt <= 0;
                led <= ~led;
            end
        end
    end
endmodule`;

const PLAYGROUND_EXERCISES = [
  ...MICRO_EXERCISES.map((item) => ({ ...item, group: '微练习' })),
  ...EXERCISES.map((item) => ({ ...item, group: '综合练习' })),
  ...PROJECTS.map((item) => ({ ...item, group: '项目实战' })),
];

export function PlaygroundPage() {
  const { playgroundCode, setPlaygroundCode, dark } = useUi();
  const code = playgroundCode || DEFAULT_CODE;
  const [exerciseId, setExerciseId] = useState(PLAYGROUND_EXERCISES[0].id);
  const [hasRun, setHasRun] = useState(false);
  const exercise = useMemo<Exercise | undefined>(() => PLAYGROUND_EXERCISES.find((item) => item.id === exerciseId), [exerciseId]);
  const result = useMemo(() => runStaticVerilogCheck(code, exercise), [code, exercise]);

  function loadTemplate() {
    if (!exercise) return;
    setPlaygroundCode(`${exercise.iface}\n    // 在这里写你的代码\n\nendmodule`);
    setHasRun(false);
  }

  return (
    <article>
      <h1 className="page-title">💻 代码练习场</h1>
      <p className="page-sub">这里做静态检查和参考答案关键结构对比，不做真实仿真。真实仿真仍需 Icarus Verilog、ModelSim 或 Vivado。</p>
      <section className="playground">
        <div className="pgh">
          <label className="select-label">
            对比题目
            <select value={exerciseId} onChange={(event) => setExerciseId(event.target.value)}>
              {PLAYGROUND_EXERCISES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.group} · {item.part ? `${item.part} ` : ''}
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <div className="pgb">
            <button className="run-btn" type="button" onClick={() => setHasRun(true)}>
              ▶ 静态检查
            </button>
            <button className="clear-btn" type="button" onClick={loadTemplate}>
              载入模板
            </button>
            <button className="clear-btn" type="button" onClick={() => setPlaygroundCode('')}>
              清空
            </button>
          </div>
        </div>
        <CodeEditor value={code} onChange={setPlaygroundCode} dark={dark} />
        <div className="pg-out" aria-live="polite">
          {hasRun ? (
            <>
              <p className="pg-info">// 静态分析结果（非真实仿真）</p>
              <p className="pg-ok">✓ module 定义：{result.moduleCount}</p>
              <p className="pg-ok">✓ assign 语句：{result.assignCount}</p>
              <p className="pg-ok">✓ always 块：{result.alwaysCount}</p>
              {result.warnings.length ? result.warnings.map((warning) => <p className="pg-err" key={warning}>⚠ {warning}</p>) : <p className="pg-ok">✓ 未发现明显初学者错误</p>}
              {exercise ? (
                <div className="compare-box">
                  <p className="pg-info">// 与《{exercise.title}》参考答案的关键结构对比</p>
                  <p>已匹配：{result.matchedKeywords.length ? result.matchedKeywords.join('、') : '暂无'}</p>
                  <p>待检查：{result.missingKeywords.length ? result.missingKeywords.join('、') : '无'}</p>
                </div>
              ) : null}
            </>
          ) : (
            <p className="pg-info">// 点击“静态检查”查看 module、assign、always 和常见写法风险。</p>
          )}
        </div>
      </section>
    </article>
  );
}
