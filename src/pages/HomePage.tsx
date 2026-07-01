import { NavLink } from 'react-router-dom';
import {
  BUGS,
  EXERCISES,
  MICRO_EXERCISES,
  PROJECTS,
  TUTORIALS,
  WAVEFORMS,
} from '../content';
import { doneCount, getNextLearningTarget, progressPercent, totalItems } from '../lib/progress';
import { routeFor } from '../lib/keys';
import { useProgress } from '../state/ProgressContext';

export function HomePage() {
  const { progress } = useProgress();
  const nextTarget = getNextLearningTarget(progress);
  const percent = progressPercent(progress);

  return (
    <div className="home-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">Zero-to-RTL learning path</p>
          <h1>VerilogLearn</h1>
          <p>
            面向零基础学习者的 Verilog 交互式学习站。先用小练习建立硬件思维，再进入教程、找错、波形阅读和 UART 项目。
          </p>
          <div className="welcome-actions">
            <NavLink className="primary-link" to={nextTarget.path}>
              继续学习：{nextTarget.title}
            </NavLink>
            <NavLink className="secondary-link" to="/playground">
              打开练习场
            </NavLink>
          </div>
        </div>
        <div className="today-card" aria-label="今日任务">
          <span>今日任务</span>
          <strong>{nextTarget.title}</strong>
          <small>建议先完成，再查看答案和 Testbench。</small>
        </div>
      </section>

      <section className="stat-cards" aria-label="学习统计">
        <div className="sc blue">
          <div className="sn">
            {doneCount(progress)}/{totalItems()}
          </div>
          <div className="sl">已完成/总任务</div>
        </div>
        <div className="sc green">
          <div className="sn">{percent}%</div>
          <div className="sl">总体进度</div>
        </div>
        <div className="sc orange">
          <div className="sn">{TUTORIALS.length}</div>
          <div className="sl">系统教程章节</div>
        </div>
        <div className="sc purple">
          <div className="sn">{MICRO_EXERCISES.length + EXERCISES.length + BUGS.length + WAVEFORMS.length + PROJECTS.length}</div>
          <div className="sl">练习与项目任务</div>
        </div>
      </section>

      <section className="learning-path" aria-labelledby="path-title">
        <div className="section-heading">
          <div>
            <h2 id="path-title">推荐学习路径</h2>
            <p>零基础优先按顺序走；已经会编程的同学也建议不要跳过 Bug Hunt 和波形阅读。</p>
          </div>
        </div>
        <div className="path-steps">
          {[
            ['1', '微练习', '先做 1~5 行代码的小题，快速建立 module、assign、always 的直觉。', routeFor('micro', MICRO_EXERCISES[0].id)],
            ['2', '系统教程', '按章节补齐语法、组合逻辑、时序逻辑、状态机和 Testbench。', routeFor('tutorial', TUTORIALS[0].id, 0)],
            ['3', '综合练习', '把知识点串起来，练加法器、计数器、FSM 和 UART。', routeFor('exercise', EXERCISES[0].id)],
            ['4', 'Bug Hunt', '读有问题的代码，训练避坑直觉。', routeFor('bug', BUGS[0].id)],
            ['5', '波形阅读', '从仿真波形反推电路行为，补上调试能力。', routeFor('waveform', WAVEFORMS[0].id)],
            ['6', '项目实战', '完成 UART 串口项目，得到一个可综合的模块。', routeFor('project', PROJECTS[0].id)],
          ].map(([index, title, desc, path]) => (
            <NavLink className="path-step" key={title} to={path}>
              <span>{index}</span>
              <strong>{title}</strong>
              <small>{desc}</small>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}
