import { Navigate, NavLink, useParams } from 'react-router-dom';
import { PROJECTS } from '../content';
import { ExerciseCard } from '../components/ExerciseCard';
import { itemKey, routeFor } from '../lib/keys';
import { useProgress } from '../state/ProgressContext';

export function ProjectPage() {
  const { projectId } = useParams();
  const { progress } = useProgress();
  const index = PROJECTS.findIndex((item) => item.id === projectId);
  const project = PROJECTS[index];

  if (!project) return <Navigate to={routeFor('project', PROJECTS[0].id)} replace />;

  return (
    <article>
      <div className="breadcrumb">
        <NavLink to={routeFor('project', PROJECTS[0].id)}>项目实战</NavLink> › {project.part}
      </div>
      <h1 className="page-title">🚀 项目实战：UART 串口</h1>
      <p className="page-sub">通过 5 个递进式练习，从零实现一个完整的 UART 串口发送/接收器。</p>
      <div className="series-bar">
        <div>
          <div className="sb-t">UART 系列</div>
          <div className="sb-d">按顺序完成 5 个部分，最终得到一个可综合的 UART 模块。</div>
        </div>
        <div className="series-pills" aria-label="项目步骤">
          {PROJECTS.map((step, stepIndex) => (
            <NavLink
              key={step.id}
              className={`sp-pill ${step.id === project.id ? 'cur' : ''} ${progress.done[itemKey('project', step.id)] ? 'done' : ''}`}
              to={routeFor('project', step.id)}
            >
              {stepIndex + 1}
            </NavLink>
          ))}
        </div>
      </div>
      <ExerciseCard exercise={project} section="project" badge={`${project.part}`} />
      <nav className="chapter-nav" aria-label="项目步骤导航">
        {index > 0 ? (
          <NavLink className="cn-btn" to={routeFor('project', PROJECTS[index - 1].id)}>
            ← {PROJECTS[index - 1].title}
          </NavLink>
        ) : (
          <span />
        )}
        {index < PROJECTS.length - 1 ? (
          <NavLink className="cn-btn next" to={routeFor('project', PROJECTS[index + 1].id)}>
            {PROJECTS[index + 1].title} →
          </NavLink>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
